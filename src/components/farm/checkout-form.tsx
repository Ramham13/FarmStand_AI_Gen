"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ArrowLeft, ShoppingBag } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  unit: string
}

interface CheckoutFormProps {
  product: Product
  farmName: string
  farmSlug: string
}

export function CheckoutForm({ product, farmName, farmSlug }: CheckoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    message: "",
  })

  const goBack = () => {
    router.back()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData,
          productId: product.id,
          farmSlug: farmSlug,
        }),
      })
      
      if (res.ok) {
        const data = await res.json()
        toast.success("Reservation confirmed!")
        router.push(`/checkout/confirmation?orderId=${data.id}`)
      } else {
        toast.error("Failed to place reservation. Please try again.")
      }
    } catch {
      toast.error("Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 text-white px-4 py-6">
        <button onClick={goBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to farm</span>
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          Complete Reservation
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">From {farmName}</p>
              </div>
              <p className="text-lg font-bold text-green-700">
                ${product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <Input
                  placeholder="Your full name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                <Textarea
                  placeholder="Any special requests or notes for the farmer..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </span>
                ) : (
                  "Confirm Reservation"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          You'll receive a confirmation. The farmer will contact you to finalize pickup.
        </p>
      </div>
    </div>
  )
}
