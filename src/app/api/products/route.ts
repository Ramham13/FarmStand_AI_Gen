import { NextResponse } from 'next/server'
import { getAllFarms } from '@/lib/mock-data'

// Type for products from mock data
interface FarmProduct {
  id: string
  name: string
  description?: string
  category: string
  price: number
  unit: string
  availability: string
}

// GET /api/products - list all active products across all farms with search & filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const query = searchParams.get('q')?.toLowerCase() || ''
  const category = searchParams.get('category') || ''
  const farm = searchParams.get('farm') || ''
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  
  const farms = getAllFarms()
  
  // Flatten products from all farms and add farm info
  let allProducts = farms.flatMap(farmData => 
    (farmData.products || [])
      .filter((p: FarmProduct) => p.availability !== 'SOLD_OUT')
      .map((product: FarmProduct) => ({
        ...product,
        farmId: farmData.id,
        farmName: farmData.name,
        farmSlug: farmData.slug,
        farmEmoji: farmData.emoji,
        farmLocation: farmData.location,
      }))
  )
  
  // Apply filters
  if (query) {
    allProducts = allProducts.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.farmName.toLowerCase().includes(query)
    )
  }
  
  if (category) {
    allProducts = allProducts.filter(p => p.category === category)
  }
  
  if (farm) {
    allProducts = allProducts.filter(p => p.farmSlug === farm)
  }
  
  if (minPrice) {
    const min = parseFloat(minPrice)
    if (!isNaN(min)) {
      allProducts = allProducts.filter(p => (p.price || 0) >= min)
    }
  }
  
  if (maxPrice) {
    const max = parseFloat(maxPrice)
    if (!isNaN(max)) {
      allProducts = allProducts.filter(p => (p.price || 0) <= max)
    }
  }
  
  // Get unique categories and farms for filter options
  const uniqueCategories = [...new Set(allProducts.map(p => p.category))]
  const uniqueFarms = [...new Set(allProducts.map(p => p.farmSlug))]
  
  return NextResponse.json({
    products: allProducts,
    filters: {
      categories: uniqueCategories,
      farms: uniqueFarms,
    },
    total: allProducts.length,
  })
}