import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-32" />

        {/* Product Card Skeleton */}
        <div className="bg-white rounded-lg border p-6 space-y-4">
          {/* Category and Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
          </div>

          {/* Price */}
          <Skeleton className="h-10 w-32" />

          {/* Description */}
          <Skeleton className="h-20 w-full" />

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col gap-3 pt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>

        {/* Disclaimer Skeleton */}
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    </div>
  )
}