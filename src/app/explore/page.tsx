import { Suspense } from "react"
import { ExploreClient } from "./explore-client"
import { getFarms, categories } from "@/lib/farms"
import { Skeleton } from "@/components/ui/skeleton"
import { ExploreSearch } from "./explore-search"

export const metadata = {
  title: "Explore Farms - Virtual Farm Stand",
  description: "Discover local farms near you. Find fresh produce, eggs, dairy, and more directly from farmers.",
}

async function getSearchResults(query: string, category?: string) {
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  if (category) params.set("category", category)
  params.set("limit", "12")

  const res = await fetch(`/api/farms/search?${params.toString()}`, {
    cache: "no-store",
  })
  
  if (!res.ok) {
    return { farms: [], pagination: { total: 0, page: 1, limit: 12, hasMore: false } }
  }
  
  return res.json()
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q: query, category } = await searchParams
  
  // Use search API if query present, otherwise use server function
  let farms: any[] = []
  let pagination = { total: 0, page: 1, limit: 12, hasMore: false }
  
  if (query) {
    const result = await getSearchResults(query, category)
    farms = result.farms || []
    pagination = result.pagination || pagination
  } else {
    const serverFarms = await getFarms(category ? { category } : undefined)
    farms = serverFarms
    pagination = { total: serverFarms.length, page: 1, limit: 12, hasMore: false }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white px-3 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            🌾 Explore Local Farms
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Discover fresh, locally-grown products from farms in your area. 
            Connect directly with farmers and get the best selection.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-14 bg-white border-b z-40">
        <div className="max-w-6xl mx-auto px-3 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <a
              href="/explore"
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-colors touch-manipulation ${
                !category
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Farms
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/explore?category=${cat.id}`}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-colors touch-manipulation flex items-center gap-1.5 ${
                  category === cat.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </a>
            ))}
          </div>
          <ExploreSearch initialQuery={query} />
        </div>
      </section>

      {/* Farm Listings */}
      <section className="max-w-6xl mx-auto px-3 py-6 sm:py-8">
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <Skeleton className="h-32 sm:h-40 w-full" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 mt-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
                <div className="border-t px-4 sm:px-5 py-3">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        }>
          <ExploreClient 
            farms={farms} 
            selectedCategory={category} 
            initialQuery={query}
            pagination={pagination}
          />
        </Suspense>
      </section>
    </div>
  )
}
