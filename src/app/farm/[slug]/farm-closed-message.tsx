import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PackageX } from "lucide-react"

interface FarmClosedMessageProps {
  status: "SUSPENDED" | "BANNED"
  name: string
  emoji?: string
}

export function FarmClosedMessage({ status, name, emoji = "🌾" }: FarmClosedMessageProps) {
  const isBanned = status === "BANNED"
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageX className={`w-10 h-10 ${isBanned ? "text-red-500" : "text-amber-500"}`} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isBanned ? "Farm No Longer Available" : "Farm Currently Closed"}
        </h1>
        
        <p className="text-gray-600 mb-2">
          {isBanned 
            ? `Sorry, ${name} is no longer on Virtual Farm Stand.`
            : `${name} is temporarily not accepting orders.`}
        </p>
        
        {isBanned && (
          <p className="text-sm text-gray-500 mb-6">
            This farm may have been removed for violating our terms of service.
          </p>
        )}
        
        {!isBanned && (
          <p className="text-sm text-gray-500 mb-6">
            Please check back later or browse other farms.
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/explore">
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
              Browse Farms
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}