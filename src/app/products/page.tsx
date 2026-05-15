import { Suspense } from "react"
import { ProductsClient } from "./products-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Browse Products - Virtual Farm Stand",
  description: "Discover fresh, locally-grown products from farms in your area. Search by category, price, and more.",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; minPrice?: string; maxPrice?: string }>
}) {
  const { q, category, minPrice, maxPrice } = await searchParams

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white px-3 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            🛒 Browse Products
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Find fresh products from farms near you. Search by name, filter by category, and discover local favorites.
          </p>
        </div>
      </section>

      {/* Products Browser */}
      <Suspense fallback={
        <div className="max-w-6xl mx-auto px-3 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }>
        <ProductsClient
          initialQuery={q || ""}
          initialCategory={category || ""}
          initialMinPrice={minPrice || ""}
          initialMaxPrice={maxPrice || ""}
        />
      </Suspense>
    </div>
  )
}
