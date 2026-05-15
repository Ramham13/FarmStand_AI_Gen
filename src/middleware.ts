import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/admin"]

// Routes that are public (no auth required)
const publicRoutes = [
  "/",
  "/explore",
  "/categories",
  "/login",
  "/register",
  "/onboarding",
]

// Check if route starts with any of the given prefixes
function routeStartsWith(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path.startsWith(prefix) || path === prefix)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth cookie
  const authUserId = request.cookies.get("auth-user-id")?.value
  const isAuthenticated = !!authUserId

  // Public routes - allow access
  if (routeStartsWith(pathname, publicRoutes)) {
    return NextResponse.next()
  }

  // Check if it's a protected route
  const isProtectedRoute = routeStartsWith(pathname, protectedRoutes)

  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin routes - additional role check would require DB lookup
  // For now, let the page-level auth handle it (middleware can't easily query DB)
  // The admin pages already check for admin role server-side

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - api routes (they have their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
}