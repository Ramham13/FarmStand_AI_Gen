import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/farms - list all farms (basic fields only)
export async function GET() {
  const farms = await prisma.farm.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      location: true,
      phone: true,
      email: true,
      website: true,
      status: true,
      createdAt: true,
    },
  })
  return NextResponse.json(farms)
}

// POST /api/farms - create a new farm (minimal fields)
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, slug, description, location, phone, email, website } = data
    const farm = await prisma.farm.create({
      data: {
        name,
        slug,
        description,
        location,
        phone,
        email,
        website,
        status: 'ACTIVE',
        userId: data.userId,
      },
    })
    return NextResponse.json(farm, { status: 201 })
  } catch (error) {
    console.error('Error creating farm:', error)
    return NextResponse.json({ error: 'Failed to create farm' }, { status: 400 })
  }
}
