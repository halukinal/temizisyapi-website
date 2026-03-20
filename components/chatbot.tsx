"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bot, X, MessageSquare, Send, Loader2, PlusCircle, RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { chatWithAssistant, generateWhatsAppSummary } from "@/actions/chatActions"
import { db as firebaseDb, auth as firebaseAuth } from "@/lib/firebase"

interface ChatMessage {
  role: "user" | "model"
  content: string
}

export function Chatbot({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(embedded)
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
  const [userContext, setUserContext] = useState<string | null>(null)
  const router = useRouter()
  
  const initialBotMessage: ChatMessage = { 
    role: "model", 
    content: "Merhaba! 👋 Tekrar hoş geldiniz. Sizin için yeni bir sayfa açtım. Size nasıl yardımcı olabilirim?" 
  }

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
        // Önceki aktif konuşmayı ve kullanıcı bağlamını yükle
        await loadChatHistory(user.uid);
        await loadUserContext(user.uid);
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

  // Kullanıcıyı tanımak için arşivleri kontrol et
  const loadUserContext = async (uid: string) => {
    if (!firebaseDb) return;
    try {
      const { query, collection, where, orderBy, limit, getDocs } = require("firebase/firestore");
      // Son 1 arşivlenmiş konuşmayı getir
      const q = query(
        collection(firebaseDb, "archived_chats"), 
        where("uid", "==", uid), 
        orderBy("archivedAt", "desc"), 
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const lastChat = snapshot.docs[0].data();
        const summary = lastChat.messages.slice(-5).map((m: any) => `${m.role}: ${m.content}`).join(" | ");
        setUserContext(`Daha önce şu konulardan bahsetmişti: ${summary}`);
      }
    } catch (error) {
      console.error("Error loading user context:", error);
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

  // 4. Yeni Sohbet Başlatma (Ekranı temizle ama kullanıcıyı unutma)
  const handleNewChat = async () => {
    if (!sessionId || !firebaseDb || messages.length <= 1) {
      setMessages([initialBotMessage]);
      return;
    }

    try {
      const { collection, addDoc, serverTimestamp } = require("firebase/firestore");
      // Mevcut konuşmayı arşive taşı
      await addDoc(collection(firebaseDb, "archived_chats"), {
        uid: sessionId,
        messages: messages,
        archivedAt: serverTimestamp()
      });

      // UI'ı temizle
      setMessages([initialBotMessage]);
      setIsWhatsAppReady(false);

      // Ana chat belgesini de temizle
      await syncChatToFirebase([initialBotMessage]);
    } catch (error) {
      console.error("New chat error:", error);
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
      
      const response = await chatWithAssistant(currentHistory, userMsg.content, userContext || undefined)
      
      if (response.isWhatsAppReady) {
        setIsWhatsAppReady(true)
      }

      const finalMessages: ChatMessage[] = [...updatedMessages, { role: "model", content: response.text }]
      setMessages(finalMessages)
      
      // Asistan cevabını anlık kaydet
      await syncChatToFirebase(finalMessages)

      // Eğer fiyatlandırma yönlendirmesi varsa
      if (response.isPricingRedirect) {
        setTimeout(() => {
          if (embedded) {
            // Gömülü moddayken direkt adrese git veya scroll yap (eğer aynı sayfadaysak)
            const element = document.getElementById('fiyat-hesapla');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              router.push("/yaptigimiz-isler/cam-balkon#fiyat-hesapla");
            }
          } else {
            router.push("/yaptigimiz-isler/cam-balkon#fiyat-hesapla");
          }
        }, 2000);
      }
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
      const whatsappUrl = `https://api.whatsapp.com/send?phone=905323882864&text=${encodedMessage}`;
      
      // iPhone/Safari için window.open bazen engellenir, bu yüzden direkt yönlendirme en güvenlisidir.
      // Mobilde zaten yeni sekmeye gerek yoktur, kullanıcı uygulamaya geçer.
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("Summary Generation Error", error)
      const fallbackUrl = `https://api.whatsapp.com/send?phone=905323882864&text=Merhaba,%20sitenizdeki%20asistan%20ile%20g%C3%B6r%C3%BC%C5%9Ft%C3%BCm,%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`;
      
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = fallbackUrl;
      } else {
        window.open(fallbackUrl, "_blank");
      }
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <div className={embedded ? "w-full" : "fixed bottom-6 right-6 lg:bottom-16 lg:right-16 z-50"}>
      {/* Kapalı Durumdaki İkon - Modern AI Button */}
      {!isOpen && !embedded && (
        <div className="relative group">
          {/* Pulsing outer ring for emphasis */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 rounded-full blur-lg opacity-40 group-hover:opacity-100 group-hover:blur-xl animate-pulse transition duration-1000"></div>
          
          <Button 
            onClick={() => setIsOpen(true)}
            className="relative rounded-full w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-tr from-indigo-600 via-purple-600 to-orange-500 hover:scale-110 active:scale-95 text-white shadow-2xl flex items-center justify-center transition-all duration-300 border border-white/30"
          >
            <div className="flex flex-col items-center justify-center">
              <Sparkles className="w-7 h-7 lg:w-9 lg:h-9 mb-0.5 animate-pulse" />
              <span className="text-[10px] lg:text-[11px] font-extrabold tracking-tighter uppercase leading-none">AI DESTEK</span>
            </div>
          </Button>

          {/* AI Badge */}
          <div className="absolute -top-1 -left-1 lg:-top-2 lg:-left-2 bg-white text-indigo-600 text-[10px] lg:text-[12px] font-black px-2 py-1 rounded-full border border-indigo-100 shadow-md">
            AI
          </div>
        </div>
      )}

      {/* Açık Durumdaki Chat Penceresi */}
      {isOpen && (
        <Card className={`${embedded ? "w-full min-h-[500px] h-full" : "w-[350px] sm:w-[400px] h-[600px]"} flex flex-col shadow-2xl border-primary/20 bg-background/95 backdrop-blur overflow-hidden animate-in slide-in-from-bottom-5 rounded-3xl`}>
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-primary-foreground p-5 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl">
                 <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-base font-bold tracking-tight">Temiziş Yapı Asistan</CardTitle>
                <div className="flex items-center space-x-1.5">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                   <p className="text-[11px] text-white/80 font-semibold uppercase tracking-wider">Aktif</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNewChat} 
                className="text-white hover:bg-white/20 rounded-full w-9 h-9"
                title="Yeni Sohbet Başlat"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              {!embedded && (
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full w-9 h-9">
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className={`flex-1 overflow-y-auto p-4 space-y-4 ${embedded ? 'bg-zinc-50/50 min-h-[300px]' : 'bg-zinc-50/30'}`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-4 text-[14px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-lg" 
                      : "bg-white text-zinc-800 border border-zinc-200 shadow-sm rounded-tl-none font-medium"
                  }`}
                >
                  {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => 
                    part.startsWith('**') && part.endsWith('**') 
                      ? <strong key={i} className="font-bold text-inherit">{part.slice(2, -2)}</strong> 
                      : part
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm">
                  <span className="flex space-x-1.5">
                    <span className="animate-bounce inline-block w-2 h-2 bg-indigo-400 rounded-full"></span>
                    <span className="animate-bounce inline-block w-2 h-2 bg-purple-400 rounded-full" style={{ animationDelay: '0.2s' }}></span>
                    <span className="animate-bounce inline-block w-2 h-2 bg-pink-400 rounded-full" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-4 border-t bg-white flex-col gap-3">
            {(isWhatsAppReady || messages.length > 3) && (
              <Button 
                onClick={handleWhatsAppRedirect} 
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg font-bold text-sm rounded-2xl transition-all hover:scale-[1.02]"
                disabled={isSummarizing}
              >
                {isSummarizing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Özetleniyor...</>
                ) : (
                  <><MessageSquare className="w-4 h-4 mr-2" /> Talebimi WhatsApp'a Aktar</>
                )}
              </Button>
            )}

            <form onSubmit={handleSendMessage} className="flex flex-row w-full gap-2">
              <Input 
                placeholder="Nasıl yardımcı olabilirim?" 
                className="flex-1 h-12 focus-visible:ring-indigo-500 rounded-2xl bg-zinc-100 border-none px-4" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="h-12 w-12 rounded-2xl shrink-0 bg-indigo-600 hover:bg-indigo-700 shadow-md">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </form>
            <p className="text-[10px] text-zinc-500 text-center mt-1">
              Konuşmalar kalite ve hizmet standartları gereği kayıt altına alınmaktadır.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
