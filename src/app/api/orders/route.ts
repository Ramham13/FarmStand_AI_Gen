import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendOrderConfirmation, sendFarmerOrderNotification, sendOrderStatusUpdate } from "@/lib/email"

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
    const { productId, customerName, customerEmail, customerPhone, message, quantity = 1 } = body

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
        quantity,
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

    // Send order confirmation to customer
    await sendOrderConfirmation({
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      orderId: order.id,
      productName: order.product.name,
      quantity: order.quantity,
      totalPrice: (order.product.price || 0) * order.quantity,
      farmName: order.product.farm.name,
      farmLocation: order.product.farm.location || '',
    })

    // Send new order notification to farmer
    if (order.product.farm.userId) {
      const farmer = await prisma.user.findUnique({
        where: { id: order.product.farm.userId },
      })
      
      if (farmer?.email) {
        await sendFarmerOrderNotification({
          farmerEmail: farmer.email,
          farmerName: order.product.farm.name,
          orderId: order.id,
          productName: order.product.name,
          quantity: order.quantity,
          totalPrice: (order.product.price || 0) * order.quantity,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone || undefined,
        })
      }
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
// PATCH /api/orders - Update order status
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, status" },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      )
    }

    // Update the reservation status
    const order = await prisma.reservation.update({
      where: { id: orderId },
      data: { status },
      include: {
        product: {
          include: {
            farm: true,
          },
        },
      },
    })

    // Send status update email to customer (only for CONFIRMED, CANCELLED, COMPLETED)
    if (status === "CONFIRMED" || status === "CANCELLED" || status === "COMPLETED") {
      const quantity = order.quantity || 1
      const totalPrice = (order.product.price || 0) * quantity
      
      await sendOrderStatusUpdate({
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        orderId: order.id,
        productName: order.product.name,
        quantity,
        totalPrice,
        status: status as "CONFIRMED" | "CANCELLED" | "COMPLETED",
        farmName: order.product.farm.name,
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
