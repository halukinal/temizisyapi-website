// app/admin/dashboard/page.tsx (Yeni ve Tam Hali)
export const dynamic = 'force-dynamic';

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BarChart3, Users, MessageSquare, FolderOpen, TrendingUp, Mail, ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from "firebase/firestore";
import { Project } from "@/types/project";
import { Message } from "@/types/message";

// Mentor Notu: Dashboard için gerekli tüm verileri tek bir asenkron fonksiyonda topluyoruz.
// Bu fonksiyon, sayfa render edilmeden önce sunucuda çalışacak.
async function getDashboardData() {
    // Promise.all kullanarak tüm veri çekme işlemlerini paralel olarak başlatıyoruz.
    // Bu, toplam bekleme süresini kısaltarak sayfa performansını artırır.
    const [projectsSnapshot, messagesSnapshot] = await Promise.all([
        getDocs(collection(db, "projects")),
        getDocs(collection(db, "messages"))
    ]);

    // İstatistikleri Hesapla
    const totalProjects = projectsSnapshot.size;
    const totalMessages = messagesSnapshot.size;
    const newMessagesCount = messagesSnapshot.docs.filter(doc => doc.data().status === 'new').length;

    // Son 3 Projeyi Al
    const recentProjectsQuery = query(collection(db, "projects"), orderBy("date", "desc"), limit(3));
    const recentProjectsSnapshot = await getDocs(recentProjectsQuery);
    const recentProjects: Project[] = recentProjectsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: (data.date as Timestamp)?.toDate() || new Date(),
        } as Project;
    });
    
    // Son 3 Mesajı Al
    const recentMessagesQuery = query(collection(db, "messages"), orderBy("date", "desc"), limit(3));
    const recentMessagesSnapshot = await getDocs(recentMessagesQuery);
    const recentMessages: Message[] = recentMessagesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
             date: (data.date as Timestamp)?.toDate() || new Date(),
            } as Message;
        });

    return {
        totalProjects,
        totalMessages,
        newMessagesCount,
        recentProjects,
        recentMessages
    };
}

// Zamanı "X saat önce", "Y gün önce" gibi formatlayan yardımcı fonksiyon
const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return "az önce";
    if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString("tr-TR");
};


export default async function AdminDashboard() {
    // Mentor Notu: Yine useEffect/useState yok! Verileri doğrudan sunucuda çekip kullanıyoruz.
    const {
        totalProjects,
        newMessagesCount,
        recentProjects,
        recentMessages
    } = await getDashboardData();
    
    // Kartlar için statik verilerle dinamik verileri birleştiriyoruz.
    const statsCards = [
        { title: "Toplam Proje", value: totalProjects.toString(), icon: FolderOpen, color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
        { title: "Yeni Mesajlar", value: newMessagesCount.toString(), icon: MessageSquare, color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/50" },
        // Bu kartları ileride daha dinamik hale getirebiliriz
        { title: "Bu Ay Teklif", value: "8", icon: BarChart3, color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/50" },
        { title: "Müşteri Memnuniyeti", value: "98%", icon: Users, color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-primary">Dashboard</h1>
                    <p className="text-muted-foreground">Temizişyapı yönetim paneline genel bakış.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Son Mesajlar */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-serif">Son Mesajlar</CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/messages">
                                    Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {recentMessages.length > 0 ? recentMessages.map((message) => (
                                    <Link href="/admin/messages" key={message.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'quote' ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-green-100 dark:bg-green-900/50'}`}>
                                            {message.type === 'quote' ? <FolderOpen className="h-5 w-5 text-blue-600" /> : <Mail className="h-5 w-5 text-green-600" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{message.name}</p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {message.subject || "Teklif Talebi"}
                                            </p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{formatRelativeTime(message.date)}</div>
                                    </Link>
                                )) : <p className="text-sm text-muted-foreground text-center py-4">Yeni mesaj bulunmuyor.</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Son Projeler */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-serif">Son Projeler</CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/projects">
                                    Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentProjects.length > 0 ? recentProjects.map((project) => (
                                    <Link href="/admin/projects" key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                                        <div>
                                            <p className="text-sm font-medium">{project.title}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge variant="outline">{project.category}</Badge>
                                                {project.featured && <Badge>Öne Çıkan</Badge>}
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{project.date.toLocaleDateString("tr-TR")}</div>
                                    </Link>
                                )) : <p className="text-sm text-muted-foreground text-center py-4">Henüz proje eklenmemiş.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}