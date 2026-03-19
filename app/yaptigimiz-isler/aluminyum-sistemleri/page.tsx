import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BoxSelect, Infinity, Leaf, Droplets, PaintRoller, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alüminyum Doğrama Sistemleri | Temizişyapı Bursa",
  description: "Bursa alüminyum doğrama, pencere ve kapı sistemleri imalatı. Yüksek kaliteli, uzun ömürlü ve modern alüminyum çözümler.",
}

export default function AluminyumSistemleriPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 z-0">
            <img 
              src="/aluminum-window-modern-building.jpg" 
              alt="Alüminyum Doğrama Mimari" 
              className="w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-orange-400 border border-orange-500/30 text-sm font-semibold tracking-wider uppercase">
                Uzun Ömürlü, Minimal İstetik
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                Alüminyum Doğrama Sistemleri
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-light text-pretty">
                İster modern bir villa manzarası büyük vitrinler, ister plaza ofisleri olsun; 
                Sınırsız rek seçeneği, son derece ince ve zarif profilleriyle alüminyum mimari sınırları zorluyor.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-semibold px-8" asChild>
                  <Link href="/iletisim?service=aluminum-systems">Fiyat Teklifi Al</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full font-semibold px-8 bg-transparent" asChild>
                  <Link href="#ozellikler">Teknik Üstünlükleri İncele</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Marketing Section */}
        <section id="ozellikler" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-tight">Eşsiz Mimari İçin Alüminyum</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Ev veya ofisinize asırlık ömrüyle modern bir değer katmak istiyorsanız, metalik dayanıklılığı zarafetle buluşturan alüminyumu seçin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-zinc-600 dark:text-zinc-300 group-hover:scale-110 transition-transform">
                  <Infinity className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Asırlık Ömür, Paslanmazlık</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Alüminyum ham maddesinden doğan bir özellik olarak paslanmaz ve çürümez. İklim ne kadar zorlu olursa olsun; yıllarca ilk günkü zarafetini milimetrik şaşmadan korur.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                  <BoxSelect className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Geniş Camlar, İnce Çerçeveler</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Metal yorgunluğu olmaksızın devasa ağırlıklardaki büyük yalıtımlı cam panellerini rahatlıkla taşıyabilir. Bu da çok daha az plastik alan, çok daha geniş manzara ufku demektir.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center mb-6 text-rose-500 group-hover:scale-110 transition-transform">
                  <PaintRoller className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Sınırsız Renk Seçeneği (RAL)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Anodik oksidasyon veya fırın mat/parlak lak ile boyanabilen alüminyum; hayalinizdeki her renge veya özel ahşap meşe desenlerine kolaylıkla boyanarak mekana kusursuz entegre olur.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                  <Leaf className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">%100 Çevreci Geri Dönüşüm</h3>
                <p className="text-muted-foreground leading-relaxed">
                  %100 geri dönüştürülebilir çevre dostu ve uluslararası standartlara uygun profiller kullanıyoruz.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group lg:col-span-2">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Termal Kesim "Isı Yalıtımlı" Profil</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Eskiden metal soğuk geçirir diye bilinen efsaneyi kırıyoruz! "Termal bariyer" poliüretan köprüler sayesinde, iç cephenizdeki alüminyum ve dış cephenizdeki alüminyum metali birbirinden tamamen ayrılmıştır. Yoğuşma ve ısı kaybını sıfırlayarak dışarıdaki sert kışı içeri taşımaz.
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
