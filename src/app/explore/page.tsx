import { Suspense } from "react"
import { ExploreClient } from "./explore-client"
import { getFarms, categories } from "@/lib/farms"

export const metadata = {
  title: "Explore Farms - Virtual Farm Stand",
  description: "Discover local farms near you. Find fresh produce, eggs, dairy, and more directly from farmers.",
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const farms = await getFarms(category ? { category } : undefined)
  
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
        </div>
      </section>

      {/* Farm Listings */}
      <section className="max-w-6xl mx-auto px-3 py-6 sm:py-8">
        <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading farms...</div>}>
          <ExploreClient farms={farms} selectedCategory={category} />
        </Suspense>
      </section>
    </div>
  )
}
