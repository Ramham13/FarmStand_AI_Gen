"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, MoreHorizontal, Mail, Loader2 } from "lucide-react"

interface WaitlistCustomer {
  id: string
  name: string
  email: string
  position: number
  joinedAt: string
  notifiedAt: string | null
}

interface WaitlistGroup {
  id: string
  product: string
  productId: string
  customers: WaitlistCustomer[]
}

export default function WaitlistPage() {
  const [waitlists, setWaitlists] = useState<WaitlistGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notifying, setNotifying] = useState<string | null>(null)

  useEffect(() => {
    fetchWaitlists()
  }, [])

  const fetchWaitlists = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/waitlist")
      if (!response.ok) {
        throw new Error("Failed to fetch waitlists")
      }
      const data = await response.json()
      setWaitlists(data)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch waitlists:", err)
      setError("Failed to load waitlists. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleNotify = async (waitlistId: string, customerId: string) => {
    try {
      setNotifying(customerId)
      const response = await fetch("/api/waitlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waitlistId, action: "notify" }),
      })

      if (!response.ok) {
        throw new Error("Failed to notify")
      }

      // Refresh the waitlists to show updated state
      await fetchWaitlists()
    } catch (err) {
      console.error("Failed to notify:", err)
    } finally {
      setNotifying(null)
    }
  }

  const formatJoinedAt = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Waitlists</h1>
          <p className="text-gray-600">Manage customers waiting for out-of-stock products</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Loading waitlists...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Waitlists</h1>
          <p className="text-gray-600">Manage customers waiting for out-of-stock products</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500">{error}</p>
            <Button onClick={fetchWaitlists} className="mt-4">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Waitlists</h1>
        <p className="text-gray-600">Manage customers waiting for out-of-stock products</p>
      </div>

      {waitlists.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">No active waitlists</p>
            <p className="text-sm text-gray-400">Customers will join waitlists when products are sold out</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {waitlists.map((waitlist) => (
            <Card key={waitlist.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{waitlist.product}</CardTitle>
                    <CardDescription>{waitlist.customers.length} customers waiting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waitlist.customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">#{customer.position}</Badge>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {customer.notifiedAt ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <Bell className="mr-1 h-3 w-3" />
                            Notified
                          </Badge>
                        ) : (
                          <span className="text-xs text-gray-400">{formatJoinedAt(customer.joinedAt)}</span>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleNotify(waitlist.id, customer.id)}
                          disabled={!!customer.notifiedAt || notifying === customer.id}
                        >
                          {notifying === customer.id ? (
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          ) : (
                            <Mail className="mr-1 h-3 w-3" />
                          )}
                          Notify
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
