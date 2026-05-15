import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/db"

// GET /api/auth/me - get current user info
export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("auth-user-id")?.value
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    
    // Handle demo users
    if (userId.startsWith("demo-") || userId.startsWith("user-")) {
      return NextResponse.json({
        id: userId,
        email: "demo@farm.com",
        role: "FARMER",
        farm: {
          id: "demo-farm-1",
          name: "Demo Farm",
          slug: "demo-farm",
        },
      })
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        farms: {
          take: 1,
        },
      },
    })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    const userFarm = user.farms?.[0] || null
    
    return NextResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      farm: userFarm ? {
        id: userFarm.id,
        name: userFarm.name,
        slug: userFarm.slug,
      } : null,
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}