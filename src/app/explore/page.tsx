"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, MapPin, ArrowRight, Leaf, Check, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Demo farms
const allFarms = [
  {
    id: "farm-1",
    name: "Sunny Meadow Farm",
    slug: "sunny-meadow-farm",
    location: "Rural Valley, CA",
    description: "Family-owned farm specializing in fresh eggs and vegetables.",
    products: ["Fresh Eggs", "Heirloom Tomatoes"],
    emoji: "🐔",
    category: "EGGS",
    featured: true,
  },
  {
    id: "farm-2", 
    name: "Green Acres Farm",
    slug: "green-acres",
    location: "Portland, OR",
    description: "Sustainable farm growing heirloom vegetables and herbs.",
    products: ["Fresh Herb Bundle", "Mixed Greens"],
    emoji: "🌿",
    category: "PRODUCE",
    featured: true,
  },
  {
    id: "farm-3",
    name: "Valley View Dairy",
    slug: "valley-view-dairy",
    location: "Madison, WI",
    description: "Small-batch artisan cheese and raw milk from grass-fed cows.",
    products: ["Aged Cheddar", "Fresh Mozzarella"],
    emoji: "🥛",
    category: "DAIRY",
    featured: false,
  },
  {
    id: "farm-4",
    name: "Mountain Poultry",
    slug: "mountain-poultry",
    location: "Asheville, NC",
    description: "Heritage breed chickens and ducks, pasture-raised.",
    products: ["Duck Eggs", "Chicken Eggs"],
    emoji: "🦆",
    category: "POULTRY",
    featured: false,
  },
  {
    id: "farm-5",
    name: "Heritage Homestead",
    slug: "heritage-homestead",
    location: "Austin, TX",
    description: "Heirloom vegetables and heritage breed pigs.",
    products: ["Heirloom Tomatoes", "Pork Chops"],
    emoji: "🐷",
    category: "MEAT",
    featured: false,
  },
  {
    id: "farm-6",
    name: "Sunrise Orchard",
    slug: "sunrise-orchard",
    location: "Ashland, OR",
    description: "Organic apples, pears, and berries.",
    products: ["Apples", "Pears"],
    emoji: "🍎",
    category: "PRODUCE",
    featured: false,
  },
  {
    id: "farm-7",
    name: "Blooming Gardens",
    slug: "blooming-gardens",
    location: "Denver, CO",
    description: "Beautiful container gardens, succulents, and herb starts.",
    products: ["Herb Starts", "Succulents", "Petunias"],
    emoji: "🌺",
    category: "PLANTS",
    featured: false,
  },
  {
    id: "farm-8",
    name: "Grandma's Kitchen",
    slug: "grandmas-kitchen",
    location: "Burlington, VT",
    description: "Homemade baked goods and preserves from family recipes.",
    products: ["Blueberry Jam", "Chocolate Chip Cookies", "Bread"],
    emoji: "🧁",
    category: "COTTAGE_FOOD",
    featured: false,
  },
]

const categories = [
  { value: "all", label: "All Farms", emoji: "🏡" },
  { value: "EGGS", label: "Eggs", emoji: "🥚" },
  { value: "PRODUCE", label: "Produce", emoji: "🥬" },
  { value: "DAIRY", label: "Dairy", emoji: "🥛" },
  { value: "MEAT", label: "Meat", emoji: "🥩" },
  { value: "POULTRY", label: "Poultry", emoji: "🍗" },
  { value: "PLANTS", label: "Plants", emoji: "🌱" },
  { value: "COTTAGE_FOOD", label: "Cottage Food", emoji: "🍪" },
]

type SortOption = "featured" | "name-asc" | "location"

export default function ExplorePage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("featured")

  // Filter and sort farms
  const filteredFarms = useMemo(() => {
    let farms = [...allFarms]
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      farms = farms.filter((farm) => 
        farm.name.toLowerCase().includes(searchLower) ||
        farm.products.some(p => p.toLowerCase().includes(searchLower)) ||
        farm.location.toLowerCase().includes(searchLower)
      )
    }
    
    // Filter by category - proper category matching
    if (category !== "all") {
      farms = farms.filter((farm) => farm.category === category)
    }
    
    // Sort farms
    farms.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          // Featured first, then by name
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "location":
          return a.location.localeCompare(b.location)
        default:
          return 0
      }
    })
    
    return farms
  }, [search, category, sortBy])

  const featuredFarms = useMemo(() => 
    allFarms.filter(f => f.featured).sort((a, b) => a.name.localeCompare(b.name)),
  [])

  const activeFiltersCount = (search ? 1 : 0) + (category !== "all" ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 px-3 py-6 md:py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Explore Farms</h1>
          <p className="text-green-100 text-sm md:text-base">Discover local farms near you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-4 md:py-6">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/categories">
            <Button variant="outline" size="sm" className="h-10 bg-white">
              📂 All Categories
            </Button>
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search farms, products, or locations..." 
              className="pl-10 h-12 text-base w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium flex-shrink-0 transition-all min-h-[44px] flex items-center gap-1.5 ${
                  category === cat.value
                    ? "bg-green-600 text-white shadow-md shadow-green-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                {category === cat.value && <Check className="ml-1 h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
          
          {/* Sort & Active Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[160px] h-9 bg-gray-50 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">⭐ Featured</SelectItem>
                  <SelectItem value="name-asc">📋 Name A-Z</SelectItem>
                  <SelectItem value="location">📍 Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Active Filters & Results Count */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filteredFarms.length}</span> {filteredFarms.length === 1 ? 'farm' : 'farms'} found
              </span>
              {activeFiltersCount > 0 && (
                <div className="flex gap-1">
                  {search && (
                    <button 
                      onClick={() => setSearch("")} 
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      "{search}" ×
                    </button>
                  )}
                  {category !== "all" && (
                    <button 
                      onClick={() => setCategory("all")} 
                      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 transition-colors flex items-center gap-1"
                    >
                      {categories.find(c => c.value === category)?.emoji} {categories.find(c => c.value === category)?.label} ×
                    </button>
                  )}
                  <button 
                    onClick={() => { setSearch(""); setCategory("all") }} 
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Section */}
        {category === "all" && !search && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">⭐</span> Featured Farms
              <span className="text-sm font-normal text-gray-500 ml-2">Handpicked local favorites</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredFarms.map((farm) => (
                <Link key={farm.id} href={`/farm/${farm.slug}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 group">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform">
                          {farm.emoji}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg truncate">{farm.name}</h3>
                            <Badge className="bg-amber-100 text-amber-800 text-xs">Featured</Badge>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" /> 
                            <span>{farm.location}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1 truncate">{farm.products.join(" • ")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Farms Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            {category === "all" && !search ? (
              <>🌾 All Farms</>
            ) : (
              <>🔍 Search Results</>
            )}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFarms.map((farm) => (
              <Link key={farm.id} href={`/farm/${farm.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer overflow-hidden group border-gray-200">
                  {/* Card Header with Emoji */}
                  <div className="h-28 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />
                    <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                      {farm.emoji}
                    </span>
                    {farm.featured && (
                      <Badge className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-medium">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    {/* Farm Name & Category */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg leading-tight">{farm.name}</h3>
                    </div>
                    
                    {/* Location */}
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-green-600" />
                      <span>{farm.location}</span>
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{farm.description}</p>
                    
                    {/* Products */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {farm.products.slice(0, 3).map((product) => (
                        <Badge 
                          key={product} 
                          variant="secondary" 
                          className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-100"
                        >
                          {product}
                        </Badge>
                      ))}
                      {farm.products.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          +{farm.products.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* View Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Badge className="bg-green-600 text-xs font-medium">Available</Badge>
                      <span className="text-green-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        View farm 
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredFarms.length === 0 && (
          <div className="py-16 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No farms found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any farms matching your search. Try adjusting your filters or search term.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => { setSearch(""); setCategory("all") }}
                className="border-gray-300"
              >
                Clear all filters
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/register">
                  <Leaf className="mr-2 h-4 w-4" />
                  List Your Farm
                </Link>
              </Button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["eggs", "vegetables", "cheese", "organic"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center px-4 py-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <p className="text-gray-700 mb-3 text-sm font-medium">Are you a farmer?</p>
          <Button asChild className="bg-green-600 hover:bg-green-700 w-full sm:w-auto shadow-lg shadow-green-200">
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
