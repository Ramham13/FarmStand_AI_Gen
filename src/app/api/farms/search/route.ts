import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category");
  const region = searchParams.get("region");
  const availability = searchParams.get("availability");

  try {
    const farms = await prisma.farm.findMany({
      where: {
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
      },
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
      take: 50,
    });

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

    return NextResponse.json({ farms: filteredFarms });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search farms" },
      { status: 500 }
    );
  }
}