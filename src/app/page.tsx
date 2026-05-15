"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight, Leaf, Users, ShoppingBag, MapPin, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Searchable farms data (used for search)
const searchableFarms = [
  {
    name: "Sunny Meadow Farm",
    slug: "sunny-meadow-farm",
    location: "Rural Valley, CA",
    emoji: "🐔",
    products: "Fresh Eggs, Tomatoes",
    tagline: "Family-owned, free-range eggs",
  },
  {
    name: "Green Acres Farm",
    slug: "green-acres",
    location: "Portland, OR",
    emoji: "🌿",
    products: "Herbs, Mixed Greens",
    tagline: "Sustainable & regenerative",
  },
  {
    name: "Valley View Dairy",
    slug: "valley-view-dairy",
    location: "Madison, WI",
    emoji: "🥛",
    products: "Artisan Cheese",
    tagline: "Small-batch from grass-fed cows",
  },
  {
    name: "Mountain Poultry",
    slug: "mountain-poultry",
    location: "Asheville, NC",
    emoji: "🦆",
    products: "Duck Eggs, Chicken Eggs",
    tagline: "Heritage breed, pasture-raised",
  },
  {
    name: "Heritage Homestead",
    slug: "heritage-homestead",
    location: "Austin, TX",
    emoji: "🐷",
    products: "Heirloom Tomatoes, Pork Chops",
    tagline: "Heritage breeds & vegetables",
  },
  {
    name: "Sunrise Orchard",
    slug: "sunrise-orchard",
    location: "Ashland, OR",
    emoji: "🍎",
    products: "Apples, Pears",
    tagline: "Organic orchard fruits",
  },
  {
    name: "Blooming Gardens",
    slug: "blooming-gardens",
    location: "Denver, CO",
    emoji: "🌺",
    products: "Herb Starts, Succulents",
    tagline: "Beautiful container gardens",
  },
];

// Featured farms for the homepage
const featuredFarms = searchableFarms.slice(0, 3);

// Category quick filters
const categories = [
  { value: "EGGS", label: "🥚 Eggs", color: "bg-amber-100 hover:bg-amber-200 text-amber-800" },
  { value: "PRODUCE", label: "🥬 Produce", color: "bg-green-100 hover:bg-green-200 text-green-800" },
  { value: "DAIRY", label: "🥛 Dairy", color: "bg-blue-100 hover:bg-blue-200 text-blue-800" },
  { value: "MEAT", label: "🥩 Meat", color: "bg-red-100 hover:bg-red-200 text-red-800" },
  { value: "PLANTS", label: "🌱 Plants", color: "bg-emerald-100 hover:bg-emerald-200 text-emerald-800" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim().length > 0
    ? searchableFarms.filter(farm => 
        farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farm.products.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Your Local Farm Stand,{" "}
              <span className="text-green-600">Digital</span>
            </h1>
            <p className="mb-6 text-base text-gray-600">
              Connect directly with local farms. Find fresh produce, eggs, dairy, 
              and artisan goods — no middleman, no native payments.
            </p>

            {/* Search Bar */}
            <div className="mb-6" ref={searchRef}>
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search farms, products, or locations..."
                  className="h-12 pl-11 pr-10 text-base shadow-lg"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowResults(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Search Results Dropdown */}
                {showResults && searchQuery.trim().length > 0 && (
                  <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="max-h-80 overflow-y-auto">
                          {searchResults.map((farm) => (
                            <Link
                              key={farm.slug}
                              href={`/farm/${farm.slug}`}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors"
                              onClick={() => setShowResults(false)}
                            >
                              <span className="text-2xl">{farm.emoji}</span>
                              <div className="flex-1 text-left">
                                <div className="font-medium text-gray-900">{farm.name}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {farm.location}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t px-4 py-2 bg-gray-50">
                          <Link
                            href={`/explore?q=${encodeURIComponent(searchQuery)}`}
                            className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium hover:text-green-700"
                            onClick={() => setShowResults(false)}
                          >
                            View All Results <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <p>No farms found for "{searchQuery}"</p>
                        <Link
                          href={`/explore?q=${encodeURIComponent(searchQuery)}`}
                          className="mt-2 inline-flex items-center gap-2 text-sm text-green-600 font-medium hover:text-green-700"
                          onClick={() => setShowResults(false)}
                        >
                          Search all farms <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Category Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  asChild
                  variant="outline"
                  className={`${cat.color} border-0 hover:shadow-md transition-all text-sm font-medium`}
                >
                  <Link href={`/explore?category=${cat.value}`}>
                    {cat.label}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/explore">
                  <Search className="mr-2 h-4 w-4" />
                  Explore Farms
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/register">
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Farms Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Farms</h2>
              <p className="text-gray-600 mt-1">Discover top-rated local farms</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/explore">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFarms.map((farm) => (
              <Link key={farm.slug} href={`/farm/${farm.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-green-100">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-2xl shrink-0">
                        {farm.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 truncate">{farm.name}</h3>
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" /> {farm.location}
                        </p>
                        <p className="text-sm text-green-700 mt-2 font-medium">{farm.tagline}</p>
                        <p className="text-xs text-gray-500 mt-1">{farm.products}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/explore">
                View All Farms <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">
              Simple, direct connections between farmers and customers
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Discover Local Farms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse farms in your area. Filter by location, products, and availability.
                  Find exactly what you're looking for.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <ShoppingBag className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Reserve Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  See what's available and reserve directly with farmers. 
                  No cart, no checkout — just simple reservations.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Connect Directly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Farmers provide payment links (Venmo, PayPal, etc.). 
                  You arrange pickup directly with your farmer.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Have a Farm to Share?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            List your products, manage reservations, and grow your local customer base. 
            Simple setup, no fees.
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
            <Link href="/register">
              Start Your Farm Stand Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl rounded-lg border border-amber-200 bg-white p-4">
            <p className="text-sm text-amber-800">
              <Leaf className="mr-2 inline h-4 w-4" />
              <strong>Important:</strong> All transactions are directly between customers and farmers. 
              Virtual Farm Stand does not process payments. Farmers are responsible for their own 
              compliance with local regulations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}