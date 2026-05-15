export default function ExploreLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Search & Filters Skeleton */}
        <div className="h-16 rounded-lg bg-gray-200" />
        
        {/* Filters Skeleton */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 rounded-full bg-gray-200" />
          ))}
        </div>
        
        {/* Farm Grid Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}