import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

// Placeholder - would connect to DB
const products: Record<string, {
  id: string;
  name: string;
  category: string;
  description?: string;
  price?: string;
  unit?: string;
  availability: string;
}> = {
  "p1": {
    id: "p1",
    name: "Farm Fresh Eggs",
    category: "EGGS",
    description: "Free-range eggs from happy hens. Fed organic feed and allowed to roam on pasture. Our chickens are heritage breeds known for their rich, flavorful eggs.",
    price: "$6",
    unit: "dozen",
    availability: "AVAILABLE",
  },
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productId } = await params;
  const product = products[productId];

  if (!product) {
    notFound();
  }

  const availabilityLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    AVAILABLE: { label: "Available", variant: "default" },
    LIMITED: { label: "Limited Availability", variant: "secondary" },
    SOLD_OUT: { label: "Sold Out", variant: "destructive" },
    SEASONAL: { label: "Seasonal", variant: "outline" },
  };

  const availability = availabilityLabels[product.availability] || { label: "Unknown", variant: "outline" };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href={`/farm/${slug}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {slug}
        </Link>
      </Button>

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{product.category.replace("_", " ")}</p>
                <CardTitle className="mt-1 text-2xl">{product.name}</CardTitle>
              </div>
              <Badge variant={availability.variant}>{availability.label}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {product.price && (
              <p className="mb-4 text-3xl font-bold text-green-600">
                {product.price}
                {product.unit && <span className="text-lg font-normal text-gray-500">/{product.unit}</span>}
              </p>
            )}
            
            {product.description && (
              <p className="mb-6 text-gray-600">{product.description}</p>
            )}

            <div className="flex flex-col gap-3">
              {product.availability === "AVAILABLE" || product.availability === "LIMITED" ? (
                <>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Reserve This Product
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    You'll coordinate pickup and payment directly with the farmer
                  </p>
                </>
              ) : product.availability === "SOLD_OUT" ? (
                <>
                  <Button size="lg" variant="outline">
                    <Clock className="mr-2 h-5 w-5" />
                    Join Waitlist
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    Get notified when this product is available again
                  </p>
                </>
              ) : (
                <Button size="lg" variant="outline" disabled>
                  <Clock className="mr-2 h-5 w-5" />
                  Coming Soon
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Notice:</strong> All transactions are directly between you and the farmer. 
            Virtual Farm Stand does not process payments.
          </p>
        </div>
      </div>
    </div>
  );
}