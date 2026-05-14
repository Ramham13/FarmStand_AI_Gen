import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, farmName } = body

    if (!email || !password || !farmName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: simpleHash(password),
      },
    })

    // Create farm
    const slug = farmName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    
    // Check for duplicate slug
    const existingFarm = await prisma.farm.findUnique({
      where: { slug },
    })

    const finalSlug = existingFarm ? slug + "-" + Date.now() : slug

    await prisma.farm.create({
      data: {
        name: farmName,
        slug: finalSlug,
        userId: user.id,
        sellerAcknowledged: true,
        acknowledgedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 })
  } catch (error) {
    console.error("Error registering:", error)
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    )
  }
}
