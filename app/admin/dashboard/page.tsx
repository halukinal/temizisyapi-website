"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, MessageSquare, FolderOpen, TrendingUp, Mail, ArrowRight } from "lucide-react"

interface Stats {
  totalProjects: number
  activeProjects: number
  totalMessages: number
  newMessages: number
  monthlyProjects: number
  customerSatisfaction: number
}

interface Message {
  id: string
  type: string
  name: string
  email: string
  subject?: string
  projectType?: string
  date: string
  status: string
  read: boolean
}

interface Project {
  id: string
  title: string
  category: string
  date: string
  featured: boolean
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentMessages, setRecentMessages] = useState<Message[]>([])
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchDashboardData()
    } else {
      router.push("/admin")
    }
  }, [router])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, messagesRes, projectsRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/messages"),
        fetch("/api/projects"),
      ])

      const statsData = await statsRes.json()
      const messagesData = await messagesRes.json()
      const projectsData = await projectsRes.json()

      setStats(statsData.stats)
      setRecentMessages(messagesData.messages.slice(0, 3))
      setRecentProjects(projectsData.projects.slice(0, 3))
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>
  }

  const statsCards = [
    {
      title: "Toplam Proje",
      value: stats?.totalProjects.toString() || "0",
      change: "+12%",
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Bu Ay Teklif",
      value: stats?.monthlyProjects.toString() || "0",
      change: "+8%",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Bekleyen Mesaj",
      value: stats?.newMessages.toString() || "0",
      change: "Yeni",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Müşteri Memnuniyeti",
      value: `${stats?.customerSatisfaction || 0}%`,
      change: "+5%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return "Az önce"
    if (diffHours < 24) return `${diffHours} saat önce`
    if (diffDays === 1) return "1 gün önce"
    if (diffDays < 7) return `${diffDays} gün önce`
    return date.toLocaleDateString("tr-TR")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Temizişyapı yönetim paneline hoş geldiniz</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Son Mesajlar</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/messages">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.type === "quote" ? "bg-blue-100" : "bg-green-100"
                      }`}
                    >
                      {message.type === "quote" ? (
                        <BarChart3
                          className={`h-5 w-5 ${message.type === "quote" ? "text-blue-600" : "text-green-600"}`}
                        />
                      ) : (
                        <Mail className={`h-5 w-5 ${message.type === "quote" ? "text-blue-600" : "text-green-600"}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{message.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.subject || message.projectType || "Teklif Talebi"}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(message.date)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Son Projeler</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/projects">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{project.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        {project.featured && (
                          <Badge variant="default" className="text-xs">
                            Öne Çıkan
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{project.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent" asChild>
                <a href="/admin/projects">
                  <FolderOpen className="h-6 w-6" />
                  <span>Proje Yönetimi</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent" asChild>
                <a href="/admin/messages">
                  <MessageSquare className="h-6 w-6" />
                  <span>Mesajları Görüntüle</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent" asChild>
                <a href="/galeri">
                  <Users className="h-6 w-6" />
                  <span>Galeriyi Görüntüle</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
