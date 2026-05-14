import { prisma } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getFarmsWithData() {
  const farms = await prisma.farm.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      products: true,
    },
    take: 10,
  })
  return farms
}

export default async function DashboardPage() {
  const farms = await getFarmsWithData()
  const myFarm = farms[0] // For MVP demo - just show first farm

  if (!myFarm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 text-lg">No farms yet.</p>
              <Link href="/register">
                <Button className="mt-4">Create Your Farm Stand</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Get reservations for this farm's products
  const productIds = myFarm.products.map(p => p.id)
  const reservations = await prisma.reservation.findMany({
    where: { productId: { in: productIds } },
    orderBy: { createdAt: "desc" },
    include: { product: true },
    take: 10,
  })

  // Get waitlist entries
  const waitlist = await prisma.waitlist.findMany({
    where: { productId: { in: productIds } },
    orderBy: { createdAt: "asc" },
    include: { product: true },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href={`/farm/${myFarm.slug}`}>
            <Button variant="outline">View Public Page</Button>
          </Link>
        </div>

        {/* Farm Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{myFarm.name}</CardTitle>
            <CardDescription>
              {myFarm.location || "No location set"} • {myFarm.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Link href="/dashboard/farm">
                <Button variant="outline">Edit Farm Info</Button>
              </Link>
              <Link href="/dashboard/products">
                <Button variant="outline">Manage Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{myFarm.products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{myFarm.products.filter(p => p.isActive).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{reservations.filter(r => r.status === "PENDING").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Waitlist Count</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{waitlist.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Reservations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              {reservations.length === 0 ? (
                <p className="text-gray-500">No reservations yet.</p>
              ) : (
                <div className="space-y-3">
                  {reservations.map((res) => (
                    <div key={res.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{res.customerName}</p>
                        <p className="text-sm text-gray-500">{res.product.name}</p>
                      </div>
                      <Badge variant={res.status === "PENDING" ? "default" : res.status === "CONFIRMED" ? "secondary" : "destructive"}>
                        {res.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Waitlist */}
          <Card>
            <CardHeader>
              <CardTitle>Waitlist</CardTitle>
            </CardHeader>
            <CardContent>
              {waitlist.length === 0 ? (
                <p className="text-gray-500">No one on waitlist.</p>
              ) : (
                <div className="space-y-3">
                  {waitlist.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{entry.customerName}</p>
                        <p className="text-sm text-gray-500">{entry.product.name}</p>
                      </div>
                      <Button size="sm" variant="outline">Notify</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
