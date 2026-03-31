import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PriceEstimationModule } from "@/components/price-estimation-module"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import client, { getAssetsUrl } from "@/lib/directus"
import { readItems } from "@directus/sdk"
import * as LucideIcons from "lucide-react"

async function getServiceDetail(slug: string) {
  try {
    const response = await client.request(
      readItems('hizmetler', {
        fields: ['*', { images: ['directus_files_id'] }],
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        limit: 1
      })
    )
    
    const items = Array.isArray(response) ? response : (response as any).data || []
    if (items.length === 0) return null
    return items[0]
  } catch (error) {
    console.error("Directus hizmet detay verisi alınamadı:", error)
    return null
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceDetail(params.slug)
  
  if (!service) {
    notFound()
  }

  const images = service.images ? service.images.map((img: any) => getAssetsUrl(img.directus_files_id || img)) : []
  const heroImage = images.length > 0 ? images[0] : "/placeholder.svg"
  
  // Özellikleri işle
  const features = Array.isArray(service.features) ? service.features : (service.features ? service.features.split('\n') : [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 z-0">
            <img 
              src={heroImage} 
              alt={service.title} 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white space-y-6">
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold tracking-tight">
                {service.hero_title || service.title}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                {service.description}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-semibold px-8" asChild>
                  <Link href="#iletisim">Teklif Alın</Link>
                </Button>
                {params.slug === "cam-balkon" && (
                  <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full font-semibold px-8 bg-transparent" asChild>
                    <Link href="#fiyat-hesapla">Fiyat Hesapla</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 prose prose-slate lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: service.content }} />
                
                <div className="space-y-8">
                   <div className="bg-muted/50 p-6 rounded-2xl border border-border">
                      <h3 className="font-bold text-lg mb-4">Öne Çıkan Özellikler</h3>
                      <ul className="space-y-3">
                        {features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                   </div>

                   {images.length > 1 && (
                     <div className="grid grid-cols-1 gap-4">
                        {images.slice(1, 4).map((img: string, i: number) => (
                           <img key={i} src={img} className="rounded-xl shadow-sm object-cover aspect-video" alt={`${service.title} ${i}`} />
                        ))}
                     </div>
                   )}
                </div>
             </div>
          </div>
        </section>

        {/* AI Price Module Section (Only for Cam Balkon) */}
        {params.slug === "cam-balkon" && (
          <section id="fiyat-hesapla" className="py-24 bg-muted/30 relative">
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Akıllı Fiyat Tahmin Modülü
                </h2>
                <PriceEstimationModule />
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section id="iletisim" className="py-20 bg-primary text-white">
           <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-serif font-bold mb-6">Hemen Ücretsiz Keşif ve Fiyat Alın</h2>
              <Button size="lg" variant="secondary" className="rounded-full" asChild>
                 <Link href="/iletisim">İletişime Geç</Link>
              </Button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
