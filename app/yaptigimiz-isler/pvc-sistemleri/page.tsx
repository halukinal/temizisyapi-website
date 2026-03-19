import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Zap, Droplets, Volume2, ThermometerSun } from "lucide-react"
import Link from "next/link"

export default function PvcSistemleriPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 z-0">
            <img 
              src="/pvc-window-installation-modern-home.jpg" 
              alt="PVC Kapı ve Pencere" 
              className="w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-orange-400 border border-orange-500/30 text-sm font-semibold tracking-wider uppercase">
                Enerji & Tasarruf Odaklı
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                PVC Kapı ve Pencere Sistemleri
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-light text-pretty">
                Üstün ısı yalıtımı ve akustik performansıyla evinizi soğuk kış günlerinden ve trafik gürültüsünden tamamen kopartır. Faturalarınız düşerken yaşam kaliteniz artar.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-semibold px-8" asChild>
                  <Link href="/iletisim?service=pvc-systems">Hemen Fiyat Teklifi Alın</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full font-semibold px-8 bg-transparent" asChild>
                  <Link href="#ozellikler">Neden PVC?</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Marketing Section */}
        <section id="ozellikler" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-tight">Yeni Nesil PVC Sistemlerinin Faydaları</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Sağlamlığı kanıtlanmış Alman teknolojisi profillerimiz ile evlerinize yepyeni bir hava ve tartışılmaz bir konfor getiriyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-950/50 rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform">
                  <ThermometerSun className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Kusursuz Isı Yalıtımı</h3>
                <p className="text-muted-foreground leading-relaxed">
                  İçerisindeki çok odacıklı özel profil tasarımı sayesinde dışarıdaki dondurucu soğuğun veya kavurucu sıcak havanın evinize sızmasını engeller. Enerji sınıfınızı yükseltir.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Tasarruf Garantisi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Doğru PVC ve ısıcam yatırımı ile doğalgaz kullanımında kış aylarında %30'a varan enerji tasarrufu sağlar. Kısa vadede kendi kendini amorti eden en akıllı tadilattır.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 transition-transform">
                  <Volume2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Akustik Yalıtım (Ses Kesici)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Çift contalı sistemleri ve lamine dış cam seçenekleri sayesinde caddedeki taşıt gürültüsünü, çocuk parklarının sesini dışarıda, evinizin huzurunu ise içeride tutar.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                  <Droplets className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Su ve Rüzgar Geçirmez TPE Conta</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Şiddetli fırtınalarda, yağışın direkt camınıza vurduğu durumlarda dahi evinizin içerisine tek bir damla dahi yağmur sızmaz. Eşyalarınız ve duvarlarınız güvende kalır.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group lg:col-span-2">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/50 rounded-2xl flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Üst Düzey Hırsızlık Güvenliği</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tamamı çelik takviye saclarıyla güçlendirilmiş profiller, mantar başlı çok noktalı kilit sistemleri sayesinde dışarıdan yetkisiz girişimi ve kanırtılarak açılmayı (levye etkisini) tamamen imkansız hale getirir. Size sadece güvenle uyumak kalır.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
