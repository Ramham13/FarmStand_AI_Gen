import { NextResponse } from "next/server"

// Demo mode - no database
export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, farmName } = body

  if (!email || !password || !farmName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Demo registration
  return NextResponse.json({
    success: true,
    userId: "user-" + Date.now(),
  }, { status: 201 })
}
