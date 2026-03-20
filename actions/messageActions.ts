"use server";

import { z } from "zod";
import { headers } from "next/headers";

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

// IP tabanlı spam koruması (Form gönderimleri için)
const formIpLimits = new Map<string, { count: number; lastRequest: number }>();
const MAX_FORM_PER_MINUTE = 2; // Bir kişi dakikada en fazla 2 form gönderebilir

export async function sendContactMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // SPAM KORUMASI DEVREDE
  const ip = headers().get("x-forwarded-for") || "unknown_ip";
  const now = Date.now();
  const ipData = formIpLimits.get(ip);

  if (ipData) {
    if (now - ipData.lastRequest > 60000) {
      // 1 dakika geçmiş, sayacı sıfırla
      formIpLimits.set(ip, { count: 1, lastRequest: now });
    } else {
      if (ipData.count >= MAX_FORM_PER_MINUTE) {
        console.warn(`Spam Engellendi: ${ip} adlı kullanıcı çok fazla form gönderdi.`);
        return {
          success: false,
          message: "Çok fazla deneme yaptınız. Lütfen 1 dakika bekleyip tekrar deneyin.",
        };
      }
      ipData.count++;
      ipData.lastRequest = now;
    }
  } else {
    formIpLimits.set(ip, { count: 1, lastRequest: now });
  }

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
    
    // Firestore REST API ile kayıt (addDoc yerine)
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (projectId && fbApiKey) {
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/messages?key=${fbApiKey}`;
      await fetch(firestoreUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            type: { stringValue: "contact" },
            name: { stringValue: name },
            email: { stringValue: email },
            phone: { stringValue: phone || "" },
            message: { stringValue: message },
            date: { timestampValue: new Date().toISOString() },
            status: { stringValue: "new" },
            read: { booleanValue: false }
          }
        })
      });
    }

    // Twilio REST API ile WhatsApp bildirimi (twilio SDK yerine)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;
    const toWhatsApp = process.env.MY_WHATSAPP_NUMBER;

    if (accountSid && authToken && fromWhatsApp && toWhatsApp) {
      try {
        const notificationMessage = `Yeni İletişim Formu Mesajı! 🚀\n\n*Gönderen:* ${name}\n*E-posta:* ${email}\n${phone ? `*Telefon:* ${phone}` : ""}\n\n*Mesaj:*\n${message}`;
        
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        const auth = btoa(`${accountSid}:${authToken}`);

        await fetch(twilioUrl, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            To: toWhatsApp,
            From: fromWhatsApp,
            Body: notificationMessage
          })
        });
        console.log("WhatsApp bildirimi (REST) başarıyla gönderildi.");
      } catch (notificationError) {
        console.error("WhatsApp bildirimi (REST) hatası:", notificationError);
      }
    }

    return { success: true, message: "Mesajınız başarıyla gönderildi!" };

  } catch (error) {
    console.error("Firestore'a (REST) yazma hatası:", error);
    return { 
        success: false, 
        message: "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
    };
  }
}

export const createContactMessage = sendContactMessage;
export const createQuoteRequest = sendContactMessage;