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
    region: "West",
    description: "Family-owned farm specializing in fresh eggs and vegetables.",
    products: ["Fresh Eggs", "Heirloom Tomatoes"],
    emoji: "🐔",
    category: "EGGS",
    featured: true,
    priceRange: "$",
    availability: "in_stock",
  },
  {
    id: "farm-2", 
    name: "Green Acres Farm",
    slug: "green-acres",
    location: "Portland, OR",
    region: "West",
    description: "Sustainable farm growing heirloom vegetables and herbs.",
    products: ["Fresh Herb Bundle", "Mixed Greens"],
    emoji: "🌿",
    category: "PRODUCE",
    featured: true,
    priceRange: "$$",
    availability: "in_stock",
  },
  {
    id: "farm-3",
    name: "Valley View Dairy",
    slug: "valley-view-dairy",
    location: "Madison, WI",
    region: "Midwest",
    description: "Small-batch artisan cheese and raw milk from grass-fed cows.",
    products: ["Aged Cheddar", "Fresh Mozzarella"],
    emoji: "🥛",
    category: "DAIRY",
    featured: false,
    priceRange: "$$$",
    availability: "seasonal",
  },
  {
    id: "farm-4",
    name: "Mountain Poultry",
    slug: "mountain-poultry",
    location: "Asheville, NC",
    region: "Southeast",
    description: "Heritage breed chickens and ducks, pasture-raised.",
    products: ["Duck Eggs", "Chicken Eggs"],
    emoji: "🦆",
    category: "POULTRY",
    featured: false,
    priceRange: "$$",
    availability: "sold_out",
  },
  {
    id: "farm-5",
    name: "Heritage Homestead",
    slug: "heritage-homestead",
    location: "Austin, TX",
    region: "South",
    description: "Heirloom vegetables and heritage breed pigs.",
    products: ["Heirloom Tomatoes", "Pork Chops"],
    emoji: "🐷",
    category: "MEAT",
    featured: false,
    priceRange: "$$",
    availability: "in_stock",
  },
  {
    id: "farm-6",
    name: "Sunrise Orchard",
    slug: "sunrise-orchard",
    location: "Ashland, OR",
    region: "West",
    description: "Organic apples, pears, and berries.",
    products: ["Apples", "Pears"],
    emoji: "🍎",
    category: "PRODUCE",
    featured: false,
    priceRange: "$",
    availability: "seasonal",
  },
  {
    id: "farm-7",
    name: "Blooming Gardens",
    slug: "blooming-gardens",
    location: "Denver, CO",
    region: "West",
    description: "Beautiful container gardens, succulents, and herb starts.",
    products: ["Herb Starts", "Succulents", "Petunias"],
    emoji: "🌺",
    category: "PLANTS",
    featured: false,
    priceRange: "$$",
    availability: "in_stock",
  },
  {
    id: "farm-8",
    name: "Grandma's Kitchen",
    slug: "grandmas-kitchen",
    location: "Burlington, VT",
    region: "Northeast",
    description: "Homemade baked goods and preserves from family recipes.",
    products: ["Blueberry Jam", "Chocolate Chip Cookies", "Bread"],
    emoji: "🧁",
    category: "COTTAGE_FOOD",
    featured: false,
    priceRange: "$",
    availability: "in_stock",
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

// Regions for location filter
const regions = [
  { value: "all", label: "All Regions" },
  { value: "West", label: "West" },
  { value: "Midwest", label: "Midwest" },
  { value: "Northeast", label: "Northeast" },
  { value: "Southeast", label: "Southeast" },
  { value: "South", label: "South" },
]

// Price ranges
const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "$", label: "$ (Budget)" },
  { value: "$$", label: "$$ (Moderate)" },
  { value: "$$$", label: "$$$ (Premium)" },
]

// Availability options
const availabilityOptions = [
  { value: "all", label: "All Availability" },
  { value: "in_stock", label: "In Stock" },
  { value: "seasonal", label: "Seasonal" },
  { value: "sold_out", label: "Sold Out" },
]

type SortOption = "featured" | "name-asc" | "location"
type AvailabilityType = "all" | "in_stock" | "seasonal" | "sold_out"

export default function ExplorePage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [region, setRegion] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [availability, setAvailability] = useState<AvailabilityType>("all")

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
    
    // Filter by region
    if (region !== "all") {
      farms = farms.filter((farm) => farm.region === region)
    }
    
    // Filter by price range
    if (priceRange !== "all") {
      farms = farms.filter((farm) => farm.priceRange === priceRange)
    }
    
    // Filter by availability
    if (availability !== "all") {
      farms = farms.filter((farm) => farm.availability === availability)
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
  }, [search, category, sortBy, region, priceRange, availability])

  const featuredFarms = useMemo(() => 
    allFarms.filter(f => f.featured).sort((a, b) => a.name.localeCompare(b.name)),
  [])

  const activeFiltersCount = (search ? 1 : 0) + (category !== "all" ? 1 : 0) + (region !== "all" ? 1 : 0) + (priceRange !== "all" ? 1 : 0) + (availability !== "all" ? 1 : 0)

  const clearAllFilters = () => {
    setSearch("")
    setCategory("all")
    setRegion("all")
    setPriceRange("all")
    setAvailability("all")
  }

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
          {/* Prominent Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl -m-px"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
              <Input 
                placeholder="Search farms, products, or locations..." 
                className="pl-12 h-14 text-lg w-full bg-white border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-xl transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          {/* Advanced Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {/* Region Filter */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="border-0 bg-transparent h-9 focus:ring-0 shadow-none">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Range Filter */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500 flex-shrink-0 font-medium">$</span>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="border-0 bg-transparent h-9 focus:ring-0 shadow-none">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((p) => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Availability Filter */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500 flex-shrink-0">📦</span>
              <Select value={availability} onValueChange={(value) => setAvailability(value as AvailabilityType)}>
                <SelectTrigger className="border-0 bg-transparent h-9 focus:ring-0 shadow-none">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((a) => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[160px] h-11 min-h-[44px] bg-gray-50 border-gray-200">
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
                <div className="flex gap-2">
                  {search && (
                    <button 
                      onClick={() => setSearch("")} 
                      className="text-sm bg-blue-50 text-blue-700 px-3 py-2 min-h-[44px] rounded-full hover:bg-blue-100 transition-colors flex items-center"
                    >
                      "{search}" ×
                    </button>
                  )}
                  {category !== "all" && (
                    <button 
                      onClick={() => setCategory("all")} 
                      className="text-sm bg-green-50 text-green-700 px-3 py-2 min-h-[44px] rounded-full hover:bg-green-100 transition-colors flex items-center gap-1"
                    >
                      {categories.find(c => c.value === category)?.emoji} {categories.find(c => c.value === category)?.label} ×
                    </button>
                  )}
                  {region !== "all" && (
                    <button 
                      onClick={() => setRegion("all")} 
                      className="text-sm bg-blue-50 text-blue-700 px-3 py-2 min-h-[44px] rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1"
                    >
                      📍 {regions.find(r => r.value === region)?.label} ×
                    </button>
                  )}
                  {priceRange !== "all" && (
                    <button 
                      onClick={() => setPriceRange("all")} 
                      className="text-sm bg-amber-50 text-amber-700 px-3 py-2 min-h-[44px] rounded-full hover:bg-amber-100 transition-colors flex items-center gap-1"
                    >
                      $ {priceRanges.find(p => p.value === priceRange)?.label.replace(/.*\(/, "(").replace(/\)/, "")} ×
                    </button>
                  )}
                  {availability !== "all" && (
                    <button 
                      onClick={() => setAvailability("all")} 
                      className="text-sm bg-purple-50 text-purple-700 px-3 py-2 min-h-[44px] rounded-full hover:bg-purple-100 transition-colors flex items-center gap-1"
                    >
                      📦 {availabilityOptions.find(a => a.value === availability)?.label} ×
                    </button>
                  )}
                  <button 
                    onClick={clearAllFilters} 
                    className="text-sm text-gray-500 hover:text-gray-700 underline min-h-[44px] px-2 py-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Section */}
        {category === "all" && !search && region === "all" && priceRange === "all" && availability === "all" && (
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
            {category === "all" && !search && region === "all" && priceRange === "all" && availability === "all" ? (
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
                      <Badge 
                        className={`text-xs font-medium ${
                          farm.availability === "in_stock" 
                            ? "bg-green-100 text-green-800" 
                            : farm.availability === "seasonal"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {farm.availability === "in_stock" ? "✓ In Stock" : farm.availability === "seasonal" ? "🌸 Seasonal" : "✗ Sold Out"}
                      </Badge>
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
                onClick={clearAllFilters}
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