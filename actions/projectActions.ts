// actions/projectActions.ts

"use server";

import { z } from "zod";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { revalidatePath } from "next/cache";

// actions/projectActions.ts dosyasının altına eklenecek kod

import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Project } from "@/types/project"; // Project tipini import ettiğimizden emin olalım

// ... createProject fonksiyonu ...


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
    
    // Her bir görseli Storage'a yükle
    for (const image of images) {
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${image.name}`;
      const storageRef = ref(storage, `projects/${uniqueFileName}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageUrls.push(downloadURL);
    }
    
    // Firestore'a kaydedilecek proje verisi
    const newProjectData = {
      title: validatedFields.data.title,
      category: validatedFields.data.category,
      location: validatedFields.data.location,
      description: validatedFields.data.description,
      featured: validatedFields.data.featured === 'on', // Checkbox değeri 'on' ise true yap
      images: imageUrls,
      thumbnail: imageUrls[0], // İlk görseli thumbnail olarak ata
      date: serverTimestamp(),
    };

    await addDoc(collection(db, "projects"), newProjectData);

    // İlgili sayfaların önbelleğini temizle ki yeni veriler görünsün
    revalidatePath("/galeri");
    revalidatePath("/admin/projects");

    return { message: "Proje başarıyla oluşturuldu!", errors: {} };

  } catch (error) {
    console.error("Proje oluşturulurken hata:", error);
    return { message: "Sunucu hatası: Proje oluşturulamadı.", errors: {} };
  }
}


export async function deleteProject(projectId: string): Promise<{ message: string; error?: string }> {
    if (!projectId) {
      return { message: "", error: "Proje ID'si bulunamadı." };
    }
  
    try {
      const projectDocRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(projectDocRef);
  
      if (!projectDoc.exists()) {
        return { message: "", error: "Silinecek proje bulunamadı." };
      }
  
      const projectData = projectDoc.data() as Project;
      
      // 1. Storage'dan görselleri sil
      if (projectData.images && projectData.images.length > 0) {
        for (const imageUrl of projectData.images) {
          try {
            // Firebase Storage URL'sinden dosya referansını al
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          } catch (storageError: any) {
            // Eğer bir görsel silinemezse bile işleme devam et, sadece hatayı logla.
            // Bu durum, URL hatalıysa veya dosya zaten silinmişse olabilir.
            console.warn(`Görsel silinirken hata oluştu (${imageUrl}):`, storageError.code);
          }
        }
      }
  
      // 2. Firestore'dan proje dökümanını sil
      await deleteDoc(projectDocRef);
  
      // Cache'i temizle
      revalidatePath("/admin/projects");
      revalidatePath("/galeri");
  
      return { message: "Proje başarıyla silindi." };
  
    } catch (error) {
      console.error("Proje silinirken hata:", error);
      return { message: "", error: "Sunucu hatası: Proje silinemedi." };
    }
  }
