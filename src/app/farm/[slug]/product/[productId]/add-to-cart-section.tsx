"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

interface ProductDetailSectionProps {
  slug: string;
  product: {
    id: string;
    name: string;
    category: string;
    description?: string;
    price?: number;
    unit?: string;
    availability: string;
  };
  farm: {
    id: string;
    name: string;
    slug: string;
  };
}

export function ProductDetailSection({ slug, product, farm }: ProductDetailSectionProps) {
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
          Back to {farm.name}
        </Link>
      </Button>

      <div className="mx-auto max-w-2xl">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">{product.category.replace("_", " ")}</p>
              <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
            </div>
            <Badge variant={availability.variant}>{availability.label}</Badge>
          </div>

          {product.price && (
            <p className="mb-4 text-3xl font-bold text-green-600">
              ${product.price.toFixed(2)}
              {product.unit && <span className="text-lg font-normal text-gray-500">/{product.unit}</span>}
            </p>
          )}

          {product.description && (
            <p className="mb-6 text-gray-600">{product.description}</p>
          )}

          <div className="flex flex-col gap-3">
            {product.availability === "AVAILABLE" || product.availability === "LIMITED" ? (
              <>
                {product.price && (
                  <AddToCartButton
                    productId={product.id}
                    productName={product.name}
                    farmId={farm.id}
                    farmName={farm.name}
                    farmSlug={farm.slug}
                    price={product.price}
                    unit={product.unit || "item"}
                    imageUrl={undefined}
                  />
                )}
                <Button size="lg" variant="outline">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Reserve for Pickup
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
        </div>

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