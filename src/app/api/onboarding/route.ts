import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { hash } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      email, 
      password, 
      farmName, 
      slug, 
      location, 
      description,
      phone,
      emoji,
    } = body

    // Validate required fields
    if (!email || !password || !farmName || !slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }

    // Check if slug is taken
    const existingFarm = await prisma.farm.findUnique({
      where: { slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-") },
    })

    if (existingFarm) {
      return NextResponse.json(
        { error: "This URL is already taken. Please choose another farm name." },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password)

    // Create user and farm in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "FARMER",
        },
      })

      // Create farm
      const farm = await tx.farm.create({
        data: {
          name: farmName,
          slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          location: location || null,
          description: description || null,
          phone: phone || null,
          emoji: emoji || "🏡",
          userId: user.id,
          sellerAcknowledged: true,
          acknowledgedAt: new Date(),
          status: "ACTIVE",
        },
      })

      return { user, farm }
    })

    return NextResponse.json({
      success: true,
      userId: result.user.id,
      farmId: result.farm.id,
      farmSlug: result.farm.slug,
    }, { status: 201 })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    )
  }
}
