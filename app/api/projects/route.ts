import { NextResponse } from "next/server"

// Mock database - in production, this would be replaced with actual database
let projects = [
  {
    id: "1",
    title: "Modern Villa PVC Pencere Montajı",
    category: "PVC",
    description: "Lüks villada enerji tasarruflu PVC pencere ve kapı sistemleri montajı",
    images: ["/pvc-window-installation-modern-home.jpg"],
    date: "2024-03-15",
    location: "İstanbul, Beşiktaş",
    featured: true,
  },
  {
    id: "2",
    title: "Ofis Binası Alüminyum Cephe",
    category: "Alüminyum",
    description: "Ticari ofis binası için alüminyum cephe kaplama sistemi",
    images: ["/aluminum-curtain-wall-installation.jpg"],
    date: "2024-03-10",
    location: "İstanbul, Maslak",
    featured: true,
  },
  {
    id: "3",
    title: "Cam Balkon Sistemi",
    category: "Cam Balkon",
    description: "Apartman dairesi için katlanır cam balkon montajı",
    images: ["/glass-balcony-modern-apartment.jpg"],
    date: "2024-03-05",
    location: "İstanbul, Kadıköy",
    featured: false,
  },
]

export async function GET() {
  return NextResponse.json({ projects })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProject = {
      id: Date.now().toString(),
      ...body,
      date: new Date().toISOString().split("T")[0],
    }
    projects.push(newProject)
    return NextResponse.json({ project: newProject }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const index = projects.findIndex((p) => p.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    projects[index] = { ...projects[index], ...body }
    return NextResponse.json({ project: projects[index] })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }
    projects = projects.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
