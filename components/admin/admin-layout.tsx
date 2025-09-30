// components/admin/admin-layout.tsx (Yeni ve Tam Hali)
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutDashboard, FolderOpen, MessageSquare, Settings, LogOut, Menu, X, Home, BarChart3, Loader2 } from "lucide-react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Mentor Notu: useEffect ve onAuthStateChanged kullanarak kullanıcının oturum durumunu
  // anlık olarak dinliyoruz. Bu, Firebase'in önerdiği en güvenli yöntemdir.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Kullanıcı giriş yapmış
        setUser(currentUser);
      } else {
        // Kullanıcı giriş yapmamış, giriş sayfasına yönlendir
        setUser(null);
        router.push("/admin");
      }
      setLoading(false);
    });

    // Component unmount olduğunda listener'ı temizle
    return () => unsubscribe();
  }, [router]);


  const handleLogout = async () => {
    await signOut(auth);
    // Yönlendirme zaten useEffect içinde yapılacak
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projeler", href: "/admin/projects", icon: FolderOpen },
    { name: "Mesajlar", href: "/admin/messages", icon: MessageSquare },
    { name: "Raporlar", href: "/admin/reports", icon: BarChart3 },
    { name: "Ayarlar", href: "/admin/settings", icon: Settings },
  ];
  
  // Oturum kontrol edilirken bir yükleme ekranı göster
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  
  // Oturum yoksa (ve yönlendirme henüz tamamlanmadıysa) içeriği gösterme
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ... (Mobile and Desktop Sidebar JSX - aynı kalabilir, sadece 'current' mantığını düzeltelim) ... */}
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <Card className="h-full rounded-none border-r">
          <div className="flex h-16 items-center px-6 border-b">
            <h2 className="font-serif text-lg font-semibold text-primary">Admin Panel</h2>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={pathname === item.href ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/" target="_blank" rel="noreferrer">
                <Home className="mr-3 h-5 w-5" />
                Siteyi Görüntüle
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />
              Çıkış Yap
            </Button>
          </div>
        </Card>
      </div>

      {/* ... (Main Content JSX - aynı kalabilir) ... */}
       <div className="lg:ml-64">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between bg-background border-b px-4 lg:px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Hoş geldiniz, {user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}