import { Suspense } from "react"
import { ReservationsClient } from "./reservations-client"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for initial render (same as before)
const initialReservations = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "(555) 123-4567",
    product: "Farm Fresh Eggs",
    quantity: "2 dozen",
    status: "PENDING",
    message: "I'd like to pick up this weekend if possible.",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    customerName: "Sarah Miller",
    customerEmail: "sarah@example.com",
    customerPhone: "(555) 234-5678",
    product: "Organic Kale",
    quantity: "3 bunches",
    status: "CONFIRMED",
    message: "",
    createdAt: "Yesterday",
  },
  {
    id: "3",
    customerName: "Mike Roberts",
    customerEmail: "mike@example.com",
    customerPhone: "(555) 345-6789",
    product: "Whole Chicken",
    quantity: "1",
    status: "DECLINED",
    message: "Need a larger bird, do you have any?",
    createdAt: "3 days ago",
  },
]

function ReservationsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-12 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    </div>
  )
}

export default function ReservationsPage() {
  return (
    <Suspense fallback={<ReservationsLoading />}>
      <ReservationsClient initialReservations={initialReservations} />
    </Suspense>
  )
}
