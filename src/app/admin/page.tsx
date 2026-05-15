import Link from "next/link";
import { Package, Users, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, isAdmin } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  // Server-side authentication and admin role check
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }
  
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    // Not an admin - redirect to dashboard
    redirect("/dashboard");
  }

  // Get real statistics from database
  const [totalFarms, totalProducts, activeFarms, suspendedFarms, pendingFarms, flaggedReports] = await Promise.all([
    prisma.farm.count(),
    prisma.product.count(),
    prisma.farm.count({ where: { status: "ACTIVE" } }),
    prisma.farm.count({ where: { status: "SUSPENDED" } }),
    prisma.farm.count({ where: { status: "PENDING" } }),
    prisma.report.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Platform moderation and management</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Farms</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFarms}</div>
            <p className="text-xs text-gray-500">{pendingFarms} pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-gray-500">listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Farms</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeFarms}</div>
            <p className="text-xs text-gray-500">{suspendedFarms} suspended</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{flaggedReports}</div>
            <p className="text-xs text-gray-500">needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manage Farms</CardTitle>
            <CardDescription>Review and manage farm listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/farms">
                View All Farms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reports & Flags</CardTitle>
            <CardDescription>Review flagged content and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/admin/reports">
                View Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}