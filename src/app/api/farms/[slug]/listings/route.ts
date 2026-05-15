import { NextResponse } from 'next/server'

// Mock products
const mockProducts: Record<string, any[]> = {
  'sunny-meadow-farm': [
    { id: 'p1', name: 'Fresh Eggs', category: 'EGGS', description: 'Dozen of fresh free-range eggs', price: 6, unit: 'dozen', availability: 'AVAILABLE', isActive: true },
    { id: 'p2', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Organic heirloom tomatoes', price: 4.50, unit: 'lb', availability: 'AVAILABLE', isActive: true },
  ],
  'green-acres': [
    { id: 'p3', name: 'Fresh Herb Bundle', category: 'PRODUCE', description: 'Basil, rosemary, thyme', price: 5, unit: 'bundle', availability: 'AVAILABLE', isActive: true },
    { id: 'p4', name: 'Mixed Greens', category: 'PRODUCE', description: 'Fresh mixed lettuce', price: 3.50, unit: 'bag', availability: 'AVAILABLE', isActive: true },
  ],
}

// GET /api/farms/[slug]/listings - list products for a given farm
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const products = mockProducts[slug] || []
  return NextResponse.json(products)
}
