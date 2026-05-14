import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, customerName, customerEmail } = body

    if (!productId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if already on waitlist
    const existing = await prisma.waitlist.findFirst({
      where: { productId, customerEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 400 }
      )
    }

    const waitlistEntry = await prisma.waitlist.create({
      data: {
        productId,
        customerName,
        customerEmail,
      },
    })

    return NextResponse.json(waitlistEntry, { status: 201 })
  } catch (error) {
    console.error("Error creating waitlist entry:", error)
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const waitlist = await prisma.waitlist.findMany({
      orderBy: { createdAt: "asc" },
    })
    return NextResponse.json(waitlist)
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    )
  }
}
