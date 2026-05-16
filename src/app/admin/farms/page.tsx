import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye, Pencil } from "lucide-react";
import { getCurrentUser, isAdmin } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { FarmActionButton } from "./farm-action-button";

export default async function AdminFarmsPage() {
  // Server-side authentication and admin role check
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }
  
  const adminCheck = await isAdmin();
  if (!adminCheck) {
    redirect("/dashboard");
  }

  const farms = await prisma.farm.findMany({
    include: {
      products: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const statusConfig = {
    ACTIVE: { label: "Active", className: "bg-green-100 text-green-700" },
    SUSPENDED: { label: "Suspended", className: "bg-red-100 text-red-700" },
    PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
    REMOVED: { label: "Removed", className: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Manage Farms</h1>
        <p className="text-gray-600">Review and manage all farm listings</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search farms..." className="pl-10" />
        </div>
      </div>

      {/* Farms Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Farms</CardTitle>
          <CardDescription>{farms.length} farms total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Farm Name</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Products</th>
                  <th className="pb-3 font-medium">Created</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {farms.map((farm) => {
                  const status = statusConfig[farm.status as keyof typeof statusConfig];
                  const productCount = farm.products?.length || 0;
                  const createdAtFormatted = farm.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                  return (
                    <tr key={farm.id} className="border-b">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{farm.name}</p>
                          <p className="text-sm text-gray-500">/farm/{farm.slug}</p>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{farm.location}</td>
                      <td className="py-4">
                        <Badge className={status.className}>{status.label}</Badge>
                      </td>
                      <td className="py-4 text-gray-600">{productCount}</td>
                      <td className="py-4 text-gray-600">{createdAtFormatted}</td>
                      <td className="py-4">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" asChild>
                            <a href={`/farm/${farm.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <a href={`/dashboard/settings`} target="_blank">
                              <Pencil className="h-4 w-4" />
                            </a>
                          </Button>
                          <FarmActionButton farmId={farm.id} currentStatus={farm.status} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}