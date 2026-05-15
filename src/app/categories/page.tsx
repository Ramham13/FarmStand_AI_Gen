import { categories, getFarmsByCategory, getAllFarms } from "@/lib/mock-data"
import { CategoriesClient } from "./categories-client"

export const metadata = {
  title: "Categories - Virtual Farm Stand",
  description: "Browse farms by category. Find fresh produce, eggs, dairy, meat, poultry, and plants from local farms.",
}

export default async function CategoriesPage() {
  // Get farms grouped by category
  const categoryData = categories.map(cat => ({
    ...cat,
    farms: getFarmsByCategory(cat.id)
  }))
  
  const totalFarms = getAllFarms().length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white px-3 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            🏷️ Browse by Category
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Find exactly what you're looking for. Browse {totalFarms} local farms by the type of products they offer.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-3 py-6 sm:py-8">
        <CategoriesClient categories={categoryData} />
      </section>
    </div>
  )
}