import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Chatbot } from "@/components/chatbot"

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
    default: "Temizişyapı | Bursa Alüminyum Doğrama, Cam Balkon ve PVC",
    template: "%s | Temizişyapı Bursa"
  },
  description:
    "Bursa, Nilüfer ve Yıldırım başta olmak üzere tüm Marmara bölgesine profesyonel alüminyum doğrama, cam balkon ve PVC kapı pencere sistemleri hizmeti sunan 20 yıllık köklü firma.",
  keywords: ["Bursa Cam Balkon", "Bursa Alüminyum Doğrama", "Bursa PVC Pencere", "Yıldırım Cam Balkon", "Nilüfer PVC", "Temizişyapı"],
  authors: [{ name: "Haluk İnal" }],
  generator: "Haluk İnal",
  openGraph: {
    title: "Temizişyapı | Bursa Alüminyum, Cam Balkon ve PVC Sistemleri",
    description: "Profesyonel alüminyum doğrama, cam balkon ve PVC kapı pencere sistemleri. 20 yıllık tecrübe ile Bursa merkezli imalat ve montaj hizmetleri.",
    url: "https://www.temizisyapi.com",
    siteName: "Temizişyapı",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temizişyapı | Bursa Alüminyum ve Cam Balkon Sistemleri",
    description: "20 yıllık tecrübe ile Bursa'nın en güvenilir alüminyum, cam balkon ve PVC çözüm ortağı.",
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
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
