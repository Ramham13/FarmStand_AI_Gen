"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error("Profile error:", error)

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't load your profile. Please try again.
      </p>
      <Button onClick={reset} className="bg-green-600 hover:bg-green-700">
        Try Again
      </Button>
    </div>
  )
}
