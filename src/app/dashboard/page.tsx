import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth-server"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { Package, ShoppingCart, Users, Clock } from "lucide-react"

async function getFarmStats(userId: string) {
  const farm = await prisma.farm.findUnique({
    where: { userId },
    include: {
      products: {
        where: { isActive: true },
        select: { id: true, availability: true }
      },
      _count: {
        select: {
          products: { where: { isActive: true } }
        }
      }
    }
  })

  if (!farm) return null

  // Get reservations for this farm's products
  const productIds = farm.products.map(p => p.id)
  const reservations = await prisma.reservation.count({
    where: { 
      productId: { in: productIds },
      status: { in: ["PENDING", "CONFIRMED"] }
    }
  })

  // Get waitlist count
  const waitlist = await prisma.waitlist.count({
    where: { productId: { in: productIds } }
  })

  // Calculate available products
  const availableProducts = farm.products.filter(p => p.availability === "AVAILABLE").length

  return {
    farm,
    productCount: farm._count.products,
    availableProducts,
    reservations,
    waitlist
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }
  
  const farmStats = await getFarmStats(user.id)
  
  // If no farm exists for this user, show onboarding
  if (!farmStats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Virtual Farm Stand!</CardTitle>
              <CardDescription>Set up your farm to start selling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">Create your farm profile to start listing products for customers near you.</p>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-gray-500">No products yet</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-gray-500">No orders yet</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Waitlist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-gray-500">No waitlist yet</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 flex gap-4 flex-wrap">
                <Link href="/dashboard/farm/new">
                  <Button className="bg-green-600 hover:bg-green-700">Create Your Farm</Button>
                </Link>
                <Link href="/explore">
                  <Button variant="outline">Browse Farms</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  const { farm, productCount, availableProducts, reservations, waitlist } = farmStats
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{farm.name}</h1>
            <p className="text-gray-500 mt-1">Manage your farm</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/products/new">
              <Button className="bg-green-600 hover:bg-green-700">Add Product</Button>
            </Link>
            <Link href={`/farm/${farm.slug}`}>
              <Button variant="outline">View Public Page</Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{productCount}</div>
              <p className="text-xs text-gray-500">
                {availableProducts} available
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Active Reservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{reservations}</div>
              <p className="text-xs text-gray-500">Pending & confirmed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Waitlist Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{waitlist}</div>
              <p className="text-xs text-gray-500">Interested customers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Farm Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={farm.status === "ACTIVE" ? "default" : "secondary"} className="text-sm">
                {farm.status}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">
                {farm.status === "ACTIVE" ? "Visible to customers" : "Hidden from customers"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product listings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/dashboard/products" className="block">
                <Button variant="outline" className="w-full justify-start">View All Products</Button>
              </Link>
              <Link href="/dashboard/products/new" className="block">
                <Button variant="outline" className="w-full justify-start">Add New Product</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
              <CardDescription>Customer orders and waitlist</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/dashboard/reservations" className="block">
                <Button variant="outline" className="w-full justify-start">View Reservations ({reservations})</Button>
              </Link>
              <Link href="/dashboard/waitlist" className="block">
                <Button variant="outline" className="w-full justify-start">View Waitlist ({waitlist})</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Farm Settings</CardTitle>
              <CardDescription>Update your farm profile</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href={`/dashboard/farm/${farm.slug}/edit`} className="block">
                <Button variant="outline" className="w-full justify-start">Edit Farm Profile</Button>
              </Link>
              <Link href={`/farm/${farm.slug}`} className="block">
                <Button variant="outline" className="w-full justify-start">View Public Page</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
