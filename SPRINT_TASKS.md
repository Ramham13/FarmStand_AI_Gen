# Sprint Tasks - Friday, May 15th, 2026 - 7:27 PM UTC

## Priority 1: SEO & Meta Tags (High Visibility)
- [ ] Add generateMetadata to home page (`/page.tsx`) - OpenGraph, Twitter cards
- [ ] Add generateMetadata to farm profile (`/farm/[slug]/page.tsx`) - dynamic OG tags
- [ ] Add generateMetadata to product page (`/farm/[slug]/product/[productId]/page.tsx`)
- [ ] Add generateMetadata to explore page (`/explore/page.tsx`)
- [ ] Create `robots.txt` and `sitemap.xml` route handlers
- **Impact**: Missing SEO basics; poor social sharing previews; search engines can't crawl effectively

## Priority 2: API Pagination (Scalability)
- [ ] Implement pagination in `/api/farms/search` with cursor or offset-based pagination
- [ ] Implement pagination in `/api/farms/[slug]/listings`
- [ ] Add page info to API responses (total count, hasNext, hasPrev)
- [ ] Add pagination UI to Explore page (Load More button or infinite scroll)
- **Impact**: All products loaded at once; performance degrades with large datasets

## Priority 3: Database Indexes (Performance)
- [ ] Add compound index on `Reservation(status, createdAt)` for dashboard queries
- [ ] Add index on `Product(availability, isActive)` for public product queries
- [ ] Add index on `Waitlist(productId, createdAt)` for waitlist ordering
- [ ] Run `npx prisma db push` to apply indexes
- **Impact**: Poor query performance at scale; full table scans on common queries

## Priority 4: E2E Test Environment (CI/CD Essential)
- [ ] Fix Playwright system dependencies or switch to alternative testing (Vitest for unit)
- [ ] Verify e2e tests actually run: `npx playwright test`
- [ ] Add basic e2e tests for critical flows: homepage, explore, farm page, reservation submit
- [ ] Add CI step to run tests on push/PR
- **Impact**: No regression detection; manual testing required for every deploy

## Priority 5: Waitlist Management (Dashboard)
- [ ] Add ability to notify next person on waitlist when product becomes available
- [ ] Show waitlist count on product cards in dashboard
- [ ] Add "Notify All" option for farmers
- **Status**: Page exists at `/dashboard/waitlist`, needs notification functionality
- **Impact**: Farmers can't notify customers when items available

---

## Completed (This Sprint)
- ✅ Error boundaries on explore, products, dashboard/reservations routes
- ✅ Retry buttons on failed API calls (Explore, Products)
- ✅ Skeleton loaders on Explore and Products pages
- ✅ Checkout page displays farm contact info (email, phone, location)
- ✅ Checkout confirmation page shows farm contact details
- ✅ TypeScript compiles cleanly
- ✅ Dev server runs correctly
- ✅ Mobile viewport meta tag
- ✅ Horizontal scroll prevention (overflow-x-hidden)
- ✅ Touch targets (min-h-[44px])
- ✅ Waitlist dashboard page exists (`/dashboard/waitlist`)
- ✅ Farm(slug) unique constraint in Prisma

## Completed (Prior Sprints)
- ✅ Registration/onboarding flow
- ✅ Checkout flow (page + API)
- ✅ Explore & Categories pages with filters
- ✅ Farm public profile page
- ✅ Product detail page
- ✅ Dashboard: reservations, orders, products, waitlist
- ✅ Admin reports page
- ✅ Farm Settings connected to DB
- ✅ Cart multi-farm UX
- ✅ PostgreSQL (Neon) migration from SQLite
- ✅ Image upload API and UI component
- ✅ Order status PATCH endpoint
- ✅ CI/CD workflow (`.github/workflows/test.yml`)
- ✅ Dynamic homepage with featured farms from DB
- ✅ Order status email notifications (placeholder)
- ✅ Quantity selection for reservations
- ✅ Customer orders tracking page (`/orders`)
- ✅ Body overflow-x-hidden for mobile

## Critical Gaps
1. **SEO** - No social sharing, no search engine indexing help (no metadata, robots.txt, sitemap)
2. **Pagination** - Will break with large dataset
3. **Tests** - No automated regression detection
4. **Waitlist notifications** - Farmers can't notify customers when items available