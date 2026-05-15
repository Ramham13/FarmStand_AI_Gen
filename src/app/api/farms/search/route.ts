import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category");
  const region = searchParams.get("region");
  const availability = searchParams.get("availability");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "12"), 50);
  const offset = (page - 1) * limit;

  try {
    const where: any = {
      status: "ACTIVE",
      ...(query && {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { location: { contains: query } },
        ],
      }),
      ...(category && category !== "all" && {
        products: {
          some: { category },
        },
      }),
      ...(region && region !== "all" && {
        region: { equals: region },
      }),
    };

    const [farms, total] = await Promise.all([
      prisma.farm.findMany({
        where,
        include: {
          products: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              category: true,
              price: true,
              unit: true,
              availability: true,
            },
          },
        },
        orderBy: { name: "asc" },
        take: limit,
        skip: offset,
      }),
      prisma.farm.count({ where }),
    ]);

    // Filter by availability if needed (since it's on product level)
    let filteredFarms = farms;
    if (availability && availability !== "all") {
      filteredFarms = farms
        .map((farm) => ({
          ...farm,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          products: (farm as any).products.filter((p: { availability: string | null }) => p.availability === availability),
        }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((farm: any) => farm.products.length > 0);
    }

    const hasMore = offset + filteredFarms.length < total;

    return NextResponse.json({
      farms: filteredFarms,
      pagination: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search farms" },
      { status: 500 }
    );
  }
}