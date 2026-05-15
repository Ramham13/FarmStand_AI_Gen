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
  {
    id: 'farm-3',
    name: 'Valley View Dairy',
    slug: 'valley-view-dairy',
    description: 'Small-batch artisan cheese and raw milk.',
    location: 'Madison, WI',
    phone: '(555) 234-5678',
    email: 'hello@valleyviewdairy.com',
    website: null,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'farm-4',
    name: 'Mountain Poultry Farm',
    slug: 'mountain-poultry',
    description: 'Heritage breed chickens and ducks, pasture-raised.',
    location: 'Asheville, NC',
    phone: '(555) 345-6789',
    email: 'birds@mountainpoultry.farm',
    website: null,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'farm-5',
    name: 'Heritage Homestead',
    slug: 'heritage-homestead',
    description: 'Heirloom vegetables and heritage breed pigs.',
    location: 'Austin, TX',
    phone: '(555) 456-7890',
    email: 'farm@heritagehomestead.com',
    website: null,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'farm-6',
    name: 'Sunrise Orchard',
    slug: 'sunrise-orchard',
    description: 'Organic apples, pears, and berries.',
    location: 'Ashland, OR',
    phone: '(555) 567-8901',
    email: 'pick@sunriseorchard.com',
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