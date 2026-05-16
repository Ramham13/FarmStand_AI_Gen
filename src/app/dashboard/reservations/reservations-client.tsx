"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { CheckCircle, XCircle, MoreHorizontal, AlertTriangle, Package } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Reservation {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string | null
  product: string
  quantity: string
  status: string
  message: string | null
  createdAt: string
}

const statusConfig = {
  PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  CONFIRMED: { label: "Confirmed", className: "bg-green-100 text-green-700" },
  DECLINED: { label: "Declined", className: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Cancelled", className: "bg-gray-100 text-gray-700" },
}

interface ReservationsClientProps {
  initialReservations: Reservation[]
}

export function ReservationsClient({ initialReservations }: ReservationsClientProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/reservations?email=demo@farm.com")
      if (!res.ok) {
        throw new Error(`Failed to fetch reservations: ${res.status}`)
      }
      const data = await res.json()
      // Transform data to match expected format
      const transformed = data.map((r: Record<string, unknown>) => ({
        id: r.id,
        customerName: r.customerName,
        customerEmail: r.customerEmail,
        customerPhone: r.customerPhone,
        product: (r.product as Record<string, unknown>)?.name || "Unknown Product",
        quantity: r.quantity as string,
        status: r.status as string,
        message: r.message as string | null,
        createdAt: new Date(r.createdAt as string).toLocaleDateString(),
      }))
      setReservations(transformed)
    } catch (err) {
      console.error("Failed to fetch reservations:", err)
      setError("Failed to load reservations. Please try again.")
      toast.error("Failed to load reservations. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Stats
  const total = reservations.length
  const pending = reservations.filter(r => r.status === "PENDING").length
  const confirmed = reservations.filter(r => r.status === "CONFIRMED").length
  const declined = reservations.filter(r => r.status === "DECLINED" || r.status === "CANCELLED").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage customer reservation requests</p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unable to load reservations</AlertTitle>
          <AlertDescription>
            {error}
            <Button onClick={fetchReservations} size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <>
                <Skeleton className="h-8 w-12 mb-2" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{total}</div>
                <p className="text-sm text-gray-500">Total Reservations</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <>
                <Skeleton className="h-8 w-12 mb-2" />
                <Skeleton className="h-4 w-16" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-amber-600">{pending}</div>
                <p className="text-sm text-gray-500">Pending</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <>
                <Skeleton className="h-8 w-12 mb-2" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-green-600">{confirmed}</div>
                <p className="text-sm text-gray-500">Confirmed</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <>
                <Skeleton className="h-8 w-12 mb-2" />
                <Skeleton className="h-4 w-28" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-600">{declined}</div>
                <p className="text-sm text-gray-500">Declined/Cancelled</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
          <CardDescription>Showing all reservation requests</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : reservations.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reservations yet</h3>
              <p className="text-gray-500 mb-6">When customers reserve your products, they'll appear here.</p>
              <Link href="/dashboard/products">
                <Button variant="outline">View Products</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => {
                const status = statusConfig[reservation.status as keyof typeof statusConfig] || statusConfig.PENDING
                return (
                  <div
                    key={reservation.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{reservation.customerName}</h3>
                        <Badge className={status.className}>{status.label}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {reservation.product} × {reservation.quantity}
                      </p>
                      <div className="mt-1 text-sm text-gray-500">
                        <span>{reservation.customerEmail}</span>
                        {reservation.customerPhone && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{reservation.customerPhone}</span>
                          </>
                        )}
                      </div>
                      {reservation.message && (
                        <p className="mt-2 text-sm italic text-gray-600">
                          "{reservation.message}"
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">{reservation.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      {reservation.status === "PENDING" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Confirm
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <XCircle className="mr-1 h-4 w-4" />
                            Decline
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
