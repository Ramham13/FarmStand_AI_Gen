import { NextResponse } from 'next/server'

// Mock products for all farms
const mockProducts: Record<string, any[]> = {
  'sunny-meadow-farm': [
    { id: 'p1', name: 'Fresh Eggs', category: 'EGGS', description: 'Dozen of fresh free-range eggs from happy hens', price: 6, unit: 'dozen', availability: 'AVAILABLE', isActive: true },
    { id: 'p2', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Organic heirloom tomatoes, perfect for salads', price: 4.50, unit: 'lb', availability: 'AVAILABLE', isActive: true },
    { id: 'p3', name: 'Zucchini', category: 'PRODUCE', description: 'Fresh garden zucchini', price: 3, unit: 'lb', availability: 'AVAILABLE', isActive: true },
  ],
  'green-acres': [
    { id: 'p4', name: 'Fresh Herb Bundle', category: 'PRODUCE', description: 'Basil, rosemary, thyme, and mint', price: 5, unit: 'bundle', availability: 'AVAILABLE', isActive: true },
    { id: 'p5', name: 'Mixed Greens', category: 'PRODUCE', description: 'Fresh mixed lettuce and arugula', price: 3.50, unit: 'bag', availability: 'AVAILABLE', isActive: true },
    { id: 'p6', name: 'Kale Bunch', category: 'PRODUCE', description: 'Organic lacinato kale', price: 2.50, unit: 'bunch', availability: 'AVAILABLE', isActive: true },
  ],
  'valley-view-dairy': [
    { id: 'p7', name: 'Aged Cheddar', category: 'DAIRY', description: '12-month aged artisan cheddar', price: 12, unit: 'lb', availability: 'AVAILABLE', isActive: true },
    { id: 'p8', name: 'Fresh Mozzarella', category: 'DAIRY', description: 'Hand-pulled fresh mozzarella', price: 8, unit: 'lb', availability: 'AVAILABLE', isActive: true },
    { id: 'p9', name: 'Raw Milk', category: 'DAIRY', description: 'Fresh raw milk from grass-fed cows', price: 6, unit: 'gallon', availability: 'AVAILABLE', isActive: true },
  ],
  'mountain-poultry': [
    { id: 'p10', name: 'Duck Eggs', category: 'EGGS', description: 'Rich and flavorful duck eggs', price: 8, unit: 'dozen', availability: 'AVAILABLE', isActive: true },
    { id: 'p11', name: 'Chicken Eggs', category: 'EGGS', description: 'Pasture-raised chicken eggs', price: 5, unit: 'dozen', availability: 'AVAILABLE', isActive: true },
    { id: 'p12', name: 'Whole Chicken', category: 'POULTRY', description: 'Pasture-raised whole chicken', price: 18, unit: 'each', availability: 'AVAILABLE', isActive: true },
  ],
  'heritage-homestead': [
    { id: 'p13', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Rainbow heirloom tomato mix', price: 5, unit: 'lb', availability: 'AVAILABLE', isActive: true },
    { id: 'p14', name: 'Fresh Basil', category: 'PRODUCE', description: 'Organic Genovese basil', price: 3, unit: 'bunch', availability: 'AVAILABLE', isActive: true },
    { id: 'p15', name: 'Pork Chops', category: 'MEAT', description: 'Heritage breed pork chops', price: 14, unit: 'lb', availability: 'AVAILABLE', isActive: true },
  ],
  'sunrise-orchard': [
    { id: 'p16', name: 'Honeycrisp Apples', category: 'PRODUCE', description: 'Crisp and sweet organic apples', price: 3, unit: 'lb', availability: 'SEASONAL', isActive: true },
    { id: 'p17', name: 'Bosc Pears', category: 'PRODUCE', description: 'Sweet organic pears', price: 3.50, unit: 'lb', availability: 'SEASONAL', isActive: true },
    { id: 'p18', name: 'Blackberries', category: 'PRODUCE', description: 'Organic blackberries', price: 6, unit: 'pint', availability: 'SEASONAL', isActive: true },
  ],
}

// GET /api/farms/[slug]/listings - list products for a given farm
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const products = mockProducts[slug] || []
  return NextResponse.json(products)
}