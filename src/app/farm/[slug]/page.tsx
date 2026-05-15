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

// Mock data for SSR
const mockFarms: Record<string, any> = {
  'sunny-meadow-farm': {
    id: 'farm-1',
    name: 'Sunny Meadow Farm',
    slug: 'sunny-meadow-farm',
    description: 'Family-owned farm specializing in fresh eggs and vegetables. Our chickens are free-range and we use organic farming practices.',
    location: 'Rural Valley, CA',
    phone: '(555) 123-4567',
    email: 'sunny@farm.com',
    website: null,
    paymentLink: 'https://venmo.com/sunny-meadow',
    status: 'ACTIVE',
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
    website: null,
    paymentLink: 'https://paypal.me/greenacres',
    status: 'ACTIVE',
    products: [
      { id: 'p3', name: 'Fresh Herb Bundle', category: 'PRODUCE', description: 'Basil, rosemary, thyme', price: 5, unit: 'bundle', availability: 'AVAILABLE' },
      { id: 'p4', name: 'Mixed Greens', category: 'PRODUCE', description: 'Fresh mixed lettuce', price: 3.50, unit: 'bag', availability: 'AVAILABLE' },
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
      <div className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-6xl shrink-0">
              🏡
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{farm.name}</h1>
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
                  <Button variant="outline" className="bg-white text-green-800 border-green-200 hover:bg-green-50">
                    🌐 Visit Website
                  </Button>
                </a>
              )}
              {farm.paymentLink && (
                <a href={farm.paymentLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
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
              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 bg-green-50 flex items-center justify-center text-5xl">
                    {product.category === "EGGS" ? "🥚" :
                     product.category === "DAIRY" ? "🥛" :
                     product.category === "MEAT" ? "🥩" :
                     product.category === "PRODUCE" ? "🥬" :
                     product.category === "PLANTS" ? "🌱" :
                     product.category === "COTTAGE_FOOD" ? "🍪" :
                     product.category === "CRAFTS" ? "🧶" : "📦"}
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
                      <p className="text-lg font-bold text-green-700 mb-3">
                        ${product.price.toFixed(2)} {product.unit && `/${product.unit}`}
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
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          {farm.phone && <p className="text-gray-600">📞 {farm.phone}</p>}
          {farm.email && <p className="text-gray-600">✉️ {farm.email}</p>}
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