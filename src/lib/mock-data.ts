// Shared mock data for explore and categories pages
// In production, this would come from the database via Prisma

export const categories = [
  { id: "PRODUCE", name: "Produce", emoji: "🥬", description: "Fresh vegetables and fruits" },
  { id: "EGGS", name: "Eggs", emoji: "🥚", description: "Farm-fresh eggs" },
  { id: "DAIRY", name: "Dairy", emoji: "🥛", description: "Milk, cheese, and artisan dairy" },
  { id: "MEAT", name: "Meat", emoji: "🥩", description: "Grass-fed and heritage meats" },
  { id: "POULTRY", name: "Poultry", emoji: "🐔", description: "Chicken, duck, and more" },
  { id: "PLANTS", name: "Plants", emoji: "🌱", description: "Seedlings, herbs, and nursery stock" },
]

export const mockFarms: Record<string, any> = {
  'sunny-meadow-farm': {
    id: 'farm-1',
    name: 'Sunny Meadow Farm',
    slug: 'sunny-meadow-farm',
    description: 'Family-owned farm specializing in fresh eggs and vegetables. Our chickens are free-range and we use organic farming practices.',
    location: 'Rural Valley, CA',
    phone: '(555) 123-4567',
    email: 'sunny@farm.com',
    website: 'https://sunnymeadowfarm.example.com',
    paymentLink: 'https://venmo.com/sunny-meadow',
    status: 'ACTIVE',
    emoji: "🐔",
    categories: ["EGGS", "PRODUCE"],
    products: [
      { id: 'p1', name: 'Fresh Eggs', category: 'EGGS', description: 'Dozen of fresh free-range eggs', price: 6, unit: 'dozen', availability: 'AVAILABLE' },
      { id: 'p2', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Organic heirloom tomatoes', price: 4.50, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p3', name: 'Zucchini', category: 'PRODUCE', description: 'Fresh garden zucchini', price: 3, unit: 'lb', availability: 'AVAILABLE' },
    ],
  },
  'green-acres': {
    id: 'farm-2',
    name: 'Green Acres Farm',
    slug: 'green-acres',
    description: 'Sustainable farm growing heirloom vegetables and herbs using regenerative practices.',
    location: 'Portland, OR',
    phone: '(555) 987-6543',
    email: 'info@greenacres.farm',
    paymentLink: 'https://paypal.me/greenacres',
    status: 'ACTIVE',
    emoji: "🌿",
    categories: ["PRODUCE"],
    products: [
      { id: 'p4', name: 'Fresh Herb Bundle', category: 'PRODUCE', description: 'Basil, rosemary, thyme', price: 5, unit: 'bundle', availability: 'AVAILABLE' },
      { id: 'p5', name: 'Mixed Greens', category: 'PRODUCE', description: 'Fresh mixed lettuce', price: 3.50, unit: 'bag', availability: 'AVAILABLE' },
    ],
  },
  'valley-view-dairy': {
    id: 'farm-3',
    name: 'Valley View Dairy',
    slug: 'valley-view-dairy',
    description: 'Small-batch artisan cheese and raw milk from grass-fed cows.',
    location: 'Madison, WI',
    phone: '(555) 234-5678',
    email: 'hello@valleyviewdairy.com',
    paymentLink: 'https://venmo.com/valley-view-dairy',
    status: 'ACTIVE',
    emoji: "🥛",
    categories: ["DAIRY"],
    products: [
      { id: 'p7', name: 'Aged Cheddar', category: 'DAIRY', description: '12-month aged artisan cheddar', price: 12, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p8', name: 'Fresh Mozzarella', category: 'DAIRY', description: 'Hand-pulled fresh mozzarella', price: 8, unit: 'lb', availability: 'AVAILABLE' },
    ],
  },
  'mountain-poultry': {
    id: 'farm-4',
    name: 'Mountain Poultry Farm',
    slug: 'mountain-poultry',
    description: 'Heritage breed chickens and ducks, pasture-raised.',
    location: 'Asheville, NC',
    phone: '(555) 345-6789',
    email: 'birds@mountainpoultry.farm',
    paymentLink: 'https://cash.app/$mountainpoultry',
    status: 'ACTIVE',
    emoji: "🦆",
    categories: ["POULTRY", "EGGS"],
    products: [
      { id: 'p10', name: 'Duck Eggs', category: 'EGGS', description: 'Rich duck eggs', price: 8, unit: 'dozen', availability: 'AVAILABLE' },
      { id: 'p11', name: 'Chicken Eggs', category: 'EGGS', description: 'Pasture-raised eggs', price: 5, unit: 'dozen', availability: 'AVAILABLE' },
    ],
  },
  'heritage-homestead': {
    id: 'farm-5',
    name: 'Heritage Homestead',
    slug: 'heritage-homestead',
    description: 'Heirloom vegetables and heritage breed pigs.',
    location: 'Austin, TX',
    phone: '(555) 456-7890',
    email: 'farm@heritagehomestead.com',
    paymentLink: 'https://venmo.com/heritage-homestead',
    status: 'ACTIVE',
    emoji: "🐷",
    categories: ["MEAT", "PRODUCE"],
    products: [
      { id: 'p13', name: 'Heirloom Tomatoes', category: 'PRODUCE', description: 'Rainbow heirloom tomato mix', price: 5, unit: 'lb', availability: 'AVAILABLE' },
      { id: 'p14', name: 'Fresh Basil', category: 'PRODUCE', description: 'Organic Genovese basil', price: 3, unit: 'bunch', availability: 'AVAILABLE' },
    ],
  },
  'sunrise-orchard': {
    id: 'farm-6',
    name: 'Sunrise Orchard',
    slug: 'sunrise-orchard',
    description: 'Organic apples, pears, and berries. U-pick available.',
    location: 'Ashland, OR',
    phone: '(555) 567-8901',
    email: 'pick@sunriseorchard.com',
    paymentLink: 'https://paypal.me/sunriseorchard',
    status: 'ACTIVE',
    emoji: "🍎",
    categories: ["PRODUCE", "PLANTS"],
    products: [
      { id: 'p16', name: 'Honeycrisp Apples', category: 'PRODUCE', description: 'Crisp organic apples', price: 3, unit: 'lb', availability: 'SEASONAL' },
      { id: 'p17', name: 'Bosc Pears', category: 'PRODUCE', description: 'Sweet organic pears', price: 3.50, unit: 'lb', availability: 'SEASONAL' },
    ],
  },
}

export function getAllFarms() {
  return Object.values(mockFarms).filter(f => f.status === 'ACTIVE')
}

export function getFarmsByCategory(category: string) {
  return getAllFarms().filter(farm => 
    farm.categories.includes(category)
  )
}

export function getCategoryById(id: string) {
  return categories.find(c => c.id === id)
}