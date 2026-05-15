// Client-side auth utilities

export interface User {
  id: string
  email: string
  role: string
  farm?: {
    id: string
    name: string
    slug: string
  } | null
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

export function setUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("user", JSON.stringify(user))
}

export function clearUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
}

export function requireUser(): User {
  const user = getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }
  return user
}
