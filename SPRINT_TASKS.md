# Sprint Tasks - Friday, May 15th, 2026 - 7:12 PM UTC

## Priority 1: Error Handling & Loading States
- [ ] Add error boundaries (`error.tsx`) to prevent full-page crashes on key routes (explore, products, checkout, dashboard)
- [ ] Add retry buttons on failed API calls (Explore, Products, Reservations)
- [ ] Replace "Loading..." text with skeleton loaders on Explore and Products pages
- [ ] Add toast notifications for server action errors
- **Status**: NOT STARTED - Basic Suspense only
- **Impact**: Poor UX when APIs fail or load slowly; full page crashes instead of graceful degradation

## Priority 2: Dashboard UX Improvements
- [ ] Add helpful empty state CTAs:
  - No products → "Add your first product" button
  - No reservations → explanation text + link to products
  - No waitlist → explanation text
- [ ] Add quick stats cards on dashboard overview (total products, reservations, waitlist count)
- [ ] Add "View on Site" button to preview public farm page from dashboard
- **Status**: NEEDS VERIFICATION
- **Impact**: New farmers confused about next steps after onboarding

## Priority 3: Test Suite Automation
- [ ] Fix Playwright environment issues (missing libnspr4.so dependencies)
- [ ] Verify e2e tests actually run: `npx playwright test`
- [ ] Add CI step to run tests on push/PR (`.github/workflows/test.yml`)
- [ ] Add basic e2e tests for critical flows: homepage load, explore, farm page, reservation submit
- **Status**: TESTS EXIST BUT DON'T RUN - test-mobile.spec.ts present but environment missing deps
- **Impact**: No regression detection; manual testing required for every deploy

## Priority 4: Performance & Database
- [ ] Add database indexes for frequently queried fields:
  - `farm(slug)` - unique index for lookups
  - `product(farmId)` - for fetching products by farm
  - `reservation(status, createdAt)` - for dashboard queries
- [ ] Implement pagination for products API (return paginated results with limit/offset)
- [ ] Add loading skeletons to Product Details and Farm Profile pages
- **Status**: NOT STARTED - No indexes defined, no pagination
- **Impact**: Poor query performance at scale; all products loaded at once

## Priority 5: SEO & Meta Tags
- [ ] Add proper meta tags for all public pages:
  - Home page: OpenGraph tags, Twitter cards
  - Farm page: Dynamic og:title, og:description, og:image
  - Product page: Product-specific meta tags
- [ ] Add `robots.txt` and `sitemap.xml` generation
- **Status**: NOT STARTED
- **Impact**: Missing SEO basics; poor social sharing previews

---

## Completed (This Sprint)
- ✅ Checkout page displays farm contact info (email, phone, location)
- ✅ Checkout confirmation page shows farm contact details
- ✅ Cart drawer wired to checkout page
- ✅ Customer orders tracking page (`/orders`)
- ✅ TypeScript compiles cleanly
- ✅ Dev server runs correctly
- ✅ Mobile viewport meta tag and touch-friendly buttons

## Completed (Prior Sprints)
- ✅ Registration/onboarding flow
- ✅ Checkout flow (page + API)
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
- ✅ CI/CD workflow (`.github/workflows/test.yml`)
- ✅ Dynamic homepage with featured farms from DB
- ✅ Order status email notifications
- ✅ Quantity selection for reservations

## Notes from Code Analysis
- Checkout page (`/checkout/page.tsx`) fetches farm info via `/api/farms/[slug]` and displays email/phone/address - **COMPLETE**
- Confirmation page (`/checkout/confirmation/page.tsx`) also fetches and displays farm contact - **COMPLETE**
- No error boundaries exist - all routes use basic Suspense only
- No database indexes in `prisma/schema.prisma`
- Test file exists but Playwright fails due to missing system dependencies
- No pagination on any API endpoint
- No meta tags for SEO