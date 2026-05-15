"use client"

import Link from "next/link"

interface Farm {
  id: string
  name: string
  slug: string
  description: string
  location: string
  emoji: string
  imageUrl?: string
  categories: string[]
}

interface ExploreClientProps {
  farms: Farm[]
  selectedCategory?: string
}

export function ExploreClient({ farms, selectedCategory }: ExploreClientProps) {
  if (farms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No farms found for this category.</p>
        <Link href="/explore" className="text-green-600 hover:text-green-700 mt-2 inline-block">
          View all farms →
        </Link>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4 sm:mb-6">
        {farms.length} farm{farms.length !== 1 ? 's' : ''} found
        {selectedCategory && <span> in {selectedCategory}</span>}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {farms.map((farm) => (
          <Link
            key={farm.id}
            href={`/farm/${farm.slug}`}
            className="group block bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 overflow-hidden touch-manipulation"
          >
            {farm.imageUrl ? (
              <div className="relative h-32 sm:h-40 w-full">
                <img 
                  src={farm.imageUrl} 
                  alt={farm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ) : (
              <div className="h-32 sm:h-40 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl">{farm.emoji}</span>
              </div>
            )}
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-3xl sm:text-4xl flex-shrink-0" role="img" aria-label={farm.name}>
                  {farm.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-lg text-gray-900 truncate group-hover:text-green-700 transition-colors">
                    {farm.name}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{farm.location}</span>
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {farm.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
                {farm.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t bg-gray-50 px-4 sm:px-5 py-2.5 sm:py-3">
              <span className="text-sm font-medium text-green-700 group-hover:text-green-800">
                View Farm →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
