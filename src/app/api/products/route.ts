import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/products - list all active products across all farms with search & filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const query = searchParams.get('q')?.toLowerCase() || ''
  const category = searchParams.get('category') || ''
  const farm = searchParams.get('farm') || ''
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  
  // Build where clause for filtering
  const where: Record<string, unknown> = {
    isActive: true,
    availability: { not: 'SOLD_OUT' },
  }
  
  // Build OR search across product fields and joined farm fields
  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { category: { contains: query, mode: 'insensitive' } },
      { farm: { name: { contains: query, mode: 'insensitive' } } },
    ]
  }
  
  if (category) {
    where.category = category
  }
  
  if (farm) {
    where.farm = { slug: farm }
  }
  
  // Query products from database with farm relation
  let products = await prisma.product.findMany({
    where,
    include: {
      farm: {
        select: {
          id: true,
          name: true,
          slug: true,
          emoji: true,
          location: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  
  // Apply price filters (can't do in DB query easily with float comparison)
  if (minPrice) {
    const min = parseFloat(minPrice)
    if (!isNaN(min)) {
      products = products.filter(p => (p.price || 0) >= min)
    }
  }
  
  if (maxPrice) {
    const max = parseFloat(maxPrice)
    if (!isNaN(max)) {
      products = products.filter(p => (p.price || 0) <= max)
    }
  }
  
  // Transform to match expected response format
  const allProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    unit: p.unit,
    availability: p.availability,
    imageUrl: p.imageUrl,
    farmId: p.farm.id,
    farmName: p.farm.name,
    farmSlug: p.farm.slug,
    farmEmoji: p.farm.emoji,
    farmLocation: p.farm.location,
  }))
  
  // Get unique categories and farms for filter options
  const uniqueCategories = [...new Set(allProducts.map(p => p.category).filter(Boolean))]
  const uniqueFarms = [...new Set(allProducts.map(p => p.farmSlug).filter(Boolean))]
  
  return NextResponse.json({
    products: allProducts,
    filters: {
      categories: uniqueCategories,
      farms: uniqueFarms,
    },
    total: allProducts.length,
  })
}