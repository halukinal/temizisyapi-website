import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Activity, Zap, ShieldCheck, Wrench, Shield, Droplets } from "lucide-react"
import Link from "next/link"
import client, { getAssetsUrl } from "@/lib/directus"
import { readItems } from "@directus/sdk"
import * as LucideIcons from "lucide-react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yaptığımız İşler | Bursa Yapı Firması | Temizişyapı",
  description: "Bursa pergola, bursa pvc usta, bursa pilastik kapı, bursa pencere yapımı, bursa sürgülü cam, giyotin sistemleri ve uzman alüminyum uygulaması hizmetlerimiz.",
};

// Directus'tan hizmetleri çek
async function getServices() {
  try {
    const response = await client.request(
      readItems('hizmetler', {
        fields: ['*', { images: ['directus_files_id'] }],
        filter: {
          status: { _eq: 'published' }
        },
        sort: ['sort']
      })
    )
    
    const items = Array.isArray(response) ? response : (response as any).data || []
    
    return items.map((item: any) => {
      // İkon ismini Lucide bileşenine çevir (Varsayılan: Wrench)
      const IconName = (item.icon || "Wrench") as keyof typeof LucideIcons;
      const IconComponent = (LucideIcons[IconName] as any) || LucideIcons.Wrench;

      return {
        id: item.slug || item.id.toString(),
        title: item.title || "Adsız Hizmet",
        description: item.description || "",
        icon: <IconComponent className="w-6 h-6 text-primary" />,
        features: Array.isArray(item.features) ? item.features : (item.features ? (item.features as string).split('\n') : []),
        specifications: Array.isArray(item.specifications) ? item.specifications : [],
        images: item.images ? item.images.map((img: any) => getAssetsUrl(img.directus_files_id || img)) : []
      }
    })
  } catch (error) {
    console.error("Directus hizmet verileri alınamadı:", error)
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

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
              {services.map((service: any, index: number) => {
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
                          {service.images.slice(1, 3).map((image: string, i: number) => (
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
                              {service.features.map((feature: string, featureIndex: number) => (
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
                                {service.specifications.map((spec: any, specIndex: number) => (
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
