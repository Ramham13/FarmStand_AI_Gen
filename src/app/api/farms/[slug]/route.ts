import { NextResponse } from 'next/server'

// Mock data
const mockFarms: Record<string, any> = {
  'sunny-meadow-farm': {
    id: 'farm-1',
    name: 'Sunny Meadow Farm',
    slug: 'sunny-meadow-farm',
    description: 'Family-owned farm specializing in fresh eggs and vegetables. Our chickens are free-range and we use organic farming practices.',
    location: 'Rural Valley, CA',
    phone: '(555) 123-4567',
    email: 'sunny@farm.com',
    paymentLink: 'https://venmo.com/sunny-meadow',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p1', name: 'Fresh Eggs', category: 'EGGS', description: 'Dozen of fresh free-range eggs', price: 6, unit: 'dozen', availability: 'AVAILABLE' },
      { id: 'p2', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Organic heirloom tomatoes', price: 4.50, unit: 'lb', availability: 'AVAILABLE' },
    ],
  },
  'green-acres': {
    id: 'farm-2',
    name: 'Green Acres Farm',
    slug: 'green-acres',
    description: 'Sustainable farm growing heirloom vegetables and herbs.',
    location: 'Portland, OR',
    phone: '(555) 987-6543',
    email: 'info@greenacres.farm',
    paymentLink: 'https://paypal.me/greenacres',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p3', name: 'Fresh Herb Bundle', category: 'PRODUCE', description: 'Basil, rosemary, thyme', price: 5, unit: 'bundle', availability: 'AVAILABLE' },
      { id: 'p4', name: 'Mixed Greens', category: 'PRODUCE', description: 'Fresh mixed lettuce', price: 3.50, unit: 'bag', availability: 'AVAILABLE' },
    ],
  },
}

// GET /api/farms/[slug] - retrieve a farm by its slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const farm = mockFarms[slug]
  if (!farm) {
    return NextResponse.json({ error: 'Farm not found' }, { status: 404 })
  }
  return NextResponse.json(farm)
}
