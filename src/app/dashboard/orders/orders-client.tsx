"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw, Clock, Package } from "lucide-react"

interface Order {
  id: string
  status: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  message?: string
  createdAt: string
  product?: {
    name: string
    farm?: {
      name: string
      location: string
    }
  }
}

interface OrdersClientProps {
  orders: Order[]
}

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
  PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-700 border-blue-200", icon: RefreshCw },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
}

const nextStatus: Record<string, string> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "COMPLETED",
}

export function OrdersClient({ orders }: OrdersClientProps) {
  const [orderList, setOrderList] = useState(orders)
  const [updating, setUpdating] = useState<string | null>(null)

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      })

      if (res.ok) {
        const updated = await res.json()
        setOrderList((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        )
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="space-y-4">
      {orderList.map((order) => {
        const status = statusConfig[order.status] || statusConfig.PENDING
        const StatusIcon = status.icon
        const next = nextStatus[order.status]

        return (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-lg truncate">
                      {order.product?.name || "Unknown Product"}
                    </h3>
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
                <div className="text-sm text-gray-500 sm:text-right order-last sm:order-none mb-2 sm:mb-0">
                  <p className="font-medium text-gray-700">
                    {order.product?.farm?.name || "Unknown Farm"}
                  </p>
                  <p className="text-xs">{order.product?.farm?.location}</p>
                </div>

                {/* Status Actions */}
                {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                  <div className="flex gap-2 sm:flex-col sm:gap-1">
                    {next && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(order.id, next)}
                        disabled={updating === order.id}
                        className="touch-manipulation"
                      >
                        {next === "CONFIRMED" ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Confirm
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(order.id, "CANCELLED")}
                      disabled={updating === order.id}
                      className="touch-manipulation text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}

                {/* Completed/Cancelled - show reactivate for cancelled */}
                {order.status === "CANCELLED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(order.id, "PENDING")}
                    disabled={updating === order.id}
                    className="touch-manipulation"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Reactivate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
