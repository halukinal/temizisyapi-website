// app/admin/projects/page.tsx (Yeni ve Tam Hali)

import { Suspense } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, ImageIcon, Star } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { Project } from "@/types/project";
import { deleteProject } from "@/actions/projectActions";

// Mentor Notu: Bu fonksiyon artık bir "async function". Bu, Next.js'in bu bileşeni
// bir Sunucu Bileşeni olarak ele almasını ve içinde await kullanabilmemizi sağlar.
// "use client" direktifini kaldırdığımıza dikkat et!
async function getProjects(): Promise<Project[]> {
  const projectsCollection = collection(db, "projects");
  const q = orderBy("date", "desc");
  const projectsSnapshot = await getDocs(collection(db, "projects"));
  
  const projects = projectsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Firestore'dan gelen Timestamp objesini string'e çeviriyoruz.
      date: (data.date as Timestamp)?.toDate().toLocaleDateString("tr-TR") || 'Tarih Yok',
    } as Project;
  });
  
  return projects;
}


// Mentor Notu: Proje silme gibi istemci etkileşimi gerektiren kısımları
// kendi küçük "use client" bileşenlerine ayırıyoruz. Bu, Server Component'lerin
// temel prensibidir: Mümkün olduğunca sunucuda kal, sadece zorunluysan istemciye in.
function DeleteProjectButton({ projectId }: { projectId: string }) {
    "use client";
    
    // formAction kullanarak bir Server Action'ı çağırmak, 'use client' gerektirir.
    const deleteProjectAction = async () => {
        if (!confirm("Bu projeyi ve tüm görsellerini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
            return;
        }
        const result = await deleteProject(projectId);
        if (result.error) {
            alert(`Hata: ${result.error}`);
        } else {
            alert(result.message);
        }
    };

    return (
        <form action={deleteProjectAction}>
            <Button type="submit" variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-1 w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Sil
            </Button>
        </form>
    );
}


export default async function AdminProjectsPage() {
  // Mentor Notu: Artık useEffect veya useState yok! Veriyi doğrudan burada,
  // sayfa render edilmeden önce `await` ile çekiyoruz. Bu, daha hızlı sayfa yüklemesi
  // ve daha basit kod anlamına geliyor.
  const projects = await getProjects();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary">Projeler</h1>
            <p className="text-muted-foreground">Oluşturulan projeleri yönetin ve düzenleyin.</p>
          </div>
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Proje Ekle
            </Link>
          </Button>
        </div>
        
        {/* Projeler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
             <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">Henüz hiç proje oluşturulmamış.</p>
                </CardContent>
              </Card>
          ) : (
             projects.map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-serif text-lg text-balance">{project.title}</CardTitle>
                      {project.featured && (
                          <Badge variant="default" className="bg-amber-500 text-white ml-2 flex-shrink-0">
                            <Star className="mr-1 h-3 w-3" />
                            Öne Çıkan
                          </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2 text-sm text-muted-foreground">
                       <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{project.location}</span></div>
                       <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{project.date}</span></div>
                       <div className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /><span>{project.images.length} görsel</span></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <Link href={`/galeri#${project.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Görüntüle
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
                        <Edit className="mr-2 h-4 w-4" />
                        Düzenle
                      </Button>
                      <DeleteProjectButton projectId={project.id} />
                    </div>
                  </CardContent>
                </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}