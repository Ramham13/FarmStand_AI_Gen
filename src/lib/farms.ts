"use server"

import { prisma } from "@/lib/db"
import { cache } from "react"

export type FarmFilters = {
  category?: string
  region?: string
  priceRange?: string
}

export const getFarms = cache(async (filters?: FarmFilters) => {
  const where: any = { status: "ACTIVE" }

  // Filter by region
  if (filters?.region) {
    where.region = filters.region
  }

  // Filter by price range
  if (filters?.priceRange) {
    where.priceRange = filters.priceRange
  }

  const farms = await prisma.farm.findMany({
    where,
    include: {
      products: {
        where: { isActive: true },
        select: { name: true, availability: true, category: true },
      },
    },
    orderBy: { name: "asc" },
  })

  // Filter by category (requires checking products)
  let filteredFarms = farms
  if (filters?.category) {
    filteredFarms = farms.filter((farm) =>
      farm.products.some((p) => p.category === filters.category)
    )
  }

  return filteredFarms.map((farm) => ({
    id: farm.id,
    name: farm.name,
    slug: farm.slug,
    location: farm.location,
    region: farm.region,
    description: farm.description,
    emoji: farm.emoji,
    category: "PRODUCE", // Default category
    featured: farm.featured,
    priceRange: farm.priceRange,
    // Determine overall availability based on products
    availability: getFarmAvailability(farm.products.map((p) => p.availability)),
    // Get product names
    products: farm.products.map((p) => p.name),
  }))
})

export const getFarmBySlug = cache(async (slug: string) => {
  const farm = await prisma.farm.findUnique({
    where: { slug, status: "ACTIVE" },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { name: "asc" },
      },
    },
  })

  if (!farm) return null

  return {
    ...farm,
    // Get unique categories from products
    categories: [...new Set(farm.products.map((p) => p.category))],
  }
})

function getFarmAvailability(productAvailabilities: string[]): string {
  if (productAvailabilities.some((a) => a === "AVAILABLE")) return "in_stock"
  if (productAvailabilities.some((a) => a === "SEASONAL")) return "seasonal"
  return "sold_out"
}