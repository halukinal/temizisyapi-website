// app/admin/messages/page.tsx (Yeni ve Tam Hali)
export const dynamic = 'force-dynamic';

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { Message } from "@/types/message";
import { updateMessageStatus, deleteMessage } from "@/actions/messageActions";
import { Mail, MessageSquare, Phone, Calendar, Eye, Trash2, Home } from "lucide-react";
import Link from "next/link";

// Mentor Notu: Sunucu tarafında, sayfa render edilmeden önce verileri çekiyoruz.
async function getMessages(): Promise<Message[]> {
    const messagesCollection = collection(db, "messages");
    const q = orderBy("date", "desc");
    const messagesSnapshot = await getDocs(messagesCollection);

    return messagesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: (data.date as Timestamp)?.toDate().toLocaleString("tr-TR", {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) || 'Tarih Yok',
        } as Message;
    });
}

// Mentor Notu: Etkileşim gerektiren butonları kendi "use client" bileşenlerine ayırıyoruz.
// Bu sayede sayfanın geri kalanı sunucu bileşeni olarak kalabiliyor.
function MessageActionButtons({ message }: { message: Message }) {
    "use client";

    const handleUpdateStatus = async (status: Message['status']) => {
        const result = await updateMessageStatus(message.id, status);
        if (result.error) alert(`Hata: ${result.error}`);
    };

    const handleDelete = async () => {
        if (!confirm("Bu mesajı kalıcı olarak silmek istediğinizden emin misiniz?")) return;
        const result = await deleteMessage(message.id);
        if (result.error) alert(`Hata: ${result.error}`);
    };

    return (
        <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => handleUpdateStatus("processing")}>
                <Eye className="mr-2 h-4 w-4" />
                İşleme Al
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleUpdateStatus("replied")}>
                <Mail className="mr-2 h-4 w-4" />
                Yanıtlandı
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Sil
            </Button>
        </div>
    );
}

const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">Yeni</Badge>
      case "processing":
        return <Badge variant="secondary" className="bg-yellow-500 text-white">İşlemde</Badge>
      case "replied":
        return <Badge variant="default" className="bg-green-600">Yanıtlandı</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
};

export default async function AdminMessagesPage() {
    const allMessages = await getMessages();

    const contactMessages = allMessages.filter((m) => m.type === "contact");
    const quoteRequests = allMessages.filter((m) => m.type === "quote");

    const renderMessageCard = (message: Message) => (
        <Card key={message.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <CardTitle className="font-serif text-lg">{message.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{message.subject || message.projectDetails?.split('\n')[0] || "Teklif Talebi"}</p>
                    </div>
                    {getStatusBadge(message.status)}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>{message.email}</span></div>
                    {message.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>{message.phone}</span></div>}
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{message.date}</span></div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">
                    <p>{message.message || message.projectDetails}</p>
                </div>
                <MessageActionButtons message={message} />
            </CardContent>
        </Card>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-primary">Mesajlar</h1>
                    <p className="text-muted-foreground">İletişim formları ve teklif taleplerini yönetin</p>
                </div>
                
                {/* Mentor Notu: Filtreleme ve Arama işlemini bir sonraki adımda ekleyebiliriz.
                    Şimdilik mesajları iki ana gruba ayırarak listeliyoruz. */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* İletişim Mesajları Sütunu */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-primary" />
                            <h2 className="font-serif text-2xl font-semibold">İletişim Mesajları ({contactMessages.length})</h2>
                        </div>
                        {contactMessages.length > 0 
                            ? contactMessages.map(renderMessageCard) 
                            : <Card><CardContent className="p-8 text-center text-muted-foreground">Yeni iletişim mesajı yok.</CardContent></Card>}
                    </div>

                    {/* Teklif Talepleri Sütunu */}
                    <div className="space-y-4">
                         <div className="flex items-center gap-2">
                            <Home className="h-6 w-6 text-primary" />
                            <h2 className="font-serif text-2xl font-semibold">Teklif Talepleri ({quoteRequests.length})</h2>
                        </div>
                        {quoteRequests.length > 0
                            ? quoteRequests.map(renderMessageCard)
                            : <Card><CardContent className="p-8 text-center text-muted-foreground">Yeni teklif talebi yok.</CardContent></Card>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}