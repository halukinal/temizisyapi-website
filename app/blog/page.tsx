import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Alüminyum Doğrama Bakımı Nasıl Olmalıdır?",
      category: "Rehber",
      date: "24 Mart 2024",
      excerpt: "Alüminyum doğramalarınızın ömrünü uzatmak ve ilk günkü parlaklığını korumak için pratik temizlik ipuçları ve periyodik bakım önerileri.",
    },
    {
      id: 2,
      title: "Cam Balkon ve PVC'lerdeki İnatçı Etiketler Nasıl Çıkarılır?",
      category: "Pratik Bilgiler",
      date: "15 Mart 2024",
      excerpt: "Yeni montaj yapılmış cam veya profillerin üzerindeki koruyucu bantları ve etiketleri yüzeye zarar vermeden, kolayca çıkarmanın sırları.",
    },
    {
      id: 3,
      title: "Cam Balkon Sistemlerinde 2024 Trendleri",
      category: "Cam Balkon",
      date: "10 Şubat 2024",
      excerpt: "Modern yaşam alanları için en çok tercih edilen cam balkon modelleri, anten ve ısı yalıtım özellikli yeni nesil cam teknolojileri hakkında her şey.",
    },
    {
      id: 4,
      title: "Alüminyum Rengi ve Cam Seçiminde İdeal Kombinasyonlar",
      category: "İlham",
      date: "05 Şubat 2024",
      excerpt: "Evinizin cephesine en uygun alüminyum profil rengi ile cam rengini seçmenizi kolaylaştıracak profesyonel mimari tavsiyeler.",
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Blog & Haberler</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Sektördeki yenilikler, projelerimizden örnekler ve ürün seçiminde size yardımcı olacak rehber yazılarımızı keşfedin.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow border-primary/10">
                  <div className="h-48 bg-muted w-full rounded-t-xl relative overflow-hidden flex items-center justify-center">
                     <span className="text-muted-foreground/50 font-serif">Görsel Alanı</span>
                     <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                        {post.category}
                     </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                       <Calendar className="w-4 h-4 mr-2" />
                       {post.date}
                    </div>
                    <CardTitle className="leading-tight hover:text-primary transition-colors cursor-pointer">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base line-clamp-3 mb-6">
                      {post.excerpt}
                    </CardDescription>
                    <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 p-0 group" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
