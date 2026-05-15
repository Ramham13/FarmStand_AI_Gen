import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { getCurrentUser, isAdmin } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

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

  // Calculate stats
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === "PENDING").length;
  const resolvedReports = reports.filter(r => r.status === "RESOLVED").length;

  const statusConfig = {
    PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
    RESOLVED: { label: "Resolved", className: "bg-green-100 text-green-700" },
    DISMISSED: { label: "Dismissed", className: "bg-gray-100 text-gray-700" },
  };

  const typeLabels = {
    farm: "Farm",
    product: "Product",
    reservation: "Reservation",
  };

  // Helper to get time ago
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return "just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Review flagged content and user reports</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">{pendingReports}</div>
            <p className="text-sm text-gray-500">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{resolvedReports}</div>
            <p className="text-sm text-gray-500">Resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-sm text-gray-500">Total Reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>Content flagged by users</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No reports yet</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => {
                const status = statusConfig[report.status as keyof typeof statusConfig];
                return (
                  <div key={report.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-amber-100 p-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold capitalize">{report.type}</h3>
                            <Badge variant="outline">{typeLabels[report.type as keyof typeof typeLabels] || "Other"}</Badge>
                            <Badge className={status.className}>{status.label}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{report.reason}</p>
                          {report.data && (
                            <p className="mt-2 text-sm text-gray-500">{report.data}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-400">Reported {getTimeAgo(report.createdAt)}</p>
                        </div>
                      </div>
                      {report.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Resolve
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="mr-1 h-4 w-4" />
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}