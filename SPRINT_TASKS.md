# Sprint Tasks - Friday, May 15th, 2026 - 8:27 PM UTC

## Priority 1: SEO & Metadata (High Visibility)
- [ ] Add `generateMetadata` to farm profile (`/farm/[slug]/page.tsx`) - OG tags with farm name/image
- [ ] Add `generateMetadata` to product page (`/farm/[slug]/product/[productId]/page.tsx`)
- [ ] Create `robots.txt` route handler (`src/app/robots.ts`)
- [ ] Create `sitemap.xml` route handler (`src/app/sitemap.ts`)
- **Impact**: Poor social sharing; search engines can't crawl effectively
- **Status**: No generateMetadata found in codebase

## Priority 2: Database Indexes (Production Ready)
- [ ] Add compound index on `Reservation(status, createdAt)` in schema.prisma
- [ ] Add index on `Product(availability, isActive)` for public queries
- [ ] Add index on `Farm(status, region)` for filtered searches
- [ ] Run `npx prisma db push` to apply to PostgreSQL
- **Impact**: Poor query performance on reservation dashboard and public listings
- **Current**: No indexes defined on Reservation, Product, or Farm tables

## Priority 3: Search & Pagination UX (Polish)
- [ ] Add "Load More" button or pagination controls to Explore page
- [ ] Add debounced search input to Explore page (300ms delay)
- [ ] Verify search input properly updates URL `?q=` param
- **Impact**: Users can't paginate through results; search feels laggy
- **Status**: API has pagination, but UI doesn't expose it

## Priority 4: Form Error Handling (UX Polish)
- [ ] Verify reservation form shows toast on failure (check `reservation-form.tsx`)
- [ ] Verify checkout form shows toast on failure (check `checkout-form.tsx`)
- [ ] Verify waitlist form shows toast on failure (check `waitlist-form.tsx`)
- [ ] Add retry logic for network failures
- **Impact**: Silent failures leave users confused
- **Status**: Forms use sonner, need to verify error handling paths

## Priority 5: Mobile & Performance (Polish)
- [ ] Add `priority` prop to above-fold images (LCP optimization)
- [ ] Add dynamic import for heavy components (Explore, Dashboard)
- [ ] Verify 44px touch targets on all interactive elements
- **Impact**: Slow mobile load times, potential tap issues
- **Status**: Previous sprint verified touch targets, need LCP tuning

---

## Completed (Prior Sizzes)
- ✅ Error boundaries on explore, products, dashboard routes
- ✅ Retry buttons on failed API calls
- ✅ Skeleton loaders on Explore and Products
- ✅ Checkout flow with farm contact info
- ✅ Mobile viewport, horizontal scroll prevention, 44px touch targets
- ✅ Waitlist dashboard with notify UI
- ✅ Cart localStorage persistence
- ✅ Registration/onboarding flow
- ✅ Explore & Categories with filters
- ✅ Farm profile & product detail pages
- ✅ Admin reports page
- ✅ Image upload API
- ✅ CI/CD workflow
- ✅ PostgreSQL (Neon) migration
- ✅ Form loading states and disabled buttons
- ✅ Search API wired to Explore page (query param works!)
- ✅ Pagination in `/api/farms/search` (page, limit, offset, hasMore)

## Codebase Notes
- **Search API**: `/api/farms/search` has full pagination support
- **Explore page**: Already reads `?q=` and `?category=` params, uses search API
- **Pagination UI**: Missing "Load More" button in ExploreClient
- **DB**: PostgreSQL on Neon, no indexes on Reservation, Product, or Farm tables
- **SEO**: No generateMetadata, no sitemap.xml, no robots.txt
- **Forms**: Use sonner toast component, need error path verification