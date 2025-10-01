// app/galeri/gallery-client-content.tsx

"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Calendar, MapPin, X } from "lucide-react";

const categories = ["Tümü", "PVC", "Alüminyum", "Cam Balkon", "Cephe"];

export function GalleryClientContent({ projects }: { projects: Project[] }) {
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredProjects = selectedCategory === "Tümü" 
        ? projects 
        : projects.filter((project) => project.category === selectedCategory);

    const openLightbox = (project: Project, imageIndex = 0) => {
        setSelectedProject(project);
        setCurrentImageIndex(imageIndex);
    };

    const closeLightbox = () => setSelectedProject(null);

    const nextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

    return (
        <>
            {/* Filter Section */}
            <section className="py-8 bg-background border-b sticky top-[64px] z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
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
                            <p className="text-muted-foreground text-lg">Bu kategoride proje bulunamadı.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    onClick={() => openLightbox(project)}
                                >
                                    <div className="relative overflow-hidden aspect-video">
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        <Badge variant="secondary" className="absolute top-4 left-4">{project.category}</Badge>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="font-serif text-lg font-semibold mb-2 text-balance group-hover:text-primary">{project.title}</h3>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>{project.location}</span></div>
                                            <div className="flex items-center space-x-2"><Calendar className="h-4 w-4" /><span>{project.date.getFullYear()}</span></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Dialog */}
            <Dialog open={!!selectedProject} onOpenChange={closeLightbox}>
                <DialogContent className="max-w-4xl w-full p-0 gap-0">
                    {selectedProject && (
                        <>
                            <DialogHeader className="p-6 pb-2 flex-row items-start justify-between">
                                <DialogTitle className="font-serif text-2xl text-balance">{selectedProject.title}</DialogTitle>
                                <Button variant="ghost" size="icon" onClick={closeLightbox} className="flex-shrink-0 -mr-2 -mt-2">
                                    <X className="h-5 w-5"/>
                                </Button>
                            </DialogHeader>
                            <div className="relative aspect-video bg-muted">
                                <img
                                    src={selectedProject.images[currentImageIndex]}
                                    alt={`${selectedProject.title} - Görsel ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain"
                                />
                                {selectedProject.images.length > 1 && (
                                    <>
                                        <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background" onClick={prevImage}><ChevronLeft className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background" onClick={nextImage}><ChevronRight className="h-4 w-4" /></Button>
                                    </>
                                )}
                                <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {selectedProject.images.length}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-muted-foreground text-pretty">{selectedProject.description}</p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}