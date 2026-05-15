import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth cookie
  const authUserId = request.cookies.get("auth-user-id")?.value

  // Public routes that don't require authentication
  const publicPaths = [
    "/",
    "/explore",
    "/categories",
    "/login",
    "/register",
    "/onboarding",
  ]

  // Check if path starts with any public path
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith("/farm/") || pathname.startsWith(path + "/")
  )

  // Also allow API routes (they handle their own auth)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Protected routes
  const protectedPaths = ["/dashboard", "/admin"]

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // If accessing protected path without auth, redirect to login
  if (isProtectedPath && !authUserId) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If already logged in and trying to access login/register, redirect to dashboard
  if (authUserId && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
}