// app/galeri/page.tsx (Yeni ve Tam Hali)

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { Project } from "@/types/project";
import { GalleryClientContent } from "./gallery-client-content"; // İnteraktif bileşeni birazdan oluşturacağız

// Mentor Notu: Sayfamız artık bir Sunucu Bileşeni. Verileri doğrudan burada,
// sunucu tarafında çekiyoruz. Bu, SEO için harikadır ve sayfanın ilk yüklenmesini hızlandırır.
async function getProjects(): Promise<Project[]> {
    const projectsCollection = collection(db, "projects");
    const q = orderBy("date", "desc");
    const projectsSnapshot = await getDocs(q);

    return projectsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Firestore Timestamp'i okunabilir bir string'e çeviriyoruz
            date: (data.date as Timestamp)?.toDate().getFullYear().toString() || 'Tarih Yok',
        } as Project;
    });
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