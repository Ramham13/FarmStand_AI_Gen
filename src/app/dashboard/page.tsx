import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  // Server-side authentication check
  const user = await getCurrentUser()
  
  // If not logged in, redirect to login
  if (!user) {
    redirect("/login")
  }
  
  // Get the farm belonging to the current user only
  const farm = await prisma.farm.findFirst({
    where: { userId: user.id },
    include: {
      products: {
        where: { isActive: true },
        include: {
          reservations: {
            where: {
              createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
              },
            },
          },
        },
      },
    },
  })

  // If no farm exists, show onboarding prompt
  if (!farm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Virtual Farm Stand!</CardTitle>
              <CardDescription>Get started by creating your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You haven&apos;t created a farm yet. Set up your farm stand to start selling products online.</p>
              <Link href="/onboarding">
                <Button>Create Your Farm</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Calculate stats
  const activeProducts = farm.products.filter((p) => p.availability === "AVAILABLE").length
  const pendingReservations = farm.products.reduce((acc, p) => acc + p.reservations.length, 0)

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
                <Badge variant={farm.status === "ACTIVE" ? "default" : "secondary"}>
                  {farm.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-gray-500">{farm.name}</p>
              <p className="text-sm text-gray-500">{farm.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Products</CardTitle>
              <CardDescription>Currently listed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeProducts}</p>
              <p className="text-sm text-gray-500">products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reservations</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingReservations}</p>
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
              <Link href="/dashboard/products/new">
                <Button>Add Product</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {farm.products.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No products yet. Add your first product!</p>
            ) : (
              <div className="space-y-4">
                {farm.products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        ${product.price?.toFixed(2) || "0.00"}{product.unit ? ` / ${product.unit}` : ""}
                      </p>
                    </div>
                    <Badge variant={product.availability === "AVAILABLE" ? "default" : "secondary"}>
                      {product.availability}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="flex gap-4 flex-wrap">
          <Link href={`/farm/${farm.slug}`}>
            <Button variant="outline">View Public Page</Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="outline">Edit Farm Profile</Button>
          </Link>
          <Link href="/dashboard/products">
            <Button variant="outline">Manage Products</Button>
          </Link>
          <Link href="/dashboard/reservations">
            <Button variant="outline">Reservations</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}