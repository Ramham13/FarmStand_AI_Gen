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
  POULTRY: "Poultry",
  PLANTS: "Plants",
  COTTAGE_FOOD: "Cottage Food",
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
  OTHER: "📦",
}

const mockFarms: Record<string, any> = {
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
    products: [
      { id: 'p16', name: 'Honeycrisp Apples', category: 'PRODUCE', description: 'Crisp organic apples', price: 3, unit: 'lb', availability: 'SEASONAL' },
      { id: 'p17', name: 'Bosc Pears', category: 'PRODUCE', description: 'Sweet organic pears', price: 3.50, unit: 'lb', availability: 'SEASONAL' },
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
      {/* Farm Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="px-3 py-6 md:px-4 md:py-10">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
            {/* Farm Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white/10 rounded-full flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              {farm.emoji || "🏡"}
            </div>
            
            {/* Farm Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">{farm.name}</h1>
                <Badge variant="secondary" className="bg-green-600 text-white border-0 text-xs">
                  {farm.status}
                </Badge>
              </div>
              {farm.location && (
                <p className="text-green-100 text-sm md:text-base mb-2 flex items-center gap-1">
                  📍 <span className="truncate">{farm.location}</span>
                </p>
              )}
              {farm.description && (
                <p className="text-green-50 text-sm line-clamp-2 md:line-clamp-3">{farm.description}</p>
              )}
            </div>
            
            {/* Action Buttons - Stack on mobile */}
            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
              {farm.website && (
                <a href={farm.website} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="outline" className="bg-white text-green-800 border-green-200 hover:bg-green-50 w-full text-sm h-10">
                    🌐 Website
                  </Button>
                </a>
              )}
              {farm.paymentLink && (
                <a href={farm.paymentLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full text-sm h-10">
                    💰 Pay
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - Mobile Optimized */}
      <div className="px-3 py-5 md:px-4 md:py-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Available Products</h2>
        
        {farm.products.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No products listed yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {farm.products.map((product: any) => {
              const config = availabilityConfig[product.availability] || { label: product.availability, variant: "outline" as const }
              const emoji = categoryEmoji[product.category] || "📦"
              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-28 sm:h-32 bg-green-50 flex items-center justify-center text-4xl">
                    {emoji}
                  </div>
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <CardTitle className="text-base truncate">{product.name}</CardTitle>
                        <CardDescription className="text-xs">{categoryLabels[product.category]}</CardDescription>
                      </div>
                      <Badge variant={config.variant} className="text-xs flex-shrink-0">{config.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    {product.description && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="text-xl font-bold text-green-700 mb-3">
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

      {/* Contact Info - Mobile Optimized */}
      {(farm.phone || farm.email) && (
        <div className="px-3 py-5 md:px-4 border-t">
          <h3 className="font-semibold mb-3 text-base">Contact {farm.name}</h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {farm.phone && (
              <a href={`tel:${farm.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600">
                <span>📞</span> {farm.phone}
              </a>
            )}
            {farm.email && (
              <a href={`mailto:${farm.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600">
                <span>✉️</span> {farm.email}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 py-4 px-3">
        <div className="text-center text-xs sm:text-sm text-amber-800 px-2">
          <p>All transactions are directly with {farm.name}. Virtual Farm Stand does not process payments.</p>
        </div>
      </div>
    </div>
  )
}