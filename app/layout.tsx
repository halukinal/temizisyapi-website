import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { GoogleAnalytics } from "@next/third-parties/google"

const Chatbot = dynamic(() => import("@/components/chatbot").then(mod => mod.Chatbot), { ssr: false })

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
})

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-pro",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.temizisyapi.com'),
  title: {
    default: "Temiz İş Yapı | Modern Yapı ve Tadilat Çözümleri",
    template: "%s | Temiz İş Yapı"
  },
  description:
    "1976'dan beri cam balkon, PVC ve alüminyum sistemlerinde öncü çözümler. Temiz İş Yapı ile yaşam alanlarınıza değer katın.",
  keywords: [
    "bursa", "bursa cam balkon", "Bursa Cam Balkon Ustası", "bursa yapı firması", 
    "bursa giyotin cam sistemi", "bursa giyotin", "bursa pergola", "bursa kış bahçesi",
    "bursa alüminyum sistem", "bursa usta", "bursa pvc usta", "bursa pimapen usta", 
    "bursa pimapen", "bursa pencere yapımı", "bursa sürgülü cam", "bursa pilastik kapı",
    "Yıldırım Cam Balkon", "Nilüfer PVC", "Bursa Alüminyum Doğrama", "Temizişyapı"
  ],
  authors: [{ name: "Haluk İnal" }],
  generator: "Haluk İnal",
  openGraph: {
    title: "Temiz İş Yapı | Modern Yapı ve Tadilat Çözümleri",
    description: "1976'dan beri cam balkon, PVC ve alüminyum sistemlerinde öncü çözümler. Temiz İş Yapı ile yaşam alanlarınıza değer katın.",
    url: "https://www.temizisyapi.com",
    siteName: "Temiz İş Yapı",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temiz İş Yapı | Modern Yapı ve Tadilat Çözümleri",
    description: "1976'dan beri cam balkon, PVC ve alüminyum sistemlerinde öncü çözümler. Temiz İş Yapı ile yaşam alanlarınıza değer katın.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`font-sans ${sourceSansPro.variable} ${playfairDisplay.variable} ${GeistMono.variable}`}>
        {/* Cloudflare/Bundler __name polyfill */}
        <script dangerouslySetInnerHTML={{ __html: `window.__name = window.__name || ((f, n) => Object.defineProperty(f, "name", { value: n, configurable: true }));` }} />
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Chatbot />
          <Toaster richColors position="top-center" />
        </ThemeProvider>

        {/* Google Analytics - Sadece ID'yi env dosyasından çekiyoruz */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
