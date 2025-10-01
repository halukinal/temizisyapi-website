// app/hakkimizda/page.tsx (Yeni ve Tam Hali)

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Clock, Shield, Sparkles, CheckCircle } from "lucide-react"
import type { Metadata } from "next";

// SEO Bilgileri
export const metadata: Metadata = {
  title: "Hakkımızda | Temiz İş Yapı",
  description: "1976'dan bugüne 48 yıllık deneyimle inşaat ve yapı sektöründe kaliteli işçilik, estetik tasarımlar ve müşteri odaklı yaklaşım sunuyoruz.",
};

export default function AboutPage() {
  // Dokümandan gelen "Neden Bizi Tercih Etmelisiniz?" maddeleri
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
      title: "48 Yıllık Deneyim",
      description: "1976'dan bugüne sektörde edindiğimiz tecrübeyle projelerinize değer katıyoruz.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Hakkımızda</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                48 yıllık deneyim, kaliteli işçilik ve müşteri odaklı yaklaşımımızla yaşam alanlarınıza değer katıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Company Profile */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    1976'dan Beri Hizmetinizdeyiz
                  </Badge>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6 text-balance">
                    Temizişyapı'nın Hikayesi
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    1976 yılından bu yana sektörde faaliyet gösteren Temiz İş Yapı, 48 yıllık deneyimiyle inşaat ve yapı sektöründe hizmet vermektedir. Kaliteli işçilik, estetik tasarımlar ve müşteri odaklı yaklaşımı bir araya getirerek yaşam alanlarına değer katmayı hedefliyoruz.
                  </p>
                  <p className="text-pretty">
                    Misyonumuz, estetik, dayanıklılık ve işlevselliği birleştiren yenilikçi çözümlerle projeleri hayata geçirmektir. Her bir projede, müşterilerimizin beklentilerini aşan sonuçlar elde etmek için titizlikle çalışıyoruz.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Memnun Müşteri</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">48</div>
                    <div className="text-sm text-muted-foreground">Yıllık Tecrübe</div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <Card className="overflow-hidden">
                  <img
                    src="/professional-construction-team-installing-aluminum.jpg"
                    alt="Temizişyapı ekibi alüminyum montajı yaparken"
                    className="w-full h-[500px] object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Sektördeki derin tecrübemiz ve kalite anlayışımızla projeleriniz için en doğru partneriz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strengths.map((strength, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <strength.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-lg mb-2 text-balance">{strength.title}</h3>
                        <p className="text-muted-foreground text-sm text-pretty">{strength.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}