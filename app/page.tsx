import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSlider } from "@/components/hero-slider"
import { AboutSummary } from "@/components/about-summary"
import { ServicesOverview } from "@/components/services-overview"
import { References } from "@/components/references"
import { PriceEstimationModule } from "@/components/price-estimation-module"

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Temizişyapı",
    "image": "https://www.temizisyapi.com/logo.png", // Varsayılan logoya göre ayarlanabilir
    "@id": "https://www.temizisyapi.com",
    "url": "https://www.temizisyapi.com",
    "telephone": "05323882864",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Beyazıt, Eğitim Cd. no:188",
      "addressLocality": "Yıldırım",
      "addressRegion": "Bursa",
      "postalCode": "16320",
      "addressCountry": "TR"
    },
     "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.1859917,
      "longitude": 29.0984813
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      // Sosyal medya linleri buraya eklenebilir
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <AboutSummary />
        <ServicesOverview />
        <References />
      </main>
      <Footer />
    </div>
  )
}
