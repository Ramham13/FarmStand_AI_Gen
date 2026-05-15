import { NextResponse } from "next/server";
import { getCurrentUser, isAdmin } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and admin role
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    // Validate action
    if (!action || !["resolve", "dismiss"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'resolve' or 'dismiss'" },
        { status: 400 }
      );
    }

    // Determine new status based on action
    const newStatus = action === "resolve" ? "RESOLVED" : "DISMISSED";

    // Update the report
    const report = await prisma.report.update({
      where: { id },
      data: { status: newStatus },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}