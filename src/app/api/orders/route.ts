import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/orders?email=customer@example.com
// Fetch reservations by customer email for order tracking
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find reservations by email
    const reservations = await prisma.reservation.findMany({
      where: {
        customerEmail: {
          equals: email.toLowerCase(),
          mode: "insensitive",
        },
      },
      include: {
        product: {
          include: {
            farm: {
              select: {
                name: true,
                slug: true,
                emoji: true,
                location: true,
                phone: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data for the response
    const orders = reservations.map((res) => {
      // Handle case where product might be deleted
      if (!res.product) {
        return {
          id: res.id,
          productName: "Product unavailable",
          productCategory: null,
          productPrice: null,
          productUnit: null,
          quantity: res.quantity,
          status: res.status,
          message: res.message,
          createdAt: res.createdAt.toISOString(),
          updatedAt: res.updatedAt.toISOString(),
          farm: null,
          productAvailable: false,
        }
      }
      return {
        id: res.id,
        productName: res.product.name,
        productCategory: res.product.category,
        productPrice: res.product.price,
        productUnit: res.product.unit,
        quantity: res.quantity,
        status: res.status,
        message: res.message,
        createdAt: res.createdAt.toISOString(),
        updatedAt: res.updatedAt.toISOString(),
        farm: {
          name: res.product.farm.name,
          slug: res.product.farm.slug,
          emoji: res.product.farm.emoji,
          location: res.product.farm.location,
          phone: res.product.farm.phone,
        },
        productAvailable: res.product.isActive,
      }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}