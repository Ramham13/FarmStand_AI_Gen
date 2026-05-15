import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      email, 
      password, 
      farmName, 
      slug, 
    } = body

    // Validate required fields
    if (!email || !password || !farmName || !slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Demo mode - create a demo user ID
    const userId = "user-" + Date.now()
    const farmId = "farm-" + Date.now()
    const farmSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-")

    const response = NextResponse.json({
      success: true,
      userId,
      farmId,
      farmSlug,
    }, { status: 201 })

    // Set auth cookie
    response.cookies.set("auth-user-id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    
    return response
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    )
  }
}