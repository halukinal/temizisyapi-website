import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSlider } from "@/components/hero-slider"
import { AboutSummary } from "@/components/about-summary"
import { ServicesOverview } from "@/components/services-overview"
import { References } from "@/components/references"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
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
