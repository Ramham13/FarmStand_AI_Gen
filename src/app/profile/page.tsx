"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { MapPin, ExternalLink, Phone, Mail } from "lucide-react"

interface UserInfo {
  id: string
  email: string
  role: string
  createdAt?: string
  farm?: {
    id: string
    name: string
    slug: string
  }
}

interface Order {
  id: string
  productName: string
  productCategory: string
  productPrice: number
  productUnit: string
  quantity: number
  status: string
  message: string | null
  createdAt: string
  updatedAt: string
  farm: {
    name: string
    slug: string
    emoji: string
    location: string
    phone: string | null
  }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { label: "Confirmed", color: "bg-green-100 text-green-800" },
  DECLINED: { label: "Declined", color: "bg-red-100 text-red-800" },
  CANCELLED: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [emailPrefs, setEmailPrefs] = useState({
    orderUpdates: true,
    marketing: false,
    waitlist: true,
  })
  const [prefsLoaded, setPrefsLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => {
        if (!res.ok) return null
        return res.json()
      })
      .then(data => {
        setUser(data)
        setLoading(false)
        // Fetch orders for authenticated user
        if (data?.email) {
          setOrdersLoading(true)
          fetch("/api/orders/me")
            .then(res => res.ok ? res.json() : { orders: [] })
            .then(data => {
              setOrders(data.orders || [])
              setOrdersLoading(false)
            })
            .catch(() => setOrdersLoading(false))
        }
      })
      .catch(() => {
        setLoading(false)
      })

    // Load email preferences from localStorage
    const savedPrefs = localStorage.getItem("emailPreferences")
    if (savedPrefs) {
      try {
        setEmailPrefs(JSON.parse(savedPrefs))
      } catch {}
    }
    setPrefsLoaded(true)
  }, [])

  const handleEmailPrefChange = (key: keyof typeof emailPrefs, checked: boolean) => {
    const newPrefs = { ...emailPrefs, [key]: checked }
    setEmailPrefs(newPrefs)
    localStorage.setItem("emailPreferences", JSON.stringify(newPrefs))
    toast.success("Email preferences saved")
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN": return "Administrator"
      case "FARMER": return "Farmer"
      case "CUSTOMER": return "Customer"
      default: return role
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required"
    }
    if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsChangingPassword(true)

    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ currentPassword: data.error || "Failed to change password" })
        return
      }

      toast.success("Password updated successfully")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error) {
      setErrors({ currentPassword: "Failed to change password" })
    } finally {
      setIsChangingPassword(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Header skeleton */}
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
              <div className="h-5 w-64 bg-gray-200 rounded"></div>
            </div>
            {/* Account card skeleton */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-5 w-full bg-gray-200 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
            {/* Password card skeleton */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">Please log in to view your profile.</p>
              <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
                <a href="/login">Log In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mb-8 text-gray-600">Manage your personal account and security</p>

          <div className="space-y-6">
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Role</p>
                    <p className="text-sm text-gray-500">{getRoleLabel(user.role)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Member Since</p>
                    <p className="text-sm text-gray-500">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
                {user.farm && (
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">Farm</p>
                      <p className="text-sm text-gray-500">{user.farm.name}</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href={`/farm/${user.farm.slug}`}>View Farm</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                    />
                    {errors.currentPassword && (
                      <p className="text-sm text-red-500">{errors.currentPassword}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                    />
                    {errors.newPassword && (
                      <p className="text-sm text-red-500">{errors.newPassword}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isChangingPassword}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* My Orders */}
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Your recent reservations and orders</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-20 bg-gray-100 rounded"></div>
                    <div className="h-20 bg-gray-100 rounded"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No orders yet</p>
                    <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
                      <Link href="/explore">Explore Farms</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {orders.slice(0, 5).map(order => {
                      const status = statusConfig[order.status] || { label: order.status, color: "bg-gray-100" }
                      const total = (order.productPrice || 0) * order.quantity
                      return (
                        <div key={order.id} className="flex items-start justify-between p-3 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{order.farm.emoji}</span>
                              <p className="font-medium text-gray-900 truncate">{order.productName}</p>
                            </div>
                            <p className="text-sm text-gray-500 truncate">
                              {order.farm.name} · {order.productPrice?.toFixed(2)}/{order.productUnit} × {order.quantity}
                            </p>
                            <p className="text-sm font-semibold text-green-700">
                              ${total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2 ml-2">
                            <Badge className={status.color}>{status.label}</Badge>
                            <div className="flex gap-1">
                              {order.farm.phone && (
                                <Button size="sm" variant="ghost" asChild>
                                  <a href={`tel:${order.farm.phone}`}>
                                    <Phone className="h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" asChild>
                                <Link href={`/farm/${order.farm.slug}`}>
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Email Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Choose what emails you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="orderUpdates"
                    checked={emailPrefs.orderUpdates}
                    onCheckedChange={(checked) => handleEmailPrefChange("orderUpdates", checked as boolean)}
                  />
                  <Label htmlFor="orderUpdates" className="font-normal cursor-pointer">
                    <span className="font-medium">Order Updates</span>
                    <span className="text-gray-500 text-sm ml-2">— Reservation confirmations and status changes</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="waitlist"
                    checked={emailPrefs.waitlist}
                    onCheckedChange={(checked) => handleEmailPrefChange("waitlist", checked as boolean)}
                  />
                  <Label htmlFor="waitlist" className="font-normal cursor-pointer">
                    <span className="font-medium">Waitlist Notifications</span>
                    <span className="text-gray-500 text-sm ml-2">— When products become available</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={emailPrefs.marketing}
                    onCheckedChange={(checked) => handleEmailPrefChange("marketing", checked as boolean)}
                  />
                  <Label htmlFor="marketing" className="font-normal cursor-pointer">
                    <span className="font-medium">News & Updates</span>
                    <span className="text-gray-500 text-sm ml-2">— New farms, features, and promotions</span>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/settings">Farm Settings</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/products">Manage Products</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
