"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ReservationForm } from "@/components/farm/reservation-form"
import { WaitlistForm } from "@/components/farm/waitlist-form"
import { Search, ArrowUpDown } from "lucide-react"

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
  LIVE_ANIMALS: "Live Animals",
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
  LIVE_ANIMALS: "🐐",
  PLANTS: "🌱",
  SEEDS: "🌾",
  COMPOST: "🪨",
  MANURE: "💩",
  HAY: "🌿",
  COTTAGE_FOOD: "🍪",
  CRAFTS: "🎨",
  OTHER: "📦",
}

function getUniqueCategories(products: any[]) {
  const categories = new Set(products.map(p => p.category))
  return Array.from(categories).filter(Boolean)
}

interface FarmPageClientProps {
  farm: {
    id: string
    name: string
    slug: string
    description: string
    location: string
    phone?: string
    email?: string
    website?: string
    paymentLink?: string
    status: string
    emoji: string
    products: Array<{
      id: string
      name: string
      category: string
      description?: string
      price?: number
      unit?: string
      availability: string
    }>
  }
}

export function FarmPageClient({ farm }: FarmPageClientProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name")

  const uniqueCategories = getUniqueCategories(farm.products)

  const filteredProducts = useMemo(() => {
    return farm.products
      .filter((product) => {
        const matchesSearch = search === "" ||
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          (product.description?.toLowerCase().includes(search.toLowerCase()))
        const matchesCategory = category === "all" || product.category === category
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name)
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0)
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0)
        return 0
      })
  }, [farm.products, search, category, sortBy])

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

      {/* Products Section with Search & Filters */}
      <div className="px-3 py-5 md:px-4 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Available Products</h2>
          
          {/* Sort Dropdown - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border rounded-md px-2 py-1.5 bg-white"
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Search & Category Filters */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === "all"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              All
            </button>
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  category === cat
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border"
                }`}
              >
                {categoryEmoji[cat]} {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Sort */}
        <div className="sm:hidden mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full text-sm border rounded-lg px-3 py-2.5 bg-white"
          >
            <option value="name">Sort: Name A-Z</option>
            <option value="price-low">Sort: Price Low to High</option>
            <option value="price-high">Sort: Price High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No products match your search.</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setCategory("all") }}
                className="mt-2 text-green-600 hover:underline text-sm"
              >
                Clear filters
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
            {filteredProducts.map((product) => {
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