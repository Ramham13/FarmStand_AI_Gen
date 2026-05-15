import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, customerName, customerEmail, customerPhone, message, farmSlug, quantity = 1 } = body

    if (!productId || !customerName || !customerEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { farm: true },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Create reservation in database
    const reservation = await prisma.reservation.create({
      data: {
        productId,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        message: message || null,
        quantity,
        status: "PENDING",
      },
    })

    return NextResponse.json({
      id: reservation.id,
      productId: reservation.productId,
      customerName: reservation.customerName,
      customerEmail: reservation.customerEmail,
      customerPhone: reservation.customerPhone,
      message: reservation.message,
      status: reservation.status,
      createdAt: reservation.createdAt.toISOString(),
    }, { status: 201 })
  } catch (error) {
    console.error("Reservation error:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  const productId = searchParams.get("productId")

  try {
    const where: Record<string, unknown> = {}
    
    if (email) {
      where.customerEmail = email
    }
    if (productId) {
      where.productId = productId
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        product: {
          include: {
            farm: {
              select: { name: true, slug: true, emoji: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Failed to fetch reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}
