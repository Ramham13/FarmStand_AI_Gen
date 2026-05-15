# Sprint Tasks - Friday, May 15th, 2026 - 8:37 PM UTC

## Priority 1: SEO - Critical for Discovery
- [ ] Add `generateMetadata` to farm profile (`/farm/[slug]/page.tsx`) - OG tags with farm name/image
- [ ] Add `generateMetadata` to product page (`/farm/[slug]/product/[productId]/page.tsx`)
- [ ] Add `generateMetadata` to homepage and explore page
- [ ] Create `robots.txt` route handler (`src/app/robots.ts`)
- [ ] Create `sitemap.xml` route handler (`src/app/sitemap.ts`)
- **Status**: Confirmed - no generateMetadata or sitemap/robots files exist

## Priority 2: Database Performance
- [ ] Add compound index on `Reservation(status, createdAt)` in schema.prisma
- [ ] Add index on `Product(availability, isActive)` for public queries
- [ ] Add index on `Farm(status, region)` for filtered searches
- [ ] Add index on `Waitlist(productId, createdAt)` for waitlist ordering
- [ ] Run `npx prisma db push` to apply to PostgreSQL
- **Status**: Confirmed - zero indexes defined on any table

## Priority 3: Pagination UI - Fix Incomplete Feature
- [ ] Add actual "Load More" button to Explore page (currently shows "Showing X of Y" text only)
- [ ] Implement server action or API call to fetch next page
- [ ] Update URL with page param for shareability
- [ ] Add loading state during pagination fetch
- **Status**: API supports pagination, UI has hasMore flag but no button

## Priority 4: Dashboard Data Connection
- [ ] Connect `/dashboard` page to real database queries (currently shows placeholder data)
- [ ] Implement farm stats: product count, reservation count, waitlist count
- [ ] Connect `/dashboard/products` to list actual products
- [ ] Connect `/dashboard/reservations` to show real reservation requests
- [ ] Connect `/dashboard/waitlist` to show real waitlist entries
- **Status**: Dashboard exists but only shows demo/placeholder data

## Priority 5: Performance Optimization
- [ ] Add `priority` prop to above-fold LCP images (hero images, farm covers)
- [ ] Add dynamic imports for heavy components (Explore, Dashboard)
- [ ] Verify all form error handling shows toast on failure
- [ ] Add retry logic for network failures in forms

---

## Completed (Previous Sprints)
- ✅ Mobile viewport, horizontal scroll prevention, 44px touch targets
- ✅ Error boundaries on explore, products, dashboard routes
- ✅ Retry buttons on failed API calls
- ✅ Skeleton loaders on Explore and Products
- ✅ Checkout flow with farm contact info
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

## Codebase Analysis Summary

| Area | Status | Notes |
|------|--------|-------|
| SEO | ❌ Missing | No generateMetadata, sitemap.xml, or robots.txt |
| DB Indexes | ❌ None | All tables have zero indexes |
| Pagination UI | ⚠️ Incomplete | API ready, button missing |
| Dashboard | ⚠️ Placeholder | Shows demo data, not real queries |
| Forms | ✅ Done | Uses sonner, needs error path verification |
| Mobile | ✅ Done | Viewport, touch targets verified |
| Performance | ⚠️ LCP | No priority on LCP images |

---

## Recent Git History (Last 5 Commits)
- a488cfb - Update test report and task tracking
- ea6d6c5 - Explore page search functionality and bug fixes
- 32eb1db - Test results and updates 2026-05-15
- 8224e7a - Update test report and results
- c605e3c - Update test report and results