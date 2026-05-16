import { Skeleton } from "@/components/ui/skeleton"

export default function FarmPageLoading() {
  return (
    <div className="min-h-screen">
      {/* Farm Header Skeleton */}
      <div className="bg-gradient-to-r from-green-700 to-green-800">
        <div className="h-32 sm:h-48 md:h-56 w-full bg-gray-300 animate-pulse" />
        <div className="px-3 py-6 md:px-4 md:py-10">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
            <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-2/3 max-w-xs" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Skeleton className="h-11 flex-1 sm:flex-none w-full sm:w-24" />
              <Skeleton className="h-11 flex-1 sm:flex-none w-full sm:w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="px-3 py-4 md:px-4 md:py-5 bg-white border-b">
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Products Section Skeleton */}
      <div className="px-3 py-5 md:px-4 md:py-6">
        <Skeleton className="h-7 w-40 mb-4" />
        
        {/* Filters Skeleton */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-3">
          <Skeleton className="h-11 w-full" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border overflow-hidden">
              <Skeleton className="h-28 sm:h-32 w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}