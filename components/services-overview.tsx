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
  },
  {
    icon: Building2,
    title: "Alüminyum Doğrama",
    description: "Modern ve minimalist tasarımlar için yüksek kaliteli alüminyum kapı, pencere ve cephe sistemleri.",
    features: ["Modern tasarım", "Dayanıklılık", "Estetik görünüm"],
  },
  {
    icon: Shield,
    title: "Cam Balkon Sistemleri",
    description: "Balkonlarınızı dört mevsim kullanılabilir, ferah ve şık yaşam alanlarına dönüştürün.",
    features: ["Dört mevsim kullanım", "Hava koşullarından korunma", "Değer artışı"],
  },
  {
    icon: Wrench,
    title: "Profesyonel Montaj",
    description: "Uzman ekibimiz ile hızlı, güvenli ve kaliteli montaj hizmeti sunuyoruz.",
    features: ["Uzman ekip", "Garantili hizmet", "Zamanında teslimat"],
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
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-serif font-semibold text-lg mb-3 text-balance">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">{service.description}</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <span className="w-1 h-1 bg-accent rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
