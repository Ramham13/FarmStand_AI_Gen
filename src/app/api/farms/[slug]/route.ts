import { NextResponse } from 'next/server'

// Mock data for individual farms with products
const mockFarms: Record<string, any> = {
  'sunny-meadow-farm': {
    id: 'farm-1',
    name: 'Sunny Meadow Farm',
    slug: 'sunny-meadow-farm',
    description: 'Family-owned farm specializing in fresh eggs and vegetables. Our chickens are free-range and we use organic farming practices. We believe in sustainable agriculture and protecting the land for future generations.',
    location: 'Rural Valley, CA',
    phone: '(555) 123-4567',
    email: 'sunny@farm.com',
    website: 'https://sunnymeadowfarm.example.com',
    paymentLink: 'https://venmo.com/sunny-meadow',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p1', name: 'Fresh Eggs', category: 'EGGS', description: 'Dozen of fresh free-range eggs from happy hens', price: 6, unit: 'dozen', availability: 'AVAILABLE' },
      { id: 'p2', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Organic heirloom tomatoes, perfect for salads', price: 4.50, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p3', name: 'Zucchini', category: 'PRODUCE', description: 'Fresh garden zucchini', price: 3, unit: 'lb', availability: 'AVAILABLE' },
    ],
  },
  'green-acres': {
    id: 'farm-2',
    name: 'Green Acres Farm',
    slug: 'green-acres',
    description: 'Sustainable farm growing heirloom vegetables and herbs using regenerative practices. We focus on soil health and biodiversity.',
    location: 'Portland, OR',
    phone: '(555) 987-6543',
    email: 'info@greenacres.farm',
    website: null,
    paymentLink: 'https://paypal.me/greenacres',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p4', name: 'Fresh Herb Bundle', category: 'PRODUCE', description: 'Basil, rosemary, thyme, and mint', price: 5, unit: 'bundle', availability: 'AVAILABLE' },
      { id: 'p5', name: 'Mixed Greens', category: 'PRODUCE', description: 'Fresh mixed lettuce and arugula', price: 3.50, unit: 'bag', availability: 'AVAILABLE' },
      { id: 'p6', name: 'Kale Bunch', category: 'PRODUCE', description: 'Organic lacinato kale', price: 2.50, unit: 'bunch', availability: 'AVAILABLE' },
    ],
  },
  'valley-view-dairy': {
    id: 'farm-3',
    name: 'Valley View Dairy',
    slug: 'valley-view-dairy',
    description: 'Small-batch artisan cheese and raw milk from grass-fed cows. Our cows roam freely on lush pastures.',
    location: 'Madison, WI',
    phone: '(555) 234-5678',
    email: 'hello@valleyviewdairy.com',
    website: 'https://valleyviewdairy.example.com',
    paymentLink: 'https://venmo.com/valley-view-dairy',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p7', name: 'Aged Cheddar', category: 'DAIRY', description: '12-month aged artisan cheddar', price: 12, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p8', name: 'Fresh Mozzarella', category: 'DAIRY', description: 'Hand-pulled fresh mozzarella', price: 8, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p9', name: 'Raw Milk', category: 'DAIRY', description: 'Fresh raw milk from grass-fed cows', price: 6, unit: 'gallon', availability: 'AVAILABLE' },
    ],
  },
  'mountain-poultry': {
    id: 'farm-4',
    name: 'Mountain Poultry Farm',
    slug: 'mountain-poultry',
    description: 'Heritage breed chickens and ducks, pasture-raised for the best eggs and meat. Our birds roam freely in mountain meadows.',
    location: 'Asheville, NC',
    phone: '(555) 345-6789',
    email: 'birds@mountainpoultry.farm',
    website: null,
    paymentLink: 'https://cash.app/$mountainpoultry',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p10', name: 'Duck Eggs', category: 'EGGS', description: 'Rich and flavorful duck eggs', price: 8, unit: 'dozen', availability: 'AVAILABLE' },
      { id: 'p11', name: 'Chicken Eggs', category: 'EGGS', description: 'Pasture-raised chicken eggs', price: 5, unit: 'dozen', availability: 'AVAILABLE' },
      { id: 'p12', name: 'Whole Chicken', category: 'POULTRY', description: 'Pasture-raised whole chicken', price: 18, unit: 'each', availability: 'AVAILABLE' },
    ],
  },
  'heritage-homestead': {
    id: 'farm-5',
    name: 'Heritage Homestead',
    slug: 'heritage-homestead',
    description: 'Heirloom vegetables and heritage breed pigs. Farm-to-table excellence with a focus on rare and endangered varieties.',
    location: 'Austin, TX',
    phone: '(555) 456-7890',
    email: 'farm@heritagehomestead.com',
    website: 'https://heritagehomestead.example.com',
    paymentLink: 'https://venmo.com/heritage-homestead',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p13', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Rainbow heirloom tomato mix', price: 5, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p14', name: 'Fresh Basil', category: 'PRODUCE', description: 'Organic Genovese basil', price: 3, unit: 'bunch', availability: 'AVAILABLE' },
      { id: 'p15', name: 'Pork Chops', category: 'MEAT', description: 'Heritage breed pork chops', price: 14, unit: 'lb', availability: 'AVAILABLE' },
    ],
  },
  'sunrise-orchard': {
    id: 'farm-6',
    name: 'Sunrise Orchard',
    slug: 'sunrise-orchard',
    description: 'Organic apples, pears, and berries. U-pick and pre-order available. Family-owned for three generations.',
    location: 'Ashland, OR',
    phone: '(555) 567-8901',
    email: 'pick@sunriseorchard.com',
    website: 'https://sunriseorchard.example.com',
    paymentLink: 'https://paypal.me/sunriseorchard',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    products: [
      { id: 'p16', name: 'Honeycrisp Apples', category: 'PRODUCE', description: 'Crisp and sweet organic apples', price: 3, unit: 'lb', availability: 'SEASONAL' },
      { id: 'p17', name: 'Bosc Pears', category: 'PRODUCE', description: 'Sweet organic pears', price: 3.50, unit: 'lb', availability: 'SEASONAL' },
      { id: 'p18', name: 'Blackberries', category: 'PRODUCE', description: 'Organic blackberries', price: 6, unit: 'pint', availability: 'SEASONAL' },
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