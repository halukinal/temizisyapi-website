import { NextResponse } from "next/server"

// Mock database for messages
let messages = [
  {
    id: "1",
    type: "contact",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "0532 123 4567",
    subject: "PVC Pencere Fiyat Teklifi",
    message: "Merhaba, 3+1 dairem için PVC pencere fiyat teklifi almak istiyorum.",
    date: "2024-03-20T10:30:00",
    status: "new",
    read: false,
  },
  {
    id: "2",
    type: "quote",
    name: "Mehmet Demir",
    email: "mehmet@example.com",
    phone: "0533 987 6543",
    projectType: "Cam Balkon",
    address: "Kadıköy, İstanbul",
    details: "Balkon için cam balkon sistemi montajı istiyorum. 6 metre genişliğinde.",
    date: "2024-03-19T14:15:00",
    status: "pending",
    read: true,
  },
]

export async function GET() {
  return NextResponse.json({ messages })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newMessage = {
      id: Date.now().toString(),
      ...body,
      date: new Date().toISOString(),
      status: "new",
      read: false,
    }
    messages.unshift(newMessage)
    return NextResponse.json({ message: newMessage }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const index = messages.findIndex((m) => m.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }
    messages[index] = { ...messages[index], ...body }
    return NextResponse.json({ message: messages[index] })
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
    messages = messages.filter((m) => m.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
