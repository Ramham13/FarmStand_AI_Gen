import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Virtual Farm Stand - Local Farms, Fresh Products",
  description: "Discover local farms, fresh produce, and artisan goods. Connect directly with farmers in your area.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">🏡 Virtual Farm Stand</h3>
                <p className="text-sm text-gray-600">
                  Connecting communities with local farms. No middleman, no fees.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">For Customers</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/explore" className="hover:text-green-600">Find Farms</a></li>
                  <li><a href="/explore?category=EGGS" className="hover:text-green-600">Eggs</a></li>
                  <li><a href="/explore?category=PRODUCE" className="hover:text-green-600">Produce</a></li>
                  <li><a href="/explore?category=DAIRY" className="hover:text-green-600">Dairy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">For Farmers</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/register" className="hover:text-green-600">Register Farm</a></li>
                  <li><a href="/login" className="hover:text-green-600">Farmer Login</a></li>
                  <li><a href="/dashboard" className="hover:text-green-600">Dashboard</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-green-600">About Us</a></li>
                  <li><a href="/disclaimer" className="hover:text-green-600">Disclaimer</a></li>
                  <li><a href="mailto:help@farmstand.example.com" className="hover:text-green-600">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
              <p className="mb-2">
                <strong>Notice:</strong> All transactions are directly between customers and farmers. 
                Virtual Farm Stand does not process payments.
              </p>
              <p>© 2026 Virtual Farm Stand. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}