"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, ArrowRight, Leaf, Filter, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

// Demo farms
const allFarms = [
  {
    id: "farm-1",
    name: "Sunny Meadow Farm",
    slug: "sunny-meadow-farm",
    location: "Rural Valley, CA",
    locationState: "CA",
    description: "Family-owned farm specializing in fresh eggs and vegetables.",
    products: ["Fresh Eggs", "Heirloom Tomatoes"],
    emoji: "🐔",
    category: "EGGS",
  },
  {
    id: "farm-2", 
    name: "Green Acres Farm",
    slug: "green-acres",
    location: "Portland, OR",
    locationState: "OR",
    description: "Sustainable farm growing heirloom vegetables and herbs.",
    products: ["Fresh Herb Bundle", "Mixed Greens"],
    emoji: "🌿",
    category: "PRODUCE",
  },
  {
    id: "farm-3",
    name: "Valley View Dairy",
    slug: "valley-view-dairy",
    location: "Madison, WI",
    locationState: "WI",
    description: "Small-batch artisan cheese and raw milk from grass-fed cows.",
    products: ["Aged Cheddar", "Fresh Mozzarella"],
    emoji: "🥛",
    category: "DAIRY",
  },
  {
    id: "farm-4",
    name: "Mountain Poultry",
    slug: "mountain-poultry",
    location: "Asheville, NC",
    locationState: "NC",
    description: "Heritage breed chickens and ducks, pasture-raised.",
    products: ["Duck Eggs", "Chicken Eggs"],
    emoji: "🦆",
    category: "POULTRY",
  },
  {
    id: "farm-5",
    name: "Heritage Homestead",
    slug: "heritage-homestead",
    location: "Austin, TX",
    locationState: "TX",
    description: "Heirloom vegetables and heritage breed pigs.",
    products: ["Heirloom Tomatoes", "Pork Chops"],
    emoji: "🐷",
    category: "MEAT",
  },
  {
    id: "farm-6",
    name: "Sunrise Orchard",
    slug: "sunrise-orchard",
    location: "Ashland, OR",
    locationState: "OR",
    description: "Organic apples, pears, and berries.",
    products: ["Apples", "Pears"],
    emoji: "🍎",
    category: "PRODUCE",
  },
]

const categories = [
  { value: "all", label: "All" },
  { value: "EGGS", label: "🥚 Eggs" },
  { value: "PRODUCE", label: "🥬 Produce" },
  { value: "DAIRY", label: "🥛 Dairy" },
  { value: "MEAT", label: "🥩 Meat" },
  { value: "POULTRY", label: "🍗 Poultry" },
]

export default function ExplorePage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const filteredFarms = allFarms.filter((farm) => {
    const matchesSearch = search === "" || 
      farm.name.toLowerCase().includes(search.toLowerCase()) ||
      farm.products.some(p => p.toLowerCase().includes(search.toLowerCase())) ||
      farm.location.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || farm.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-green-700 px-4 py-6 md:py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Explore Farms</h1>
          <p className="text-green-100 text-sm md:text-base">
            Discover local farms near you
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {/* Mobile Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border">
          {/* Search - Always visible */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search farms or products..." 
              className="pl-10 h-11 text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Category Pills - Scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  category === cat.value
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          {/* Active Filters */}
          {(category !== "all" || search) && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
              <span className="text-xs text-gray-500 self-center">
                {filteredFarms.length} results
              </span>
              {search && (
                <Badge variant="secondary" className="text-xs cursor-pointer" onClick={() => setSearch("")}>
                  "{search}" ✕
                </Badge>
              )}
              {category !== "all" && (
                <Badge variant="secondary" className="text-xs cursor-pointer" onClick={() => setCategory("all")}>
                  {categories.find(c => c.value === category)?.label} ✕
                </Badge>
              )}
              <Button variant="link" size="sm" className="text-xs h-auto p-0" onClick={() => { setSearch(""); setCategory("all") }}>
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Farm Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredFarms.map((farm) => (
            <Link key={farm.id} href={`/farm/${farm.slug}`}>
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer overflow-hidden">
                {/* Farm Icon - Smaller on mobile */}
                <div className="h-24 sm:h-28 md:h-32 bg-green-50 flex items-center justify-center text-4xl sm:text-5xl">
                  {farm.emoji}
                </div>
                <CardHeader className="p-3 md:p-4 pb-0">
                  <CardTitle className="text-base md:text-lg leading-tight">{farm.name}</CardTitle>
                  <CardDescription className="flex items-center text-xs md:text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-0.5 flex-shrink-0" />
                    <span className="truncate">{farm.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 md:p-4 pt-2">
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-3">
                    {farm.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {farm.products.slice(0, 2).map((product) => (
                      <Badge key={product} variant="outline" className="text-[10px] md:text-xs px-1.5 py-0">
                        {product}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-600 text-xs">Available</Badge>
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      View
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredFarms.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 mb-2">No farms found</p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategory("all") }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 md:mt-12 text-center px-4">
          <p className="text-gray-600 mb-3 text-sm md:text-base">Are you a farmer?</p>
          <Button asChild className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
            <Link href="/register">
              <Leaf className="mr-2 h-4 w-4" />
              List Your Farm Free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}