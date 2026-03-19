import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Factory, TrendingUp, Presentation, ShieldPlus } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alüminyum Cephe Sistemleri | Temizişyapı Bursa",
  description: "Bursa alüminyum dış cephe kaplama, silikon ve kompozit panel cephe sistemleri. Estetik ve dayanıklı dış cephe çözümleri.",
}

export default function CepheSistemleriPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 z-0">
            <img 
              src="/facade-system-modern-office.jpg" 
              alt="Dış Cephe Sistemleri ve Prestij" 
              className="w-full h-full object-cover opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 text-blue-300 border border-blue-500/50 text-sm font-semibold tracking-wider uppercase">
                Mimari Prestij Çözümü
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                Kurumsal Cephe ve Kompozit Sistemleri
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-light text-pretty">
                Binanızın karakteri sizin vizyonunuzu yansıtır. Temizişyapı, cam ve alüminyumun göz alıcı ahengini kullanarak otel, ofis ve residanslarınıza prestijli bir kimlik kazandırıyor.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-semibold px-8" asChild>
                  <Link href="/iletisim?service=facade-systems">Kurumsal Keşif Talebi</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full font-semibold px-8 bg-transparent" asChild>
                  <Link href="#ozellikler">Sistem Özellikleri</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Marketing Section */}
        <section id="ozellikler" className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-tight">Kusursuz Mühendislik, Estetik Dış Cephe</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Silikon giydirme, yarı kapaklı panel sistemleri veya kompozit paneller ile binalara hem yalıtım hediye ediyor hem de prestij katıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-background border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 transition-transform">
                  <Presentation className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Prestij ve Görsel Vurgu</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Binanın dış yüzeyindeki şeffaf cam yansıması, markanızın kurumsal prestijine modern bir "wow" efekti katar. Ticari değeri doğrudan arttırır.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-background border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex items-start space-x-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center flex-shrink-0 text-emerald-600 transition-transform">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">A Enerji Sınıfı Cephesi</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Arkasındaki özel taşyünü katmanlar ve iklim kontrollü reflekte ısıcamlar ile, devasa camekanlı binalar seraya dönüşmeden serin ve izole kalabilmektedir.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-background border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex items-start space-x-6">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 rounded-2xl flex items-center justify-center flex-shrink-0 text-amber-600 transition-transform">
                  <ShieldPlus className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Güvenlik ve Yangın Dayanımı</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    TS EN standartlarında yangın geciktirici A1, A2, ve B1 sınıfı kompozit materyallerimiz ve statik mühendisliği özel hesaplanan rüzgar yükü hesaplarıyla binanız tüm risklere karşı donatılır.
                  </p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-background border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center flex-shrink-0 text-purple-600 transition-transform">
                  <Factory className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Hızlı ve Temiz Montaj (Unitize)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Panel bazlı (Panel/Unitize) modüller fabrikasyon olarak hazırlanıp, şantiyenizde Lego hassasiyeti ve hızında montajlanır. Şantiye süresi geleneksel yapılara göre dörtte bir oranında düşer.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
