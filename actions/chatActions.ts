"use server"

import { GoogleGenAI } from "@google/genai"
import { headers } from "next/headers"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

interface ChatMessage {
  role: "user" | "model"
  content: string
}

// IP tabanlı spam koruması (Sohbet için)
const chatIpLimits = new Map<string, { count: number; lastRequest: number }>();
const MAX_CHAT_PER_MINUTE = 15; 

export async function chatWithAssistant(
  history: ChatMessage[],
  newMessage: string
): Promise<{ text: string; isWhatsAppReady: boolean }> {
  const ip = headers().get("x-forwarded-for") || "unknown_ip"
  const now = Date.now()
  const ipData = chatIpLimits.get(ip)

  if (ipData) {
    if (now - ipData.lastRequest > 60000) {
      chatIpLimits.set(ip, { count: 1, lastRequest: now })
    } else {
      if (ipData.count >= MAX_CHAT_PER_MINUTE) {
         return { text: "Çok fazla mesaj gönderdiniz. Lütfen kısa bir süre bekleyip tekrar deneyin.", isWhatsAppReady: false }
      }
      ipData.count++
      ipData.lastRequest = now
    }
  } else {
    chatIpLimits.set(ip, { count: 1, lastRequest: now })
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("Critical: GEMINI_API_KEY is not defined in environment variables.")
      return { text: "Üzgünüm, şu an bağlantıda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.", isWhatsAppReady: false }
    }

    const ai = new GoogleGenAI({ apiKey })
    
    // Sistem Promptu (AI'ın Kişiliği ve Görevi)
    const systemInstruction = `Sen 'Temizişyapı' firmasının yetkili, profesyonel, kibar ve yardımsever sanal asistanısın. 
Hizmetlerimiz: Cam Balkon, Kış Bahçesi, PVC Doğrama, Alüminyum ve Cephe Sistemleri.

YANIT VERİRKEN ŞU KURALLARA KESİNLİKLE UY:
1. KISA VE ÖZ OL: Asla uzun uzun veya destan gibi paragraflar yazma. Yanıtların çok kısa ve okunması kolay olsun.
2. MADDELEME KULLAN: Okunaklılığı yüksek tutmak için maddeler halinde veya çok kısa, ayrı satırlar olarak cevap ver.
3. KİŞİYE ÖZEL 1 ÖRNEK VER: Müşterinin isteğine uygun olarak, onu motive edecek teknik veya tasarım odaklı tek bir örnek sun. (Örn: "Antrasit profil, modern balkonlarda çok şık durur.") Müşterinin profiline (lüks arayan, dayanıklılık isteyen vs.) göre bu örneği uyarla.
4. SORU SOR: Konuşmayı yönlendirmek için mesajının sonunda mutlaka müşteriye tek bir kısa soru sor (Örn: "Balkonunuz L tipi mi yoksa düz mü?").
5. WHATSAPP YÖNLENDİRMESİ: Müşterinin ne istediğini anladığında veya ölçüleri / rengi vb. aldığında, mesajının en sonuna sadece [WHATSAPP_READY] yaz ve onları WhatsApp uzmanına devret. Gerçek bir fiyat verme, uzmanımız keşif ve indirimli net fiyat için yazacaktır de.`

    // Gemini'nin beklediği formata dönüştür
    const formattedHistory = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))

    // Chat oturumu başlat (history ile)
    const chat = ai.chats.create({
      model: "gemini-2.5-flash-lite",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    })

    // Geçmişi ekle (Eğer ilk mesaj değilse)
    // Yeni SDK'da `ai.chats.create` içerisine `history` dizisi geçebiliyor.
    // Ancak daha güvenli yol `generateContent` veya chat metodudur.
    
    const requestContents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: newMessage }] }
    ]

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: requestContents as any, // Cast to any to bypass complex parts type checking for now
      config: {
        systemInstruction: systemInstruction,
      }
    })

    let reply = response.text || "Üzgünüm, şu an bağlantıda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin."
    let isWhatsAppReady = false

    // WhatsApp flag kontrolü
    if (reply.includes("[WHATSAPP_READY]")) {
      isWhatsAppReady = true
      reply = reply.replace("[WHATSAPP_READY]", "").trim()
    }

    return { text: reply, isWhatsAppReady }
  } catch (error) {
    console.error("Chat API Error:", error)
    return { text: "Sistemde kısa süreli bir yoğunluk var, lütfen birazdan tekrar deneyin.", isWhatsAppReady: false }
  }
}

// Sohbet bittiğinde, tüm konuşma geçmişini WhatsApp mesajı formatında özetleyen fonksiyon
export async function generateWhatsAppSummary(history: ChatMessage[]): Promise<string> {
  try {
    const historyText = history.map(msg => `${msg.role === 'user' ? 'Müşteri' : 'Asistan'}: ${msg.content}`).join('\n')
    
    // Konuşma geçmişini buluta (Firebase) yedekle/kaydet
    try {
      await addDoc(collection(db, "chat_transcripts"), {
        type: 'chatbot_conversation',
        transcript: historyText,
        date: serverTimestamp(),
        source: 'whatsapp_redirect',
        read: false
      });
      console.log("Chat transcript saved to Firebase.")
    } catch (dbError) {
      console.error("Firebase Database Yükleme Hatası (Chat):", dbError)
      // Veritabanı hatası olsa bile WhatsApp akışını bozmamak için fırlatmıyoruz
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("Critical: GEMINI_API_KEY is not defined in environment variables for Summary.")
      return "Merhaba, sitenizdeki asistanla konuştum ve detaylı bilgi/fiyat almak istiyorum."
    }

    const ai = new GoogleGenAI({ apiKey })
    
    const prompt = `Aşağıda bir müşteri ile sanal asistanımız arasında geçen konuşma geçmişi bulunmaktadır.
Müşteri şu anda WhatsApp iletişime geç butonuna bastı ve müşterinin telefonunda otomatik gönderilmek üzere hazır bir "İlk Mesaj" oluşturmamız gerekiyor.
DİKKAT: Bu mesajı bizzat *müşterinin ağzından* (birinci tekil şahıs) yaz. Müşteri bu metni okumadan direkt gönderebilecek kadar doğal olmalı.
Konuşma geçmişinden müşterinin ne istediğini, ölçülerini vb. ayıkla.

GEÇMİŞ:
${historyText}

MESAJ KURALLARI:
- Merhaba diyerek başla.
- Sitenizdeki asistanla konuştum de.
- İstediği hizmet ve ölçüleri/detayları net bir şekilde listele.
- Sonunda keşif/fiyat/bilgi talep et.
- Sadece oluşturduğun mesaj metnini ver, ekstra hiçbir açıklama veya yorum ekleme.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    })

    return response.text?.trim() || "Merhaba, sitenizdeki asistanla konuştum ve detaylı bilgi/fiyat almak istiyorum."

  } catch (error) {
    console.error("Summary API Error:", error)
    return "Merhaba, sitenizi inceledim ve hizmetleriniz hakkında bilgi/fiyat almak istiyorum."
  }
}
