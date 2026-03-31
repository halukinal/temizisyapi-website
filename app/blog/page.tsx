import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import client, { getAssetsUrl } from "@/lib/directus"
import { readItems } from "@directus/sdk"

// Directus'tan blog yazılarını çek
async function getBlogPosts() {
  try {
    const response = await client.request(
      readItems('blog', {
        fields: ['id', 'title', 'slug', 'category', 'excerpt', 'image', 'date_published'],
        filter: {
          status: { _eq: 'published' }
        },
        sort: ['-date_published']
      })
    )
    
    const items = Array.isArray(response) ? response : (response as any).data || []
    
    return items.map((item: any) => ({
      id: item.id,
      title: item.title || "Adsız Yazı",
      slug: item.slug || item.id.toString(),
      category: item.category || "Genel",
      date: item.date_published 
        ? new Date(item.date_published).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })
        : "Tarihsiz",
      excerpt: item.excerpt || "",
      image: item.image ? getAssetsUrl(item.image) : null
    }))
  } catch (error) {
    console.error("Directus blog verileri alınamadı:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

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
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Henüz blog yazısı eklenmemiş.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-all border-primary/10 overflow-hidden group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="h-48 bg-muted w-full relative overflow-hidden flex items-center justify-center">
                         {post.image ? (
                           <img 
                             src={post.image} 
                             alt={post.title} 
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                         ) : (
                           <span className="text-muted-foreground/50 font-serif">Görsel Yok</span>
                         )}
                         <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                            {post.category}
                         </div>
                      </div>
                    </Link>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                         <Calendar className="w-4 h-4 mr-2" />
                         {post.date}
                      </div>
                      <CardTitle className="leading-tight hover:text-primary transition-colors cursor-pointer">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base line-clamp-3 mb-6">
                        {post.excerpt}
                      </CardDescription>
                      <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 p-0 group" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
