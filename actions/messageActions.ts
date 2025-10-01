// actions/messageActions.ts

"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Zod şemasını güncelliyoruz: 'subject' kaldırıldı, 'phone' eklendi (isteğe bağlı).
const messageSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçersiz e-posta adresi."),
  phone: z.string().optional(), // Telefon alanı isteğe bağlı
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır."),
});

export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
}

export async function sendContactMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = messageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Form verileri geçersiz. Lütfen hataları düzeltin.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const { name, email, phone, message } = validatedFields.data;
    
    // Firestore'a kaydedilecek veriye 'phone' alanını ekliyoruz.
    await addDoc(collection(db, "messages"), {
      type: 'contact',
      name,
      email,
      phone: phone || '', // Telefon girilmediyse boş string olarak kaydet
      message,
      date: serverTimestamp(),
      status: 'new',
      read: false,
    });

    try {
      // WhatsApp bildirimini yeni alanlarla güncelliyoruz.
      const notificationMessage = `
Yeni İletişim Formu Mesajı! 🚀

*Gönderen:* ${name}
*E-posta:* ${email}
${phone ? `*Telefon:* ${phone}` : ''}

*Mesaj:*
${message}
      `;

      await client.messages.create({
        body: notificationMessage.trim(),
        from: process.env.TWILIO_WHATSAPP_NUMBER!,
        to: process.env.MY_WHATSAPP_NUMBER!,
      });
      console.log("WhatsApp bildirimi başarıyla gönderildi.");

    } catch (notificationError) {
      console.error("WhatsApp bildirimi gönderme hatası:", notificationError);
    }

    return { success: true, message: "Mesajınız başarıyla gönderildi!" };

  } catch (error) {
    console.error("Firestore'a yazma hatası:", error);
    return { 
        success: false, 
        message: "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
    };
  }
}