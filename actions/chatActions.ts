"use server"
import { headers } from "next/headers"

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

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("Critical: GEMINI_API_KEY is not defined in environment variables.")
    return { text: "Üzgünüm, şu an bağlantıda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.", isWhatsAppReady: false }
  }

  // Sistem Promptu (AI'ın Kişiliği ve Görevi)
  const systemInstruction = `Sen 'Temizişyapı' firmasının yetkili, profesyonel, kibar ve yardımsever sanal asistanısın. 
Hizmetlerimiz: Cam Balkon, Kış Bahçesi, PVC Doğrama, Alüminyum ve Cephe Sistemleri.

YANIT VERİRKEN ŞU KURALLARA KESİNLİKLE UY:
1. KISA VE ÖZ OL: Asla uzun uzun veya destan gibi paragraflar yazma. Yanıtların çok kısa olsun.
2. OKUNAKLILIK: Her cevabını mutlaka MADDELEME veya SATIR ARALIKLARI (çift boşluk) kullanarak ferahlat. Önemli kelimeleri **kalın** yaz.
3. KİŞİYE ÖZEL 1 ÖRNEK VER: Müşterinin isteğine uygun teknik veya tasarım odaklı tek bir örnek sun (Örn: "**Antrasit profil**, modern balkonlarda çok şık durur.")
4. SORU SOR: Mesajının sonunda mutlaka müşteriye tek bir kısa soru sor (Örn: "Balkonunuz L tipi mi?").
5. WHATSAPP YÖNLENDİRMESİ: Müşteri bilgisi netleştiğinde en sona sadece [WHATSAPP_READY] yaz.`

  try {
    // Gemini'nin beklediği formata dönüştür (REST API için)
    const formattedHistory = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))

    const body = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: newMessage }] }
      ],
      generationConfig: { temperature: 0.7 }
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    )

    if (!res.ok) {
      const errText = await res.text()
      console.error("Gemini REST API Error:", res.status, errText)
      return { text: "Sistemde kısa süreli bir yoğunluk var, lütfen birazdan tekrar deneyin.", isWhatsAppReady: false }
    }

    const data = await res.json() as { candidates?: { content?: { parts?: { text: string }[] } }[] }
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || ""
    let isWhatsAppReady = false

    // WhatsApp flag kontrolü
    if (reply.includes("[WHATSAPP_READY]")) {
      isWhatsAppReady = true
      reply = reply.replace("[WHATSAPP_READY]", "").trim()
    }

    // Yapay gecikme (Daha doğal bir sohbet hissi için)
    await new Promise(resolve => setTimeout(resolve, 1200))

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

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("Critical: GEMINI_API_KEY is not defined in environment variables for Summary.")
      return "Merhaba, sitenizdeki asistanla konuştum ve detaylı bilgi/fiyat almak istiyorum."
    }

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

    const summaryRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
      }
    )

    if (!summaryRes.ok) {
      return "Merhaba, sitenizdeki asistanla konuştum ve detaylı bilgi/fiyat almak istiyorum."
    }

    const summaryData = await summaryRes.json() as { candidates?: { content?: { parts?: { text: string }[] } }[] }
    return summaryData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Merhaba, sitenizdeki asistanla konuştum ve detaylı bilgi/fiyat almak istiyorum."

  } catch (error) {
    console.error("Summary API Error:", error)
    return "Merhaba, sitenizi inceledim ve hizmetleriniz hakkında bilgi/fiyat almak istiyorum."
  }
}
