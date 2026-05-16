import { getCurrentUser } from "@/lib/auth-server"
import { getUserFavorites } from "@/lib/favorites"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default async function FavoritesPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  const favorites = await getUserFavorites(user.id)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Favorites</h1>
      <p className="text-gray-500 mb-8">
        Farms you&apos;ve saved for later
      </p>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-4">
            You haven&apos;t saved any farms yet.
          </p>
          <Link 
            href="/explore" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Explore Farms
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {favorites.map((fav) => (
            <Link
              key={fav.id}
              href={`/farm/${fav.farm.slug}`}
              className="group block bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {fav.farm.imageUrl ? (
                <div className="relative h-32 sm:h-40 w-full">
                  <Image 
                    src={fav.farm.imageUrl} 
                    alt={fav.farm.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ) : (
                <div className="h-32 sm:h-40 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl">{fav.farm.emoji}</span>
                </div>
              )}
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0" role="img" aria-label={fav.farm.name}>
                    {fav.farm.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-lg text-gray-900 truncate group-hover:text-green-700 transition-colors">
                      {fav.farm.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{fav.farm.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
