import { NextResponse } from 'next/server'

// Mock data for demo - replace with database
const mockFarms = [
  {
    id: 'farm-1',
    name: 'Sunny Meadow Farm',
    slug: 'sunny-meadow-farm',
    description: 'Family-owned farm with fresh eggs and vegetables.',
    location: 'Rural Valley, CA',
    phone: '(555) 123-4567',
    email: 'sunny@farm.com',
    website: null,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'farm-2',
    name: 'Green Acres Farm',
    slug: 'green-acres',
    description: 'Sustainable farm with herbs and greens.',
    location: 'Portland, OR',
    phone: '(555) 987-6543',
    email: 'info@greenacres.farm',
    website: null,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
]

// GET /api/farms - list all farms
export async function GET() {
  return NextResponse.json(mockFarms)
}

// POST /api/farms - create a new farm
export async function POST(req: Request) {
  return NextResponse.json({ message: 'Demo mode - DB not connected' }, { status: 200 })
}
