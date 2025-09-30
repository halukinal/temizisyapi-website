"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calculator,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react"

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    projectType: "",
    location: "",
    budget: "",
    description: "",
    urgency: "",
    consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          ...contactForm,
        }),
      })

      if (response.ok) {
        setSubmitMessage("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.")
        setContactForm({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setSubmitMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      setSubmitMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quoteForm.consent) {
      setSubmitMessage("Lütfen kişisel verilerin işlenmesi için onay verin.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          projectType: `${quoteForm.service} - ${quoteForm.projectType}`,
          address: quoteForm.location,
          details: `Bütçe: ${quoteForm.budget}\nAciliyet: ${quoteForm.urgency}\n\n${quoteForm.description}`,
        }),
      })

      if (response.ok) {
        setSubmitMessage("Teklif talebiniz alındı. Uzman ekibimiz 24 saat içinde sizinle iletişime geçecek.")
        setQuoteForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          projectType: "",
          location: "",
          budget: "",
          description: "",
          urgency: "",
          consent: false,
        })
      } else {
        setSubmitMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      setSubmitMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      content: "Merkez Mahallesi, Yapı Sokak No:15/A\n34000 Beşiktaş / İstanbul",
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+90 212 555 0123\n+90 532 555 0123",
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "info@temizisyapi.com\nteklif@temizisyapi.com",
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cuma: 08:00 - 18:00\nCumartesi: 09:00 - 16:00\nPazar: Kapalı",
    },
  ]

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Instagram, name: "Instagram", url: "#" },
    { icon: Linkedin, name: "LinkedIn", url: "#" },
    { icon: MessageCircle, name: "WhatsApp", url: "#" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Contact Information */}
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

            {/* Social Media Links */}
            <div className="text-center mb-16">
              <h3 className="font-serif text-xl font-semibold mb-4">Sosyal Medya</h3>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                    asChild
                  >
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
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Ad Soyad *</Label>
                        <Input
                          id="contact-name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                          placeholder="Adınız ve soyadınız"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Telefon</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="0532 555 0123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-posta *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Konu</Label>
                      <Input
                        id="contact-subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Mesajınızın konusu"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Mesaj *</Label>
                      <Textarea
                        id="contact-message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        placeholder="Mesajınızı buraya yazın..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                      {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
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
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quote-name">Ad Soyad *</Label>
                        <Input
                          id="quote-name"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          required
                          placeholder="Adınız ve soyadınız"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-phone">Telefon *</Label>
                        <Input
                          id="quote-phone"
                          type="tel"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          required
                          placeholder="0532 555 0123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-email">E-posta *</Label>
                      <Input
                        id="quote-email"
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        required
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quote-service">Hizmet Türü *</Label>
                        <Select
                          value={quoteForm.service}
                          onValueChange={(value) => setQuoteForm({ ...quoteForm, service: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Hizmet seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pvc">PVC Kapı Pencere</SelectItem>
                            <SelectItem value="aluminum">Alüminyum Doğrama</SelectItem>
                            <SelectItem value="glass-balcony">Cam Balkon</SelectItem>
                            <SelectItem value="facade">Cephe Sistemleri</SelectItem>
                            <SelectItem value="multiple">Birden Fazla Hizmet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-project-type">Proje Türü</Label>
                        <Select
                          value={quoteForm.projectType}
                          onValueChange={(value) => setQuoteForm({ ...quoteForm, projectType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Proje türü seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Konut</SelectItem>
                            <SelectItem value="commercial">Ticari</SelectItem>
                            <SelectItem value="industrial">Endüstriyel</SelectItem>
                            <SelectItem value="renovation">Tadilat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quote-location">Proje Lokasyonu</Label>
                        <Input
                          id="quote-location"
                          value={quoteForm.location}
                          onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                          placeholder="İlçe, İl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-budget">Bütçe Aralığı</Label>
                        <Select
                          value={quoteForm.budget}
                          onValueChange={(value) => setQuoteForm({ ...quoteForm, budget: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Bütçe aralığı" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-25k">0 - 25.000 TL</SelectItem>
                            <SelectItem value="25k-50k">25.000 - 50.000 TL</SelectItem>
                            <SelectItem value="50k-100k">50.000 - 100.000 TL</SelectItem>
                            <SelectItem value="100k-250k">100.000 - 250.000 TL</SelectItem>
                            <SelectItem value="250k+">250.000 TL+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-urgency">Aciliyet Durumu</Label>
                      <Select
                        value={quoteForm.urgency}
                        onValueChange={(value) => setQuoteForm({ ...quoteForm, urgency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Aciliyet durumu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Acil (1 hafta içinde)</SelectItem>
                          <SelectItem value="normal">Normal (1 ay içinde)</SelectItem>
                          <SelectItem value="flexible">Esnek (3 ay içinde)</SelectItem>
                          <SelectItem value="planning">Planlama aşamasında</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-description">Proje Detayları</Label>
                      <Textarea
                        id="quote-description"
                        value={quoteForm.description}
                        onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                        placeholder="Projeniz hakkında detaylı bilgi verin (metrekare, kat sayısı, özel istekler vb.)"
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consent"
                        checked={quoteForm.consent}
                        onCheckedChange={(checked) => setQuoteForm({ ...quoteForm, consent: checked as boolean })}
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground">
                        Kişisel verilerimin işlenmesine ve iletişim kurulmasına onay veriyorum. *
                      </Label>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                      {isSubmitting ? "Gönderiliyor..." : "Teklif Talep Et"}
                      <Calculator className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Success Message */}
            {submitMessage && (
              <div className="mt-8 text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
                  {submitMessage}
                </Badge>
              </div>
            )}
          </div>
        </section>

        {/* Map Section */}
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
                    Merkez Mahallesi, Yapı Sokak No:15/A
                    <br />
                    34000 Beşiktaş / İstanbul
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
