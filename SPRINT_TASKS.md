# Sprint Tasks - Friday, May 15th, 2026 - 7:17 PM UTC

## Priority 1: Database Performance (Indexes)
- [ ] Add unique index on `Farm(slug)` for fast lookups
- [ ] Add index on `Product(farmId)` for fetching products by farm
- [ ] Add compound index on `Reservation(status, createdAt)` for dashboard queries
- [ ] Add index on `Product(availability, isActive)` for public product queries
- [ ] Add index on `Waitlist(productId, createdAt)` for waitlist ordering
- **Status**: NOT STARTED - No indexes in prisma/schema.prisma
- **Impact**: Poor query performance at scale; full table scans on common queries

## Priority 2: SEO & Meta Tags
- [ ] Add generateMetadata to home page (`/page.tsx`) - OpenGraph, Twitter cards
- [ ] Add generateMetadata to farm profile (`/farm/[slug]/page.tsx`) - dynamic OG tags
- [ ] Add generateMetadata to product page (`/farm/[slug]/product/[productId]/page.tsx`)
- [ ] Add generateMetadata to explore page (`/explore/page.tsx`)
- [ ] Create `robots.txt` and `sitemap.xml` route handlers
- **Status**: NOT STARTED - No generateMetadata functions found
- **Impact**: Missing SEO basics; poor social sharing previews; search engines can't crawl effectively

## Priority 3: API Pagination
- [ ] Implement pagination in `/api/farms/search` (limit/offset or cursor)
- [ ] Implement pagination in `/api/farms/[slug]/listings`
- [ ] Add page info to API responses (total count, hasNext, hasPrev)
- [ ] Add pagination UI to Explore page (next/prev buttons or infinite scroll)
- **Status**: NOT STARTED - All endpoints return full results
- **Impact**: All products loaded at once; performance degrades with large datasets

## Priority 4: Test Environment Fix
- [ ] Fix Playwright system dependencies (libnspr4.so) or switch to alternative testing
- [ ] Verify e2e tests actually run: `npx playwright test`
- [ ] Add basic e2e tests for critical flows: homepage, explore, farm page, reservation submit
- [ ] Add CI step to run tests on push/PR
- **Status**: TEST FILE EXISTS BUT DOESN'T RUN - test-mobile.spec.ts present but missing deps
- **Impact**: No regression detection; manual testing required for every deploy

## Priority 5: Mobile Polish (If Time)
- [ ] Verify all touch targets meet 44px minimum
- [ ] Add responsive hamburger menu for mobile nav
- [ ] Test checkout flow on mobile viewport
- [ ] Add skeleton loaders to more pages (Farm Profile, Product Details)
- **Status**: PARTIAL - Some touch targets added (12 instances of min-h-[44px]), mobile meta tag present
- **Impact**: Some mobile UX issues may remain undetected

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
- ✅ PostgreSQL (Neon) migration from SQLite
- ✅ Image upload API and UI component
- ✅ Order status PATCH endpoint
- ✅ CI/CD workflow (`.github/workflows/test.yml`)
- ✅ Dynamic homepage with featured farms from DB
- ✅ Order status email notifications
- ✅ Quantity selection for reservations
- ✅ Customer orders tracking page (`/orders`)
- ✅ Touch-friendly buttons (min-h-[44px])
- ✅ Body overflow-x-hidden for mobile

## Notes from Code Analysis
- No database indexes in `prisma/schema.prisma` - all queries are table scans
- No `generateMetadata` anywhere in `src/app` - 0 SEO functions
- No pagination on any API endpoint - returns all results
- Test file `test-mobile.spec.ts` exists but Playwright missing system dependencies
- Error boundaries added in commit 826c0e5 to explore, products, reservations
- Skeleton loaders implemented via `src/components/ui/skeleton.tsx`