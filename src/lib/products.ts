import { prisma } from "@/lib/db"
import { cache } from "react"

export const getProducts = cache(async (farmId?: string) => {
  const where: any = {}
  if (farmId) {
    where.farmId = farmId
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      farm: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return products
})

export const getProductById = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      farm: true,
    },
  })

  return product
})

export async function createProduct(data: {
  farmId: string
  name: string
  category: string
  description?: string
  price?: number
  unit?: string
  imageUrl?: string
  availability?: string
  isActive?: boolean
}) {
  const product = await prisma.product.create({
    data,
    include: {
      farm: true,
    },
  })

  return product
}

export async function updateProduct(
  id: string,
  data: {
    name?: string
    category?: string
    description?: string
    price?: number
    unit?: string
    imageUrl?: string
    availability?: string
    isActive?: boolean
  }
) {
  const product = await prisma.product.update({
    where: { id },
    data,
    include: {
      farm: true,
    },
  })

  return product
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { id },
  })

  return product
}
