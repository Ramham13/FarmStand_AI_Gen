"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, MapPin, ArrowRight, Leaf, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Demo farms
const allFarms = [
  {
    id: "farm-1",
    name: "Sunny Meadow Farm",
    slug: "sunny-meadow-farm",
    location: "Rural Valley, CA",
    locationState: "CA",
    description: "Family-owned farm specializing in fresh eggs and vegetables. Our chickens are free-range and we use organic farming practices.",
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
    description: "Sustainable farm growing heirloom vegetables and herbs using regenerative practices.",
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
    name: "Mountain Poultry Farm",
    slug: "mountain-poultry",
    location: "Asheville, NC",
    locationState: "NC",
    description: "Heritage breed chickens and ducks, pasture-raised for the best eggs and meat.",
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
    description: "Heirloom vegetables and heritage breed pigs. Farm-to-table excellence.",
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
    description: "Organic apples, pears, and berries. U-pick and pre-order available.",
    products: ["Apples", "Pears"],
    emoji: "🍎",
    category: "PRODUCE",
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "EGGS", label: "🥚 Eggs" },
  { value: "PRODUCE", label: "🥬 Produce" },
  { value: "DAIRY", label: "🥛 Dairy" },
  { value: "MEAT", label: "🥩 Meat" },
  { value: "POULTRY", label: "🍗 Poultry" },
]

const locations = [
  { value: "all", label: "All Locations" },
  { value: "CA", label: "California" },
  { value: "OR", label: "Oregon" },
  { value: "WI", label: "Wisconsin" },
  { value: "NC", label: "North Carolina" },
  { value: "TX", label: "Texas" },
]

export default function ExplorePage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [location, setLocation] = useState("all")

  const filteredFarms = allFarms.filter((farm) => {
    const matchesSearch = search === "" || 
      farm.name.toLowerCase().includes(search.toLowerCase()) ||
      farm.products.some(p => p.toLowerCase().includes(search.toLowerCase())) ||
      farm.location.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || farm.category === category
    const matchesLocation = location === "all" || farm.locationState === location
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold text-white">Explore Farms</h1>
          <p className="text-green-100">
            Discover local farms and fresh products in your area
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search farms, products, or locations..." 
                className="pl-12 h-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px] h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full md:w-[180px] h-12">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Active Filters */}
          {(category !== "all" || location !== "all" || search) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-gray-500 self-center">
                {filteredFarms.length} result{filteredFarms.length !== 1 ? "s" : ""}:
              </span>
              {search && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearch("")}>
                  "{search}" ✕
                </Badge>
              )}
              {category !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setCategory("all")}>
                  {categories.find(c => c.value === category)?.label} ✕
                </Badge>
              )}
              {location !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setLocation("all")}>
                  {locations.find(l => l.value === location)?.label} ✕
                </Badge>
              )}
              <Button variant="link" size="sm" onClick={() => { setSearch(""); setCategory("all"); setLocation("all") }}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredFarms.length} of {allFarms.length} farms
        </p>

        {/* Farm Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFarms.map((farm) => (
            <Link key={farm.id} href={`/farm/${farm.slug}`}>
              <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <div className="h-32 bg-green-50 flex items-center justify-center text-6xl">
                  {farm.emoji}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{farm.name}</CardTitle>
                  <CardDescription className="flex items-center text-base">
                    <MapPin className="mr-1 h-4 w-4" />
                    {farm.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {farm.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {farm.products.slice(0, 3).map((product) => (
                      <Badge key={product} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-600">Available</Badge>
                    <Button variant="ghost" size="sm" className="text-green-700">
                      View Farm
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredFarms.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500 text-lg mb-2">No farms found</p>
            <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategory("all"); setLocation("all") }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Are you a farmer?</p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
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