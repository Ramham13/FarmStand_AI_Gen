import { NextResponse } from "next/server"

function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

// Demo mode - no database
export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 })
  }

  // Demo credentials
  if (email === "test@farm.com" && password === "test123") {
    return NextResponse.json({
      success: true,
      user: {
        id: "user-1",
        email: "test@farm.com",
        role: "FARMER",
        farm: { id: "farm-1", name: "Sunny Meadow Farm", slug: "sunny-meadow-farm" },
      },
    })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
