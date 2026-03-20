// app/admin/dashboard/page.tsx (Yeni ve Tam Hali)
export const dynamic = 'force-dynamic';

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BarChart3, Users, MessageSquare, FolderOpen, TrendingUp, Mail, ArrowRight } from "lucide-react";
// Firebase REST API ile veri çekme (Cloudflare Workers uyumlu)
async function getDashboardData() {
    try {
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

        if (!projectId || !fbApiKey) {
            return { totalProjects: 0, totalMessages: 0, newMessagesCount: 0, recentProjects: [], recentMessages: [] };
        }

        // Firestore REST API endpoints
        const projectsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?key=${fbApiKey}&pageSize=100`;
        const messagesUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/messages?key=${fbApiKey}&pageSize=100`;

        const [projectsRes, messagesRes] = await Promise.all([
            fetch(projectsUrl, { cache: "no-store" }),
            fetch(messagesUrl, { cache: "no-store" })
        ]);

        const projectsData = projectsRes.ok ? await projectsRes.json() as any : { documents: [] };
        const messagesData = messagesRes.ok ? await messagesRes.json() as any : { documents: [] };

        const projects = (projectsData.documents || []).map((doc: any) => ({
            id: doc.name.split("/").pop(),
            title: doc.fields?.title?.stringValue || "",
            category: doc.fields?.category?.stringValue || "Diğer",
            featured: doc.fields?.featured?.booleanValue || false,
            date: new Date(doc.fields?.date?.timestampValue || Date.now())
        }));

        const messages = (messagesData.documents || []).map((doc: any) => ({
            id: doc.name.split("/").pop(),
            name: doc.fields?.name?.stringValue || "",
            type: doc.fields?.type?.stringValue || "contact",
            subject: doc.fields?.subject?.stringValue || "",
            status: doc.fields?.status?.stringValue || "new",
            date: new Date(doc.fields?.date?.timestampValue || Date.now())
        }));

        return {
            totalProjects: projects.length,
            totalMessages: messages.length,
            newMessagesCount: messages.filter((m: any) => m.status === 'new').length,
            recentProjects: projects.slice(0, 3),
            recentMessages: messages.slice(0, 3)
        };
    } catch (e) {
        console.error("Dashboard data fetch failed (REST):", e);
        return { totalProjects: 0, totalMessages: 0, newMessagesCount: 0, recentProjects: [], recentMessages: [] };
    }
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