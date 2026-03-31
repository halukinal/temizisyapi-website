import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function AboutSummary() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-4">1976'dan Günümüze</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary text-balance">
              48 Yıllık Köklü Tecrübe ve Kaliteli Çözümler
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              1976 yılında temelleri atılan Temizişyapı, <strong>Bursa yapı firması</strong> arayışınızda yarım asra yaklaşan deneyimiyle yanınızda. İster <strong>Bursa cam balkon</strong>, <strong>Bursa giyotin cam sistemi</strong>, ister <strong>Bursa pergola</strong> kurulumu olsun; alüminyum, cam ve PVC sistemlerinde öncü çözümler sunmaktayız. En iyi <strong>Bursa PVC usta</strong> ve <strong>Bursa pimapen usta</strong> kadromuzla, müşteri memnuniyetini temel ilke olarak benimseyerek, estetik ve dayanıklı projeler üretiyoruz.
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Ustalığımızı teknolojiyle birleştirerek, 48 yıldır güvenle yaşam alanlarınıza değer katıyoruz. Her projede kalite ve dürüstlüğü ön planda tutan uzman ekibimizle hizmetinizdeyiz.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold transition-transform hover:scale-105">
              <Link href="/hakkimizda">Hikayemizi Keşfedin</Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <img
                src="/professional-construction-team-working-on-aluminum.jpg"
                alt="Temizişyapı uzman ekibi"
                className="w-full h-[400px] object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
