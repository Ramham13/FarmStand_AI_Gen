import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// GET /api/orders - List all orders (reservations with order status)
export async function GET() {
  try {
    const orders = await prisma.reservation.findMany({
      where: {
        status: {
          in: ["PENDING", "CONFIRMED", "COMPLETED"],
        },
      },
      include: {
        product: {
          include: {
            farm: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST /api/orders - Create an order from a reservation
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, customerName, customerEmail, customerPhone, message } = body

    if (!productId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: productId, customerName, customerEmail" },
        { status: 400 }
      )
    }

    // Verify the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Create the reservation (which serves as an order)
    const order = await prisma.reservation.create({
      data: {
        productId,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        message: message || null,
        status: "PENDING",
      },
      include: {
        product: {
          include: {
            farm: true,
          },
        },
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}