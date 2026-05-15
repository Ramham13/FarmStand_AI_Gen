# Sprint Tasks - Friday, May 15th, 2026 - 11:31 PM UTC

## Priority 1: Dashboard Data Wiring
- [ ] **Wire main dashboard (`/dashboard`) to show real farm data**:
  - Replace demo/placeholder "0" values with real Prisma queries
  - Show actual product count, reservations count, waitlist count per farm
  - User dashboard should show stats for their specific farm
  - Currently uses hardcoded demo mode even for real users

## Priority 2: Cart Page Missing
- [ ] **Add dedicated `/cart` page**:
  - Currently cart only exists as a drawer component
  - Add full cart page at `src/app/cart/page.tsx`
  - Include: item list, quantity controls, remove buttons, subtotal, checkout CTA
  - Mobile-friendly: full-page view instead of just drawer

## Priority 3: Checkout Flow Completion
- [ ] **Ensure checkout fully persists reservations to DB**:
  - Verify `/api/reservations` POST endpoint creates database records
  - Add order confirmation page with order details
  - Consider adding order history for customers

## Priority 4: Mobile Navigation Issues
- [ ] **Fix mobile nav and touch targets**:
  - Verify navbar collapses properly on mobile
  - Ensure all buttons are 44px+ touch target
  - Check cart drawer works on mobile viewports
  - Test checkout forms don't trigger iOS zoom (16px min font)

## Priority 5: Product Availability States
- [ ] **Improve product availability handling**:
  - Show clear "Sold Out" / "Unavailable" states on product cards
  - Disable add-to-cart for unavailable products
  - Add waitlist signup for out-of-stock items
  - Verify availability status syncs with DB

---

## Completed (Previous Sprints)

- ✅ Build error fixed: metadata now in layout.tsx
- ✅ Image config added to next.config.mjs
- ✅ Loading states added: dashboard, explore, products, farm pages
- ✅ Mobile viewport, horizontal scroll prevention, 44px touch targets
- ✅ Error boundaries on explore, products, dashboard routes
- ✅ Retry buttons on failed API calls
- ✅ Skeleton loaders in Explore and Products
- ✅ Checkout form with farm contact info
- ✅ Waitlist dashboard with notify UI
- ✅ Cart localStorage persistence
- ✅ Empty cart state with CTA to browse farms
- ✅ Registration/onboarding flow
- ✅ Explore & Categories pages with filters
- ✅ Farm profile & product detail pages with SEO metadata
- ✅ Admin reports page
- ✅ Image upload API
- ✅ CI/CD workflow setup
- ✅ PostgreSQL (Neon) migration
- ✅ Search API wired to Explore page
- ✅ Pagination in `/api/farms/search`
- ✅ SEO: robots.txt and sitemap.xml

---

## Codebase Analysis

| Area | Status | Notes |
|------|--------|-------|
| Build | ✅ Fixed | Compiles successfully |
| Image Config | ✅ Done | next.config.mjs has remotePatterns |
| Loading States | ✅ Done | loading.tsx in key routes |
| Dashboard Data | ⚠️ Demo | Shows static "0" - needs real queries |
| Cart Page | ⚠️ Missing | Only drawer, no /cart page |
| Mobile Nav | ⚠️ Needs Test | Should verify touch targets |
| Product Availability | ⚠️ Needs Work | Availability states need polish |
| Checkout DB | ⚠️ Needs Verify | Should confirm reservations persist |

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma