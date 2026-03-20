"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, MessageSquare, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { chatWithAssistant, generateWhatsAppSummary } from "@/actions/chatActions"
import { db as firebaseDb, auth as firebaseAuth } from "@/lib/firebase"

interface ChatMessage {
  role: "user" | "model"
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([{ 
    role: "model", 
    content: "Merhaba! 👋 Ben Temiziş Yapı dijital asistanınızım. Size Cam Balkon, PVC ve Alüminyum sistemleri gibi her konuda yardımcı olabilirim.\n\n⚠️ Kişisel verilerinizin korunması ve kalite standartlarımız gereği, bu görüşme **Temiziş Yapı** tarafından kayıt altına alınmaktadır.\n\nSize nasıl yardımcı olabilirim?" 
  }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  
  // `isWhatsAppReady` eğer sistem "tamam artık bilgileri aldım" derse aktif olur. 
  // Ya da müşteri dilediği zaman tıklasın diye hep açık da tutabiliriz ama asistan bunu da yönetebilir.
  const [isWhatsAppReady, setIsWhatsAppReady] = useState(false) 
  const [sessionId, setSessionId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 1. Firebase Anonim Giriş ve Session Başlatma
  useEffect(() => {
    if (!firebaseAuth) return;
    
    // Fonksiyonları içeride require ediyoruz
    const { onAuthStateChanged, signInAnonymously } = require("firebase/auth");

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user: any) => {
      if (user) {
        setSessionId(user.uid);
        // Önceki konuşmayı yükle
        await loadChatHistory(user.uid);
      } else {
        try {
          await signInAnonymously(firebaseAuth);
        } catch (error) {
          console.error("Firebase Auth Error:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Geçmişi Firestore'dan Çekme
  const loadChatHistory = async (uid: string) => {
    if (!firebaseDb) return;
    try {
      const { getDoc, doc } = require("firebase/firestore");
      const chatDoc = await getDoc(doc(firebaseDb, "chats", uid));
      if (chatDoc.exists()) {
        const data = chatDoc.data();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  // 3. Konuşmayı Firestore'da Güncelleme (Yardımcı Fonksiyon)
  const syncChatToFirebase = async (newMessages: ChatMessage[]) => {
    if (!sessionId || !firebaseDb) {
      console.warn("Firestore Sync: SessionId veya DB henüz hazır değil.");
      return;
    }
    
    try {
      const { setDoc, doc, serverTimestamp } = require("firebase/firestore");
      await setDoc(doc(firebaseDb, "chats", sessionId), {
        messages: newMessages,
        lastUpdated: serverTimestamp(),
        ipHint: "session-based"
      }, { merge: true });
      console.log("Firestore Sync: Konuşma başarıyla güncellendi.");
    } catch (error) {
      console.error("Firestore sync error:", error);
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: ChatMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    // Kullanıcı mesajını anlık kaydet
    await syncChatToFirebase(updatedMessages)

    try {
      // Önemli: Geçmiş (history) olarak yeni mesajı EKLEMEDEN önceki halini gönderiyoruz.
      // Çünkü yeni mesaj 'newMessage' parametresiyle ayrıca gidecek.
      const currentHistory = messages.slice(-15); 
      
      const response = await chatWithAssistant(currentHistory, userMsg.content)
      
      if (response.isWhatsAppReady) {
        setIsWhatsAppReady(true)
      }

      const finalMessages: ChatMessage[] = [...updatedMessages, { role: "model", content: response.text }]
      setMessages(finalMessages)
      
      // Asistan cevabını anlık kaydet
      await syncChatToFirebase(finalMessages)
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, { role: "model", content: "Üzgünüm, şu an bağlantıda bir hata oluştu. Dilerseniz direkt butona basarak WhatsApp üzerinden uzmanımızla iletişime geçebilirsiniz." }])
      setIsWhatsAppReady(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppRedirect = async () => {
    setIsSummarizing(true)
    try {
      // Konuşma özetini "transcripts" koleksiyonuna ek bir kayıt olarak atalım
      try {
        const { collection, addDoc, serverTimestamp } = require("firebase/firestore");
        const historyText = messages.map(msg => `${msg.role === 'user' ? 'Müşteri' : 'Asistan'}: ${msg.content}`).join('\n')
        await addDoc(collection(firebaseDb, "chat_transcripts"), {
          sessionId: sessionId,
          type: 'chatbot_conversation',
          transcript: historyText,
          date: serverTimestamp(),
          source: 'whatsapp_redirect',
          read: false
        })
      } catch (dbError) {
        console.error("Firebase kayıt hatası:", dbError)
        // Firebase hatası WhatsApp akışını engellemez
      }

      const summary = await generateWhatsAppSummary(messages)
      const encodedMessage = encodeURIComponent(summary)
      window.open(`https://wa.me/905323882864?text=${encodedMessage}`, "_blank")
    } catch (error) {
      console.error("Summary Generation Error", error)
      window.open(`https://wa.me/905323882864?text=Merhaba,%20sitenizdeki%20asistan%20ile%20g%C3%B6r%C3%BC%C5%9Ft%C3%BCm,%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`, "_blank")
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Kapalı Durumdaki İkon */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}

      {/* Açık Durumdaki Chat Penceresi */}
      {isOpen && (
        <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-2xl border-primary/20 bg-background/95 backdrop-blur overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <div>
                <CardTitle className="text-base font-semibold">Temiz İş AI Asistan</CardTitle>
                <p className="text-xs text-primary-foreground/80">Canlı Destek & Keşif</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full w-8 h-8">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none shadow-md" 
                      : "bg-muted text-foreground border border-border shadow-sm rounded-tl-none font-medium"
                  }`}
                >
                  {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => 
                    part.startsWith('**') && part.endsWith('**') 
                      ? <strong key={i}>{part.slice(2, -2)}</strong> 
                      : part
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border rounded-2xl rounded-tl-none p-3 max-w-[85%] text-sm flex items-center shadow-sm">
                  <span className="flex space-x-1">
                    <span className="animate-bounce inline-block w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                    <span className="animate-bounce inline-block w-1.5 h-1.5 bg-zinc-400 rounded-full" style={{ animationDelay: '0.2s' }}></span>
                    <span className="animate-bounce inline-block w-1.5 h-1.5 bg-zinc-400 rounded-full" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-background/50 flex-col gap-2">
            {(isWhatsAppReady || messages.length > 3) && (
              <Button 
                onClick={handleWhatsAppRedirect} 
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow font-semibold"
                disabled={isSummarizing}
              >
                {isSummarizing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Özetleniyor...</>
                ) : (
                  <><MessageSquare className="w-4 h-4 mr-2" /> Talebimi WhatsApp'a Aktar</>
                )}
              </Button>
            )}

            <form onSubmit={handleSendMessage} className="flex flex-row w-full gap-2 mt-1">
              <Input 
                placeholder="Mesajınızı yazın..." 
                className="flex-1 focus-visible:ring-primary rounded-full" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-full shrink-0">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
            <p className="text-[10px] text-muted-foreground text-center mt-1">
              Konuşmalar kalite ve hizmet standartları gereği kayıt altına alınmaktadır.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
