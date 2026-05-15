"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  productName: string
  productCategory: string
  productPrice: number
  productUnit: string
  quantity: number
  status: string
  message: string | null
  createdAt: string
  updatedAt: string
  farm: {
    name: string
    slug: string
    emoji: string
    location: string
    phone: string | null
  }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { label: "Confirmed", color: "bg-green-100 text-green-800" },
  DECLINED: { label: "Declined", color: "bg-red-100 text-red-800" },
  CANCELLED: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
}

export default function OrdersPage() {
  const [email, setEmail] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to fetch orders")
        setOrders([])
        return
      }

      setOrders(data.orders || [])
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-green-700">
              🌾 Virtual Farm Stand
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Track Your Orders</h1>
            <p className="mt-2 text-gray-600">
              Enter the email you used when placing your reservation
            </p>
          </div>

          {/* Search Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? "Searching..." : "Find Orders"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error State */}
          {error && (
            <Card className="mt-4 border-red-200 bg-red-50">
              <CardContent className="pt-4 text-center text-red-700">
                {error}
              </CardContent>
            </Card>
          )}

          {/* No Orders Found */}
          {searched && !loading && orders.length === 0 && !error && (
            <Card className="mt-4">
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">
                  We couldn&apos;t find any orders for &quot;{email}&quot;
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Try a different email or contact the farm directly
                </p>
              </CardContent>
            </Card>
          )}

          {/* Orders List */}
          {orders.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-500 mb-4">
                Found {orders.length} order{orders.length !== 1 ? "s" : ""}
              </p>

              <div className="space-y-4">
                {orders.map((order) => {
                  const status = statusConfig[order.status] || { label: order.status, color: "bg-gray-100" }
                  const total = (order.productPrice || 0) * order.quantity

                  return (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{order.farm.emoji}</span>
                              <h3 className="text-lg font-semibold text-gray-900">{order.farm.name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {order.farm.location}
                            </p>
                          </div>
                          <Badge className={status.color}>{status.label}</Badge>
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{order.productName}</p>
                              <p className="text-sm text-gray-500">
                                ${order.productPrice?.toFixed(2)} / {order.productUnit} × {order.quantity} = 
                                <span className="font-semibold text-green-700 ml-1">${total.toFixed(2)}</span>
                              </p>
                            </div>
                          </div>

                          {order.message && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium text-gray-700">Your message:</span>{" "}
                              <span className="text-gray-600">{order.message}</span>
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs text-gray-400">
                              Ordered: {formatDate(order.createdAt)}
                            </p>
                            <div className="flex gap-2">
                              {order.farm.phone && (
                                <Button asChild size="sm" variant="outline">
                                  <a href={`tel:${order.farm.phone}`}>
                                    <Phone className="h-4 w-4 mr-1" />
                                    Call Farm
                                  </a>
                                </Button>
                              )}
                              <Button asChild size="sm">
                                <Link href={`/farm/${order.farm.slug}`}>
                                  View Farm
                                  <ExternalLink className="h-4 w-4 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Questions about your order? Contact the farm directly using the phone
                number on their farm page.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
