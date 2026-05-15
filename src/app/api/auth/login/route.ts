import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        farms: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user info (exclude password)
    // Take the first farm if user has multiple
    const userFarm = user.farms?.[0] || null
    
    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        farm: userFarm ? {
          id: userFarm.id,
          name: userFarm.name,
          slug: userFarm.slug,
        } : null,
      },
    })
    
    // Set auth cookie for server-side authentication
    response.cookies.set("auth-user-id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })
    
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
