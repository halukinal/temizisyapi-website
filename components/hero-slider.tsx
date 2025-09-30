"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    image: "/modern-aluminum-window-installation-in-luxury-home.jpg",
    headline: "Modern Mimarinin Estetik Dokunuşu",
    description: "Yüksek kaliteli alüminyum doğrama sistemleri ile yaşam alanlarınıza değer katıyoruz.",
    buttonText: "Detayları İncele",
    buttonLink: "/yaptigimiz-isler",
  },
  {
    image: "/glass-balcony-system-installation-modern-apartment.jpg",
    headline: "Yaşam Alanlarınıza Değer Katıyoruz",
    description: "Cam balkon sistemleri ile balkonlarınızı dört mevsim kullanılabilir hale getirin.",
    buttonText: "Cam Balkon Sistemleri",
    buttonLink: "/yaptigimiz-isler",
  },
  {
    image: "/pvc-window-and-door-installation-energy-efficient.jpg",
    headline: "Yüksek Yalıtım, Konforlu Yaşam",
    description: "Enerji verimliliği yüksek PVC kapı ve pencere sistemleri ile konforunuzu artırın.",
    buttonText: "PVC Çözümleri",
    buttonLink: "/yaptigimiz-isler",
  },
  {
    image: "/professional-construction-team-installing-aluminum.jpg",
    headline: "Uzman Ekip, Garantili Hizmet",
    description: "20 yıllık tecrübemiz ve uzman ekibimizle projelerinizi güvenle teslim ediyoruz.",
    buttonText: "Hakkımızda",
    buttonLink: "/hakkimizda",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                  {slide.headline}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-pretty leading-relaxed opacity-90">{slide.description}</p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href={slide.buttonLink}>{slide.buttonText}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentSlide ? "bg-white" : "bg-white/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
