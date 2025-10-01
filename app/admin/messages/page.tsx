// app/admin/messages/page.tsx

import { AdminLayout } from "@/components/admin/admin-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { Message } from "@/types/message"; // Proje genelindeki Message tipini kullanıyoruz

// Sunucu tarafında Firestore'dan mesajları çekecek fonksiyon
async function getMessages(): Promise<Message[]> {
  const messagesCollection = collection(db, "messages");
  // Mesajları tarihe göre en yeniden en eskiye doğru sıralıyoruz
  const q = query(messagesCollection, orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);

  const messages = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Firestore Timestamp objesini JavaScript Date objesine çeviriyoruz
      date: (data.date as Timestamp)?.toDate(), 
    } as Message;
  });

  return messages;
}

export default async function MessagesPage() {
  const messages = await getMessages();

  // Tarihi "gün.ay.yıl" formatında göstermek için bir yardımcı fonksiyon
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Tarih Yok';
    return new Date(date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Gelen Mesajlar</CardTitle>
          <CardDescription>
            Web sitesi iletişim formundan gelen tüm mesajları burada görebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Durum</TableHead>
                <TableHead>Gönderen</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead className="text-right">Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <Badge variant={message.read ? "secondary" : "default"}>
                        {message.status === 'new' ? 'Yeni' : message.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell className="text-right">
                      {formatDate(message.date)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Henüz hiç mesaj yok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}