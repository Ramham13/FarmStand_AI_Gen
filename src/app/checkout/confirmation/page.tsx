import Link from "next/link"
import { CheckCircle, ArrowRight, Package, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Server-side farm fetch
async function getFarmInfo(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/farms/${slug}`, { 
      cache: 'no-store' 
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.error('Failed to fetch farm info:', e)
  }
  return null
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; farm?: string }>
}) {
  // Next.js 15 requires awaiting searchParams - this is async server component
  const params = await searchParams
  const orderId = params.orderId || "unknown"
  const farmSlug = params.farm || ""
  
  // Fetch farm info for contact details
  const farm = farmSlug ? await getFarmInfo(farmSlug) : null

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

        {/* Farm Contact Info */}
        {farm && (
          <div className="bg-white rounded-lg p-6 mb-6 text-left shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" />
              Contact {farm.name}
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              {farm.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href={`mailto:${farm.email}`} className="text-green-600 hover:underline">
                    {farm.email}
                  </a>
                </p>
              )}
              {farm.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href={`tel:${farm.phone}`} className="text-green-600 hover:underline">
                    {farm.phone}
                  </a>
                </p>
              )}
              {farm.location && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {farm.location}
                </p>
              )}
            </div>
          </div>
        )}

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