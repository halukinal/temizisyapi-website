import { NextResponse } from "next/server"

// Mock admin credentials - in production, use proper authentication
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, use hashed passwords
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // In production, generate a proper JWT token
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

      return NextResponse.json({
        success: true,
        token,
        user: { username, role: "admin" },
      })
    }

    return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Giriş yapılırken bir hata oluştu" }, { status: 500 })
  }
}
