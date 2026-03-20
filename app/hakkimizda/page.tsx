// app/hakkimizda/page.tsx (Yeni ve Tam Hali)

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Clock, Shield, Sparkles, CheckCircle, Calendar, TrendingUp } from "lucide-react"
import type { Metadata } from "next";

// SEO Bilgileri
export const metadata: Metadata = {
  title: "Hakkımızda | 48 Yıllık Deneyim | Temizişyapı Bursa",
  description: "1976'dan bugüne, 48 yıllık köklü geçmişimizle Bursa'da alüminyum, cam balkon ve PVC sistemlerinde öncü çözümler sunuyoruz. Kalite ve güvenin adresi Temizişyapı.",
};

export default function AboutPage() {
  const strengths = [
    {
      icon: Award,
      title: "Kaliteli İşçilik",
      description: "Her projede yüksek kalite standartlarımızı koruyarak, beklentilerin ötesine geçiyoruz.",
    },
    {
      icon: Clock,
      title: "Zamanında Teslimat",
      description: "Projelerimizi her zaman söz verdiğimiz ve planladığımız sürede tamamlıyoruz.",
    },
    {
      icon: Sparkles,
      title: "Dayanıklı ve Estetik Çözümler",
      description: "Hem uzun ömürlü ve sağlam, hem de modern ve estetik tasarımlar sunuyoruz.",
    },
    {
      icon: Shield,
      title: "Güvenilir Hizmet",
      description: "Müşterilerimizle şeffaflığa dayalı, uzun vadeli ilişkiler kurarak güven sağlıyoruz.",
    },
    {
      icon: CheckCircle,
      title: "Müşteri Memnuniyeti",
      description: "Müşteri taleplerini en iyi şekilde anlayarak onlara en uygun ve etkili çözümleri üretiyoruz.",
    },
    {
      icon: Users,
      title: "Yarım Asra Yakın Deneyim",
      description: "1976'dan bugüne sektörde edindiğimiz tecrübeyle projelerinize değer katıyoruz.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Enhanced Emphasis */}
        <section className="relative py-24 overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-primary text-primary px-4 py-1 text-sm uppercase tracking-widest font-bold">
                1976'dan Bugüne Güvenle
              </Badge>
              <h1 className="font-sans text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
                <span className="text-white">48 Yıllık</span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  Ustalık ve Deneyim
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
                Yarım asra yaklaşan geçmişimizle, Bursa'nın yapı sektöründeki en köklü ve güvenilir ismi olmanın gururunu yaşıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Counter & Legacy Section */}
        <section className="py-20 relative bg-white dark:bg-slate-900 border-y border-border overflow-hidden">
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Bir Nesilden Diğerine <br/>
                    <span className="text-primary italic">Kalitenin Adresi</span>
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    1976 yılında temelleri atılan Temizişyapı, kurulduğu günden bugüne "dürüst esnaflık" ve "kusursuz işçilik" ilkelerinden ödün vermeden büyümeye devam etmektedir. 
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all hover:shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">Kuruluş</span>
                    </div>
                    <div className="text-4xl font-black text-primary">1976</div>
                    <p className="text-sm text-slate-500 mt-2 italic">Sektördeki ilk adımımız</p>
                  </div>

                  <div className="p-6 bg-orange-600 rounded-2xl text-white shadow-xl shadow-orange-600/20 transform hover:-translate-y-1 transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <span className="font-bold uppercase text-xs tracking-wider">Deneyim</span>
                    </div>
                    <div className="text-4xl font-black">48 YIL</div>
                    <p className="text-sm text-orange-100 mt-2">Kesintisiz hizmet süresi</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="/professional-construction-team-installing-aluminum.jpg"
                      alt="Temizişyapı 48 Yıllık Deneyim"
                      className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center space-x-4">
                         <div className="w-16 h-1 bg-primary rounded-full" />
                         <p className="text-white font-medium text-lg uppercase tracking-wide">Kalite Bir Tesadüf Değil, 48 Yıllık Bir Birikimdir.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values / Why Choose Us */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
                Neden Temizişyapı?
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
                1976'dan bugüne bizi Bursa'nın en çok tercih edilen firmalarından biri yapan değerlerimiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strengths.map((strength, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-card/50 backdrop-blur-sm group overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full transition-all group-hover:scale-150 duration-700" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <strength.icon className="h-8 w-8 transition-transform group-hover:rotate-12" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{strength.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">{strength.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Footer on About Page */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-8 border-white rounded-full" />
            <div className="absolute bottom-20 right-20 w-64 h-64 border-12 border-white rounded-full" />
          </div>
          <div className="container relative mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Geleceği Birlikte İnşa Edelim</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              1976'da başlayan bu yolculukta, sizin projelerinize de 48 yıllık tecrübemizi yansıtmaktan mutluluk duyarız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-white border-white bg-white/10 px-6 py-2 text-lg">
                48 Yıllık Güven
              </Badge>
              <Badge variant="outline" className="text-white border-white bg-white/10 px-6 py-2 text-lg">
                1976'dan Beri
              </Badge>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}