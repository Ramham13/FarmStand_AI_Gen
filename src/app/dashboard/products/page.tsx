import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const products = [
    { id: "p1", name: "Farm Fresh Eggs", category: "EGGS", price: "$6", unit: "dozen", availability: "AVAILABLE", isActive: true },
    { id: "p2", name: "Organic Kale", category: "PRODUCE", price: "$4", unit: "bunch", availability: "AVAILABLE", isActive: true },
    { id: "p3", name: "Heirloom Tomatoes", category: "PRODUCE", price: "$5", unit: "lb", availability: "LIMITED", isActive: true },
    { id: "p4", name: "Whole Chicken", category: "POULTRY", price: "$18", unit: "each", availability: "SOLD_OUT", isActive: true },
    { id: "p5", name: "Strawberries", category: "PRODUCE", price: "$8", unit: "pint", availability: "SEASONAL", isActive: false },
  ];

  const availabilityLabels: Record<string, { label: string; className: string }> = {
    AVAILABLE: { label: "Available", className: "bg-green-100 text-green-700" },
    LIMITED: { label: "Limited", className: "bg-amber-100 text-amber-700" },
    SOLD_OUT: { label: "Sold Out", className: "bg-red-100 text-red-700" },
    SEASONAL: { label: "Seasonal", className: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your farm products and inventory</p>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const availability = availabilityLabels[product.availability];
          return (
            <Card key={product.id} className={!product.isActive ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>{product.category.replace("_", " ")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xl font-semibold text-green-600">
                    {product.price}
                    {product.unit && <span className="text-sm font-normal text-gray-500">/{product.unit}</span>}
                  </span>
                  <Badge className={availability.className}>{availability.label}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <Link href={`/dashboard/products/${product.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-gray-500">No products yet</p>
            <Button asChild>
              <Link href="/dashboard/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}