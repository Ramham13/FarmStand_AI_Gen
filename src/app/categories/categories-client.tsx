"use client"

import Link from "next/link"

interface Farm {
  id: string
  name: string
  slug: string
  emoji: string
}

interface CategoryData {
  id: string
  name: string
  emoji: string
  description: string
  farms: Farm[]
}

interface CategoriesClientProps {
  categories: CategoryData[]
}

export function CategoriesClient({ categories }: CategoriesClientProps) {
  return (
    <div className="space-y-8 sm:space-y-12">
      {categories.map((category) => (
        <section key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <Link
            href={`/explore?category=${category.id}`}
            className="block bg-gradient-to-r from-green-50 to-white px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100 hover:from-green-100 hover:to-green-50 transition-colors"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl" role="img" aria-label={category.name}>
                {category.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-0.5">
                  {category.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-green-700 font-medium whitespace-nowrap">
                <span className="hidden sm:inline">
                  {category.farms.length} farm{category.farms.length !== 1 ? 's' : ''}
                </span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
          
          {category.farms.length > 0 ? (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {category.farms.map((farm) => (
                  <Link
                    key={farm.id}
                    href={`/farm/${farm.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-green-300 hover:bg-green-50/50 transition-colors touch-manipulation"
                  >
                    <span className="text-2xl" role="img" aria-label={farm.name}>
                      {farm.emoji}
                    </span>
                    <span className="font-medium text-gray-900 truncate">
                      {farm.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 text-center text-gray-500">
              No farms in this category yet.
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
