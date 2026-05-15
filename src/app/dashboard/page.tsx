import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  // Server-side authentication check
  const user = await getCurrentUser()
  
  // If not logged in, redirect to login
  if (!user) {
    redirect("/login")
  }
  
  // Demo mode - no database, show placeholder data
  const isDemo = user.id.startsWith("demo-") || user.id.startsWith("user-")
  
  if (isDemo || !user.farm) {
    // Show welcome/dashboard for demo users
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Virtual Farm Stand!</CardTitle>
              <CardDescription>Your farm dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your account is set up and ready!</p>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-gray-500">No products yet</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-gray-500">No orders yet</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Reservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-gray-500">No reservations yet</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 flex gap-4">
                <Link href="/dashboard/products/new">
                  <Button className="bg-green-600">Add Your First Product</Button>
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
  
  // Database connected - would query real data here (requires database)
  // For now, show a placeholder for users with actual farms
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>{user.farm.name}</CardTitle>
            <CardDescription>Manage your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Farm dashboard coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
