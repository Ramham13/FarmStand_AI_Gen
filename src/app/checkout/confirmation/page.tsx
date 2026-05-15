import Link from "next/link"
import { CheckCircle, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  // Next.js 15 requires awaiting searchParams - this is async server component
  const params = await searchParams
  const orderId = params.orderId || "unknown"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reservation Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your request has been sent to the farmer. You'll receive a confirmation email with pickup details.
        </p>

        {/* What happens next */}
        <div className="bg-white rounded-lg p-6 mb-6 text-left shadow-sm">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            What's Next?
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-green-600">1.</span>
              The farmer will review your reservation
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">2.</span>
              You'll receive a confirmation email
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">3.</span>
              Coordinate pickup directly with the farm
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700">
              <ArrowRight className="w-5 h-5 mr-2" />
              Browse More Farms
            </Button>
          </Link>
        </div>

        {/* Contact Note */}
        <p className="mt-6 text-xs text-gray-500">
          Questions? Contact the farm directly or reach out for support.
        </p>
      </div>
    </div>
  )
}
