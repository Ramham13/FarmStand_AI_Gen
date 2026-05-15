export default function FarmPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Farm Header Skeleton */}
        <div className="h-48 rounded-lg bg-gray-200" />
        
        {/* Products Grid Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-56 rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}