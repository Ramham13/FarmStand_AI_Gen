import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/farms/[slug] - retrieve a farm by its slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const farm = await prisma.farm.findUnique({
    where: { slug },
    include: {
      products: true,
    },
  })
  if (!farm) {
    return NextResponse.json({ error: 'Farm not found' }, { status: 404 })
  }
  return NextResponse.json(farm)
}
