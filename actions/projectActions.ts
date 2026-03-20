"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Project } from "@/types/project";


// Proje formu için Zod şeması
const ProjectSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır."),
  category: z.enum(['PVC', 'Alüminyum', 'Cam Balkon', 'Cephe'], {
    errorMap: () => ({ message: "Lütfen geçerli bir kategori seçin." })
  }),
  location: z.string().min(2, "Lokasyon belirtilmelidir."),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır."),
  featured: z.string().optional(), // Checkbox'tan 'on' veya undefined olarak gelir
});

// Resim dosyası doğrulaması
const ImageSchema = z.instanceof(File).refine(file => file.size > 0, "En az bir görsel yüklemelisiniz.")
  .refine(file => file.size < 4 * 1024 * 1024, "Görsel boyutu en fazla 4MB olabilir.")
  .refine(file => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Sadece .jpg, .png, ve .webp formatları desteklenmektedir.");

interface FormState {
    message: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
}

export async function createProject(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = ProjectSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    location: formData.get("location"),
    description: formData.get("description"),
    featured: formData.get("featured"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Formu kontrol ediniz.",
    };
  }
  
  const images = formData.getAll("images") as File[];
  if (images.length === 0 || images[0].size === 0) {
      return { errors: { images: ["En az bir görsel yüklemelisiniz."] }, message: "" };
  }

  // Her bir dosyayı doğrula
  for (const image of images) {
    const imageValidation = ImageSchema.safeParse(image);
    if (!imageValidation.success) {
        return {
            errors: { images: imageValidation.error.flatten().formErrors },
            message: "Görsel dosyalarını kontrol ediniz."
        };
    }
  }

  try {
    const imageUrls: string[] = [];
    const imagePaths: string[] = [];
    
    // Proje bilgilerini al
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    if (!projectId || !fbApiKey || !bucket) {
        return { message: "Firebase ayarları eksik.", errors: {} };
    }

    // Her bir görseli Storage'a yükle (REST API kullanarak)
    for (const image of images) {
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${image.name}`;
      const filePath = `projects/${uniqueFileName}`;
      
      const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=${encodeURIComponent(filePath)}`;
      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": image.type },
        body: image
      });

      if (!uploadRes.ok) throw new Error("Görsel yüklenemedi.");
      
      const uploadData = await uploadRes.json() as { downloadTokens: string };
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(filePath)}?alt=media`;
      imageUrls.push(downloadURL);
      imagePaths.push(filePath);
    }
    
    // Firestore REST API ile kayıt
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?key=${fbApiKey}`;
    await fetch(firestoreUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          title: { stringValue: validatedFields.data.title },
          category: { stringValue: validatedFields.data.category },
          location: { stringValue: validatedFields.data.location },
          description: { stringValue: validatedFields.data.description },
          featured: { booleanValue: validatedFields.data.featured === 'on' },
          images: { arrayValue: { values: imageUrls.map(url => ({ stringValue: url })) } },
          imagePaths: { arrayValue: { values: imagePaths.map(path => ({ stringValue: path })) } },
          thumbnail: { stringValue: imageUrls[0] },
          date: { timestampValue: new Date().toISOString() }
        }
      })
    });

    revalidatePath("/galeri");
    revalidatePath("/admin/projects");

    return { message: "Proje başarıyla oluşturuldu!", errors: {} };

  } catch (error) {
    console.error("Proje oluşturulurken REST hatası:", error);
    return { message: "Sunucu hatası: Proje oluşturulamadı.", errors: {} };
  }
}

export async function deleteProject(projectId: string): Promise<{ message: string; error?: string }> {
    if (!projectId) return { message: "", error: "Proje ID'si bulunamadı." };
  
    try {
      const fbProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

      // 1. Projeyi getir (Storage yolları için)
      const getUrl = `https://firestore.googleapis.com/v1/projects/${fbProjectId}/databases/(default)/documents/projects/${projectId}?key=${fbApiKey}`;
      const getRes = await fetch(getUrl);
      if (!getRes.ok) return { message: "", error: "Proje bulunamadı." };
      
      const projectDoc = await getRes.json() as { fields: any };
      const imagePaths = projectDoc.fields.imagePaths?.arrayValue?.values?.map((v: any) => v.stringValue) || [];

      // 2. Storage'dan görselleri sil
      const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
      for (const path of imagePaths) {
        const deleteUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?key=${fbApiKey}`;
        await fetch(deleteUrl, { method: "DELETE" }).catch(() => {});
      }
  
      // 3. Firestore'dan sil
      const deleteUrl = `https://firestore.googleapis.com/v1/projects/${fbProjectId}/databases/(default)/documents/projects/${projectId}?key=${fbApiKey}`;
      await fetch(deleteUrl, { method: "DELETE" });
  
      revalidatePath("/admin/projects");
      revalidatePath("/galeri");
  
      return { message: "Proje başarıyla silindi." };
  
    } catch (error) {
      console.error("Proje silinirken REST hatası:", error);
      return { message: "", error: "Sunucu hatası: Proje silinemedi." };
    }
  }
