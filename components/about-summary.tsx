import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function AboutSummary() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary text-balance">
              20 Yıllık Tecrübe ile Kaliteli Çözümler
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Firmamız, alüminyum, cam ve PVC sektöründeki yeniliklerde lider olma misyonuyla hareket eder. Müşteri
              memnuniyetini temel ilke olarak benimseyerek, en son teknolojileri ve kaliteli malzemeleri kullanarak
              estetik ve dayanıklı çözümler sunuyoruz.
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Uzman ekibimizle projelerinizi hayata geçirmek için buradayız. Her projede kalite, güvenilirlik ve müşteri
              memnuniyetini ön planda tutarak, yaşam alanlarınıza değer katıyoruz.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/hakkimizda">Daha Fazlasını Öğrenin</Link>
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
