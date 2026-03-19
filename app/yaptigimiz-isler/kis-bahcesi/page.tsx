import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Coffee, Trees, Sun, Snowflake, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function KisBahcesiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 z-0">
            <img 
              src="/winter-garden-cozy-interior.jpg" 
              alt="Huzurlu Kış Bahçesi İç Mekanı" 
              className="w-full h-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-semibold tracking-wider uppercase">
                Dört Mevsim Yaşam Alanı
              </span>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                Kış Bahçesi Sistemleri ile Evinize Değer Katın
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-light text-pretty">
                Yağmurun sesi, karın beyazlığı ya da yazın canlı güneşi... Yüksek kaliteli alüminyum ve cam 
                çatı tavan sistemlerimiz sayesinde, bahçenizin keyfini sıcak kahvenizi yudumlarken dört mevsim çıkarın.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-semibold px-8" asChild>
                  <Link href="/iletisim?service=kis-bahcesi">Ücretsiz Keşif Talebi</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full font-semibold px-8 bg-transparent" asChild>
                  <Link href="#huzur">Konsept Tasarımlar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Marketing Section */}
        <section id="huzur" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4 tracking-tight">Evinizin Yeni Soluğu Eğlence Odası</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Estetik mimariyle yüksek yalıtımın en şık buluşması. Kış bahçeniz; hobileriniz, bitkileriniz, 
                aileniz ve kahvaltılarınız için evdeki tartışmasız en gözde yer olacak.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-950/50 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                  <Sun className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Gün Işığını Maksimize Edin</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Şeffaf cam kaplı tavanlar sayesinde doğal ışıktan gün boyu tamamen faydalanır, evinizin en aydınlık köşesini kurgularsınız.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                  <Snowflake className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Cam Balkonla Tam Yalıtım</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  İster tamamen ısıcamlı katlanır mekanizmalar, ister sürgülü modeller. Kenarlar kapatıldığında fırtınaya, rüzgara ve kara karşı ev sıcaklığında.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
                  <Trees className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Doğayla Bütünleşme</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yaz aylarında tamamen açılan sistemlerimiz sayesinde doğayla iç içe kalın, bitkilerinizin gün ışığı ve hava ihtiyacını fazlasıyla sağlayın.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-muted/40 border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-950/50 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Coffee className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Premium Konfor Lüksü</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Su taşıtma kanalları, gizli oluk çözümleri ve aydınlatma entegrasyonu profil hatları sayesinde çirkin hiçbir detay gözünüze takılmaz.
                </p>
              </div>
            </div>

            <div className="mt-16 bg-muted rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="max-w-xl space-y-4">
                <h3 className="text-3xl font-bold font-serif text-foreground">Kendinize Özel Kış Bahçesi Maliyeti Hesaplamak İster misiniz?</h3>
                <p className="text-muted-foreground">Yapay Zeka modülümüzü kullanarak saniyeler içinde anında tahmini fiyat alabilir ve size en uygun seçenekleri görebilirsiniz.</p>
              </div>
              <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 whitespace-nowrap px-8" asChild>
                <Link href="/yaptigimiz-isler/cam-balkon#fiyat-hesapla">
                  Yapay Zeka Asistanı ile Hesapla <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
