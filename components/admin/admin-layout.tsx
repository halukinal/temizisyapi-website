"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LayoutDashboard, FolderOpen, MessageSquare, Settings, LogOut, Menu, X, Home, BarChart3 } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, current: true },
    { name: "Projeler", href: "/admin/projects", icon: FolderOpen, current: false },
    { name: "Mesajlar", href: "/admin/messages", icon: MessageSquare, current: false },
    { name: "Raporlar", href: "/admin/reports", icon: BarChart3, current: false },
    { name: "Ayarlar", href: "/admin/settings", icon: Settings, current: false },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-background shadow-lg">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <h2 className="font-serif text-lg font-semibold text-primary">Admin Panel</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              </Button>
            ))}
          </nav>
        </div>
      </div>

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
                variant={item.current ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              </Button>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <Home className="mr-3 h-5 w-5" />
                Siteyi Görüntüle
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />
              Çıkış Yap
            </Button>
          </div>
        </Card>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between bg-background border-b px-4 lg:px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Hoş geldiniz, Admin</span>
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
  )
}
