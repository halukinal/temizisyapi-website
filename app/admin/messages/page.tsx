"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Mail, MessageSquare, Phone, Calendar, Eye, Trash2 } from "lucide-react"

interface Message {
  id: string
  type: string
  name: string
  email: string
  phone: string
  subject?: string
  message?: string
  projectType?: string
  address?: string
  details?: string
  date: string
  status: string
  read: boolean
}

export default function AdminMessages() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchMessages()
    } else {
      router.push("/admin")
    }
  }, [router])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const message = messages.find((m) => m.id === id)
      if (!message) return

      const response = await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...message, status, read: true }),
      })

      if (response.ok) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, status, read: true } : m)))
      }
    } catch (error) {
      console.error("[v0] Error updating message:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMessages(messages.filter((m) => m.id !== id))
      }
    } catch (error) {
      console.error("[v0] Error deleting message:", error)
    }
  }

  if (!isAuthenticated || loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>
  }

  const contactMessages = messages.filter((m) => m.type === "contact")
  const quoteRequests = messages.filter((m) => m.type === "quote")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">Yeni</Badge>
      case "processing":
        return <Badge variant="secondary">İşlemde</Badge>
      case "replied":
        return <Badge variant="default">Yanıtlandı</Badge>
      case "pending":
        return <Badge variant="secondary">Beklemede</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Mesajlar</h1>
          <p className="text-muted-foreground">İletişim formları ve teklif taleplerini yönetin</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Mesaj ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Durum seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="new">Yeni</SelectItem>
                  <SelectItem value="processing">İşlemde</SelectItem>
                  <SelectItem value="replied">Yanıtlandı</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages Tabs */}
        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>İletişim Mesajları ({contactMessages.length})</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Teklif Talepleri ({quoteRequests.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            {contactMessages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-serif text-lg">{message.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{message.subject || "İletişim Mesajı"}</p>
                    </div>
                    <div className="flex items-center space-x-2">{getStatusBadge(message.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{message.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(message.date).toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(message.id, "processing")}>
                        <Eye className="mr-2 h-4 w-4" />
                        İşlemde
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(message.id, "replied")}>
                        <Mail className="mr-2 h-4 w-4" />
                        Yanıtlandı
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {contactMessages.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">Henüz iletişim mesajı bulunmuyor.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            {quoteRequests.map((quote) => (
              <Card key={quote.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-serif text-lg">{quote.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{quote.projectType || "Teklif Talebi"}</p>
                    </div>
                    <div className="flex items-center space-x-2">{getStatusBadge(quote.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{quote.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{quote.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(quote.date).toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                    {quote.address && (
                      <div className="text-sm">
                        <span className="font-medium">Lokasyon:</span> {quote.address}
                      </div>
                    )}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-line">{quote.details}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(quote.id, "processing")}>
                        <Eye className="mr-2 h-4 w-4" />
                        İşlemde
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(quote.id, "replied")}>
                        <Mail className="mr-2 h-4 w-4" />
                        Teklif Gönderildi
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDelete(quote.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {quoteRequests.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">Henüz teklif talebi bulunmuyor.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
