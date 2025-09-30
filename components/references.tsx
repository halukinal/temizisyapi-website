import { Card } from "@/components/ui/card"

const partners = [
  {
    name: "Egepen Deceuninck",
    logo: "/egepen-deceuninck-logo.jpg",
  },
  {
    name: "Winsa",
    logo: "/winsa-logo.jpg",
  },
  {
    name: "Asaş Alüminyum",
    logo: "/asa--al-minyum-logo.jpg",
  },
  {
    name: "Saray Alüminyum",
    logo: "/saray-al-minyum-logo.jpg",
  },
  {
    name: "Rehau",
    logo: "/rehau-logo.jpg",
  },
  {
    name: "Schüco",
    logo: "/sch-co-logo.jpg",
  },
]

export function References() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Çözüm Ortaklarımız</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Sektörün lider markaları ile çalışarak size en kaliteli ürünleri sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow duration-300">
              <div className="p-6 flex items-center justify-center h-24">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
