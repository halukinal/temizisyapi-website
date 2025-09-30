// app/admin/projects/new/page.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createProject } from "@/actions/projectActions";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? "Oluşturuluyor..." : "Projeyi Oluştur"}
      <PlusCircle className="ml-2 h-4 w-4" />
    </Button>
  );
}

const initialState = { message: "", errors: {} };

export default function NewProjectPage() {
  const [state, formAction] = useFormState(createProject, initialState);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/projects"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="font-serif text-3xl font-bold text-primary">Yeni Proje Ekle</h1>
                    <p className="text-muted-foreground">Proje detaylarını ve görsellerini ekleyin.</p>
                </div>
            </div>
        </div>
        
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Proje Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Proje Başlığı *</Label>
                        <Input id="title" name="title" required placeholder="Örn: Modern Villa PVC Pencere Projesi"/>
                        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori *</Label>
                            <Select name="category" required>
                                <SelectTrigger id="category"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PVC">PVC</SelectItem>
                                    <SelectItem value="Alüminyum">Alüminyum</SelectItem>
                                    <SelectItem value="Cam Balkon">Cam Balkon</SelectItem>
                                    <SelectItem value="Cephe">Cephe</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.errors?.category && <p className="text-sm text-destructive">{state.errors.category[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Lokasyon *</Label>
                            <Input id="location" name="location" required placeholder="Örn: Beşiktaş, İstanbul"/>
                            {state.errors?.location && <p className="text-sm text-destructive">{state.errors.location[0]}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Açıklama *</Label>
                        <Textarea id="description" name="description" required placeholder="Proje hakkında detaylı bilgi verin..."/>
                        {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="images">Proje Görselleri *</Label>
                        <Input id="images" name="images" type="file" multiple required className="h-auto"/>
                        <p className="text-xs text-muted-foreground">Birden fazla görsel seçebilirsiniz. (Max: 4MB/dosya)</p>
                        {state.errors?.images && <p className="text-sm text-destructive">{state.errors.images[0]}</p>}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox id="featured" name="featured" />
                        <Label htmlFor="featured" className="font-normal">Bu projeyi ana sayfada ve galeride öne çıkar</Label>
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-4">
                         {state.message && (
                            <Badge variant={state.errors && Object.keys(state.errors).length > 0 ? "destructive" : "secondary"} className={state.errors && Object.keys(state.errors).length > 0 ? "" : "bg-green-100 text-green-800"}>
                                {state.message}
                            </Badge>
                        )}
                        <SubmitButton />
                    </div>
                </CardContent>
            </Card>
        </form>
      </div>
    </AdminLayout>
  );
}