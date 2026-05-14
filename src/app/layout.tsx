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
        <footer className="border-t bg-white py-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>Notice:</strong> All transactions are directly between customers and farmers. 
              Virtual Farm Stand does not process payments.
            </p>
            <p>© 2026 Virtual Farm Stand. All rights reserved.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}