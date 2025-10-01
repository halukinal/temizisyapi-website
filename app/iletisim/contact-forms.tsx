// app/iletisim/contact-forms.tsx
'use client';

import { useFormState, useFormStatus } from "react-dom";
import { createContactMessage, createQuoteRequest } from "@/actions/messageActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Send, Calculator } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

function SubmitButton({ icon: Icon, pendingText, text }: { icon: React.ElementType, pendingText: string, text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending ? pendingText : text}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}

const initialState = { message: "", errors: {} };

export function ContactForms() {
  const { toast } = useToast();
  const contactFormRef = useRef<HTMLFormElement>(null);
  const quoteFormRef = useRef<HTMLFormElement>(null);

  const [contactState, contactFormAction] = useFormState(createContactMessage, initialState);
  const [quoteState, quoteFormAction] = useFormState(createQuoteRequest, initialState);

  useEffect(() => {
    if (contactState.message) {
      toast({
        title: contactState.errors && Object.keys(contactState.errors).length > 0 ? 'Hata!' : 'Başarılı!',
        description: contactState.message,
        variant: contactState.errors && Object.keys(contactState.errors).length > 0 ? 'destructive' : 'default',
      });
      if (!contactState.errors || Object.keys(contactState.errors).length === 0) {
        contactFormRef.current?.reset();
      }
    }
  }, [contactState, toast]);

  useEffect(() => {
    if (quoteState.message) {
      toast({
        title: quoteState.errors && Object.keys(quoteState.errors).length > 0 ? 'Hata!' : 'Başarılı!',
        description: quoteState.message,
        variant: quoteState.errors && Object.keys(quoteState.errors).length > 0 ? 'destructive' : 'default',
      });
      if (!quoteState.errors || Object.keys(quoteState.errors).length === 0) {
        quoteFormRef.current?.reset();
      }
    }
  }, [quoteState, toast]);

  return (
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
              <form ref={contactFormRef} action={contactFormAction} className="space-y-4">
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
                <SubmitButton text="Mesaj Gönder" pendingText="Gönderiliyor..." icon={Send} />
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
              <form ref={quoteFormRef} action={quoteFormAction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quote-name">Ad Soyad *</Label>
                    <Input id="quote-name" name="name" required />
                    {quoteState.errors?.name && <p className="text-sm text-destructive">{quoteState.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-phone">Telefon *</Label>
                    <Input id="quote-phone" name="phone" type="tel" required />
                    {quoteState.errors?.phone && <p className="text-sm text-destructive">{quoteState.errors.phone[0]}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-email">E-posta *</Label>
                  <Input id="quote-email" name="email" type="email" required />
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
                  <Textarea id="quote-description" name="description" placeholder="Metrekare, kat sayısı, özel istekler vb." rows={4} required />
                  {quoteState.errors?.description && <p className="text-sm text-destructive">{quoteState.errors.description[0]}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="consent" name="consent" required />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground">
                    Kişisel verilerimin işlenmesine ve iletişim kurulmasına onay veriyorum. *
                  </Label>
                </div>
                {quoteState.errors?.consent && <p className="text-sm text-destructive">{quoteState.errors.consent[0]}</p>}
                <SubmitButton text="Teklif Talep Et" pendingText="Gönderiliyor..." icon={Calculator} />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}