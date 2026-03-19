// app/iletisim/page.tsx
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { ContactForms } from "./contact-forms"; // Yeni oluşturduğumuz istemci bileşenini import ediyoruz

// SEO Bilgileri artık burada, olması gerektiği yerde.
export const metadata: Metadata = {
  title: "İletişim | Temizişyapı Bursa",
  description: "Bursa Yıldırım, Nilüfer ve çevresi için projelerinize ücretsiz keşif ve detaylı fiyat teklifi almak için bizimle iletişime geçin.",
};
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const contactInfo = [
    { icon: MapPin, title: "Adres", content: "Beyazıt, Eğitim Cd. no:188, 16320 Yıldırım/Bursa\n(54P2+9C Yıldırım, Bursa)" },
    { icon: Phone, title: "Telefon", content: "0532 388 28 64" },
    { icon: Mail, title: "E-posta", content: "bulentinal16@gmail.com" },
    { icon: Clock, title: "Çalışma Saatleri", content: "Pazartesi - Cumartesi: 09:00 - 19:00\nPazar: Kapalı" },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Instagram, name: "Instagram", url: "#" },
    { icon: MessageCircle, name: "WhatsApp", url: "https://wa.me/905323882864" }, // WhatsApp linkini ekledim
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">İletişim</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Projeleriniz için ücretsiz keşif ve detaylı teklif almak için bizimle iletişime geçin. Uzman ekibimiz
                size en uygun çözümleri sunmaya hazır.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold text-lg mb-2">{info.title}</h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">{info.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mb-16">
              <h3 className="font-serif text-xl font-semibold mb-4">Sosyal Medya</h3>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Button key={index} variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* İnteraktif formlar artık bu bileşenden geliyor */}
        <ContactForms />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">Konumumuz</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Ofisimizi ziyaret edebilirsiniz. Randevu almak için önceden aramanızı rica ederiz.
              </p>
            </div>
            <Card className="overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.036921351636!2d29.09848137612592!3d40.185991769650435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3e87b4c04349%3A0x8b26aece7caf6333!2zVEVNxLBaIMSwxZ4gWUFQSQ!5e0!3m2!1str!2str!4v1773908331778!5m2!1str!2str" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={false}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}