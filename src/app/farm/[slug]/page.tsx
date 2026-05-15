import { notFound } from "next/navigation"
import { FarmPageClient } from "./farm-page-client"
import { CheckoutForm } from "@/components/farm/checkout-form"
import { getFarmBySlug } from "@/lib/farms"

export default async function FarmPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>
  searchParams: Promise<{ checkout?: string; productId?: string; productName?: string; price?: string; unit?: string }>
}) {
  const { slug } = await params
  const { checkout, productId, productName, price, unit } = await searchParams
  const farm = await getFarmBySlug(slug)

  if (!farm) {
    notFound()
  }

  // Checkout mode - render checkout form
  if (checkout === "true" && productId) {
    return (
      <CheckoutForm
        product={{
          id: productId,
          name: productName || "Product",
          price: parseFloat(price || "0"),
          unit: unit || "item",
        }}
        farmName={farm.name}
        farmSlug={slug}
      />
    )
  }

  return <FarmPageClient farm={farm} />
}
