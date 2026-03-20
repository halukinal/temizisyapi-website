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
import { Message } from "@/types/message";
// Firebase REST API ile mesajları çekme (Cloudflare Workers uyumlu)
async function getMessages(): Promise<Message[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (!projectId || !fbApiKey) {
      return [];
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/messages?key=${fbApiKey}&orderBy=date desc`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = await res.json() as { documents?: any[] };
    if (!data.documents) return [];

    return data.documents.map((doc: any) => {
      const fields = doc.fields || {};
      return {
        id: doc.name.split("/").pop() || "",
        name: fields.name?.stringValue || "",
        email: fields.email?.stringValue || "",
        phone: fields.phone?.stringValue || "",
        message: fields.message?.stringValue || "",
        subject: fields.subject?.stringValue || "İletişim Formu",
        type: (fields.type?.stringValue || "contact") as Message["type"],
        status: fields.status?.stringValue || "new",
        read: fields.read?.booleanValue || false,
        aiSummary: fields.aiSummary?.stringValue || "",
        date: new Date(fields.date?.timestampValue || Date.now()),
      } as Message;
    });
  } catch (error) {
    console.error("Mesajlar (REST) alınamadı:", error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

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
                <TableHead>Konu</TableHead>
                <TableHead>AI Özeti</TableHead>
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
                    <TableCell className="text-sm">{message.subject}</TableCell>
                    <TableCell className="max-w-xs truncate text-xs text-muted-foreground italic">
                      {message.aiSummary || "Özet yok"}
                    </TableCell>
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