import { prisma } from "@/lib/db"
import { cache } from "react"

// Product categories
export const categories = [
  { id: "PRODUCE", name: "Produce", emoji: "🥬", description: "Fresh vegetables and fruits" },
  { id: "EGGS", name: "Eggs", emoji: "🥚", description: "Farm-fresh eggs" },
  { id: "DAIRY", name: "Dairy", emoji: "🥛", description: "Milk, cheese, and artisan dairy" },
  { id: "MEAT", name: "Meat", emoji: "🥩", description: "Grass-fed and heritage meats" },
  { id: "POULTRY", name: "Poultry", emoji: "🐔", description: "Chicken, duck, and more" },
  { id: "PLANTS", name: "Plants", emoji: "🌱", description: "Seedlings, herbs, and nursery stock" },
]

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
    location: farm.location || "",
    description: farm.description || "",
    emoji: farm.emoji || "🌾",
    imageUrl: farm.imageUrl || undefined,
    categories: [...new Set(farm.products.map((p) => p.category))],
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
        include: {
          _count: {
            select: { waitlist: true },
          },
        },
      },
    },
  })

  if (!farm) return null

  return {
    id: farm.id,
    name: farm.name,
    slug: farm.slug,
    description: farm.description || "",
    location: farm.location || "",
    phone: farm.phone || undefined,
    email: farm.email || undefined,
    website: farm.website || undefined,
    paymentLink: farm.paymentLink || undefined,
    status: farm.status,
    emoji: farm.emoji || "🌾",
    imageUrl: farm.imageUrl || undefined,
    // Get unique categories from products
    categories: [...new Set(farm.products.map((p) => p.category))],
    // Return full product objects for the farm page
    products: farm.products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description || "",
      category: p.category,
      price: p.price || 0,
      unit: p.unit || "item",
      availability: p.availability,
      imageUrl: p.imageUrl || undefined,
      waitlistCount: p._count.waitlist,
    })),
  }
})

function getFarmAvailability(productAvailabilities: string[]): string {
  if (productAvailabilities.some((a) => a === "AVAILABLE")) return "in_stock"
  if (productAvailabilities.some((a) => a === "SEASONAL")) return "seasonal"
  return "sold_out"
}