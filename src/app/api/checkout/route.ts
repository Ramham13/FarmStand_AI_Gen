import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendOrderConfirmation, sendFarmerOrderNotification } from "@/lib/email"

interface CheckoutItem {
  productId: string
  quantity: number
}

interface CheckoutRequest {
  items: CheckoutItem[]
  customerName: string
  customerEmail: string
  customerPhone?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const body: CheckoutRequest = await request.json()
    const { items, customerName, customerEmail, customerPhone, message } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Validate all products exist and get their farms
    const productIds = items.map((item) => item.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { farm: true },
    })

    if (products.length !== items.length) {
      return NextResponse.json({ error: "Some products not found" }, { status: 404 })
    }

    // Check all items are from the same farm
    const farmIds = new Set(products.map((p) => p.farmId))
    if (farmIds.size > 1) {
      return NextResponse.json({ error: "Checkout is only available for a single farm at a time" }, { status: 400 })
    }

    // Create reservations for all items
    const reservations = await Promise.all(
      items.map((item) =>
        prisma.reservation.create({
          data: {
            productId: item.productId,
            customerName,
            customerEmail,
            customerPhone: customerPhone || null,
            message: message || null,
            quantity: item.quantity,
            status: "PENDING",
          },
        })
      )
    )

    const farm = products[0].farm

    // Calculate total price
    let totalPrice = 0
    for (const item of items) {
      const product = products.find(p => p.id === item.productId)
      if (product) {
        totalPrice += Number(product.price) * item.quantity
      }
    }

    // Send confirmation to customer
    await sendOrderConfirmation({
      customerEmail,
      customerName,
      orderId: reservations[0].id,
      productName: products.map(p => p.name).join(", "),
      quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice,
      farmName: farm.name,
      farmLocation: farm.location || "their location",
    })

    // Send notification to farmer
    if (farm.email) {
      await sendFarmerOrderNotification({
        farmerEmail: farm.email,
        farmerName: farm.name,
        orderId: reservations[0].id,
        productName: products.map(p => p.name).join(", "),
        quantity: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice,
        customerName,
        customerEmail,
        customerPhone: customerPhone || undefined,
      })
    }

    return NextResponse.json({
      orderId: reservations[0].id,
      reservations: reservations.map((r) => ({
        id: r.id,
        productId: r.productId,
        quantity: r.quantity,
        status: r.status,
      })),
      farm: {
        name: farm.name,
        slug: farm.slug,
        email: farm.email,
        phone: farm.phone,
        location: farm.location,
      },
    }, { status: 201 })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 })
  }
}