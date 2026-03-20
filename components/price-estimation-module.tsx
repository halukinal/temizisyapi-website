"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Calculator, ArrowRight, MessageCircle, Loader2 } from "lucide-react"
import { generateDesignSuggestion } from "@/actions/geminiActions"

export function PriceEstimationModule() {
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [shape, setShape] = useState("duz")
  const [systemType, setSystemType] = useState("cam-balkon")
  const [profileColor, setProfileColor] = useState("antrasit")
  const [glassColor, setGlassColor] = useState("fume")
  const [step, setStep] = useState<"form" | "result">("form")
  const [estimate, setEstimate] = useState<string | null>(null)
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (width && height) {
      setIsGenerating(true)
      let actualHeight = Math.max(1.6, parseFloat(height));
      let area = parseFloat(width) * actualHeight;
      
      // Balkon şekline göre ekstra girinti çıkıntı fire/fiyat farkı (Simülasyon)
      let shapeMultiplier = 1.0;
      if (shape === "l-tipi") shapeMultiplier = 1.1;
      if (shape === "u-tipi") shapeMultiplier = 1.2;
      if (shape === "ovali-acili") shapeMultiplier = 1.35;
      
      let basePriceTRY = 4500; // Standart ve cam balkon m2 fiyatı
      if (systemType === "giyotin") {
        basePriceTRY = 7000;
        if (area < 7) {
          area = 7;
        }
      }
      
      const total = area * basePriceTRY * shapeMultiplier;
      const formatted = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)
      setEstimate(formatted)

      const shapeNames: Record<string, string> = {
        "duz": "Düz Balkon", "l-tipi": "L Tipi Balkon", "u-tipi": "U Tipi Balkon", "ovali-acili": "Oval/Açılı Balkon"
      }
      const profileNames: Record<string, string> = {
        "antrasit": "Antrasit Gri", "siyah": "Mat Siyah", "beyaz": "Klasik Beyaz", "ahsap": "Ahşap Desenli"
      }
      const glassNames: Record<string, string> = {
        "fume": "Füme Cam", "seffaf": "Şeffaf Cam", "bronz": "Bronz Cam", "mavi": "Mavi Cam", "yesil": "Yeşil Cam"
      }

      // Yapay Zeka Uyum Önerisi çağırma (Gerçek Gemini API)
      const suggestion = await generateDesignSuggestion(
        shapeNames[shape] || shape,
        profileNames[profileColor] || profileColor,
        glassNames[glassColor] || glassColor
      );
      setAiSuggestion(suggestion);

      setIsGenerating(false)
      setStep("result")
    }
  }

  const getWhatsAppLink = () => {
    const shapeNames: Record<string, string> = {
      "duz": "Düz Balkon",
      "l-tipi": "L Tipi Balkon",
      "u-tipi": "U Tipi Balkon",
      "ovali-acili": "Oval/Açılı Balkon",
    }
    const profileNames: Record<string, string> = {
      "antrasit": "Antrasit Gri",
      "siyah": "Mat Siyah",
      "beyaz": "Klasik Beyaz",
      "ahsap": "Ahşap Desenli"
    }
    const glassNames: Record<string, string> = {
      "fume": "Füme Cam",
      "seffaf": "Şeffaf Cam",
      "bronz": "Bronz Cam",
      "mavi": "Mavi Cam",
      "yesil": "Yeşil Cam",
    }
    const systemNames: Record<string, string> = {
      "cam-balkon": "Cam Balkon",
      "giyotin": "Giyotin Cam Balkon"
    }

    const message = `Merhaba, sitenizdeki modül üzerinden hesaplama yaptım. Projemle ilgili detaylar aşağıdadır, yardımcı olabilir misiniz?\n\n` +
      `*Sistem Türü:* ${systemNames[systemType] || systemType}\n` +
      `*Ölçüler:* ${width}m Genişlik x ${height}m Yükseklik\n` +
      `*Balkon Şekli:* ${shapeNames[shape] || shape}\n` +
      `*Profil Tasarımı:* ${profileNames[profileColor] || profileColor}\n` +
      `*Cam Rengi:* ${glassNames[glassColor] || glassColor}\n` +
      `*Sistemden Çıkan Tahmini Bütçe:* ${estimate}\n\nDetaylı keşif için dönüşünüzü bekliyorum.`

    return `https://wa.me/905323882864?text=${encodeURIComponent(message)}`
  }

  return (
    <div id="fiyat-hesapla" className="w-full max-w-xl mx-auto my-16 scroll-mt-24">
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-background/80 backdrop-blur-xl text-card-foreground">
        <div className="bg-primary/5 p-1 border-b border-primary/10 flex items-center justify-center space-x-2 text-primary text-sm font-medium">
          <Bot className="w-4 h-4" />
          <span>Yapay Zeka Destekli Fiyat Tahmin Modülü</span>
        </div>
        
        {step === "form" ? (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-foreground flex items-center justify-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Hızlı Fiyat Hesapla
              </CardTitle>
              <CardDescription>
                Projeniz için tahmini fiyatı öğrenmek üzere ölçüleri ve hizmet türünü girin.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Net Genişlik (Metre)</Label>
                    <Input 
                      id="width" 
                      type="number" 
                      step="0.01"
                      placeholder="Örn: 3.5" 
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Yükseklik (Metre)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      step="0.01"
                      placeholder="Örn: 2.1" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemType">Sistem Türü</Label>
                  <Select value={systemType} onValueChange={setSystemType} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sistem türünü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cam-balkon">Cam Balkon</SelectItem>
                      <SelectItem value="giyotin">Giyotin Cam Balkon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shape">Balkon Şekli (Girinti/Köşe/Açı)</Label>
                  <Select value={shape} onValueChange={setShape} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Balkon şeklinizi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duz">Düz Balkon (Girinti/Çıkıntı Yok)</SelectItem>
                      <SelectItem value="l-tipi">L Tipi Balkon (1 Köşe)</SelectItem>
                      <SelectItem value="u-tipi">U Tipi Balkon (2 Köşe)</SelectItem>
                      <SelectItem value="ovali-acili">Oval veya Açılı Balkon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileColor">Alüminyum Profil</Label>
                    <Select value={profileColor} onValueChange={setProfileColor} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Profil Serisi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="antrasit">Antrasit Gri</SelectItem>
                        <SelectItem value="siyah">Mat Siyah</SelectItem>
                        <SelectItem value="beyaz">Klasik Beyaz</SelectItem>
                        <SelectItem value="ahsap">Ahşap Desenli</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="glassColor">Cam Rengi Seçimi</Label>
                    <Select value={glassColor} onValueChange={setGlassColor} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Profil Serisi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fume">Füme Cam</SelectItem>
                        <SelectItem value="seffaf">Şeffaf Cam</SelectItem>
                        <SelectItem value="bronz">Bronz Cam</SelectItem>
                        <SelectItem value="mavi">Mavi Cam</SelectItem>
                        <SelectItem value="yesil">Yeşil Cam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button disabled={isGenerating} type="submit" className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg font-semibold flex items-center justify-center gap-2 py-6 text-lg transition-transform hover:-translate-y-1">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Yapay Zeka Tasarım Asistanı Hesaplanıyor...
                    </>
                  ) : (
                    <>
                      Hesapla & Önerileri Gör
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center bg-primary/5">
              <CardTitle className="text-2xl font-serif text-primary">Tahmini Sonuç</CardTitle>
              <CardDescription>
                Girdiğiniz ölçülere göre yapay zeka destekli ortalama fiyat tahminimizdir.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 text-center space-y-6">
              <div className="inline-block bg-muted rounded-2xl p-6 border border-border shadow-inner">
                 <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide font-medium">Toplam Tahmini Tutar</p>
                 <p className="text-4xl font-bold text-foreground tracking-tight">{estimate}</p>
                 <p className="text-xs text-muted-foreground mt-2">*Güncel kura göre hesaplanmıştır. Net fiyat keşif sonrası belirlenir.</p>
              </div>

              {aiSuggestion && (
                <div className="mb-4 p-5 rounded-2xl relative border-0 shadow-lg text-left flex items-start space-x-4 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <div className="bg-orange-500/20 p-2 rounded-xl flex-shrink-0">
                    <Bot className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-1 flex items-center gap-2">
                      <span className="animate-pulse w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span> AI Tasarım Asistanı
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-slate-200">{aiSuggestion}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-foreground/80 font-medium">
                  Net fiyat ve detaylı keşif için uzman ekibimizle hemen tanışın!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center" 
                    asChild
                  >
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp'tan Yazın
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => setStep("form")}
                  >
                    Yeniden Hesapla
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  Hesaplama detayları ve seans verileri hizmet kalitesi analizi için kayıt altına alınmaktadır.
                </p>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
