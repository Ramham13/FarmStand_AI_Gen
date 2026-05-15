import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProductDetailSection } from "./add-to-cart-section";

interface PageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, productId } = await params;

  const farm = await prisma.farm.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
      },
    },
  });

  if (!farm) {
    return { title: "Farm Not Found - Virtual Farm Stand" };
  }

  const product = farm.products.find((p) => p.id === productId);

  if (!product) {
    return { title: "Product Not Found - Virtual Farm Stand" };
  }

  const priceStr = product.price ? `$${product.price.toFixed(2)}` : "";
  const title = product.name 
    ? `${product.name}${priceStr ? ` - ${priceStr}/${product.unit || 'item'}` : ''} - ${farm.name}`
    : `${farm.name} Products`;

  return {
    title,
    description: product.description 
      ? `${product.description.slice(0, 160)} - Available at ${farm.name}`
      : `Fresh ${product.name || 'products'} from ${farm.name}. ${priceStr ? `Now available at ${priceStr}/${product.unit || 'item'}.` : ''}`,
    openGraph: {
      title,
      description: product.description || `Fresh ${product.name} from ${farm.name}`,
      type: "website",
      url: `/farm/${slug}/product/${productId}`,
      siteName: "Virtual Farm Stand",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description || `Fresh ${product.name} from ${farm.name}`,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productId } = await params;

  // Get farm by slug
  const farm = await prisma.farm.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
      },
    },
  });

  if (!farm) {
    notFound();
  }

  const product = farm.products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailSection
      slug={slug}
      product={{
        id: product.id,
        name: product.name,
        category: product.category ?? undefined,
        description: product.description ?? undefined,
        price: product.price ?? undefined,
        unit: product.unit ?? undefined,
        availability: product.availability ?? undefined,
      }}
      farm={{
        id: farm.id,
        name: farm.name,
        slug: farm.slug,
      }}
    />
  );
}