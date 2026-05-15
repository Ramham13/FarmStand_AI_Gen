import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProductDetailSection } from "./add-to-cart-section";

interface PageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
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