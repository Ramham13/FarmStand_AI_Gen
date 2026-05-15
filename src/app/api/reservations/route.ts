import { NextResponse } from "next/server"

// Demo mode - no database
export async function POST(request: Request) {
  const body = await request.json()
  const { productId, customerName, customerEmail, customerPhone, message } = body

  if (!productId || !customerName || !customerEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Return mock success
  return NextResponse.json({
    id: "res-" + Date.now(),
    productId,
    customerName,
    customerEmail,
    customerPhone,
    message,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  }, { status: 201 })
}

export async function GET() {
  return NextResponse.json([])
}
