import Link from "next/link";
import { Search, MapPin, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Demo farms - matches API mock data
const farms = [
  {
    id: "farm-1",
    name: "Sunny Meadow Farm",
    slug: "sunny-meadow-farm",
    location: "Rural Valley, CA",
    description: "Family-owned farm specializing in fresh eggs and vegetables. Our chickens are free-range and we use organic farming practices.",
    products: ["Fresh Eggs", "Heirloom Tomatoes"],
    emoji: "🐔",
  },
  {
    id: "farm-2", 
    name: "Green Acres Farm",
    slug: "green-acres",
    location: "Portland, OR",
    description: "Sustainable farm growing heirloom vegetables and herbs using regenerative practices.",
    products: ["Fresh Herb Bundle", "Mixed Greens"],
    emoji: "🌿",
  },
  {
    id: "farm-3",
    name: "Valley View Dairy",
    slug: "valley-view-dairy",
    location: "Madison, WI",
    description: "Small-batch artisan cheese and raw milk from grass-fed cows.",
    products: ["Aged Cheddar", "Fresh Mozzarella", "Raw Milk"],
    emoji: "🥛",
  },
  {
    id: "farm-4",
    name: "Mountain Poultry Farm",
    slug: "mountain-poultry",
    location: "Asheville, NC",
    description: "Heritage breed chickens and ducks, pasture-raised for the best eggs.",
    products: ["Duck Eggs", "Chicken Eggs", "Whole Chickens"],
    emoji: "🦆",
  },
  {
    id: "farm-5",
    name: "Heritage Homestead",
    slug: "heritage-homestead",
    location: "Austin, TX",
    description: "Heirloom vegetables and heritage breed pigs. Farm-to-table excellence.",
    products: ["Heirloom Tomatoes", "Basil", "Pork Chops"],
    emoji: "🐷",
  },
  {
    id: "farm-6",
    name: "Sunrise Orchard",
    slug: "sunrise-orchard",
    location: "Ashland, OR",
    description: "Organic apples, pears, and berries. U-pick and pre-order available.",
    products: ["Apples", "Pears", "Blackberries"],
    emoji: "🍎",
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold text-white">Explore Farms</h1>
          <p className="text-green-100">
            Discover local farms and fresh products in your area
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search farms, products, or locations..." 
              className="pl-12 h-12 text-lg border-green-200 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Farm Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {farms.map((farm) => (
            <Link key={farm.id} href={`/farm/${farm.slug}`}>
              <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                {/* Farm Icon */}
                <div className="h-32 bg-green-50 flex items-center justify-center text-6xl">
                  {farm.emoji}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{farm.name}</CardTitle>
                  <CardDescription className="flex items-center text-base">
                    <MapPin className="mr-1 h-4 w-4" />
                    {farm.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {farm.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {farm.products.slice(0, 3).map((product) => (
                      <Badge key={product} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-600">Available</Badge>
                    <Button variant="ghost" size="sm" className="text-green-700">
                      View Farm
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Are you a farmer?</p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/register">
              <Leaf className="mr-2 h-4 w-4" />
              List Your Farm Free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}