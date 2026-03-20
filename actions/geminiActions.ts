"use server"

import { GoogleGenAI } from "@google/genai"
import { headers } from "next/headers"

// Sunucu belleğinde tutulan basit bir koruma mekanizması (Global singleton)
interface RateLimitData {
  count: number;
  lastReset: string;
}

interface IPRateLimitData {
  count: number;
  lastRequest: number;
}

const GLOBAL_LIMIT = {
  count: 0,
  lastReset: new Date().toDateString(),
  MAX_PER_DAY: 1450 // 1500 kotası dolmadan koruma payı bırakıyoruz
}

// IP tabanlı spam koruması için geçici hafıza
const ipLimits = new Map<string, IPRateLimitData>();
const MAX_PER_IP_MINUTE = 5; // Aynı kişi dakikada en fazla 5 kez fiyat hesaplayabilir

export async function generateDesignSuggestion(
  shapeName: string,
  profileColorName: string,
  glassColorName: string
): Promise<string> {
  // 1. GÜNLÜK TOPLAM LİMİT KONTROLÜ
  const today = new Date().toDateString()
  if (GLOBAL_LIMIT.lastReset !== today) {
    GLOBAL_LIMIT.count = 0
    GLOBAL_LIMIT.lastReset = today
  }

  if (GLOBAL_LIMIT.count >= GLOBAL_LIMIT.MAX_PER_DAY) {
    console.warn("Gemini Günlük API Kotası Önlemi Devrede! İstek durduruldu.")
    return "Harika bir kombinasyon. Size özel bu seçim projenizde estetik bir fark yaratacaktır."
  }

  // 2. IP TABANLI SPAM KONTROLÜ (Bot/Saldırı Koruması)
  const ip = headers().get("x-forwarded-for") || "unknown_ip"
  const now = Date.now()
  const ipData = ipLimits.get(ip)

  if (ipData) {
    // 1 dakikadan fazla geçmişse IP sayacını sıfırla
    if (now - ipData.lastRequest > 60000) {
      ipLimits.set(ip, { count: 1, lastRequest: now })
    } else {
      if (ipData.count >= MAX_PER_IP_MINUTE) {
         console.warn(`Spam Algılandı: ${ip} adlı kullanıcı 1 dakikada çok fazla hesaplama isteği yolladı.`)
         return "Çok iyi bir renk tercihi. Projenize farklılık ve hava katacaktır."
      }
      ipData.count++
      ipData.lastRequest = now
    }
  } else {
    ipLimits.set(ip, { count: 1, lastRequest: now })
  }

  // 3. GEMINI API İSTEĞİ
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("Critical: GEMINI_API_KEY is not defined in environment variables.")
      return "Güzel bir kombinasyon. Size özel bu renk seçimi ile projeniz farklılığını ortaya koyacaktır."
    }

    const ai = new GoogleGenAI({ apiKey })
    GLOBAL_LIMIT.count++ // API'ye gidecek isteği say
    
    const prompt = `Sen 'Temizişyapı' firmasının yetkili satış asistanı ve yapı/mimari uzmanı bir yapay zeka tasarımcısısın.
Bir müşteri sitemizdeki modülü kullanarak şu seçimleri yaptı:
- Balkon/Yapı Şekli: ${shapeName}
- Profil Rengi: ${profileColorName}
- Cam Rengi: ${glassColorName}

Lütfen bu müşteri için, bu renklerin ve şeklin uyumu hakkında kibar, sofistike ve profesyonel bir tasarımsal tavsiye (veya iltifat) yaz.
Mesaj en fazla 2 veya 3 kısa cümleden oluşmalı. Çok samimi ("Harika seçim dostum" gibi) OLMAYAN ama güven veren ("Bu renk kombinasyonu modern mimaride çok tercih edilir" minvalinde) bir dil kullan. Sonunda onları net fiyat teklifi ve detaylı keşif için bize ulaşmaya davet et. Markamızı veya iletişim bilgilerini içeren klasik bir son ekleme, çünkü bu metni sadece ufak bir bilgi kartında göstereceğiz. Sadece yoruma odaklan.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    })

    return response.text || "Güzel bir kombinasyon. Size özel bu renk seçimi ile projeniz farklılığını ortaya koyacaktır."
  } catch (error) {
    console.error("Gemini API Error details:", error)
    return "Güzel bir kombinasyon. Size özel bu renk seçimi ile projeniz farklılığını ortaya koyacaktır."
  }
}
