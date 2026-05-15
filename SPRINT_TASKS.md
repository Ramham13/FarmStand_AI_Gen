# Sprint Tasks - Friday, May 15th, 2026 - 4:37 PM UTC

## Priority 1: CRITICAL - Fix Server Action Export Error (BLOCKING)
- [ ] Remove `"use server"` directive from line 1 of `src/lib/farms.ts`
- [ ] The `categories` array export is a plain object, not an async function - violates Next.js "use server" rule
- [ ] Verify /explore and /farm/[slug] pages load after fix
- **Impact**: Core browsing functionality is broken - customers cannot view farms or products
- **Why Now**: This is a runtime crash blocking the entire discovery flow

## Priority 2: Wire Up Admin Reports Action Buttons
- [ ] Connect "Resolve" button in `/admin/reports` to call PATCH endpoint with `action: "resolve"`
- [ ] Connect "Dismiss" button to call PATCH endpoint with `action: "dismiss"`
- [ ] Add loading states and optimistic updates
- [ ] Refresh list after action completes
- **Impact**: Admins can actually act on flagged content
- **Why Now**: UI exists but buttons do nothing — blocks moderation workflow

## Priority 3: Fix Products API to Use Real Database Data
- [ ] Update `/api/products` route to query Prisma instead of `getAllFarms()` mock data
- [ ] Join with Farm table to get farmName, farmSlug, farmEmoji, farmLocation
- [ ] Keep search/filter logic but apply to real database products
- [ ] Ensure filters return unique categories from real products
- **Impact**: Products page shows actual database products, not stale mock data
- **Why Now**: Core discovery feature broken - customers see mock data, not real farm products

## Priority 4: Implement Product Image Upload
- [ ] Add file upload input to `/dashboard/products/new` page
- [ ] Add file upload to `/dashboard/products/[id]/edit` page
- [ ] Implement local storage in `/public/uploads` (MVP approach)
- [ ] Display uploaded images on public farm pages and product detail
- **Impact**: Products show real images, better visual appeal for customers
- **Why Now**: Schema supports imageUrl but only accepts URL strings - no upload UI

## Priority 5: Connect Farm Settings to Database
- [ ] Update `/dashboard/settings` page to fetch current farm data from DB
- [ ] Connect form to PATCH API endpoint to update farm in database
- [ ] Ensure farmer can edit: name, slug, description, location, phone, email, website, paymentLink
- **Impact**: Farmers can update farm details after initial setup
- **Why Now**: Form exists but uses hardcoded mock values - no real updates persist

---

## Completed (from prior sprints)
- ✅ Middleware route protection enabled (security)
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters (UI)
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page (per-product)
- ✅ Explore & Categories pages connected to real DB
- ✅ Farm public page connected to real DB
- ✅ Waitlist dashboard connected to real DB (API + UI)
- ✅ Admin reports page shows real data from DB
- ✅ Cart multi-farm UX (warns user, redirects to single farm checkout)
- ✅ Mobile responsive with touch targets verified

---

## Bug Report (from TEST_REPORT.md - CRITICAL)
- **File**: `src/lib/farms.ts`
- **Issue**: `"use server"` directive on line 1 with plain `categories` array export
- **Error**: `A "use server" file can only export async functions, found object.`
- **Affected Pages**: /explore, /farm/[slug] (500 errors)
- **Fix**: Remove `"use server"` directive (these are cached data functions, not Server Actions)