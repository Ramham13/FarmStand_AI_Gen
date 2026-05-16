import { notFound } from "next/navigation"
import { Metadata } from "next"
import { FarmPageClient } from "./farm-page-client"
import { CheckoutForm } from "@/components/farm/checkout-form"
import { getFarmBySlug } from "@/lib/farms"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const farm = await getFarmBySlug(slug)
  
  if (!farm) {
    return {
      title: "Farm Not Found - Virtual Farm Stand",
    }
  }
  
  return {
    title: `${farm.name} - Virtual Farm Stand`,
    description: farm.description 
      ? `${farm.name} - ${farm.description.slice(0, 160)}`
      : `Visit ${farm.name} on Virtual Farm Stand. Find fresh, locally-grown products directly from the farm.`,
    openGraph: {
      title: `${farm.name} - Virtual Farm Stand`,
      description: farm.description || `Discover fresh products from ${farm.name}`,
      type: "website",
      url: `/farm/${slug}`,
      siteName: "Virtual Farm Stand",
      images: farm.imageUrl ? [{
        url: farm.imageUrl,
        width: 1200,
        height: 630,
        alt: farm.name,
      }] : [{
        url: "https://virtualfarmstand.com/og-farm-default.png",
        width: 1200,
        height: 630,
        alt: "Virtual Farm Stand",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${farm.name} - Virtual Farm Stand`,
      description: farm.description || `Discover fresh products from ${farm.name}`,
    },
  }
}

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

export const dynamic = "force-dynamic"
