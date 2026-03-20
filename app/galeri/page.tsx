// app/galeri/page.tsx (Yeni ve Tam Hali)

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Project } from "@/types/project";
import { GalleryClientContent } from "./gallery-client-content";
export const dynamic = "force-dynamic";

// Firebase REST API ile Firestore'dan veri çek (Cloudflare Workers uyumlu)
async function getProjects(): Promise<Project[]> {
    try {
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
        if (!projectId || !apiKey) {
            console.warn("Firebase proje bilgileri eksik.");
            return [];
        }

        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?key=${apiKey}&orderBy=date desc`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [];

        const data = await res.json() as { documents?: FirestoreDoc[] };
        if (!data.documents) return [];

        return data.documents.map((doc: FirestoreDoc) => {
            const fields = doc.fields || {};
            return {
                id: doc.name.split("/").pop() || "",
                title: fields.title?.stringValue || "",
                description: fields.description?.stringValue || "",
                category: (fields.category?.stringValue || "PVC") as Project["category"],
                images: fields.images?.stringValue ? [fields.images.stringValue] : [],
                thumbnail: fields.thumbnail?.stringValue || fields.imageUrl?.stringValue || "",
                date: new Date(fields.date?.timestampValue || Date.now()),
                location: fields.location?.stringValue || "",
                featured: false,
                imagePaths: [],
            } as Project;
        });
    } catch (error) {
        console.error("Galeri verileri alınamadı:", error);
        return [];
    }
}

interface FirestoreDoc {
    name: string;
    fields: Record<string, { stringValue?: string; timestampValue?: string; integerValue?: string }>;
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