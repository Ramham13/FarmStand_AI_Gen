import Link from "next/link";
import { Search, ArrowRight, Leaf, Users, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Your Local Farm Stand,{" "}
              <span className="text-green-600">Digital</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Connect directly with local farms. Find fresh produce, eggs, dairy, 
              and artisan goods — no middleman, no native payments.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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