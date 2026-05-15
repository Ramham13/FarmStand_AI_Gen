import { prisma } from "@/lib/db"
import { cache } from "react"

export const getOrders = cache(async () => {
  const orders = await prisma.reservation.findMany({
    where: {
      status: {
        in: ["PENDING", "CONFIRMED", "COMPLETED"],
      },
    },
    include: {
      product: {
        include: {
          farm: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return orders
})

export const getOrderById = cache(async (id: string) => {
  const order = await prisma.reservation.findUnique({
    where: { id },
    include: {
      product: {
        include: {
          farm: true,
        },
      },
    },
  })

  return order
})

export async function updateOrderStatus(id: string, status: string) {
  const order = await prisma.reservation.update({
    where: { id },
    data: { status },
    include: {
      product: {
        include: {
          farm: true,
        },
      },
    },
  })

  return order
}