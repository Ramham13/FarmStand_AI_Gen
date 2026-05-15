"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search, MapPin, ArrowRight, Leaf, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  { value: "all", label: "All Farms" },
  { value: "EGGS", label: "🥚 Eggs" },
  { value: "PRODUCE", label: "🥬 Produce" },
  { value: "DAIRY", label: "🥛 Dairy" },
  { value: "MEAT", label: "🥩 Meat" },
  { value: "POULTRY", label: "🍗 Poultry" },
  { value: "PLANTS", label: "🌱 Plants" },
  { value: "COTTAGE_FOOD", label: "🍪 Cottage Food" },
]

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [initialized, setInitialized] = useState(false)

  // Initialize state from URL params
  useEffect(() => {
    const q = searchParams.get("q")
    const cat = searchParams.get("category")
    
    if (q) setSearch(q)
    if (cat) setCategory(cat)
    setInitialized(true)
  }, [searchParams])

  // Update URL when state changes (but not during initial load)
  useEffect(() => {
    if (!initialized) return
    
    const params = new URLSearchParams()
    if (search) params.set("q", search)
    if (category !== "all") params.set("category", category)
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/explore"
    router.replace(newUrl, { scroll: false })
  }, [search, category, initialized, router])

  const filteredFarms = allFarms.filter((farm) => {
    const matchesSearch = search === "" || 
      farm.name.toLowerCase().includes(search.toLowerCase()) ||
      farm.products.some(p => p.toLowerCase().includes(search.toLowerCase())) ||
      farm.location.toLowerCase().includes(search.toLowerCase())
    
    // Filter by category - check if farm has products in that category
    const matchesCategory = category === "all" || 
      farm.category === category ||
      (category === "EGGS" && farm.products.some(p => p.toLowerCase().includes("egg"))) ||
      (category === "PRODUCE" && (farm.products.some(p => p.toLowerCase().includes("tomato")) || farm.products.some(p => p.toLowerCase().includes("greens")) || farm.products.some(p => p.toLowerCase().includes("herb")) || farm.products.some(p => p.toLowerCase().includes("basil")) || farm.products.some(p => p.toLowerCase().includes("apple")) || farm.products.some(p => p.toLowerCase().includes("pear"))))
    
    return matchesSearch && matchesCategory
  })

  const featuredFarms = allFarms.filter(f => f.featured)

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
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search farms or products..." 
              className="pl-10 h-11 text-base w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Category Pills - Touch-friendly */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 -mx-3 px-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium flex-shrink-0 transition-all min-h-[44px] ${
                  category === cat.value
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
                {category === cat.value && <Check className="inline ml-1.5 h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
          
          {(category !== "all" || search) && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
              <span className="text-xs text-gray-500 self-center">{filteredFarms.length} results</span>
              {search && (
                <button onClick={() => setSearch("")} className="text-xs text-blue-600 hover:underline">
                  Clear search
                </button>
              )}
              {category !== "all" && (
                <button onClick={() => setCategory("all")} className="text-xs text-blue-600 hover:underline">
                  Clear filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* Featured Section */}
        {category === "all" && !search && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>⭐</span> Featured Farms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredFarms.map((farm) => (
                <Link key={farm.id} href={`/farm/${farm.slug}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{farm.emoji}</span>
                        <div className="min-w-0">
                          <h3 className="font-bold truncate">{farm.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {farm.location}
                          </p>
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
          <h2 className="text-lg font-bold mb-3">
            {category === "all" && !search ? "All Farms" : "Results"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
            {filteredFarms.map((farm) => (
              <Link key={farm.id} href={`/farm/${farm.slug}`}>
                <Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer overflow-hidden">
                  <div className="h-24 bg-green-50 flex items-center justify-center text-4xl">
                    {farm.emoji}
                  </div>
                  <CardContent className="p-3 pt-2">
                    <h3 className="font-bold text-base truncate">{farm.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{farm.location}</span>
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{farm.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {farm.products.slice(0, 2).map((product) => (
                        <Badge key={product} variant="outline" className="text-[10px] px-1.5">
                          {product}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-600 text-xs">Available</Badge>
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
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
        <div className="mt-8 text-center px-4">
          <p className="text-gray-600 mb-3 text-sm">Are you a farmer?</p>
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