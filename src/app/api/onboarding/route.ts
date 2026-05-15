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

    // Demo mode - just return success
    return NextResponse.json({
      success: true,
      userId: "user-" + Date.now(),
      farmId: "farm-" + Date.now(),
      farmSlug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    }, { status: 201 })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    )
  }
}