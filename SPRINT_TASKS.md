# Sprint Tasks - Friday, May 15th, 2026 - 11:22 PM UTC

## Priority 1: CRITICAL - Fix Homepage Build Error
- [ ] **Fix `"use client"` + `metadata` conflict in `src/app/page.tsx`**:
  - Cannot export `metadata` from a client component (Next.js limitation)
  - File has both `"use client"` on line 1 AND `export const metadata` on line 11
  - Options: (A) Move metadata to `src/app/layout.tsx`, or (B) Refactor to use server component pattern
  - **BLOCKER**: `npm run build` FAILS - this prevents any deployment

## Priority 2: Next.js Image Configuration
- [ ] **Add image domain config to `next.config.mjs`**:
  - App uses `<Image />` component throughout but lacks domain config
  - Add: `images: { remotePatterns: [{ hostname: "**" }] }` for external images
  - Will fail at runtime otherwise

## Priority 3: Dashboard Data Wiring
- [ ] **Wire main dashboard** (`/dashboard`) to show real data:
  - Replace demo/placeholder data with real DB queries via Prisma
  - Currently shows hardcoded "0" values for products/orders/reservations
  - Wire `/dashboard/products`, `/dashboard/reservations`, `/dashboard/waitlist` pages

## Priority 4: Loading States (UX)
- [ ] **Add loading.tsx files** to key routes for Suspense boundaries:
  - `src/app/dashboard/loading.tsx`
  - `src/app/explore/loading.tsx`
  - `src/app/products/loading.tsx`
  - `src/app/farm/[slug]/loading.tsx`
  - `src/app/farm/[slug]/product/[productId]/loading.tsx`
- Currently NO loading.tsx files exist anywhere in the app

## Priority 5: Mobile Checkout Verification
- [ ] **Verify checkout forms work on mobile**:
  - Ensure 16px minimum font on inputs (prevents iOS zoom on focus)
  - 44px+ touch targets on checkout buttons
  - Test forms in portrait mode on small viewports
  - Check reservation-form, checkout-form, waitlist-form components

---

## Completed (Previous Sprints)

- ✅ Mobile viewport, horizontal scroll prevention, 44px touch targets
- ✅ Error boundaries on explore, products, dashboard routes
- ✅ Retry buttons on failed API calls
- ✅ Skeleton loaders in Explore and Products client components
- ✅ Checkout flow with farm contact info
- ✅ Waitlist dashboard with notify UI
- ✅ Cart localStorage persistence
- ✅ Empty cart state with CTA to browse farms
- ✅ Cart uses Next.js Image component
- ✅ Registration/onboarding flow
- ✅ Explore & Categories pages with filters
- ✅ Farm profile & product detail pages with SEO metadata
- ✅ Admin reports page
- ✅ Image upload API
- ✅ CI/CD workflow setup
- ✅ PostgreSQL (Neon) migration
- ✅ Form loading states and disabled buttons
- ✅ Search API wired to Explore page
- ✅ Pagination in `/api/farms/search` with Load More button
- ✅ SEO: robots.txt and sitemap.xml route handlers
- ✅ Database indexes for Reservation, Product, Farm, Waitlist
- ✅ Homepage has SEO metadata (title, description, OG tags)

---

## Codebase Analysis

| Area | Status | Notes |
|------|--------|-------|
| Build | ❌ BROKEN | "use client" + metadata conflict (line 1 and 11) |
| Image Config | ⚠️ Missing | Uses `<Image />` but no domain config |
| Dashboard Data | ⚠️ Demo | Shows static "0" values (no DB queries) |
| Loading States | ⚠️ Missing | No loading.tsx anywhere in app |
| Mobile Checkout | ⚠️ Unverified | Needs testing |
| Cart | ✅ Done | Empty state, Image component |
| Auth Flow | ✅ Done | Login, register, onboarding |
| Farm/Product SEO | ✅ Done | generateMetadata + OG tags |
| Explore Page | ✅ Done | Search, filters, pagination |

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma