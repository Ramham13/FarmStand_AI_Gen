import { categories } from "@/lib/farms"
import { CategoriesClient } from "./categories-client"
import { prisma } from "@/lib/db"

export const metadata = {
  title: "Categories - Virtual Farm Stand",
  description: "Browse farms by category. Find fresh produce, eggs, dairy, meat, poultry, and plants from local farms.",
}

async function getFarmsByCategory() {
  const farms = await prisma.farm.findMany({
    where: { status: "ACTIVE" },
    include: {
      products: {
        where: { isActive: true },
        select: { category: true },
      },
    },
  })

  // Group farms by category
  const farmsByCategory: Record<string, typeof farms> = {}
  
  for (const farm of farms) {
    const farmCategories = [...new Set(farm.products.map(p => p.category))]
    
    for (const cat of farmCategories) {
      if (!farmsByCategory[cat]) {
        farmsByCategory[cat] = []
      }
      farmsByCategory[cat].push(farm)
    }
  }

  return farmsByCategory
}

export default async function CategoriesPage() {
  const farmsByCategory = await getFarmsByCategory()
  
  // Get farms by category
  const categoryData = categories.map(cat => ({
    ...cat,
    farms: farmsByCategory[cat.id]?.map(f => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      emoji: f.emoji || "🌾",
    })) || []
  }))
  
  const totalFarms = await prisma.farm.count({ where: { status: "ACTIVE" } })

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
