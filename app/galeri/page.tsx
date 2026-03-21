// app/galeri/page.tsx (Yeni ve Tam Hali)

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Project } from "@/types/project";
import { GalleryClientContent } from "./gallery-client-content";
export const dynamic = "force-dynamic";

import client, { getAssetsUrl } from "@/lib/directus";
import { readItems } from "@directus/sdk";

// Directus'dan veri çek
async function getProjects(): Promise<Project[]> {
    try {
        // 'galeri' koleksiyonundan verileri çek
        const items = await client.request(
            readItems('galeri', {
                fields: ['*', { images: ['directus_files_id'] }],
                sort: ['-date_created'],
            })
        );

        if (!items || items.length === 0) return [];

        return items.map((item: any) => {
            // Görsel URL'lerini oluştur
            const thumbnail = item.thumbnail ? getAssetsUrl(item.thumbnail) : "";
            
            // Eğer images alanı bir ilişki alanı ise (junction table), ID'leri ayıkla
            let images: string[] = [];
            if (Array.isArray(item.images)) {
                images = item.images.map((img: any) => 
                    getAssetsUrl(img.directus_files_id || img)
                );
            } else if (thumbnail) {
                images = [thumbnail];
            }

            return {
                id: item.id.toString(),
                title: item.title || "",
                description: item.description || "",
                category: (item.category || "PVC") as Project["category"],
                images: images,
                thumbnail: thumbnail,
                date: new Date(item.date_created || item.date || Date.now()),
                location: item.location || "",
                featured: item.featured || false,
                imagePaths: [], // Gerekirse doldurulabilir
            } as Project;
        });
    } catch (error) {
        console.error("Directus galeri verileri alınamadı:", error);
        return [];
    }
}


export default async function GalleryPage() {
    // Veriyi sunucuda çek
    const projects = await getProjects();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 bg-muted/30 dark:bg-muted/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">
                                Proje Galerimiz
                            </h1>
                            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                Yıllar içinde gerçekleştirdiğimiz başarılı projelerimizi keşfedin. Her proje, kalite ve mükemmellik anlayışımızın bir yansımasıdır.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mentor Notu: Tüm interaktif mantığı (filtreleme, tıklama, lightbox) 
                  GalleryClientContent adında bir istemci bileşenine taşıdık.
                  Sunucuda çektiğimiz proje verilerini bu bileşene bir prop olarak iletiyoruz.
                */}
                <GalleryClientContent projects={projects} />

            </main>
            <Footer />
        </div>
    );
}