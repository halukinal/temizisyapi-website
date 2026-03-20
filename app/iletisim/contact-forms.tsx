"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, Calculator, MessageSquare, Loader2, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react"
import { submitContactForm, submitQuoteForm } from "@/actions/formActions"
import { toast } from "sonner"

const WHATSAPP_NUMBER = "905323882864"

export function ContactForms() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResult, setAiResult] = useState<{ feedback: string; waMessage: string } | null>(null)
  
  // İletişim Formu State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    consent: false
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.consent) {
      toast.error("Lütfen KVKK onayını işaretleyin.")
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitContactForm({
        ...contactForm,
        kvkkAccepted: contactForm.consent
      })
      
      if (result.success) {
        setAiResult({ feedback: result.clientFeedback || "", waMessage: result.whatsappMessage })
        toast.success("Mesajınız analiz edildi!")
      } else {
        toast.error("Bir hata oluştu, lütfen tekrar deneyin.")
      }
    } catch (err: any) {
      toast.error(err.message || "Bir hata oluştu.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quoteForm.consent) {
      toast.error("Lütfen KVKK onayını işaretleyin.")
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitQuoteForm({
        ...quoteForm,
        kvkkAccepted: quoteForm.consent
      })
      
      if (result.success) {
        setAiResult({ feedback: result.clientFeedback || "", waMessage: result.whatsappMessage })
        toast.success("Teklif talebiniz analiz edildi!")
      } else {
        toast.error("Bir hata oluştu, lütfen tekrar deneyin.")
      }
    } catch (err: any) {
      toast.error(err.message || "Bir hata oluştu.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppRedirect = () => {
    if (aiResult) {
      const encoded = encodeURIComponent(aiResult.waMessage)
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
    }
  }

  if (aiResult) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="bg-primary/10 p-6 text-center border-b border-primary/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">Başvurunuz Alındı!</h2>
              <p className="text-muted-foreground">Yapay zeka asistanımız projenizi analiz etti.</p>
            </div>
            
            <CardContent className="p-8 space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-primary/40" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Yapay Zeka Teknik Analizi
                </h3>
                <p className="text-lg leading-relaxed text-foreground/90 italic">
                  "{aiResult.feedback}"
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-sm text-center text-muted-foreground">
                  Şimdi projenizi detaylandırmak için uzmanlarımıza WhatsApp üzerinden ulaşın.
                </p>
                <Button 
                  onClick={handleWhatsAppRedirect} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-8 text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span>WhatsApp ile Devam Et</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setAiResult(null)}
                  className="w-full text-muted-foreground hover:text-primary transition-colors"
                >
                  Yeni bir form doldur
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* İletişim Formu */}
          <Card className="border-0 shadow-lg overflow-hidden group">
            <div className="h-2 bg-primary w-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                <Send className="h-6 w-6 text-primary" />
                <span>İletişim Formu</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Genel sorularınız için bize yazın, yapay zeka asistanımız talebinizi anında analiz etsin.
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      placeholder="05xx xxx xxxx" 
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
                    disabled={isSubmitting}
                    placeholder="ornek@email.com" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Konu</Label>
                  <Input 
                    id="contact-subject" 
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    placeholder="Mesajınızı buraya yazın..." 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>

                <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <Checkbox 
                    id="contact-consent" 
                    disabled={isSubmitting}
                    checked={contactForm.consent}
                    onCheckedChange={(checked) => setContactForm({...contactForm, consent: checked === true})}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="contact-consent" className="text-xs font-medium leading-none cursor-pointer">
                      Kişisel verilerimin işlenmesine onay veriyorum.
                    </label>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Paylaştığınız veriler 6698 sayılı KVKK kapsamında hizmet standartlarımız gereği güvenle saklanmaktadır.
                    </p>
                  </div>
                </div>

                <Button disabled={isSubmitting} type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all active:scale-95">
                  {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analiz Ediliyor...</> : <>Talebi Analiz Et <Sparkles className="ml-2 h-5 w-5" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Teklif Formu */}
          <Card className="border-0 shadow-lg overflow-hidden group">
            <div className="h-2 bg-orange-500 w-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-orange-500" />
                <span>Teklif Talep Formu</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Projeniz için ücretsiz keşif ve AI destekli hızlı fiyat analizi talebi oluşturun.
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quote-service">Hizmet Türü *</Label>
                    <Select onValueChange={(val) => setQuoteForm({...quoteForm, service: val})} required disabled={isSubmitting}>
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
                    <Select onValueChange={(val) => setQuoteForm({...quoteForm, projectType: val})} disabled={isSubmitting}>
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
                    disabled={isSubmitting}
                    value={quoteForm.description}
                    onChange={(e) => setQuoteForm({...quoteForm, description: e.target.value})}
                  />
                </div>

                <div className="flex items-start space-x-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                  <Checkbox 
                    id="quote-consent" 
                    disabled={isSubmitting}
                    checked={quoteForm.consent}
                    onCheckedChange={(checked) => setQuoteForm({...quoteForm, consent: checked === true})}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="quote-consent" className="text-xs font-medium leading-none cursor-pointer">
                      Verilerimin teklif hazırlanması için işlenmesine onay veriyorum.
                    </label>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Burada topladığımız tüm bilgiler, KVKK çerçevesinde sadece size özel teklif sunmak ve iletişim kurmak için bünyemizde saklanmaktadır.
                    </p>
                  </div>
                </div>

                <Button disabled={isSubmitting} type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all active:scale-95">
                  {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analiz Ediliyor...</> : <>Projeyi Analiz Et <Sparkles className="ml-2 h-5 w-5" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-background rounded-full border border-border shadow-sm">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">Tüm işlemleriniz 256-bit SSL ve KVKK standartlarında korunmaktadır.</span>
            </div>
        </div>
      </div>
    </section>
  )
}