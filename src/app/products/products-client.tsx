"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, X, Package, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  description?: string
  category: string
  price: number
  unit: string
  availability: string
  imageUrl?: string
  farmId: string
  farmName: string
  farmSlug: string
  farmEmoji: string
  farmLocation: string
}

interface Filters {
  categories: string[]
  farms: string[]
}

const categoryLabels: Record<string, string> = {
  PRODUCE: "🥬 Produce",
  EGGS: "🥚 Eggs",
  DAIRY: "🥛 Dairy",
  MEAT: "🥩 Meat",
  BAKED_GOODS: "🍞 Baked Goods",
  HONEY: "🍯 Honey",
  PRESERVES: "🫙 Preserves",
  HERBS: "🌿 Herbs",
}

export function ProductsClient({
  initialQuery = "",
  initialCategory = "",
  initialMinPrice = "",
  initialMaxPrice = "",
}: {
  initialQuery?: string
  initialCategory?: string
  initialMinPrice?: string
  initialMaxPrice?: string
}) {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<Filters>({ categories: [], farms: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [minPrice, setMinPrice] = useState(initialMinPrice)
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice)
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters = query || selectedCategory || minPrice || maxPrice

  const buildFilterUrl = useCallback(() => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (selectedCategory) params.set("category", selectedCategory)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    return params.toString()
  }, [query, selectedCategory, minPrice, maxPrice])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = buildFilterUrl()
      const res = await fetch(`/api/products?${params}`)
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`)
      }
      const data = await res.json()
      setProducts(data.products || [])
      setFilters(data.filters || { categories: [], farms: [] })
    } catch (err) {
      console.error("Failed to fetch products:", err)
      setError("Failed to load products. Please try again.")
      toast.error("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [buildFilterUrl])

  // Initial fetch
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Update URL on filter change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = buildFilterUrl()
      router.replace(params ? `/products?${params}` : "/products", { scroll: false })
    }, 300)
    return () => clearTimeout(timer)
  }, [query, selectedCategory, minPrice, maxPrice, buildFilterUrl, router])

  const clearFilters = () => {
    setQuery("")
    setSelectedCategory("")
    setMinPrice("")
    setMaxPrice("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products or farms..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-11 touch-manipulation"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Filter Toggle Button */}
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-11 touch-manipulation"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-white text-green-700">
                  {(query ? 1 : 0) + (selectedCategory ? 1 : 0) + (minPrice || maxPrice ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border grid gap-4 sm:grid-cols-3">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border bg-white text-sm touch-manipulation"
                >
                  <option value="">All Categories</option>
                  {filters.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat] || cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="h-10"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="h-10"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="w-full touch-manipulation"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-3 py-6">
        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Error State */}
        {error ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-4">{error}</p>
              <Button onClick={fetchProducts} className="bg-green-600 hover:bg-green-700">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-32 w-full rounded mb-3" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Products Grid */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow overflow-hidden">
                {/* Product Image */}
                {product.imageUrl ? (
                  <div className="relative h-32 w-full">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                    <span className="text-4xl">
                      {categoryLabels[product.category]?.split(" ")[0] || "📦"}
                    </span>
                  </div>
                )}
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {categoryLabels[product.category] || product.category}
                      </Badge>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-green-700">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">per {product.unit}</p>
                    </div>
                  </div>
                  
                  {product.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                  )}
                  
                  {/* Farm Link */}
                  <a
                    href={`/farm/${product.farmSlug}`}
                    className="flex items-center gap-2 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation"
                  >
                    <span className="text-xl" role="img" aria-label={product.farmName}>
                      {product.farmEmoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate text-gray-900">
                        {product.farmName}
                      </p>
                      <p className="text-xs text-gray-500">{product.farmLocation}</p>
                    </div>
                  </a>
                  
                  {/* View Button */}
                  <a href={`/farm/${product.farmSlug}?productId=${product.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-3 touch-manipulation">
                      View Product
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
