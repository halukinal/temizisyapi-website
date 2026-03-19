import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Home, Shield, Wrench } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Home,
    title: "PVC Kapı ve Pencere Sistemleri",
    description: "Enerji verimliliği yüksek, estetik ve uzun ömürlü PVC çözümleri ile konforunuzu artırın.",
    features: ["Yüksek yalıtım", "Enerji tasarrufu", "Uzun ömürlü"],
    link: "/yaptigimiz-isler#pvc-systems"
  },
  {
    icon: Building2,
    title: "Alüminyum Doğrama",
    description: "Modern ve minimalist tasarımlar için yüksek kaliteli alüminyum kapı, pencere ve cephe sistemleri.",
    features: ["Modern tasarım", "Dayanıklılık", "Estetik görünüm"],
    link: "/yaptigimiz-isler#aluminum-systems"
  },
  {
    icon: Shield,
    title: "Cam Balkon Sistemleri",
    description: "Balkonlarınızı dört mevsim kullanılabilir, ferah ve şık yaşam alanlarına dönüştürün.",
    features: ["Dört mevsim kullanım", "Hava koşullarından korunma", "Değer artışı"],
    link: "/yaptigimiz-isler#glass-balcony"
  },
  {
    icon: Wrench,
    title: "Kış Bahçesi",
    description: "Dört mevsim doğayla iç içe yaşamanızı sağlayan, yüksek yalıtımlı kış bahçesi çözümlerimiz.",
    features: ["Yüksek ısı yalıtımı", "Şık tasarım", "Temperli Cam"],
    link: "/yaptigimiz-isler#kis-bahcesi"
  },
]

export function ServicesOverview() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">Hizmetlerimiz</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Alüminyum, cam ve PVC sektöründe geniş hizmet yelpazesi ile ihtiyaçlarınıza uygun çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Link href={service.link} key={index} className="block group">
              <Card className="h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <service.icon className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-3 text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{service.description}</p>
                  <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 shadow-sm" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/yaptigimiz-isler">Tüm Hizmetlerimizi Görün</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
