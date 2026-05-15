# Sprint Tasks - Friday, May 15th, 2026 - 7:52 PM UTC

## Priority 1: SEO & Discovery (High Visibility)
- [ ] Add `generateMetadata` to home page (`/page.tsx`) - dynamic OG tags, Twitter cards
- [ ] Add `generateMetadata` to farm profile (`/farm/[slug]/page.tsx`) - farm name in title/description
- [ ] Add `generateMetadata` to product page (`/farm/[slug]/product/[productId]/page.tsx`)
- [ ] Create `robots.txt` route handler at `/app/robots.ts`
- [ ] Create `sitemap.xml` route handler at `/app/sitemap.ts`
- **Impact**: Missing SEO basics; poor social sharing; search engines can't crawl effectively

## Priority 2: API Pagination (Scalability)
- [ ] Update `/api/farms/search` to accept `page` and `limit` query params
- [ ] Update `/api/farms/[slug]/listings` with pagination support
- [ ] Return pagination metadata (total, page, limit, hasMore) in API responses
- [ ] Add "Load More" button to Explore page with pagination state
- **Impact**: All farms/products loaded at once; performance degrades with growth

## Priority 3: Database Indexes (Performance)
- [ ] Add compound index on `Reservation(status, createdAt)` in schema.prisma
- [ ] Add index on `Product(availability, isActive)` for public queries
- [ ] Add index on `Waitlist(productId, createdAt)` for waitlist ordering
- [ ] Run `npx prisma db push` to apply to Neon PostgreSQL
- **Impact**: Poor query performance at scale; full table scans on common queries

## Priority 4: Form UX & Loading States (User Experience)
- [ ] Add loading spinner to checkout form submit button
- [ ] Add loading state to reservation form submit
- [ ] Add loading state to waitlist form submit
- [ ] Show error toast when form submission fails (not just console.log)
- [ ] Disable submit button while pending to prevent double-submit
- **Impact**: Users can't tell if form is processing; double-submits cause duplicate reservations

## Priority 5: E2E Test Infrastructure (CI/CD Essential)
- [ ] Install Playwright: `npx playwright install chromium`
- [ ] Create `e2e/basic.spec.ts` - homepage load, explore, farm profile, checkout flow
- [ ] Add `test:e2e` script to package.json
- [ ] Add e2e step to `.github/workflows/test.yml`
- **Impact**: No automated regression detection; every deploy needs manual testing

---

## Completed (This Sprint)
- ✅ Error boundaries on explore, products, dashboard/reservations routes
- ✅ Retry buttons on failed API calls (Explore, Products)
- ✅ Skeleton loaders on Explore and Products pages
- ✅ Checkout page displays farm contact info (email, phone, location)
- ✅ Checkout confirmation page shows farm contact details
- ✅ TypeScript compiles cleanly
- ✅ Dev server runs correctly
- ✅ Mobile viewport meta tag, horizontal scroll prevention, touch targets (44px)
- ✅ Waitlist dashboard page exists with notify UI
- ✅ Farm slug unique constraint in Prisma
- ✅ Cart persists to localStorage

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

## Codebase Notes
- **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Prisma + PostgreSQL (Neon)
- **Explore API**: Uses hardcoded `take: 50`, no pagination
- **Schema**: No custom indexes defined; relies on Prisma defaults
- **Auth**: Cookie-based (`auth-user-id`); no refresh mechanism visible
- **Scripts**: Only dev/build/start/lint - no test scripts

## What's Working Well
- Clean component architecture with shadcn/ui
- Cart persistence via localStorage works
- Error boundaries in place for major routes
- Mobile optimizations in place (viewport, scroll, touch targets)
- All tests passing (TypeScript, pages, mobile)

## Future Considerations (Out of Scope for Now)
- Rate limiting on public APIs
- Auth session refresh mechanism
- Real email delivery (currently placeholder)
- Payment link URL validation
- Search debouncing on Explore page