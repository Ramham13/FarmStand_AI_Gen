"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Ban, RotateCcw, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface FarmActionButtonProps {
  farmId: string
  currentStatus: string
  onUpdate?: () => void
}

export function FarmActionButton({ farmId, currentStatus, onUpdate }: FarmActionButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/farms/${farmId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to update farm status")
        return
      }

      toast.success(`Farm ${newStatus === "ACTIVE" ? "activated" : newStatus === "SUSPENDED" ? "suspended" : "removed"} successfully`)
      onUpdate?.()
    } catch (error) {
      toast.error("Failed to update farm status")
    } finally {
      setLoading(false)
    }
  }

  if (currentStatus === "ACTIVE") {
    return (
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => handleStatusChange("SUSPENDED")}
        disabled={loading}
      >
        <Ban className="h-4 w-4" />
      </Button>
    )
  }

  if (currentStatus === "SUSPENDED") {
    return (
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        onClick={() => handleStatusChange("ACTIVE")}
        disabled={loading}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    )
  }

  if (currentStatus === "REMOVED") {
    return (
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        onClick={() => handleStatusChange("ACTIVE")}
        disabled={loading}
      >
        <CheckCircle className="h-4 w-4" />
      </Button>
    )
  }

  return null
}
