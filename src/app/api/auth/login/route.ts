import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Demo mode - generate a demo user ID
    const demoUserId = "demo-" + Date.now()
    
    const response = NextResponse.json({
      success: true,
      user: {
        id: demoUserId,
        email: email,
        role: "FARMER",
        farm: {
          id: "demo-farm-1",
          name: "My Farm",
          slug: "my-farm",
        },
      },
    })
    
    // Set auth cookie
    response.cookies.set("auth-user-id", demoUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}