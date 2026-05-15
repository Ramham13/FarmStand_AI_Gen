# Sprint Tasks - Friday, May 15th, 2026 - 9:02 PM UTC

## Priority 1: SEO - Critical for Discovery
- [ ] Add `generateMetadata` to farm profile (`/farm/[slug]/page.tsx`) - OG tags with farm name/image
- [ ] Add `generateMetadata` to product page (`/farm/[slug]/product/[productId]/page.tsx`)
- [ ] Add `generateMetadata` to homepage and explore page
- [ ] Create `robots.txt` route handler (`src/app/robots.ts`)
- [ ] Create `sitemap.xml` route handler (`src/app/sitemap.ts`)

## Priority 2: Pagination UI - Incomplete Feature
- [ ] Add actual "Load More" button to Explore page (currently shows "Showing X of Y" text only)
- [ ] Implement server action or API call to fetch next page
- [ ] Update URL with page param for shareability
- [ ] Add loading state during pagination fetch

## Priority 3: Dashboard Data Connection
- [ ] Connect `/dashboard` page to real database queries (currently shows placeholder data)
- [ ] Implement farm stats: product count, reservation count, waitlist count
- [ ] Connect `/dashboard/products` to list actual products
- [ ] Connect `/dashboard/reservations` to show real reservation requests
- [ ] Connect `/dashboard/waitlist` to show real waitlist entries

## Priority 4: Database Performance
- [ ] Add compound index on `Reservation(status, createdAt)` in schema.prisma
- [ ] Add index on `Product(availability, isActive)` for public queries
- [ ] Add index on `Farm(status, region)` for filtered searches
- [ ] Add index on `Waitlist(productId, createdAt)` for waitlist ordering
- [ ] Run `npx prisma db push` to apply to PostgreSQL

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

## Recent Git History (Last 5 Commits)
- d63a4d1 - Update sprint tasks and test report
- afb7b81 - Update sprint tasks and test report
- 202bc86 - Update test report - all tests passing
- 57ea155 - Complete daily test run and update task tracking
- a488cfb - Update test report and task tracking

## Key Files Analyzed
- `src/app/` - 15 route directories including explore, dashboard, farm, checkout, orders
- `src/components/` - ui, cart, farm, layout, admin components
- `prisma/schema.prisma` - Models defined but no indexes
- API routes: farms/search, products, reservations, waitlist, orders, checkout, upload
