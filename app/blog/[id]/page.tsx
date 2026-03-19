import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const fullBlogPosts = [
  {
    id: "1",
    title: "Alüminyum Doğrama Bakımı Nasıl Olmalıdır?",
    category: "Rehber",
    date: "24 Mart 2024",
    content: `
      Alüminyum doğramalar, dayanıklılığı ve estetik görünümü sayesinde modern mimaride sıkça tercih edilir. Ancak uzun yıllar ilk günkü performansını koruyabilmesi için periyodik bakım şarttır. Kış aylarından sonra veya yoğun tozlu mevsim geçişlerinde mutlaka yüzey temizliği yapılmalıdır.
      
      **Temizlikte Nelere Dikkat Edilmeli?**
      - Kesinlikle aşındırıcı (asit, çamaşır suyu, tiner vb.) kimyasallar kullanmayın.
      - Çizilmeyi önlemek adına yumuşak yapılı bezler (mikrofiber gibi) tercih edin.
      - Temizlik suyunuz ılık olmalı ve asidik/seyreltici olmayan hafif deterjanlar içermelidir.
      
      **Hareketli Parçaların Bakımı**
      Menteşe, kilit ve fitiller zamanla tozlanabilir. Bu bölgeleri temizledikten sonra uygun silikon spreylerle yağlarsanız kapı ve pencerelerinizin ömrü uzayacaktır. Ayrıca tahliye deliklerinde su birikmemesi için düzenli olarak kontrol edilmeli, yaprak veya yabancı cisimlerle tıkanmışsa açılmalıdır.
    `
  },
  {
    id: "2",
    title: "Cam Balkon ve PVC'lerdeki İnatçı Etiketler Nasıl Çıkarılır?",
    category: "Pratik Bilgiler",
    date: "15 Mart 2024",
    content: `
      Yeni montajı yapılmış cam balkonlar, kış bahçeleri veya pvc pencerelerin üzerinde sıklıkla koruyucu bantlar, etiketler veya silikon/köpük lekeleri kalabilir. Bu lekeleri çıkarmaya çalışırken doğru yöntemleri bilmek, profillerde oluşabilecek geri dönüşü olmayan çizikleri önler.
      
      **Zarar Vermeden Çıkarma Yöntemleri:**
      1. **Isı ile Çıkarma (Fön Makinesi):**
         Sertleşmiş etiket veya koruyucu bant tortularını sıcak hava tutarak esnetin. Isıdan dolayı yapışkan gevşediğinde tek bir köşeden nazikçe sıyırın (Bu işlem sırasında kesinlikle keskin cisim veya falçata kullanmayın!).
         
      2. **Saf Alkol veya Kolonya Kullanımı:**
         Isıya rağmen kalan ufak yapışıcı kalıntılarını çıkarmak için temiz bir beze ufak bir miktar saf alkol ya da kolonya dökün ve narin hareketlerle yüzeyi lekeler eriyene dek ovalayın.
         
      3. **Bulaşık Suyu / Sabun Çözümleri:**
         Cam üzerindeki basit bant kalıntıları için ilk denenmesi gereken yöntemdir. Yüzeyi ıslatıp bir miktar bekttikten sonra plastik bir silecek veya bulaşık süngerinin yumuşak tarafı ile temizleyebilirsiniz.
         
      Sert bir kimyasal maddeden (selülozik tiner gibi) profil yüzeylerinde renk bozulmalarına neden olabileceği için kaçınınız.
    `
  },
  {
    id: "3",
    title: "Cam Balkon Sistemlerinde 2024 Trendleri",
    category: "Cam Balkon",
    date: "10 Şubat 2024",
    content: `
      2024 yılı itibariyle standart şeffaf camlı balkon konsepti yerini çok daha teknolojik ve mimari bütünlük sağlayan çözümlere bırakıyor.
      
      - **Isıcamlı (Çift Cam) Sistemler:** Artık cam balkonlar yalnızca yazın değil soğuk kış günlerinde de etkin kullanılabiliyor. Yeni nesil sistemler yalıtım değerlerini maksimuma çıkarıyor.
      - **Otomatik Giyotin Sistemler:** Motorlu "giyotin cam" adı verilen dikey hareket edebilen sistemler restoran ve kış bahçelerinden sonra konut balkonlarında da şık ve pratik bir çözüm olarak sık tercih ediliyor.
      - **Füme ve Bronz Cam Modası:** Özellikle antrasit ve siyah profillerde füme renkte cam kullanılması, dışarıdan bakıldığında dış yansımayı artırdığı için içerisinin daha az görünmesini sağlıyor.
    `
  },
  {
    id: "4",
    title: "Alüminyum Rengi ve Cam Seçiminde İdeal Kombinasyonlar",
    category: "İlham",
    date: "05 Şubat 2024",
    content: `
      Evinizin mimari yapısıyla uyumlu bir profil ve cam rengi seçimi dekorasyonun en kritik parçasıdır. Gelin ideal uyumları birlikte inceleyelim:
      
      - **Modern ve Asil (Antrasit Profil & Füme Cam):** Son yıllarda en revaçta olan kombinasyondur. Yeni binalarda, villalarda veya çok lüks ofis sistemlerinde birinci terih olarak karşımıza çıkıyor.
      - **Klasik ama Şık (Beyaz Profil & Şeffaf Cam):** Işığı maksimum derecede içeriye almak isteyenler için geniş, ferah bir görünüm sağlar.
      - **Sıcak ve Organik (Ahşap Çizgisi & Bronz Cam):** Yazlıklarda, taş kaplamalı cephelerde doğa ile iç içe, çok sıcak ve retro bir his oluşturur.
    `
  }
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = fullBlogPosts.find((p) => p.id === params.id)
  
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

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-slate lg:prose-lg whitespace-pre-line text-foreground/90 font-light leading-relaxed">
              {post.content}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
