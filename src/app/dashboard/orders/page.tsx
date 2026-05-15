import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { getOrders } from "@/lib/orders"

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

  const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
    PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
    CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-700 border-blue-200", icon: RefreshCw },
    COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
    CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  }

  const pendingCount = orders.filter((o: any) => o.status === "PENDING").length
  const confirmedCount = orders.filter((o: any) => o.status === "CONFIRMED").length
  const completedCount = orders.filter((o: any) => o.status === "COMPLETED").length

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
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.length}</div>
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
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Orders will appear here when customers make reservations. Share your farm link to start receiving orders.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const status = statusConfig[order.status] || statusConfig.PENDING
            const StatusIcon = status.icon

            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg truncate">{order.product?.name || "Unknown Product"}</h3>
                        <Badge className={status.className}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{order.customerName}</span>
                        {" • "}
                        {order.customerEmail}
                      </p>
                      {order.customerPhone && (
                        <p className="text-sm text-gray-500">{order.customerPhone}</p>
                      )}
                      {order.message && (
                        <p className="text-sm text-gray-500 mt-2 italic">"{order.message}"</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Ordered {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Farm Info */}
                    <div className="text-sm text-gray-500 sm:text-right">
                      <p className="font-medium text-gray-700">{order.product?.farm?.name || "Unknown Farm"}</p>
                      <p className="text-xs">{order.product?.farm?.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
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