import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "pvc-systems",
      title: "PVC Kapı ve Pencere Sistemleri",
      description:
        "Enerji verimliliği yüksek, estetik ve uzun ömürlü PVC kapı ve pencere sistemleri ile yaşam konforunuzu artırıyoruz.",
      features: [
        "Yüksek ısı ve ses yalıtımı",
        "Enerji tasarrufu sağlayan cam teknolojisi",
        "Çok noktalı kilit sistemleri",
        "UV dayanımlı profil yapısı",
        "Kolay bakım ve temizlik",
        "10 yıl garanti",
      ],
      specifications: [
        "Profil Kalınlığı: 70mm - 82mm",
        "Cam Kalınlığı: 24mm - 32mm",
        "Hava Geçirgenliği: Sınıf 4",
        "Su Geçirgenliği: Sınıf 9A",
        "Rüzgar Yükü Dayanımı: Sınıf C5",
      ],
      images: [
        "/pvc-window-installation-modern-home.jpg",
        "/pvc-door-system-energy-efficient.jpg",
        "/pvc-balcony-door-installation.jpg",
      ],
    },
    {
      id: "aluminum-systems",
      title: "Alüminyum Doğrama Sistemleri",
      description:
        "Modern mimariye uygun, dayanıklı ve estetik alüminyum kapı, pencere ve cephe sistemleri ile projelerinize değer katıyoruz.",
      features: [
        "Yüksek dayanıklılık ve uzun ömür",
        "Korozyona karşı direnç",
        "Geniş renk ve doku seçenekleri",
        "Minimal çerçeve tasarımı",
        "Büyük açıklık imkanları",
        "Yangına dayanıklılık",
      ],
      specifications: [
        "Profil Kalınlığı: 50mm - 85mm",
        "Cam Kalınlığı: 24mm - 44mm",
        "Termal Kesim: Evet",
        "Hava Geçirgenliği: Sınıf 4",
        "Su Geçirgenliği: Sınıf E1050",
      ],
      images: [
        "/aluminum-window-modern-building.jpg",
        "/aluminum-curtain-wall-installation.jpg",
        "/aluminum-sliding-door-system.jpg",
      ],
    },
    {
      id: "glass-balcony",
      title: "Cam Balkon Sistemleri",
      description:
        "Balkonlarınızı dört mevsim kullanılabilir, ferah ve şık yaşam alanlarına dönüştüren cam balkon çözümleri sunuyoruz.",
      features: [
        "Dört mevsim kullanım imkanı",
        "Hava koşullarından tam korunma",
        "Kolay açılır-kapanır sistem",
        "Tempered güvenlik camı",
        "Paslanmaz çelik aksesuar",
        "Estetik görünüm",
      ],
      specifications: [
        "Cam Kalınlığı: 8mm Tempered",
        "Profil: Alüminyum",
        "Açılım Türü: Sürme/Katlanır",
        "Rüzgar Dayanımı: 120 km/h",
        "Renk Seçenekleri: RAL Kataloğu",
      ],
      images: [
        "/glass-balcony-modern-apartment.jpg",
        "/glass-balcony-folding-system.jpg",
        "/glass-balcony-panoramic-view.jpg",
      ],
    },
    {
      id: "facade-systems",
      title: "Cephe Sistemleri",
      description:
        "Modern binaların cephe ihtiyaçlarına yönelik alüminyum kompozit, cam cephe ve ventile cephe sistemleri uyguluyoruz.",
      features: [
        "Enerji verimli cephe çözümleri",
        "Hava koşullarına dayanıklılık",
        "Estetik ve modern görünüm",
        "Yangın güvenliği",
        "Ses yalıtımı",
        "Kolay bakım",
      ],
      specifications: [
        "Sistem Türü: Stick/Unitize",
        "Cam Türü: Low-E, Lamine",
        "Profil: Termal Kesimli Alüminyum",
        "Yalıtım: Mineral Yün",
        "Sertifikalar: CE, TSE",
      ],
      images: [
        "/facade-system-modern-office.jpg",
        "/curtain-wall-glass-building.jpg",
        "/composite-facade-installation.jpg",
      ],
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
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">
                Yaptığımız İşler
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Alüminyum, cam ve PVC sektöründe geniş hizmet yelpazemiz ile her türlü projenize profesyonel çözümler
                sunuyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div key={service.id} className="space-y-8">
                  {/* Service Header */}
                  <div className="text-center max-w-3xl mx-auto">
                    <Badge variant="secondary" className="mb-4">
                      Hizmet {index + 1}
                    </Badge>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg text-pretty leading-relaxed">{service.description}</p>
                  </div>

                  {/* Service Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Features and Specifications */}
                    <div className="space-y-8">
                      {/* Features */}
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-serif text-xl font-semibold mb-4 text-primary">Özellikler</h3>
                          <ul className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start space-x-3">
                                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Technical Specifications */}
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-serif text-xl font-semibold mb-4 text-primary">Teknik Özellikler</h3>
                          <ul className="space-y-2">
                            {service.specifications.map((spec, specIndex) => (
                              <li key={specIndex} className="text-muted-foreground text-sm border-b border-border pb-2">
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                        Ücretsiz Keşif Talep Et
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    {/* Project Images */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl font-semibold text-primary">Proje Örnekleri</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {service.images.map((image, imageIndex) => (
                          <Card key={imageIndex} className="overflow-hidden group hover:shadow-lg transition-shadow">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${service.title} proje örneği ${imageIndex + 1}`}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  {index < services.length - 1 && <div className="border-t border-border pt-8" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
                Projeniz İçin Teklif Alın
              </h2>
              <p className="text-muted-foreground text-lg mb-8 text-pretty">
                Uzman ekibimiz ile ücretsiz keşif ve detaylı teklif için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  İletişime Geç
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Galeriyi İncele
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
