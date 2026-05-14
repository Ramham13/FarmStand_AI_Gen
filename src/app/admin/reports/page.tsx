import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function AdminReportsPage() {
  const reports = [
    {
      id: "1",
      type: "farm",
      reportedItem: "Test Farm",
      reason: "Suspicious activity",
      status: "PENDING",
      createdAt: "2 hours ago",
      description: "Farm profile contains suspicious links and unverifiable location.",
    },
    {
      id: "2",
      type: "product",
      reportedItem: "Raw Milk (Green Valley Dairy)",
      reason: "Regulatory concern",
      status: "PENDING",
      createdAt: "1 day ago",
      description: "Selling raw milk which may be illegal in some states.",
    },
    {
      id: "3",
      type: "farm",
      reportedItem: "Fake Farm",
      reason: "Fraudulent listing",
      status: "RESOLVED",
      createdAt: "3 days ago",
      description: "Fake farm listing with stock photos.",
    },
  ];

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
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-sm text-gray-500">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-sm text-gray-500">Resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
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
                          <h3 className="font-semibold">{report.reportedItem}</h3>
                          <Badge variant="outline">{typeLabels[report.type as keyof typeof typeLabels]}</Badge>
                          <Badge className={status.className}>{status.label}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{report.reason}</p>
                        <p className="mt-2 text-sm text-gray-500">{report.description}</p>
                        <p className="mt-1 text-xs text-gray-400">Reported {report.createdAt}</p>
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
        </CardContent>
      </Card>
    </div>
  );
}