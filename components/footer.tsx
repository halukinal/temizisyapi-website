import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-serif font-bold text-xl text-primary">Temizişyapı</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              20 yıllık tecrübe ile alüminyum, cam ve PVC sektöründe kaliteli çözümler sunuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">Hızlı Linkler</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/hakkimizda" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Hakkımızda
              </Link>
              <Link
                href="/yaptigimiz-isler"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Yaptığımız İşler
              </Link>
              <Link href="/galeri" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Galeri
              </Link>
              <Link href="/iletisim" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                İletişim
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">Hizmetlerimiz</h3>
            <nav className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">PVC Kapı ve Pencere</span>
              <span className="text-muted-foreground text-sm">Alüminyum Doğrama</span>
              <span className="text-muted-foreground text-sm">Cam Balkon Sistemleri</span>
              <span className="text-muted-foreground text-sm">Cephe Sistemleri</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">+90 (212) 555 0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">info@temizisyapi.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">İstanbul, Türkiye</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2024 Temizişyapı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
