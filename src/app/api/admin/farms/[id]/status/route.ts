import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser, isAdmin } from "@/lib/auth-server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and admin role
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["ACTIVE", "SUSPENDED", "PENDING", "REMOVED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be ACTIVE, SUSPENDED, PENDING, or REMOVED" },
        { status: 400 }
      );
    }

    // Update farm status
    const farm = await prisma.farm.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ 
      success: true, 
      farm: {
        id: farm.id,
        name: farm.name,
        status: farm.status,
      }
    });
  } catch (error) {
    console.error("Error updating farm status:", error);
    return NextResponse.json(
      { error: "Failed to update farm status" },
      { status: 500 }
    );
  }
}