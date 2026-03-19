import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PriceEstimationModule } from "@/components/price-estimation-module"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Snowflake, Sun, VolumeX, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CamBalkonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 z-0">
            <img 
              src="/glass-balcony-panoramic-view.jpg" 
              alt="Cam Balkon Manzara" 
              className="w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-orange-400 border border-orange-500/30 text-sm font-semibold tracking-wider">
                PREMIUM YAŞAM ALANLARI
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                Balkonunuzda Dört Mevsim Kesintisiz Özgürlük
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-light text-pretty">
                Estetik, yalıtım ve konforu bir araya getiren yeni nesil cam balkon sistemlerimizle 
                evinizin mimarisine değer katın. Manzaranızı kapatmadan kötü hava şartlarından korunun.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-semibold px-8" asChild>
                  <Link href="#fiyat-hesapla">Yapay Zeka Fiyat Hesapla</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full font-semibold px-8 bg-transparent" asChild>
                  <Link href="#ozellikler">Faydaları İncele</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Marketing Section */}
        <section id="ozellikler" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-tight">Neden Cam Balkon Yaptırmalısınız?</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Standart bir balkonu evin en değerli ve sık kullanılan odalarından birine dönüştürmenin 
                arkasındaki mühendislik ve tasarım avantajları.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Sun className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Dört Mevsim Kullanım</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yağmur, kar, rüzgar veya kavurucu sıcaklar... Cam balkonlarımız balkonunuzu dış faktörlerden 
                  tamamen yalıtarak size 365 gün kullanılabilir, konforlu bir ekstra oda kazandırır.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                  <Snowflake className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Üstün Isı Yalıtımı</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Özel fitil tasarımları ve opsiyonel ısıcam seçenekleri ile evinize soğuk hava girmesini engeller. 
                  Bu sayede evinizin genel ısı kaybı azalır ve doğalgaz/elektrik faturalarınızda tasarruf edersiniz.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                  <VolumeX className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Sessiz Bir Yaşam</h3>
                <p className="text-muted-foreground leading-relaxed">
                  8mm ve 10mm güçlendirilmiş temperli camlar sayesinde cadde gürültüsünü, korna ve motor seslerini 
                  büyük ölçüde keserek evinizde sessiz, huzurlu bir dinlenme ortamı yaratır.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Maksimum Güvenlik</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kırılmaya karşı standart camlardan 5 kat daha dayanıklı temperli cam panelleri, hırsızlık
                  ve kazalara karşı çocuklu aileler için ek güvenlik bariyeri sunar.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center mb-6 text-rose-500 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Kolay Temizlik ve Bakım</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Katlanır cam sistemlerinin her paneli içe doğru tamamen katlanabilir. Böylece dışarı sarkmadan, 
                  hayatınızı tehlikeye atmadan camlarınızın iki yüzeyini de güvenle silebilirsiniz.
                </p>
              </div>

               {/* Add AI Module Context Tile */}
               <div className="bg-gradient-to-br from-primary to-orange-400 rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg shadow-primary/20">
                <div>
                  <h3 className="text-2xl font-bold mb-3 font-serif">Kendi Projenizi Hesaplayın</h3>
                  <p className="text-white/90 leading-relaxed font-light mb-6">
                    Balkon ölçülerinizi ve hayalinizdeki renkleri seçin, yapay zeka destekli modülümüz 
                    size saniyeler içerisinde estetik tavsiyesi ve ortalama bir fiyat tablosu çıkarsın.
                  </p>
                </div>
                <Button variant="secondary" className="w-fit bg-white text-primary hover:bg-slate-100 rounded-full font-bold" asChild>
                  <Link href="#fiyat-hesapla">
                     Fiyat Hesaplayıcıya İnin <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Price Module Section */}
        <section className="py-24 bg-muted/30 relative">
          <div className="absolute inset-0 bg-grid-slate-200/20 dark:bg-grid-slate-800/20 bg-[center_top] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Akıllı Fiyat Tahmin ve Tasarım Modülü
              </h2>
              <p className="text-muted-foreground text-lg">
                Yapay zeka asistanımız balkonunuz için sadece fiyat çıkarmakla kalmaz, seçeceğiniz renklere göre
                uzman tasarım tavsiyelerinde de bulunur.
              </p>
            </div>

            <PriceEstimationModule />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
