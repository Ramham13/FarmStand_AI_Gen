"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface ReservationFormProps {
  productId: string
  productName: string
}

export function ReservationForm({ productId, productName }: ReservationFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const submitRef = useRef(false) // Prevent double submission
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    message: "",
    quantity: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (loading || submitRef.current) return
    submitRef.current = true
    setLoading(true)
    
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productId }),
      })
      
      if (res.ok) {
        toast.success("Request sent! The farmer will contact you soon.")
        setOpen(false)
        setFormData({ customerName: "", customerEmail: "", customerPhone: "", message: "", quantity: 1 })
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || "Failed to send request. Please try again.")
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
      submitRef.current = false
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !loading) {
      setOpen(false)
    } else if (isOpen) {
      setOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 font-medium disabled:opacity-50">
          Reserve Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserve {productName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name *"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email *"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Phone (optional)"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                disabled={loading}
                className="min-w-11 min-h-11 w-10 h-10 rounded-full border flex items-center justify-center text-lg hover:bg-gray-100 touch-manipulation disabled:opacity-50"
              >
                −
              </button>
              <span className="text-xl font-semibold w-8 text-center">{formData.quantity}</span>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, quantity: Math.min(10, formData.quantity + 1) })}
                disabled={loading}
                className="min-w-11 min-h-11 w-10 h-10 rounded-full border flex items-center justify-center text-lg hover:bg-gray-100 touch-manipulation disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <Textarea
              placeholder="Message (optional)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
