// Server-side auth utilities for use in RSCs and API routes
import { cookies } from "next/headers"
import { prisma } from "@/lib/db"

export interface ServerUser {
  id: string
  email: string
  role: string
  farm?: {
    id: string
    name: string
    slug: string
  } | null
}

/**
 * Get the current authenticated user from cookies (server-side)
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<ServerUser | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get("auth-user-id")?.value
  
  if (!userId) {
    return null
  }
  
  // Demo mode - handle demo/user IDs
  if (userId.startsWith("demo-") || userId.startsWith("user-")) {
    // Return a demo user for demo accounts
    return {
      id: userId,
      email: "demo@farm.com",
      role: "FARMER",
      farm: {
        id: "demo-farm-1",
        name: "Demo Farm",
        slug: "demo-farm",
      },
    }
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        farms: {
          take: 1,
        },
      },
    })
    
    if (!user) {
      return null
    }
    
    const userFarm = user.farms?.[0] || null
    
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      farm: userFarm ? {
        id: userFarm.id,
        name: userFarm.name,
        slug: userFarm.slug,
      } : null,
    }
  } catch {
    return null
  }
}

/**
 * Require authentication - throws if not logged in
 */
export async function requireCurrentUser(): Promise<ServerUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not authenticated")
  }
  return user
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}