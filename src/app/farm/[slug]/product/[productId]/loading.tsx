export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Product Detail Skeleton */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 rounded-lg bg-gray-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-6 w-1/2 rounded bg-gray-200" />
            <div className="h-24 rounded bg-gray-200" />
            <div className="h-12 w-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}