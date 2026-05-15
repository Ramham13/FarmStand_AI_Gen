"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 px-3 sm:px-4 max-w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 min-w-0 flex-shrink-0">
          <span className="text-xl sm:text-2xl">🌾</span>
          <span className="text-lg sm:text-xl font-bold text-green-800 truncate">Farm Stand</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2.5 text-sm font-medium transition-colors hover:text-green-700 ${
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

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2.5"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white border-b shadow-lg p-4 sm:hidden z-50">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-base font-medium ${
                    pathname === item.href ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-2" />
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full">Log In</Button>
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Start Selling</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}