"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

type ReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";

interface Report {
  id: string;
  type: string;
  reason: string;
  status: ReportStatus;
  data: string | null;
  createdAt: Date | string;
}

interface ReportItemProps {
  report: Report;
  onUpdate: (id: string, newStatus: ReportStatus) => void;
}

function ReportItem({ report, onUpdate }: ReportItemProps) {
  const [loading, setLoading] = useState<"resolve" | "dismiss" | null>(null);
  const [optimisticStatus, setOptimisticStatus] = useState<ReportStatus | null>(null);

  const currentStatus = optimisticStatus || report.status;
  const isPending = currentStatus === "PENDING";

  const handleAction = async (action: "resolve" | "dismiss") => {
    if (loading) return;

    setLoading(action);
    const newStatus = action === "resolve" ? "RESOLVED" : "DISMISSED";

    // Optimistic update
    setOptimisticStatus(newStatus);

    try {
      const response = await fetch(`/api/reports/${report.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update report");
      }

      onUpdate(report.id, newStatus);
    } catch (error) {
      console.error("Error updating report:", error);
      // Revert optimistic update on error
      setOptimisticStatus(null);
    } finally {
      setLoading(null);
    }
  };

  const statusConfig: Record<ReportStatus, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
    RESOLVED: { label: "Resolved", className: "bg-green-100 text-green-700" },
    DISMISSED: { label: "Dismissed", className: "bg-gray-100 text-gray-700" },
  };

  const typeLabels: Record<string, string> = {
    farm: "Farm",
    product: "Product",
    reservation: "Reservation",
  };

  const status = statusConfig[currentStatus];

  function getTimeAgo(date: Date | string): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return "just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-amber-100 p-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold capitalize">{report.type}</h3>
              <Badge variant="outline">{typeLabels[report.type] || "Other"}</Badge>
              <Badge className={status.className}>{status.label}</Badge>
            </div>
            <p className="text-sm text-gray-600">{report.reason}</p>
            {report.data && (
              <p className="mt-2 text-sm text-gray-500">{report.data}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">Reported {getTimeAgo(report.createdAt)}</p>
          </div>
        </div>
        {isPending && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleAction("resolve")}
              disabled={!!loading}
            >
              {loading === "resolve" ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-1 h-4 w-4" />
              )}
              Resolve
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleAction("dismiss")}
              disabled={!!loading}
            >
              {loading === "dismiss" ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-1 h-4 w-4" />
              )}
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ReportsPageClientProps {
  initialReports: Report[];
}

export function ReportsPageClient({ initialReports }: ReportsPageClientProps) {
  const router = useRouter();
  const [reports, setReports] = useState(initialReports);

  const pendingReports = reports.filter(r => r.status === "PENDING").length;
  const resolvedReports = reports.filter(r => r.status === "RESOLVED").length;
  const totalReports = reports.length;

  const handleUpdate = (id: string, newStatus: ReportStatus) => {
    // Update local state to reflect the change
    setReports(prev => prev.map(r => 
      r.id === id ? { ...r, status: newStatus } : r
    ));
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Review flagged content and user reports</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
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
              {reports.map((report) => (
                <ReportItem 
                  key={report.id} 
                  report={report} 
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
