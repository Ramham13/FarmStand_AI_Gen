# Sprint Tasks - Friday, May 15th, 2026 - 7:02 PM UTC

## Priority 1: Checkout Farm Contact Info (Bug Fix)
- [ ] Fetch and display farm contact info (email, phone, location) on checkout page
- [ ] The checkout API (`/api/checkout`) already returns farm info - need to use it in page.tsx
- [ ] Show "Questions? Contact the farm" section with farm details
- [ ] Add farm location/details to confirmation page
- **Status**: PARTIALLY DONE - API returns farm info, page not using it
- **Impact**: Customers can't contact farm after placing reservation

## Priority 2: Error Handling & Loading States
- [ ] Add error boundaries to prevent full-page crashes on key routes
- [ ] Add retry buttons on failed API calls (Explore, Products, Reservations)
- [ ] Replace "Loading..." text with skeleton loaders on Explore and Products pages
- [ ] Add toast notifications for server action errors
- **Status**: NOT STARTED - Basic Suspense only
- **Impact**: Poor UX when APIs fail or load slowly

## Priority 3: Dashboard UX Improvements
- [ ] Add helpful empty state CTAs:
  - No products → "Add your first product" button
  - No reservations → explanation text + link to products
  - No waitlist → explanation text
- [ ] Add quick stats cards on dashboard overview (total products, reservations, waitlist)
- [ ] Add "View on Site" button to preview public farm page
- **Status**: NEEDS REVIEW - Check current state of dashboard
- **Impact**: New farmers confused about next steps

## Priority 4: Test Suite Automation
- [ ] Run Playwright tests and document any failures
- [ ] Create e2e tests for critical flows: homepage, explore, farm page, reservation
- [ ] Configure CI to run tests on push/PR
- **Status**: NEEDS VERIFICATION - test-mobile.spec.ts may not run
- **Impact**: No regression detection, manual testing required

## Priority 5: Performance & SEO
- [ ] Implement pagination for products API (return paginated results)
- [ ] Add loading skeletons to Product Details and Farm Profile pages
- [ ] Add database indexes for frequently queried fields (farm slug, product farmId, reservation status)
- [ ] Add proper meta tags for SEO (OpenGraph, Twitter cards)
- **Status**: NOT STARTED
- **Impact**: Poor performance with scale, missing SEO basics

---

## Completed (This Sprint)
- ✅ Checkout page (`/checkout`) created with form
- ✅ Checkout API endpoint (`POST /api/checkout`) - returns farm info
- ✅ Cart drawer wired to checkout page
- ✅ Customer orders tracking page (`/orders`) - email lookup
- ✅ CI/CD workflow (`.github/workflows/test.yml`)
- ✅ Dynamic homepage with featured farms from DB
- ✅ Order status email notifications (via Resend)
- ✅ Quantity selection for reservations
- ✅ TypeScript compiles cleanly
- ✅ Dev server runs correctly
- ✅ Mobile viewport meta tag and touch-friendly buttons

## Completed (Prior Sprints)
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page
- ✅ Explore & Categories pages with filters
- ✅ Farm public profile page
- ✅ Product detail page
- ✅ Dashboard: reservations, orders, waitlist, products
- ✅ Admin reports page
- ✅ Farm Settings connected to DB
- ✅ Cart multi-farm UX
- ✅ Mobile responsive base styling
- ✅ PostgreSQL (Neon) migration from SQLite
- ✅ Image upload API and UI component
- ✅ Order status PATCH endpoint

## Notes from Code Analysis
- `/api/farms/[slug]` GET endpoint returns farm details from DB (phone, email, location)
- Checkout API returns farm info in response - needs to be consumed by page
- Test report shows all pages load, but need to verify Playwright actually runs