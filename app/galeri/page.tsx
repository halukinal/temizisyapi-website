// app/galeri/page.tsx (Yeni ve Tam Hali)

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Project } from "@/types/project";
import type { Metadata } from "next";
import { GalleryClientContent } from "./gallery-client-content";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri | Bursa Cam Balkon, Giyotin ve Alüminyum Sistemleri | Temizişyapı",
  description: "Bursa cam balkon, bursa pimapen, giyotin cam sistemi ve kış bahçesi projelerimizin görselleri. En iyi bursa usta işçiliğiyle hazırlanan galerimizi inceleyin.",
};

import client, { getAssetsUrl } from "@/lib/directus";
import { readItems } from "@directus/sdk";

// Directus'dan veri çek
async function getProjects(): Promise<Project[]> {
    try {
        // 'galeri' koleksiyonundan verileri çek
        const response = await client.request(
            readItems('galeri', {
                fields: ['*', { images: ['directus_files_id'] }],
            })
        );

        // SDK versiyonuna göre response direkt dizi veya { data: [] } olabilir
        const items = Array.isArray(response) ? response : (response as any).data || [];

        if (!items || items.length === 0) {
            console.log("Directus: Hiç veri bulunamadı veya izin hatası.");
            return [];
        }

        return items.map((item: any) => {
            const thumbnail = item.thumbnail ? getAssetsUrl(item.thumbnail) : "";
            
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
                title: item.title || "İsimsiz Proje",
                description: item.description || "",
                category: (item.category || "PVC") as Project["category"],
                images: images,
                thumbnail: thumbnail,
                date: new Date(item.date_created || item.date || Date.now()),
                location: item.location || "",
                featured: !!item.featured,
                imagePaths: [],
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