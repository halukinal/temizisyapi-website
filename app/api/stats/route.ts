import { NextResponse } from "next/server"

export async function GET() {
  // Mock statistics - in production, calculate from actual database
  const stats = {
    totalProjects: 156,
    activeProjects: 12,
    totalMessages: 48,
    newMessages: 8,
    monthlyProjects: 15,
    customerSatisfaction: 98,
  }

  return NextResponse.json({ stats })
}
