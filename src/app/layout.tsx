import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "Virtual Farm Stand - Local Farms, Fresh Products",
  description: "Discover local farms, fresh produce, and artisan goods. Connect directly with farmers in your area.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans overflow-x-hidden antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
        <footer className="border-t bg-white py-8 px-3 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="min-w-0">
                <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3 truncate">🏡 Virtual Farm Stand</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Connecting communities with local farms. No middleman, no fees.
                </p>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3">For Customers</h4>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <li><a href="/explore" className="hover:text-green-600 block truncate">Find Farms</a></li>
                  <li><a href="/explore?category=EGGS" className="hover:text-green-600 block truncate">Eggs</a></li>
                  <li><a href="/explore?category=PRODUCE" className="hover:text-green-600 block truncate">Produce</a></li>
                  <li><a href="/explore?category=DAIRY" className="hover:text-green-600 block truncate">Dairy</a></li>
                </ul>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3">For Farmers</h4>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <li><a href="/register" className="hover:text-green-600 block truncate">Register Farm</a></li>
                  <li><a href="/login" className="hover:text-green-600 block truncate">Farmer Login</a></li>
                  <li><a href="/dashboard" className="hover:text-green-600 block truncate">Dashboard</a></li>
                </ul>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3">Support</h4>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-green-600 block truncate">About Us</a></li>
                  <li><a href="/disclaimer" className="hover:text-green-600 block truncate">Disclaimer</a></li>
                  <li><a href="mailto:help@farmstand.example.com" className="hover:text-green-600 block truncate">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-500">
              <p className="mb-1 md:mb-2 px-2">
                <strong>Notice:</strong> All transactions are directly between customers and farmers. 
                Virtual Farm Stand does not process payments.
              </p>
              <p>© 2026 Virtual Farm Stand. All rights reserved.</p>
            </div>
          </div>
        </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}