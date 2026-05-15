"use client"

import Link from "next/link"
import { MapPin, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Category definitions with emoji, color, and description
const categories = [
  { 
    id: "EGGS", 
    label: "Eggs", 
    emoji: "🥚", 
    color: "bg-amber-50 border-amber-200",
    textColor: "text-amber-700",
    description: "Fresh farm eggs from pasture-raised hens",
    farms: 3,
    products: ["Chicken Eggs", "Duck Eggs", "Quail Eggs"]
  },
  { 
    id: "PRODUCE", 
    label: "Produce", 
    emoji: "🥬", 
    color: "bg-green-50 border-green-200",
    textColor: "text-green-700",
    description: "Fresh vegetables, fruits, and herbs",
    farms: 4,
    products: ["Tomatoes", "Lettuce", "Herbs", "Apples"]
  },
  { 
    id: "DAIRY", 
    label: "Dairy", 
    emoji: "🥛", 
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    description: "Milk, cheese, butter, and artisan dairy",
    farms: 2,
    products: ["Cheese", "Milk", "Butter", "Yogurt"]
  },
  { 
    id: "MEAT", 
    label: "Meat", 
    emoji: "🥩", 
    color: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    description: "Beef, pork, lamb, and specialty meats",
    farms: 2,
    products: ["Pork Chops", "Ground Beef", "Lamb", "Bacon"]
  },
  { 
    id: "POULTRY", 
    label: "Poultry", 
    emoji: "🍗", 
    color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-700",
    description: "Whole chickens, ducks, and turkey",
    farms: 1,
    products: ["Whole Chicken", "Duck", "Turkey"]
  },
  { 
    id: "PLANTS", 
    label: "Plants", 
    emoji: "🌱", 
    color: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
    description: "Seedlings, transplants, and perennials",
    farms: 2,
    products: ["Herb Starts", "Vegetable Transplants", "Succulents"]
  },
  { 
    id: "COTTAGE_FOOD", 
    label: "Cottage Food", 
    emoji: "🍪", 
    color: "bg-pink-50 border-pink-200",
    textColor: "text-pink-700",
    description: "Baked goods, preserves, honey, and crafts",
    farms: 1,
    products: ["Bread", "Cookies", "Jam", "Honey"]
  },
  { 
    id: "SEEDS", 
    label: "Seeds", 
    emoji: "🌾", 
    color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700",
    description: "Heirloom and organic seeds",
    farms: 1,
    products: ["Vegetable Seeds", "Flower Seeds"]
  },
  { 
    id: "LIVE_ANIMALS", 
    label: "Live Animals", 
    emoji: "🐐", 
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    description: "Goat kids, piglets, and chicks",
    farms: 1,
    products: ["Goat Kids", "Piglets", "Chicks"]
  },
  { 
    id: "COMPOST", 
    label: "Compost", 
    emoji: "🪨", 
    color: "bg-stone-50 border-stone-200",
    textColor: "text-stone-700",
    description: "Quality compost and soil amendments",
    farms: 1,
    products: ["Compost", "Soil Mix"]
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 px-3 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Product Categories
          </h1>
          <p className="text-green-100 text-sm md:text-base">
            Browse farms by what they grow, raise, or make
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-6 md:py-8">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/explore">
            <Button variant="outline" size="sm" className="h-10">
              View All Farms
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="h-10">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/explore?category=${category.id}`}
              className="group"
            >
              <Card className={`h-full ${category.color} border-2 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer`}>
                <CardContent className="p-4 md:p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl md:text-4xl">{category.emoji}</span>
                      <div>
                        <h2 className={`font-bold text-lg ${category.textColor}`}>
                          {category.label}
                        </h2>
                        <p className="text-xs text-gray-600">
                          {category.farms} farm{category.farms !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 ${category.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3">
                    {category.description}
                  </p>
                  
                  {/* Products */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {category.products.slice(0, 3).map((product) => (
                      <Badge 
                        key={product} 
                        variant="outline" 
                        className="text-xs bg-white/70"
                      >
                        {product}
                      </Badge>
                    ))}
                    {category.products.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-white/70">
                        +{category.products.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <div className={`flex items-center gap-1 text-sm font-medium ${category.textColor}`}>
                    <span>Explore {category.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 md:mt-12 bg-white rounded-lg border p-4 md:p-6">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">What are these categories?</h3>
              <p className="text-sm text-gray-600 mb-2">
                We organize farms by the main products they offer. Each farm may have products 
                across multiple categories — click on any category to see farms with those items.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> All transactions are directly between you and the farmer. 
                Virtual Farm Stand doesn't process payments.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center px-4">
          <p className="text-gray-600 mb-3 text-sm">Are you a farmer?</p>
          <Button asChild className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
            <Link href="/register">
              List Your Farm Free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}