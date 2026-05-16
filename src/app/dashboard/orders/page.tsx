import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { getOrders } from "@/lib/orders"
import { OrdersClient } from "./orders-client"

export const dynamic = "force-dynamic"

async function OrdersContent() {
  let orders: any[] = []
  let error: string | null = null

  try {
    orders = await getOrders()
  } catch (err) {
    console.error("Error fetching orders:", err)
    error = "Failed to load orders"
  }

  // Transform API response to match client interface
  const transformedOrders = orders.map((order: any) => ({
    id: order.id,
    status: order.status,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    message: order.message,
    quantity: order.quantity,
    createdAt: order.createdAt,
    productName: order.productName,
    productCategory: order.productCategory,
    productPrice: order.productPrice,
    productUnit: order.productUnit,
    productAvailable: order.productAvailable,
    farm: order.farm,
  }))

  const pendingCount = transformedOrders.filter((o: any) => o.status === "PENDING").length
  const confirmedCount = transformedOrders.filter((o: any) => o.status === "CONFIRMED").length
  const completedCount = transformedOrders.filter((o: any) => o.status === "COMPLETED").length
  const cancelledCount = transformedOrders.filter((o: any) => o.status === "CANCELLED").length

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{transformedOrders.length}</div>
            <p className="text-sm text-gray-500">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
            <p className="text-sm text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{confirmedCount}</div>
            <p className="text-sm text-gray-500">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <p className="text-sm text-gray-500">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      {transformedOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              Orders will appear here when customers make reservations. Share your farm link to start receiving orders.
            </p>
            <Link href="/explore">
              <Button variant="outline">Browse Farms</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <OrdersClient orders={transformedOrders} />
      )}
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  )
}
