import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-server";

// GET /api/orders/me
// Fetch reservations for the authenticated user
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find reservations by user ID
    const reservations = await prisma.reservation.findMany({
      where: {
        customerEmail: {
          equals: user.email,
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
    const orders = reservations.map((res) => ({
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
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}