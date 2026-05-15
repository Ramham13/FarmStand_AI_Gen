export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-gray-200" />
          ))}
        </div>
        
        {/* Recent Activity Skeleton */}
        <div className="h-64 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}