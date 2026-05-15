import { NextResponse } from 'next/server'
import { getFarms } from '@/lib/farms'

// GET /api/farms - list farms with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const category = searchParams.get('category') || undefined
    const region = searchParams.get('region') || undefined
    const priceRange = searchParams.get('priceRange') || undefined

    // Build filters object
    const filters = {
      ...(category && { category }),
      ...(region && { region }),
      ...(priceRange && { priceRange }),
    }

    const farms = await getFarms(filters)

    return NextResponse.json({
      farms,
      count: farms.length,
      filters: Object.keys(filters).length > 0 ? filters : null,
    })
  } catch (error) {
    console.error('Error fetching farms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch farms', farms: [], count: 0 },
      { status: 500 }
    )
  }
}

// POST /api/farms - create a new farm
export async function POST(req: Request) {
  return NextResponse.json({ message: 'Demo mode - DB not connected' }, { status: 200 })
}