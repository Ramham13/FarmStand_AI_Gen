import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demo
const mockFarm = {
  id: "farm-1",
  name: "Sunny Meadow Farm",
  slug: "sunny-meadow-farm",
  location: "Rural Valley, CA",
  phone: "(555) 123-4567",
  email: "sunny@farm.com",
  status: "ACTIVE",
  products: [
    { id: "p1", name: "Fresh Eggs", price: 6, availability: "AVAILABLE", reservations: [] },
    { id: "p2", name: "Heirloom Tomatoes", price: 4.50, availability: "AVAILABLE", reservations: [] },
  ],
}

export default async function DashboardPage() {
  const myFarm = mockFarm

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Farm Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Farm Status</CardTitle>
              <CardDescription>Your farm stand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="default">{myFarm.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-gray-500">{myFarm.name}</p>
              <p className="text-sm text-gray-500">{myFarm.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Products</CardTitle>
              <CardDescription>Currently listed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{myFarm.products.length}</p>
              <p className="text-sm text-gray-500">products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reservations</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-gray-500">pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>Manage your product listings</CardDescription>
              </div>
              <Button>Add Product</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myFarm.products.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                  <Badge variant={product.availability === "AVAILABLE" ? "default" : "secondary"}>
                    {product.availability}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="flex gap-4">
          <Link href={`/farm/${myFarm.slug}`}>
            <Button variant="outline">View Public Page</Button>
          </Link>
          <Button variant="outline">Edit Farm Profile</Button>
        </div>
      </div>
    </div>
  )
}