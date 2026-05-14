import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, MoreHorizontal, Mail } from "lucide-react";

export default function WaitlistPage() {
  const waitlists = [
    {
      id: "1",
      product: "Whole Chicken",
      customers: [
        { id: "c1", name: "John Doe", email: "john@example.com", position: 1, joinedAt: "3 days ago" },
        { id: "c2", name: "Sarah Miller", email: "sarah@example.com", position: 2, joinedAt: "1 week ago" },
      ],
    },
    {
      id: "2",
      product: "Strawberries",
      customers: [
        { id: "c3", name: "Mike Roberts", email: "mike@example.com", position: 1, joinedAt: "2 days ago" },
      ],
    },
  ];

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
                        <span className="text-xs text-gray-400">{customer.joinedAt}</span>
                        <Button size="sm" variant="outline">
                          <Mail className="mr-1 h-3 w-3" />
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
  );
}