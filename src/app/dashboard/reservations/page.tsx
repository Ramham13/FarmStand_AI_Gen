;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MoreHorizontal } from "lucide-react";

export default function ReservationsPage() {
  const reservations = [
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
  ];

  const statusConfig = {
    PENDING: { label: "Pending", className: "bg-amber-100 text-amber-700" },
    CONFIRMED: { label: "Confirmed", className: "bg-green-100 text-green-700" },
    DECLINED: { label: "Declined", className: "bg-red-100 text-red-700" },
    CANCELLED: { label: "Cancelled", className: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage customer reservation requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-gray-500">Total Reservations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-sm text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-gray-500">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">2</div>
            <p className="text-sm text-gray-500">Declined/Cancelled</p>
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
          <div className="space-y-4">
            {reservations.map((reservation) => {
              const status = statusConfig[reservation.status as keyof typeof statusConfig];
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
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}