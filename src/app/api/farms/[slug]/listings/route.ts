import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/farms/[slug]/listings - list products for a given farm
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const farm = await prisma.farm.findUnique({
    where: { slug },
    select: { id: true },
  })
  if (!farm) {
    return NextResponse.json({ error: 'Farm not found' }, { status: 404 })
  }
  const products = await prisma.product.findMany({
    where: { farmId: farm.id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      unit: true,
      availability: true,
      isActive: true,
      category: true,
    },
  })
  return NextResponse.json(products)
}
