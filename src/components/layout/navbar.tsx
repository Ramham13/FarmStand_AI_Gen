"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50 overflow-x-hidden">
      <div className="flex items-center justify-between h-14 px-3 sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">🌾</span>
          <span className="text-lg sm:text-xl font-bold text-green-800 truncate">
            Farm Stand
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-green-700 ${
                pathname === item.href ? "text-green-700" : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Start Selling</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium py-2 ${
                    pathname === item.href ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <hr />
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Log In</Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full justify-start">Start Selling</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}