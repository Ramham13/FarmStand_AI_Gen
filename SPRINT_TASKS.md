# Sprint Tasks - Friday, May 15th, 2026 - 8:02 PM UTC

## Priority 1: Search Functionality (High Visibility)
- [ ] Implement search bar on homepage - wire to `/explore?search=...`
- [ ] Add search to Explore page with debounced input (300ms)
- [ ] Add `/api/farms/search` endpoint accepting `q` query param
- [ ] Show search results on Explore page with highlighting
- **Impact**: Users can't find farms/products by name; search icon is dead UI

## Priority 2: SEO & Discovery (Search Engine)
- [ ] Add `generateMetadata` to home page - dynamic OG tags, Twitter cards
- [ ] Add `generateMetadata` to farm profile (`/farm/[slug]/page.tsx`)
- [ ] Add `generateMetadata` to product page
- [ ] Create `robots.txt` route handler
- [ ] Create `sitemap.xml` route handler
- **Impact**: Poor social sharing; search engines can't crawl effectively

## Priority 3: Form UX & Loading States
- [ ] Add loading spinner to checkout form submit button
- [ ] Add loading state to reservation form submit
- [ ] Add loading state to waitlist form submit
- [ ] Show error toast when form submission fails (not just console.log)
- [ ] Disable submit button while pending to prevent double-submit
- **Impact**: Users can't tell if form is processing; duplicates possible

## Priority 4: API Pagination (Scalability)
- [ ] Update `/api/farms/search` to accept `page` and `limit` query params
- [ ] Update `/api/farms/[slug]/listings` with pagination support
- [ ] Return pagination metadata (total, page, limit, hasMore)
- [ ] Add "Load More" button to Explore page
- **Impact**: All farms/products loaded at once; performance degrades

## Priority 5: Database Indexes & Validation (Production Ready)
- [ ] Add compound index on `Reservation(status, createdAt)` in schema.prisma
- [ ] Add index on `Product(availability, isActive)` for public queries
- [ ] Add URL validation for payment link field in farm settings
- [ ] Run `npx prisma db push` to apply to PostgreSQL
- **Impact**: Poor query performance; broken payment links in production

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

## Codebase Notes
- **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Prisma + PostgreSQL (Neon)
- **Explore API**: Uses hardcoded `take: 50`, no pagination
- **Search**: Homepage has search icon but no functionality wired
- **Auth**: Cookie-based with middleware protection

## Future Considerations (Out of Scope)
- E2E test infrastructure (Playwright)
- Rate limiting on public APIs
- Real email delivery
- Auth session refresh mechanism