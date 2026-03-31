import client, { getAssetsUrl } from "@/lib/directus"
import { readItems } from "@directus/sdk"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Directus'tan tekil blog yazısını çek
async function getBlogPost(slug: string) {
  try {
    const response = await client.request(
      readItems('blog', {
        fields: ['*', { image: ['id'] }],
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        limit: 1
      })
    )
    
    const items = Array.isArray(response) ? response : (response as any).data || []
    if (items.length === 0) return null
    
    const item = items[0]
    return {
      id: item.id,
      title: item.title || "Adsız Yazı",
      category: item.category || "Genel",
      date: item.date_published 
        ? new Date(item.date_published).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })
        : "Tarihsiz",
      content: item.content || "",
      image: item.image ? getAssetsUrl(item.image.id || item.image) : null
    }
  } catch (error) {
    console.error("Directus blog detay verisi alınamadı:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <section className="py-16 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline flex items-center mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Blog'a Dön
            </Link>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
               <Calendar className="w-4 h-4 mr-2" />
               <span className="mr-4">{post.date}</span>
               <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground text-balance">
              {post.title}
            </h1>
          </div>
        </section>

        {post.image && (
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full aspect-video object-cover rounded-xl shadow-md"
              />
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div 
              className="prose prose-slate lg:prose-lg text-foreground/90 font-light leading-relaxed max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
