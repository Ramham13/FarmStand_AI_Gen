# Sprint Tasks - Friday, May 15th, 2026 - 8:07 PM UTC

## Priority 1: Search Wiring (High Visibility)
- [ ] Update Explore page to read `?q=` search param from URL
- [ ] Wire Explore page to use `/api/farms/search` API (currently uses client-side filtering only)
- [ ] Add debounced search input to Explore page (300ms)
- [ ] Add search results count indicator
- **Impact**: Homepage search passes `?q=` but Explore ignores it; dead feature

## Priority 2: SEO & Discovery (Search Engine)
- [ ] Add `generateMetadata` to farm profile (`/farm/[slug]/page.tsx`) - OG tags with farm name/image
- [ ] Add `generateMetadata` to product page
- [ ] Create `robots.txt` route handler
- [ ] Create `sitemap.xml` route handler
- **Impact**: Poor social sharing; search engines can't crawl effectively

## Priority 3: API Pagination (Scalability)
- [ ] Update `/api/farms/search` to accept `page` and `limit` query params
- [ ] Update `/api/farms/[slug]/listings` with pagination
- [ ] Return pagination metadata (total, page, limit, hasMore)
- [ ] Add "Load More" button or pagination to Explore page
- **Impact**: All farms/products loaded at once; performance degrades with scale

## Priority 4: Database Indexes (Production Ready)
- [ ] Add compound index on `Reservation(status, createdAt)` in schema.prisma
- [ ] Add index on `Product(availability, isActive)` for public queries
- [ ] Run `npx prisma db push` to apply to PostgreSQL
- **Impact**: Poor query performance on reservation dashboard and public listings

## Priority 5: Form Error Handling (UX Polish)
- [ ] Add error toast when reservation form submission fails
- [ ] Add error toast when checkout form submission fails
- [ ] Add error toast when waitlist form submission fails
- [ ] Verify errors aren't just console.log'd
- **Impact**: Silent failures leave users confused

---

## Completed (Prior Sprints)
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

## Codebase Notes
- **Search API**: Exists at `/api/farms/search` but Explore page doesn't use it
- **Pagination**: Hardcoded `take: 50`, no offset/limit
- **Search param**: Homepage passes `?q=`, Explore only reads `?category=`
- **DB**: PostgreSQL on Neon, no indexes on Reservation or Product tables