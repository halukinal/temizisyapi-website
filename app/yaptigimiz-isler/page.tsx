import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Activity, Zap, ShieldCheck, Wrench, Shield, Droplets } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: "pvc-systems",
      title: "PVC Kapı ve Pencere Sistemleri",
      description:
        "Enerji verimliliği yüksek, estetik ve uzun ömürlü PVC kapı ve pencere sistemleri ile yaşam konforunuzu artırıyoruz. Modern teknoloji ürünü profillerimiz, hem ısı hem de ses yalıtımı konusunda üstün performans gösterir.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      features: [
        "Yüksek ısı ve ses yalıtımı",
        "Enerji tasarrufu sağlayan cam teknolojisi",
        "Çok noktalı kilit sistemleri ile üst düzey güvenlik",
        "UV dayanımlı sararmaz profil yapısı",
        "Kolay bakım ve temizlik imkanı",
        "10 yıl garanti güvencesi",
      ],
      specifications: [
        { label: "Profil Kalınlığı", value: "70mm - 82mm" },
        { label: "Cam Kalınlığı", value: "24mm - 32mm" },
        { label: "Hava Geçirgenliği", value: "Sınıf 4" },
        { label: "Su Geçirgenliği", value: "Sınıf 9A" },
        { label: "Rüzgar Yükü Dayanımı", value: "Sınıf C5" },
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
        "Modern mimariye uygun, dayanıklı ve estetik alüminyum kapı, pencere ve cephe sistemleri ile projelerinize değer katıyoruz. İnce profillerle geniş cam alanları ve kesintisiz manzaralar yaratın.",
      icon: <Activity className="w-6 h-6 text-primary" />,
      features: [
        "Yüksek dayanıklılık ve asırlık ömür",
        "Paslanma ve korozyona karşı tam direnç",
        "Geniş renk (RAL) ve ahşap doku seçenekleri",
        "Minimal çerçeve tasarımıyla geniş görüş",
        "Büyük açıklıklar için uygun sistemler",
        "Yangına karşı üstün dayanıklılık",
      ],
      specifications: [
        { label: "Profil Kalınlığı", value: "50mm - 85mm" },
        { label: "Cam Kalınlığı", value: "24mm - 44mm" },
        { label: "Termal Kesim", value: "Evet (Isı yalıtımlı)" },
        { label: "Hava Geçirgenliği", value: "Sınıf 4" },
        { label: "Su Geçirgenliği", value: "Sınıf E1050" },
      ],
      images: [
        "/aluminum-window-modern-building.jpg",
        "/aluminum-curtain-wall-installation.jpg",
        "/aluminum-sliding-door-system.jpg",
      ],
    },
    {
      id: "kis-bahcesi",
      title: "Kış Bahçesi Sistemleri",
      description:
        "Dört mevsim doğayla iç içe yaşamanızı sağlayan, estetik ve yüksek yalıtımlı kış bahçesi çözümlerimizle evinizde yeni bir yaşam alanı yaratıyoruz. Isıcamlı yapısıyla kışın sıcak, yazın serin bir konfor sunar.",
      icon: <Zap className="w-6 h-6 text-primary" />,
      features: [
        "Tüm yıl boyunca kullanım imkanı sağlayan yüksek ısı ve su yalıtımı",
        "Çatıda güvenlikli temperli lamine cam kullanımı",
        "Ağır yüklere dayanıklı çelik takviyeli alüminyum profil",
        "Güneş kontrol özellikli, UV filtreli cam seçenekleri",
        "Yağmur sularını içeri almayan akıllı su tahliye sistemi",
        "Evinizin mimarisine uygun modern ve şık tasarım",
      ],
      specifications: [
        { label: "Çatı Camı", value: "4+4 Lamine + 6mm Temperli" },
        { label: "Taşıyıcı Sistem", value: "Çelik takviyeli alüminyum" },
        { label: "Yan Kapamalar", value: "Isıcamlı Sürme / Katlanır" },
        { label: "Kar Yükü Dayanımı", value: "Yüksek sınıf (Bölgeye özel)" },
        { label: "Aydınlatma Zemin", value: "Gizli LED ve Spot Uyumlu" },
      ],
      images: [
        "/winter-garden-modern-villa.jpg",
        "/winter-garden-cozy-interior.jpg",
        "/winter-garden-glass-roof.jpg",
      ],
    },
    {
      id: "glass-balcony",
      title: "Cam Balkon Sistemleri",
      description:
        "Balkonlarınızı dört mevsim kullanılabilir, ferah ve şık yaşam alanlarına dönüştüren cam balkon çözümleri sunuyoruz. Katlanır veya sürme sistemlerimizle manzaranızı kesmeden koruma sağlayın.",
      icon: <Shield className="w-6 h-6 text-primary" />,
      features: [
        "Toz, gürültü ve hava koşullarından tam korunma",
        "Manzaranızı asla engellemeyen şeffaf tasarım",
        "Kolay açılır-kapanır ve temizlenir ergonomik sistem",
        "Darbelere dayanıklı 8mm veya 10mm tempered güvenlik camı",
        "Paslanmaz çelik ve alüminyum uzun ömürlü aksesuar",
        "Bina dış cephesine uyumlu estetik görünüm",
      ],
      specifications: [
        { label: "Cam Kalınlığı", value: "8mm / 10mm Tempered veya Isıcam" },
        { label: "Profil Malzemesi", value: "Alüminyum" },
        { label: "Açılım Türü", value: "Sürme veya Katlanır Sistem" },
        { label: "Rüzgar Dayanımı", value: "120 km/h" },
        { label: "Renk Seçenekleri", value: "Tüm RAL Kataloğu ve Ahşap Desenler" },
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
        "Modern binaların dış görünümünü baştan tasarlayan alüminyum kompozit, cam giydirme cephe ve ventile cephe sistemleri uyguluyoruz. Binalarınıza prestij ve değer kazandırın.",
      icon: <Wrench className="w-6 h-6 text-primary" />,
      features: [
        "Binanın enerji tüketimini azaltan verimli cephe çözümleri",
        "Zorlu hava koşullarına ve UV ışınlarına karşı maksimum dayanıklılık",
        "Prestijli, estetik ve modern görünüm elde etme",
        "Uluslararası standartlarda yangın güvenliği",
        "Dış ortam gürültüsünü engelleyen üstün ses yalıtımı",
        "Kendi kendini temizleyebilen dış yüzey (opsiyonel)",
      ],
      specifications: [
        { label: "Sistem Türü", value: "Stick / Unitize (Panel) Sistem" },
        { label: "Cam Türü", value: "Low-E, Tentes, Reflekte, Lamine" },
        { label: "Profil Yapısı", value: "Termal Kesimli Ağır Alüminyum" },
        { label: "Yalıtım Malzemesi", value: "Taş Yünü / Mineral Yün" },
        { label: "Sertifikalar", value: "CE, TSE, ISO 9001" },
      ],
      images: [
        "/facade-system-modern-office.jpg",
        "/curtain-wall-glass-building.jpg",
        "/composite-facade-installation.jpg",
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200/20 dark:bg-grid-slate-800/20 bg-[center_top] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/30 text-primary bg-primary/5 text-sm font-medium tracking-wide">
                Hizmet & Çözümlerimiz
              </Badge>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
                İlham Veren <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Projeler</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Yirmi yılı aşkın sektörel tecrübemizle alüminyum, cam ve PVC alanında yaşam alanlarınıza değer katıyor, 
                uzman kadromuzla estetik ve fonksiyonelliği buluşturuyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail - Alternating Layout */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-32">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={service.id} id={service.id} className="scroll-mt-32">
                    <div className={`flex flex-col gap-12 lg:gap-20 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      
                      {/* Image Gallery Side */}
                      <div className="lg:w-1/2 flex flex-col gap-4">
                        <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                          <img
                            src={service.images[0] || "/placeholder.svg"}
                            alt={`${service.title} ana proje örneği`}
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {service.images.slice(1, 3).map((image, i) => (
                            <div key={i} className="relative group overflow-hidden rounded-xl shadow-md">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${service.title} detay görseli ${i + 1}`}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="lg:w-1/2 flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-2">
                            {service.icon}
                          </div>
                          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                            {service.title}
                          </h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                          {/* Features */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <Droplets className="w-5 h-5 text-accent" />
                              Öne Çıkan Özellikler
                            </h3>
                            <ul className="space-y-3">
                              {service.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-3 group">
                                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                                  </div>
                                  <span className="text-muted-foreground text-sm leading-snug">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Specifications */}
                          <div className="space-y-4">
                             <h3 className="font-semibold text-lg flex items-center gap-2">
                              <Wrench className="w-5 h-5 text-accent" />
                              Teknik Detaylar
                            </h3>
                            <div className="bg-muted/40 rounded-xl p-5 border border-border/50 space-y-3">
                                {service.specifications.map((spec, specIndex) => (
                                  <div key={specIndex} className="flex flex-col space-y-1">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{spec.label}</span>
                                    <span className="text-sm text-foreground font-medium">{spec.value}</span>
                                    {specIndex < service.specifications.length - 1 && <div className="h-px w-full bg-border/60 my-1 mt-2"></div>}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row gap-3">
                          <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto" asChild>
                            <Link href={`/iletisim?service=${service.id}`}>
                              Projeniz İçin Teklif Alın
                            </Link>
                          </Button>
                          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted rounded-full px-8 transition-all w-full sm:w-auto group" asChild>
                            <Link href={`/yaptigimiz-isler/${service.id}`}>
                              Detaylı İncele
                              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                Hayalinizdeki Projeyi Birlikte Gerçekleştirelim
              </h2>
              <p className="text-primary-foreground/80 text-xl text-pretty max-w-2xl mx-auto">
                Uzman mühendis ve mimar ekibimizle mekanlarınıza özel, estetik ve fonksiyonel çözümler tasarlıyoruz. Ücretsiz keşif için hemen bize ulaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 font-semibold text-base h-14" asChild>
                  <Link href="/iletisim">Hemen İletişime Geçin</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 font-medium text-base h-14 bg-transparent"
                  asChild
                >
                  <Link href="/galeri">Daha Fazla Örnek İncele</Link>
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
