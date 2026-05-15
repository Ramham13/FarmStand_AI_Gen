import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Demo mode - accept any login
    const response = NextResponse.json({
      success: true,
      user: {
        id: "demo-user-1",
        email: email,
        role: "FARMER",
        farm: {
          id: "demo-farm-1",
          name: "Demo Farm",
          slug: "demo-farm",
        },
      },
    })
    
    // Set auth cookie
    response.cookies.set("auth-user-id", "demo-user-1", {
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