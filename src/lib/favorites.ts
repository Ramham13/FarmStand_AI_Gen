import { prisma } from "@/lib/db"
import { cache } from "react"

export interface FavoriteFarm {
  id: string
  farmId: string
  createdAt: Date
  farm: {
    id: string
    name: string
    slug: string
    emoji: string | null
    location: string | null
    imageUrl: string | null
  }
}

/**
 * Get all favorites for a user (cached)
 */
export const getUserFavorites = cache(async (userId: string): Promise<FavoriteFarm[]> => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      farm: {
        select: {
          id: true,
          name: true,
          slug: true,
          emoji: true,
          location: true,
          imageUrl: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return favorites.map(f => ({
    id: f.id,
    farmId: f.farmId,
    createdAt: f.createdAt,
    farm: f.farm,
  }))
})

/**
 * Check if a farm is favorited by a user
 */
export const isFarmFavorited = cache(async (userId: string, farmId: string): Promise<boolean> => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_farmId: {
        userId,
        farmId,
      },
    },
  })
  return !!favorite
})