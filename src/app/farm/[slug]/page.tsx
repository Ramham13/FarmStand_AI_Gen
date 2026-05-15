import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReservationForm } from "@/components/farm/reservation-form";
import { WaitlistForm } from "@/components/farm/waitlist-form";

const availabilityConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  AVAILABLE: { label: "Available", variant: "default" },
  RESERVED: { label: "Reserved", variant: "secondary" },
  SOLD_OUT: { label: "Sold Out", variant: "destructive" },
  SEASONAL: { label: "Seasonal", variant: "outline" },
}

const categoryLabels: Record<string, string> = {
  PRODUCE: "Produce",
  EGGS: "Eggs",
  DAIRY: "Dairy",
  MEAT: "Meat",
  LIVE_ANIMALS: "Live Animals",
  POULTRY: "Poultry",
  PLANTS: "Plants",
  SEEDS: "Seeds",
  COMPOST: "Compost",
  MANURE: "Manure",
  HAY: "Hay",
  COTTAGE_FOOD: "Cottage Food",
  CRAFTS: "Crafts",
  OTHER: "Other",
}

const categoryEmoji: Record<string, string> = {
  PRODUCE: "🥬",
  EGGS: "🥚",
  DAIRY: "🥛",
  MEAT: "🥩",
  POULTRY: "🍗",
  PLANTS: "🌱",
  COTTAGE_FOOD: "🍪",
  CRAFTS: "🧶",
  OTHER: "📦",
}

// Mock data for SSR
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
    emoji: "🐔",
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
    emoji: "🌿",
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
    emoji: "🥛",
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
    emoji: "🦆",
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
    emoji: "🐷",
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
    emoji: "🍎",
    products: [
      { id: 'p16', name: 'Honeycrisp Apples', category: 'PRODUCE', description: 'Crisp and sweet organic apples', price: 3, unit: 'lb', availability: 'SEASONAL' },
      { id: 'p17', name: 'Bosc Pears', category: 'PRODUCE', description: 'Sweet organic pears', price: 3.50, unit: 'lb', availability: 'SEASONAL' },
      { id: 'p18', name: 'Blackberries', category: 'PRODUCE', description: 'Organic blackberries', price: 6, unit: 'pint', availability: 'SEASONAL' },
    ],
  },
}

export default async function FarmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const farm = mockFarms[slug]

  if (!farm) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Farm Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center text-6xl shrink-0 backdrop-blur">
              {farm.emoji || "🏡"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{farm.name}</h1>
                <Badge variant="secondary" className="bg-green-600 text-white border-0">
                  {farm.status}
                </Badge>
              </div>
              {farm.location && (
                <p className="text-green-100 text-lg mb-4 flex items-center gap-2">
                  📍 {farm.location}
                </p>
              )}
              {farm.description && (
                <p className="text-green-50 max-w-2xl">{farm.description}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {farm.website && (
                <a href={farm.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="bg-white text-green-800 border-green-200 hover:bg-green-50 w-full">
                    🌐 Website
                  </Button>
                </a>
              )}
              {farm.paymentLink && (
                <a href={farm.paymentLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">
                    💰 Pay with {farm.paymentLink.includes("venmo") ? "Venmo" : farm.paymentLink.includes("paypal") ? "PayPal" : "Cash App"}
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Available Products</h2>
        
        {farm.products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No products listed yet.</p>
              <p className="text-gray-400 text-sm">Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farm.products.map((product: any) => {
              const config = availabilityConfig[product.availability] || { label: product.availability, variant: "outline" as const }
              const emoji = categoryEmoji[product.category] || "📦"
              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-40 bg-green-50 flex items-center justify-center text-5xl">
                    {emoji}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{categoryLabels[product.category]}</CardDescription>
                      </div>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="text-2xl font-bold text-green-700 mb-3">
                        ${product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
                      </p>
                    )}
                    
                    {product.availability === "AVAILABLE" ? (
                      <ReservationForm productId={product.id} productName={product.name} />
                    ) : (
                      <WaitlistForm productId={product.id} productName={product.name} />
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Contact Info */}
      {(farm.phone || farm.email) && (
        <div className="container mx-auto px-4 py-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Contact {farm.name}</h3>
          <div className="flex flex-wrap gap-4">
            {farm.phone && (
              <a href={`tel:${farm.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <span>📞</span> {farm.phone}
              </a>
            )}
            {farm.email && (
              <a href={`mailto:${farm.email}`} className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <span>✉️</span> {farm.email}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-amber-800">
          <p>
            <strong>Note:</strong> All transactions are directly with {farm.name}. 
            Virtual Farm Stand does not process payments or handle orders.
          </p>
        </div>
      </div>
    </div>
  )
}