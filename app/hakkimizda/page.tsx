import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Users, Clock, Shield, Wrench } from "lucide-react"

export default function AboutPage() {
  const strengths = [
    {
      icon: Award,
      title: "Kaliteli Malzeme",
      description: "Sektörün lider markalarından temin ettiğimiz yüksek kaliteli malzemeler kullanıyoruz.",
    },
    {
      icon: Users,
      title: "Uzman Ekip",
      description: "Alanında deneyimli, sertifikalı ve sürekli eğitim alan profesyonel ekibimiz.",
    },
    {
      icon: Clock,
      title: "Zamanında Teslimat",
      description: "Belirlenen sürelere uygun, hızlı ve güvenilir proje teslimi garantisi.",
    },
    {
      icon: Shield,
      title: "Garanti ve Servis",
      description: "Tüm işlerimizde uzun süreli garanti ve satış sonrası destek hizmeti.",
    },
    {
      icon: CheckCircle,
      title: "Müşteri Memnuniyeti",
      description: "Her projede %100 müşteri memnuniyeti hedefiyle çalışıyoruz.",
    },
    {
      icon: Wrench,
      title: "Teknik Destek",
      description: "Proje öncesi ücretsiz keşif ve teknik danışmanlık hizmeti sunuyoruz.",
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
                20 yıllık tecrübemiz ve müşteri odaklı yaklaşımımızla alüminyum, cam ve PVC sektöründe güvenilir
                çözümler sunuyoruz.
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
                    1999'dan Beri Hizmetinizdeyiz
                  </Badge>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6 text-balance">
                    Temizişyapı Hikayesi
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    Temizişyapı olarak 1999 yılında kurulduğumuz günden bu yana, alüminyum doğrama, cam balkon ve PVC
                    kapı-pencere sistemleri alanında faaliyet göstermekteyiz. Sektördeki 20 yıllık deneyimimiz boyunca
                    binlerce projeyi başarıyla tamamladık.
                  </p>
                  <p className="text-pretty">
                    Misyonumuz, müşterilerimizin yaşam kalitesini artıracak, enerji verimliliği yüksek ve estetik
                    çözümler sunmaktır. Vizyonumuz ise Türkiye'nin önde gelen alüminyum, cam ve PVC çözümleri firması
                    olmaktır.
                  </p>
                  <p className="text-pretty">
                    Kalite, güvenilirlik ve müşteri memnuniyeti temel değerlerimizdir. Her projede bu değerleri ön
                    planda tutarak, sektörde fark yaratan işler çıkarıyoruz.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">20+</div>
                    <div className="text-sm text-muted-foreground">Yıllık Tecrübe</div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <Card className="overflow-hidden">
                  <img
                    src="/company-building-and-workshop-exterior.jpg"
                    alt="Temizişyapı fabrika ve ofis binası"
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
                Neden Temizişyapı?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Sektördeki deneyimimiz ve kalite anlayışımızla size en iyi hizmeti sunmak için çalışıyoruz.
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

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 text-balance">Değerlerimiz</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-primary">Kalite</h3>
                  <p className="text-muted-foreground text-pretty">
                    Her projede en yüksek kalite standartlarını uygulayarak, uzun ömürlü ve güvenilir çözümler
                    sunuyoruz.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-primary">Güvenilirlik</h3>
                  <p className="text-muted-foreground text-pretty">
                    Sözümüzü tutmak ve müşterilerimizin güvenini kazanmak en önemli önceliğimizdir.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-primary">İnovasyon</h3>
                  <p className="text-muted-foreground text-pretty">
                    Sektördeki yenilikleri takip ederek, en modern teknolojileri projelerimizde kullanıyoruz.
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
