import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth-server"
import { sendWaitlistNotification } from "@/lib/email"

// GET /api/waitlist - get waitlists for farmer's products
export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // For demo users, return empty
    if (user.id.startsWith("demo-") || user.id.startsWith("user-")) {
      return NextResponse.json([])
    }

    // Get farmer's farm
    const farm = await prisma.farm.findUnique({
      where: { userId: user.id },
    })

    if (!farm) {
      return NextResponse.json([])
    }

    // Get all products for this farm
    const products = await prisma.product.findMany({
      where: { farmId: farm.id },
      select: { id: true },
    })

    const productIds = products.map(p => p.id)

    if (productIds.length === 0) {
      return NextResponse.json([])
    }

    // Get waitlist entries with product info
    const waitlistEntries = await prisma.waitlist.findMany({
      where: { productId: { in: productIds } },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            farmId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Group by product
    const grouped: Record<string, {
      id: string
      product: string
      productId: string
      customers: Array<{
        id: string
        name: string
        email: string
        position: number
        joinedAt: string
        notifiedAt: string | null
      }>
    }> = {}

    for (const entry of waitlistEntries) {
      const productName = entry.product.name
      if (!grouped[productName]) {
        grouped[productName] = {
          id: entry.productId,
          product: productName,
          productId: entry.productId,
          customers: [],
        }
      }
      
      // Calculate position (1-based index)
      const position = grouped[productName].customers.length + 1
      
      grouped[productName].customers.push({
        id: entry.id,
        name: entry.customerName,
        email: entry.customerEmail,
        position,
        joinedAt: entry.createdAt.toISOString(),
        notifiedAt: entry.notifiedAt?.toISOString() || null,
      })
    }

    return NextResponse.json(Object.values(grouped))
  } catch (error) {
    console.error("Get waitlist error:", error)
    return NextResponse.json({ error: "Failed to get waitlist" }, { status: 500 })
  }
}

// POST /api/waitlist - add customer to waitlist
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, customerName, customerEmail } = body

    if (!productId || !customerName || !customerEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const entry = await prisma.waitlist.create({
      data: {
        productId,
        customerName,
        customerEmail,
      },
    })

    return NextResponse.json({
      id: entry.id,
      productId: entry.productId,
      customerName: entry.customerName,
      customerEmail: entry.customerEmail,
      createdAt: entry.createdAt.toISOString(),
    }, { status: 201 })
  } catch (error) {
    console.error("Add to waitlist error:", error)
    return NextResponse.json({ error: "Failed to add to waitlist" }, { status: 500 })
  }
}

// PATCH /api/waitlist - update waitlist entry (e.g., mark as notified)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { waitlistId, productId, action } = body

    // Handle "notify-next" action - notify the first person in queue who hasn't been notified
    if (action === "notify-next" && productId) {
      const user = await getCurrentUser()
      
      if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
      }

      // Get farm for this user
      const farm = await prisma.farm.findUnique({
        where: { userId: user.id },
      })

      if (!farm) {
        return NextResponse.json({ error: "Farm not found" }, { status: 404 })
      }

      // Verify product belongs to this farm
      const product = await prisma.product.findFirst({
        where: { id: productId, farmId: farm.id },
      })

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }

      // Find the first person in queue who hasn't been notified
      const nextInQueue = await prisma.waitlist.findFirst({
        where: { 
          productId,
          notifiedAt: null,
        },
        orderBy: { createdAt: "asc" },
        include: {
          product: {
            include: {
              farm: true,
            },
          },
        },
      })

      if (!nextInQueue) {
        return NextResponse.json({ error: "No one left to notify" }, { status: 404 })
      }

      // Update notifiedAt timestamp
      const updated = await prisma.waitlist.update({
        where: { id: nextInQueue.id },
        data: { notifiedAt: new Date() },
      })

      // Send email notification
      await sendWaitlistNotification({
        customerEmail: nextInQueue.customerEmail,
        customerName: nextInQueue.customerName,
        productName: nextInQueue.product.name,
        farmName: nextInQueue.product.farm.name,
        farmEmail: nextInQueue.product.farm.email || "",
      })

      return NextResponse.json({
        id: updated.id,
        customerName: nextInQueue.customerName,
        notifiedAt: updated.notifiedAt?.toISOString() || null,
      })
    }

    if (!waitlistId) {
      return NextResponse.json({ error: "Waitlist ID required" }, { status: 400 })
    }

    if (action === "notify") {
      // Get the waitlist entry with product and farm info
      const entry = await prisma.waitlist.findUnique({
        where: { id: waitlistId },
        include: {
          product: {
            include: {
              farm: true,
            },
          },
        },
      })

      if (!entry) {
        return NextResponse.json({ error: "Waitlist entry not found" }, { status: 404 })
      }

      // Update notifiedAt timestamp
      const updated = await prisma.waitlist.update({
        where: { id: waitlistId },
        data: { notifiedAt: new Date() },
      })

      // Send email notification
      await sendWaitlistNotification({
        customerEmail: entry.customerEmail,
        customerName: entry.customerName,
        productName: entry.product.name,
        farmName: entry.product.farm.name,
        farmEmail: entry.product.farm.email || "",
      })

      return NextResponse.json({
        id: updated.id,
        notifiedAt: updated.notifiedAt?.toISOString() || null,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Update waitlist error:", error)
    return NextResponse.json({ error: "Failed to update waitlist" }, { status: 500 })
  }
}