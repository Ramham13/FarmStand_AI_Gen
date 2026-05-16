import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-server'

// GET /api/favorites - Get all favorites for current user
export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        farm: {
          select: {
            id: true,
            name: true,
            slug: true,
            emoji: true,
            location: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      favorites: favorites.map(f => ({
        id: f.id,
        farmId: f.farmId,
        createdAt: f.createdAt,
        farm: f.farm,
      })),
    })
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites', favorites: [] },
      { status: 500 }
    )
  }
}

// POST /api/favorites - Add a farm to favorites
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { farmId } = await req.json()
    
    if (!farmId) {
      return NextResponse.json({ error: 'farmId is required' }, { status: 400 })
    }

    // Check if farm exists
    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
    })

    if (!farm) {
      return NextResponse.json({ error: 'Farm not found' }, { status: 404 })
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_farmId: {
          userId: user.id,
          farmId,
        },
      },
    })

    if (existing) {
      return NextResponse.json({ 
        message: 'Already favorited',
        favorite: existing,
      })
    }

    // Create favorite
    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        farmId,
      },
      include: {
        farm: {
          select: {
            id: true,
            name: true,
            slug: true,
            emoji: true,
            location: true,
            imageUrl: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: 'Added to favorites',
      favorite: {
        id: favorite.id,
        farmId: favorite.farmId,
        createdAt: favorite.createdAt,
        farm: favorite.farm,
      },
    })
  } catch (error) {
    console.error('Error adding favorite:', error)
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}

// DELETE /api/favorites - Remove a farm from favorites
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const farmId = searchParams.get('farmId')
    
    if (!farmId) {
      return NextResponse.json({ error: 'farmId is required' }, { status: 400 })
    }

    // Delete the favorite
    await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        farmId,
      },
    })

    return NextResponse.json({ message: 'Removed from favorites' })
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: 500 }
    )
  }
}