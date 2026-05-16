import { useState, useEffect, useCallback } from "react"

export type NotificationType = "reservation" | "waitlist" | "announcement"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  link?: string
  farmName?: string
  productName?: string
}

const STORAGE_KEY = "farmstand_notifications"

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "reservation",
    title: "Reservation Confirmed",
    message: "Your pickup for Green Acres Farm is confirmed for tomorrow at 10 AM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    link: "/orders",
    farmName: "Green Acres Farm"
  },
  {
    id: "2",
    type: "waitlist",
    title: "Spot Available!",
    message: "A spot opened up for Organic Valley's weekly box. Order now!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    link: "/farm/organic-valley",
    farmName: "Organic Valley"
  },
  {
    id: "3",
    type: "announcement",
    title: "New Farm Joined",
    message: "Sunny Meadow Farm just joined Farm Stand! Check out their fresh produce.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    link: "/farm/sunny-meadow"
  },
  {
    id: "4",
    type: "reservation",
    title: "Reservation Reminder",
    message: "Don't forget your pickup at Happy Cow Dairy tomorrow at 2 PM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
    link: "/orders",
    farmName: "Happy Cow Dairy"
  }
]

export function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return mockNotifications
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((n: Notification & { timestamp: string }) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      }))
    }
  } catch (e) {
    console.error("Failed to load notifications from storage:", e)
  }
  return mockNotifications
}

export function saveToStorage(notifications: Notification[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch (e) {
    console.error("Failed to save notifications to storage:", e)
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loaded = loadNotifications()
    setNotifications(loaded)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveToStorage(notifications)
    }
  }, [notifications, isLoaded])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  }
}

export function formatNotificationTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export function getNotificationIcon(type: NotificationType): string {
  switch (type) {
    case "reservation":
      return "📅"
    case "waitlist":
      return "⏳"
    case "announcement":
      return "📢"
  }
}

export function getNotificationColor(type: NotificationType): string {
  switch (type) {
    case "reservation":
      return "bg-green-100 text-green-800"
    case "waitlist":
      return "bg-amber-100 text-amber-800"
    case "announcement":
      return "bg-blue-100 text-blue-800"
  }
}
