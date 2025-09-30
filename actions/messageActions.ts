// actions/messageActions.ts

"use server";

import { z } from "zod";
import { db } from "@/lib/firebase"; // Henüz oluşturmadıysak, bunu da oluşturacağız.
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Message } from "@/types/message"; // Message tipini import ettiğimizden emin olalım


// İletişim Formu için veri doğrulama şeması
const ContactSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

// Teklif Formu için veri doğrulama şeması
const QuoteSchema = z.object({
    name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
    phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz."}),
    service: z.string().min(1, { message: "Hizmet türü seçmelisiniz." }),
    projectType: z.string().optional(),
    location: z.string().optional(),
    budget: z.string().optional(),
    description: z.string().min(10, { message: "Proje detayları en az 10 karakter olmalıdır." }),
    urgency: z.string().optional(),
    consent: z.string().refine(val => val === 'on', { message: 'Onay vermeniz gerekmektedir.' }),
});


// Formların başlangıç durumu için bir interface
interface FormState {
    message: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
}

// İletişim mesajını oluşturan Server Action
export async function createContactMessage(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Formu kontrol ediniz.",
    };
  }

  try {
    await addDoc(collection(db, "messages"), {
      ...validatedFields.data,
      type: 'contact' as const,
      status: 'new' as const,
      read: false,
      date: serverTimestamp(),
    });

    revalidatePath("/admin/messages");
    return { message: "Mesajınız başarıyla gönderildi!", errors: {} };

  } catch (error) {
    console.error("İletişim mesajı gönderilirken hata:", error);
    return { message: "Sunucu hatası. Lütfen daha sonra tekrar deneyin.", errors: {} };
  }
}

// Teklif talebini oluşturan Server Action
export async function createQuoteRequest(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = QuoteSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        projectType: formData.get("projectType"),
        location: formData.get("location"),
        budget: formData.get("budget"),
        description: formData.get("description"),
        urgency: formData.get("urgency"),
        consent: formData.get("consent"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Formu kontrol ediniz.",
        };
    }

    try {
        const { consent, ...quoteData } = validatedFields.data;
        
        await addDoc(collection(db, "messages"), {
            ...quoteData,
            projectDetails: `Bütçe: ${quoteData.budget}\nAciliyet: ${quoteData.urgency}\n\n${quoteData.description}`,
            type: 'quote' as const,
            status: 'new' as const,
            read: false,
            date: serverTimestamp(),
        });

        revalidatePath("/admin/messages");
        return { message: "Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.", errors: {} };

    } catch (error) {
        console.error("Teklif talebi gönderilirken hata:", error);
        return { message: "Sunucu hatası. Lütfen daha sonra tekrar deneyin.", errors: {} };
    }
}

// actions/messageActions.ts dosyasının altına eklenecek kodlar


// ... createContactMessage ve createQuoteRequest fonksiyonları ...

// Bir mesajın durumunu güncelleyen Server Action
export async function updateMessageStatus(
  messageId: string, 
  status: Message['status']
): Promise<{ message: string; error?: string }> {
  if (!messageId) {
    return { message: "", error: "Mesaj ID'si bulunamadı." };
  }

  try {
    const messageDocRef = doc(db, "messages", messageId);
    await updateDoc(messageDocRef, { 
      status: status,
      read: true // Durumu güncellenen bir mesajı okunmuş kabul edelim
    });

    revalidatePath("/admin/messages");
    return { message: "Mesaj durumu güncellendi." };

  } catch (error) {
    console.error("Mesaj durumu güncellenirken hata:", error);
    return { message: "", error: "Sunucu hatası: Durum güncellenemedi." };
  }
}

// Bir mesajı silen Server Action
export async function deleteMessage(messageId: string): Promise<{ message: string; error?: string }> {
  if (!messageId) {
    return { message: "", error: "Mesaj ID'si bulunamadı." };
  }

  try {
    await deleteDoc(doc(db, "messages", messageId));
    revalidatePath("/admin/messages");
    return { message: "Mesaj başarıyla silindi." };
    
  } catch (error) {
    console.error("Mesaj silinirken hata:", error);
    return { message: "", error: "Sunucu hatası: Mesaj silinemedi." };
  }
}