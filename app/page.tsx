import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSlider } from "@/components/hero-slider"
import { AboutSummary } from "@/components/about-summary"
import { ServicesOverview } from "@/components/services-overview"
import { References } from "@/components/references"
import { PriceEstimationModule } from "@/components/price-estimation-module"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Temizişyapı Bursa",
        "description": "Bursa cam balkon, bursa pergola, bursa giyotin cam sistemi, bursa alüminyum sistem işleri ve bursa pvc usta hizmetleri sunan 48 yıllık deneyimli yapı firması.",
        "image": "https://www.temizisyapi.com/logo.png",
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
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Bursa'da en iyi cam balkon ustasını nasıl bulabilirim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Temizişyapı, 1976'dan beri Bursa cam balkon, Yıldırım cam balkon ve Nilüfer bölgelerinde uzman ustalarıyla hizmet vermektedir."
            }
          },
          {
            "@type": "Question",
            "name": "Bursa giyotin cam sistemi ve pergola yapıyor musunuz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Bursa giyotin cam sistemi, kış bahçesi, bursa pergola ve bursa sürgülü cam satışı ve montajı alanında tecrübeli ustalarımızla garantili çözümler sunuyoruz."
            }
          },
          {
            "@type": "Question",
            "name": "Bursa pimapen usta (plastik kapı ve pencere yapımı) hizmetiniz var mı?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Elbette. Bursa pvc usta ve bursa pimapen işleri ana hizmetlerimizdendir. Plastik kapı ve enerji tasarruflu pencere yapımı için ücretsiz keşif sağlıyoruz."
            }
          }
        ]
      }
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
        
        {/* Chatbot Embedding Section */}
        <section className="py-24 bg-gradient-to-b from-white to-zinc-50 border-t border-zinc-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  <span className="text-xs font-black text-indigo-700 uppercase tracking-[0.1em]">Dijital Yapı Asistanı</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
                  Sorularınızı <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Yapay Zeka</span> Asistanımıza Sorun
                </h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-medium max-w-xl">
                  Cam balkon, PVC sistemleri ve alüminyum doğrama projeleriniz hakkında teknik bilgi ve fiyatlandırma desteği anında cebinizde.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center space-x-3 text-sm font-bold text-zinc-700 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-1 rounded-full text-green-600">✅</div>
                      <span>7/24 Anında Yanıt</span>
                   </div>
                   <div className="flex items-center space-x-3 text-sm font-bold text-zinc-700 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-1 rounded-full text-green-600">✅</div>
                      <span>Fiyatlandırma Desteği</span>
                   </div>
                   <div className="flex items-center space-x-3 text-sm font-bold text-zinc-700 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-1 rounded-full text-green-600">✅</div>
                      <span>Uzman İncelemesi</span>
                   </div>
                   <div className="flex items-center space-x-3 text-sm font-bold text-zinc-700 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-1 rounded-full text-green-600">✅</div>
                      <span>WhatsApp Entegrasyonu</span>
                   </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-zinc-900/5 p-4 rounded-[3rem] shadow-2xl shadow-indigo-200/50 border border-zinc-200/50 backdrop-blur-sm relative">
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-[80px] -z-10 animate-pulse" />
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-[80px] -z-10 animate-pulse delay-700" />
                   <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-200 overflow-hidden min-h-[500px]">
                      <Chatbot embedded={true} />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
