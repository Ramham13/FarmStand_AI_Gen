import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// GET /api/waitlist/count?productId=xxx - get waitlist count for a product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const count = await prisma.waitlist.count({
      where: { productId },
    })

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Get waitlist count error:", error)
    return NextResponse.json({ error: "Failed to get count" }, { status: 500 })
  }
}