// components/footer.tsx (Yeni ve Tam Hali)

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, Phone, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const footerLinks = [
  {
    category: 'Şirket',
    links: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'Yaptığımız İşler', href: '/yaptigimiz-isler' },
      { name: 'Galeri', href: '/galeri' },
    ],
  },
  {
    category: 'Hizmetler',
    links: [
      { name: 'Cam Balkon', href: '/yaptigimiz-isler' },
      { name: 'PVC Doğrama', href: '/yaptigimiz-isler' },
      { name: 'Alüminyum Doğrama', href: '/yaptigimiz-isler' },
      { name: 'Cephe Sistemleri', href: '/yaptigimiz-isler' },
    ],
  },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
             <Link href="/" className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-primary" />
                <span className="font-serif text-2xl font-bold text-foreground">Temiz İş Yapı</span>
            </Link>
            <p className="text-sm leading-relaxed text-pretty">
              1976'dan beri 48 yıllık deneyimle, yaşam alanlarınıza estetik, dayanıklı ve fonksiyonel çözümler sunuyoruz.
            </p>
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {footerLinks.map((section) => (
              <div key={section.category}>
                <h3 className="font-semibold text-foreground mb-4">{section.category}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">İletişimde Kalın</h3>
            <div className="space-y-3">
               <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 flex-shrink-0 mt-1" />
                <p className="text-sm">
                  Fatih Sultan Mehmet Sanayi Sitesi, No: 213, Başakşehir/İstanbul
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+905321234567" className="text-sm hover:text-primary transition-colors">
                  0532 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@temizisyapi.com" className="text-sm hover:text-primary transition-colors">
                  info@temizisyapi.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Temizişyapı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}