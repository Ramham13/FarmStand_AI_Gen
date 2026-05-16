"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useCart } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems, setIsCartOpen } = useCart()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: press / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }
      
      if (e.key === '/') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 px-3 sm:px-4 max-w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 min-w-0 flex-shrink-0">
          <span className="text-xl sm:text-2xl">🌾</span>
          <span className="text-lg sm:text-xl font-bold text-green-800 truncate">Farm Stand</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* Global Search - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search farms... (press /)"
              className="w-32 lg:w-48 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-gray-50"
              aria-label="Search farms"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </form>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full touch-manipulation"
            aria-label="View cart"
          >
            <ShoppingBag className="w-5 h-5 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Start Selling</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-1 sm:hidden">
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full touch-manipulation"
            aria-label="View cart"
          >
            <ShoppingBag className="w-5 h-5 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white border-b shadow-lg p-4 sm:hidden z-50">
            {/* Mobile Search */}
            <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false) }} className="mb-3">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search farms, products..."
                  className="w-full pl-9 pr-3 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 touch-manipulation"
                  aria-label="Search farms"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
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
        <CartDrawer />
      </div>
    </header>
  )
}