export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Header Skeleton */}
        <div className="h-10 w-48 rounded bg-gray-200" />
        
        {/* Products Grid Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}