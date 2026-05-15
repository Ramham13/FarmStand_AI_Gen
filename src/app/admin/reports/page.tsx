import { getCurrentUser, isAdmin } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ReportsPageClient } from "./page.client";

export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
  // Server-side authentication and admin role check
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }
  
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    redirect("/dashboard");
  }

  // Get real reports from database
  const reports = await prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Cast status to the correct type
  const typedReports = reports.map(r => ({
    ...r,
    status: r.status as "PENDING" | "RESOLVED" | "DISMISSED",
  }));

  // Pass data to client component
  return <ReportsPageClient initialReports={typedReports} />;
}
