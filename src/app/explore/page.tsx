import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder data - will be replaced with database queries
const farms = [
  {
    id: "1",
    name: "Sunny Acres Farm",
    slug: "sunny-acres",
    location: "Portland, OR",
    description: "Family-owned farm specializing in organic vegetables and free-range eggs.",
    productCount: 12,
  },
  {
    id: "2", 
    name: "Happy Hen Homestead",
    slug: "happy-hen",
    location: "Austin, TX",
    description: "Heritage breed chickens, fresh eggs, and seasonal produce.",
    productCount: 8,
  },
  {
    id: "3",
    name: "Green Valley Dairy",
    slug: "green-valley",
    location: "Madison, WI",
    description: "Artisan cheese, raw milk, and grass-fed beef from our small herd.",
    productCount: 15,
  },
];

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Explore Farms</h1>
        <p className="text-gray-600">
          Discover local farms and fresh products in your area
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search farms or products..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <MapPin className="mr-2 h-4 w-4" />
          Near Me
        </Button>
      </div>

      {/* Farm Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => (
          <Link key={farm.id} href={`/farm/${farm.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{farm.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {farm.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {farm.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {farm.productCount} products
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Farm
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State Placeholder */}
      {farms.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No farms found yet.</p>
          <p className="text-sm text-gray-400">Be the first to list your farm!</p>
          <Button asChild className="mt-4">
            <Link href="/register">Register Your Farm</Link>
          </Button>
        </div>
      )}
    </div>
  );
}