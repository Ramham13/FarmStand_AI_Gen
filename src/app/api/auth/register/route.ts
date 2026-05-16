import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { hash } from "@/lib/auth"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, farmName } = body

    if (!email || !password || !farmName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password)

    // Create user and farm in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          role: "FARMER",
        },
      })

      // Generate unique slug
      let slug = generateSlug(farmName)
      const existingFarm = await tx.farm.findUnique({ where: { slug } })
      if (existingFarm) {
        slug = `${slug}-${Date.now()}`
      }

      // Create farm
      const farm = await tx.farm.create({
        data: {
          name: farmName,
          slug,
          userId: user.id,
          status: "PENDING", // New farms need moderation
        },
      })

      return { user, farm }
    })

    return NextResponse.json({
      success: true,
      userId: result.user.id,
    }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
