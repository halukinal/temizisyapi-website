// app/api/projects/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Project } from "@/types/project"; // Veri modelimizi ayrı bir dosyadan alacağız

// Firestore'dan tüm projeleri getiren GET fonksiyonu
export async function GET() {
  try {
    const projectsCollection = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsCollection);
    const projects: Project[] = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// Firestore'a yeni proje ekleyen POST fonksiyonu
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = {
      ...body,
      date: new Date().toISOString(), // Veya Firestore Timestamp kullanabiliriz
      featured: body.featured || false,
    };
    
    const docRef = await addDoc(collection(db, "projects"), newProject);
    
    return NextResponse.json({ project: { id: docRef.id, ...newProject } }, { status: 201 });
  } catch (error) {
    console.error("Error adding project: ", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Firestore'daki bir projeyi güncelleyen PUT fonksiyonu
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...projectData } = body;

        if (!id) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        const projectDoc = doc(db, "projects", id);
        await updateDoc(projectDoc, projectData);

        return NextResponse.json({ project: { id, ...projectData } });
    } catch (error) {
        console.error("Error updating project: ", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

// Firestore'dan bir projeyi silen DELETE fonksiyonu
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await deleteDoc(doc(db, "projects", id));
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting project: ", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}