// app/iletisim/page.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createContactMessage, createQuoteRequest } from "@/actions/messageActions";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Phone, Mail, Clock, Send, Calculator, Facebook, Instagram, Linkedin, MessageCircle,
} from "lucide-react";

// Form gönderimi sırasında düğmenin durumunu yöneten bileşen
function SubmitButton({ text, pendingText }: { text: string; pendingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending ? pendingText : text}
      {text === "Mesaj Gönder" ? <Send className="ml-2 h-4 w-4" /> : <Calculator className="ml-2 h-4 w-4" />}
    </Button>
  );
}

const initialState = { message: "", errors: {} };

export default function ContactPage() {
  const [contactState, contactFormAction] = useFormState(createContactMessage, initialState);
  const [quoteState, quoteFormAction] = useFormState(createQuoteRequest, initialState);

  const contactInfo = [
    { icon: MapPin, title: "Adres", content: "Merkez Mahallesi, Yapı Sokak No:15/A\n34000 Beşiktaş / İstanbul", },
    { icon: Phone, title: "Telefon", content: "+90 212 555 0123\n+90 532 555 0123", },
    { icon: Mail, title: "E-posta", content: "info@temizisyapi.com\nteklif@temizisyapi.com", },
    { icon: Clock, title: "Çalışma Saatleri", content: "Pazartesi - Cuma: 08:00 - 18:00\nCumartesi: 09:00 - 16:00\nPazar: Kapalı", },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Instagram, name: "Instagram", url: "#" },
    { icon: Linkedin, name: "LinkedIn", url: "#" },
    { icon: MessageCircle, name: "WhatsApp", url: "#" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero ve İletişim Bilgileri Bölümleri aynı kalabilir... */}
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
        
        {/* Forms Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                    <Send className="h-6 w-6 text-primary" />
                    <span>İletişim Formu</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Genel sorularınız için bu formu kullanabilirsiniz. Size en kısa sürede dönüş yapacağız.
                  </p>
                </CardHeader>
                <CardContent>
                  <form action={contactFormAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Ad Soyad *</Label>
                        <Input id="contact-name" name="name" required placeholder="Adınız ve soyadınız" />
                        {contactState.errors?.name && <p className="text-sm text-destructive">{contactState.errors.name[0]}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Telefon</Label>
                        <Input id="contact-phone" name="phone" type="tel" placeholder="0532 555 0123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-posta *</Label>
                      <Input id="contact-email" name="email" type="email" required placeholder="ornek@email.com" />
                      {contactState.errors?.email && <p className="text-sm text-destructive">{contactState.errors.email[0]}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Konu</Label>
                      <Input id="contact-subject" name="subject" placeholder="Mesajınızın konusu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Mesaj *</Label>
                      <Textarea id="contact-message" name="message" required placeholder="Mesajınızı buraya yazın..." rows={4} />
                      {contactState.errors?.message && <p className="text-sm text-destructive">{contactState.errors.message[0]}</p>}
                    </div>
                    <SubmitButton text="Mesaj Gönder" pendingText="Gönderiliyor..." />
                    {contactState.message && !Object.keys(contactState.errors ?? {}).length && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2 mt-4 w-full justify-center">
                            {contactState.message}
                        </Badge>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* Quote Request Form */}
              <Card>
                <CardHeader>
                   <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    <span>Teklif Talep Formu</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Projeniz için detaylı teklif almak istiyorsanız bu formu doldurun. Ücretsiz keşif hizmeti sunuyoruz.
                  </p>
                </CardHeader>
                <CardContent>
                  <form action={quoteFormAction} className="space-y-4">
                    {/* Tüm inputlara name attribute ekliyoruz */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quote-name">Ad Soyad *</Label>
                            <Input id="quote-name" name="name" required/>
                            {quoteState.errors?.name && <p className="text-sm text-destructive">{quoteState.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quote-phone">Telefon *</Label>
                            <Input id="quote-phone" name="phone" type="tel" required/>
                            {quoteState.errors?.phone && <p className="text-sm text-destructive">{quoteState.errors.phone[0]}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quote-email">E-posta *</Label>
                        <Input id="quote-email" name="email" type="email" required/>
                        {quoteState.errors?.email && <p className="text-sm text-destructive">{quoteState.errors.email[0]}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quote-service">Hizmet Türü *</Label>
                            <Select name="service" required>
                                <SelectTrigger><SelectValue placeholder="Hizmet seçin" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pvc">PVC Kapı Pencere</SelectItem>
                                    <SelectItem value="aluminum">Alüminyum Doğrama</SelectItem>
                                    <SelectItem value="glass-balcony">Cam Balkon</SelectItem>
                                    <SelectItem value="facade">Cephe Sistemleri</SelectItem>
                                    <SelectItem value="multiple">Birden Fazla Hizmet</SelectItem>
                                </SelectContent>
                            </Select>
                            {quoteState.errors?.service && <p className="text-sm text-destructive">{quoteState.errors.service[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quote-project-type">Proje Türü</Label>
                            <Select name="projectType">
                                <SelectTrigger><SelectValue placeholder="Proje türü seçin" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="residential">Konut</SelectItem>
                                    <SelectItem value="commercial">Ticari</SelectItem>
                                    <SelectItem value="industrial">Endüstriyel</SelectItem>
                                    <SelectItem value="renovation">Tadilat</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quote-description">Proje Detayları *</Label>
                        <Textarea id="quote-description" name="description" placeholder="Metrekare, kat sayısı, özel istekler vb." rows={4} required/>
                        {quoteState.errors?.description && <p className="text-sm text-destructive">{quoteState.errors.description[0]}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="consent" name="consent" required />
                        <Label htmlFor="consent" className="text-sm text-muted-foreground">
                            Kişisel verilerimin işlenmesine ve iletişim kurulmasına onay veriyorum. *
                        </Label>
                    </div>
                     {quoteState.errors?.consent && <p className="text-sm text-destructive">{quoteState.errors.consent[0]}</p>}
                    <SubmitButton text="Teklif Talep Et" pendingText="Gönderiliyor..." />
                    {quoteState.message && !Object.keys(quoteState.errors ?? {}).length && (
                         <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2 mt-4 w-full justify-center">
                            {quoteState.message}
                        </Badge>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section - Aynen kalabilir */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">Konumumuz</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Merkezi konumumuzda showroom ve ofisimizi ziyaret edebilirsiniz. Randevu almak için önceden arayın.
              </p>
            </div>
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-muted-foreground">Harita Entegrasyonu</p>
                  <p className="text-sm text-muted-foreground">
                    Merkez Mahallesi, Yapı Sokak No:15/A<br/>34000 Beşiktaş / İstanbul
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}