"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  location: string
  date: string
  description: string
  images: string[]
  thumbnail: string
}

const projects: Project[] = [
  {
    id: "pvc-villa-project",
    title: "Villa PVC Kapı Pencere Projesi",
    category: "PVC",
    location: "Beşiktaş, İstanbul",
    date: "2024",
    description:
      "Modern villa için özel tasarım PVC kapı ve pencere sistemleri. Yüksek enerji verimliliği ve estetik görünüm.",
    images: [
      "/pvc-window-installation-modern-home.jpg",
      "/pvc-door-system-energy-efficient.jpg",
      "/pvc-balcony-door-installation.jpg",
    ],
    thumbnail: "/pvc-window-installation-modern-home.jpg",
  },
  {
    id: "aluminum-office-building",
    title: "Ofis Binası Alüminyum Cephe",
    category: "Alüminyum",
    location: "Maslak, İstanbul",
    date: "2024",
    description:
      "Modern ofis binası için alüminyum cephe sistemleri ve pencere uygulaması. Termal kesimli profiller kullanıldı.",
    images: [
      "/aluminum-window-modern-building.jpg",
      "/aluminum-curtain-wall-installation.jpg",
      "/aluminum-sliding-door-system.jpg",
    ],
    thumbnail: "/aluminum-window-modern-building.jpg",
  },
  {
    id: "glass-balcony-apartment",
    title: "Daire Cam Balkon Sistemi",
    category: "Cam Balkon",
    location: "Kadıköy, İstanbul",
    date: "2023",
    description:
      "Panoramik manzaralı daire için katlanır cam balkon sistemi. Tempered güvenlik camı ve paslanmaz aksesuar.",
    images: [
      "/glass-balcony-modern-apartment.jpg",
      "/glass-balcony-folding-system.jpg",
      "/glass-balcony-panoramic-view.jpg",
    ],
    thumbnail: "/glass-balcony-modern-apartment.jpg",
  },
  {
    id: "facade-commercial-center",
    title: "AVM Cephe Sistemleri",
    category: "Cephe",
    location: "Şişli, İstanbul",
    date: "2023",
    description:
      "Büyük ticaret merkezi için kompozit cephe ve cam cephe sistemleri. Yangın güvenliği sertifikalı malzemeler.",
    images: [
      "/facade-system-modern-office.jpg",
      "/curtain-wall-glass-building.jpg",
      "/composite-facade-installation.jpg",
    ],
    thumbnail: "/facade-system-modern-office.jpg",
  },
  {
    id: "pvc-residential-complex",
    title: "Konut Kompleksi PVC Sistemler",
    category: "PVC",
    location: "Ümraniye, İstanbul",
    date: "2023",
    description:
      "200 daireli konut kompleksi için PVC kapı pencere sistemleri. Toplu uygulama ile maliyet avantajı sağlandı.",
    images: [
      "/pvc-window-and-door-installation-energy-efficient.jpg",
      "/pvc-window-installation-modern-home.jpg",
      "/pvc-door-system-energy-efficient.jpg",
    ],
    thumbnail: "/pvc-window-and-door-installation-energy-efficient.jpg",
  },
  {
    id: "aluminum-industrial-facility",
    title: "Endüstriyel Tesis Alüminyum Doğrama",
    category: "Alüminyum",
    location: "Gebze, Kocaeli",
    date: "2022",
    description:
      "Büyük endüstriyel tesis için dayanıklı alüminyum kapı pencere sistemleri. Yangın çıkış kapıları dahil.",
    images: [
      "/aluminum-sliding-door-system.jpg",
      "/aluminum-window-modern-building.jpg",
      "/aluminum-curtain-wall-installation.jpg",
    ],
    thumbnail: "/aluminum-sliding-door-system.jpg",
  },
]

const categories = ["Tümü", "PVC", "Alüminyum", "Cam Balkon", "Cephe"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredProjects =
    selectedCategory === "Tümü" ? projects : projects.filter((project) => project.category === selectedCategory)

  const openLightbox = (project: Project, imageIndex = 0) => {
    setSelectedProject(project)
    setCurrentImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">
                Proje Galerimiz
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Yıllar içinde gerçekleştirdiğimiz başarılı projelerimizi keşfedin. Her proje, kalite ve mükemmellik
                anlayışımızın bir yansımasıdır.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary hover:bg-primary/90"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Bu kategoride henüz proje bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => openLightbox(project)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <Badge variant="secondary" className="absolute top-4 left-4 bg-background/90 text-foreground">
                        {project.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-semibold mb-2 text-balance group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 text-pretty line-clamp-2">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-4xl w-full p-0">
            {selectedProject && (
              <>
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="font-serif text-2xl text-balance">{selectedProject.title}</DialogTitle>
                </DialogHeader>

                <div className="relative">
                  {/* Image Display */}
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${selectedProject.title} - Görsel ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation Buttons */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-serif font-semibold mb-2">Proje Detayları</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{selectedProject.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedProject.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{selectedProject.date}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold mb-2">Açıklama</h4>
                        <p className="text-sm text-muted-foreground text-pretty">{selectedProject.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}
                  {selectedProject.images.length > 1 && (
                    <div className="px-6 pb-6">
                      <div className="flex space-x-2 overflow-x-auto">
                        {selectedProject.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex
                                ? "border-primary"
                                : "border-transparent hover:border-muted-foreground"
                            }`}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
