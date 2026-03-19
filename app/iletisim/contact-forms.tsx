"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, Calculator, MessageSquare } from "lucide-react"

const WHATSAPP_NUMBER = "905323882864" // İşletme WhatsApp numarası

export function ContactForms() {
  // İletişim Formu State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })

  // Teklif Formu State
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    projectType: "",
    description: "",
    consent: false,
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const message = `*Yeni İletişim Mesajı* 📧\n\n` +
      `*Ad Soyad:* ${contactForm.name}\n` +
      `*Telefon:* ${contactForm.phone || "Belirtilmedi"}\n` +
      `*E-posta:* ${contactForm.email}\n` +
      `*Konu:* ${contactForm.subject || "Genel"}\n\n` +
      `*Mesaj:* ${contactForm.message}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank")
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const services: Record<string, string> = {
      pvc: "PVC Kapı Pencere",
      aluminum: "Alüminyum Doğrama",
      "glass-balcony": "Cam Balkon",
      facade: "Cephe Sistemleri",
      multiple: "Birden Fazla Hizmet",
    }
    const serviceName = services[quoteForm.service] || quoteForm.service

    const types: Record<string, string> = {
      residential: "Konut",
      commercial: "Ticari",
      industrial: "Endüstriyel",
      renovation: "Tadilat",
    }
    const typeName = types[quoteForm.projectType] || "Belirtilmedi"

    const message = `*Yeni Teklif Talebi* 📝\n\n` +
      `*Ad Soyad:* ${quoteForm.name}\n` +
      `*Telefon:* ${quoteForm.phone}\n` +
      `*E-posta:* ${quoteForm.email}\n` +
      `*Hizmet:* ${serviceName}\n` +
      `*Proje Türü:* ${typeName}\n\n` +
      `*Detaylar:* ${quoteForm.description}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank")
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                <Send className="h-6 w-6 text-primary" />
                <span>İletişim Formu</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Genel sorularınız için bu formu kullanabilirsiniz.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Ad Soyad *</Label>
                    <Input 
                      id="contact-name" 
                      required 
                      placeholder="Adınız ve soyadınız" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Telefon</Label>
                    <Input 
                      id="contact-phone" 
                      type="tel" 
                      placeholder="0532 555 0123" 
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">E-posta *</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    required 
                    placeholder="ornek@email.com" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Konu</Label>
                  <Input 
                    id="contact-subject" 
                    placeholder="Mesajınızın konusu" 
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Mesaj *</Label>
                  <Textarea 
                    id="contact-message" 
                    required 
                    placeholder="Mesajınızı buraya yazın..." 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]">
                  WhatsApp ile Gönder
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quote Request Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <span>Teklif Talep Formu</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Projeniz için detaylı teklif almak ve ücretsiz keşif için formu doldurun.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quote-name">Ad Soyad *</Label>
                    <Input 
                      id="quote-name" 
                      required 
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-phone">Telefon *</Label>
                    <Input 
                      id="quote-phone" 
                      type="tel" 
                      required 
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-email">E-posta *</Label>
                  <Input 
                    id="quote-email" 
                    type="email" 
                    required 
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quote-service">Hizmet Türü *</Label>
                    <Select onValueChange={(val) => setQuoteForm({...quoteForm, service: val})} required>
                      <SelectTrigger><SelectValue placeholder="Hizmet seçin" /></SelectTrigger>
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
                    <Select onValueChange={(val) => setQuoteForm({...quoteForm, projectType: val})}>
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
                  <Textarea 
                    id="quote-description" 
                    placeholder="Metrekare, kat sayısı, özel istekler vb." 
                    rows={4} 
                    required 
                    value={quoteForm.description}
                    onChange={(e) => setQuoteForm({...quoteForm, description: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="consent" 
                    required 
                    checked={quoteForm.consent}
                    onCheckedChange={(checked) => setQuoteForm({...quoteForm, consent: checked === true})}
                  />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground">
                    Kişisel verilerimin işlenmesine onay veriyorum. *
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]">
                  Teklifi WhatsApp ile Gönder
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}