# Sprint Tasks - 2026-05-15 08:09 UTC

## Priority 1: Checkout Flow (Critical - Customer Can't Buy)
- [ ] **Add checkout param handling**: Farm page (`/farm/[slug]`) must check for `?checkout=true` param and render checkout form when present
- [ ] **Build checkout form UI**: Customer info (name, email, phone), message field, order summary showing selected product, submit to `POST /api/reservations`
- [ ] **Wire reservations to DB**: Replace demo mode in `src/app/api/reservations/route.ts` with actual Prisma create operation
- [ ] **Add confirmation page**: After successful POST, redirect to `/checkout/confirmation` with order details

## Priority 2: Onboarding API (Blocking Farm Creation)
- [ ] **Create POST /api/onboarding**: API route to handle form submission from `/onboarding` page
- [ ] **Implement user creation**: Hash password, create User record, create Farm with slug from farm name
- [ ] **Handle slug uniqueness**: Check if slug exists, return 409 error if taken
- [ ] **Add initial products**: Handle optional initial product data in onboarding
- [ ] **Post-create redirect**: Send user to `/dashboard` after successful farm creation

## Priority 3: Real Search & Farm Data (Data Integrity)
- [ ] **Replace mock data on public farm pages**: Update `/farm/[slug]/page.tsx` to fetch real farm data from Prisma instead of hardcoded mockFarms object
- [ ] **Fix search API**: Ensure `/api/farms/search` returns proper DB results with Prisma query
- [ ] **Replace mock search on homepage**: Update homepage search to call `/api/farms/search?q=...` instead of filtering in-page mock array
- [ ] **Add categories API**: Create `/api/categories` endpoint for category filtering

## Priority 4: Customer Order Tracking (Missing Feature)
- [ ] **Create /orders page**: Customer-facing page to view their reservation history (query by email)
- [ ] **Add order lookup**: Simple form to check order status by order ID + email
- [ ] **Dashboard reservations view**: Verify farmer can see incoming reservations with full details

## Priority 5: Real Auth (Technical Debt)
- [ ] **Real auth API**: Replace demo mode in `/api/auth/login` and `/api/auth/register` with actual password hashing and DB lookups
- [ ] **Session persistence**: Implement proper session cookies or JWT for login state
- [ ] **Protect dashboard routes**: Add middleware to protect `/dashboard/*` routes with session check

---

## Completed (Recent)
- ✅ Mobile CSS fixes (touch targets, responsive breakpoints)
- ✅ Category filtering (Explore/Categories pages)
- ✅ All pages load (200 OK verification)
- ✅ Cart drawer functionality
- ✅ Farmer dashboard with products, reservations, waitlist views
- ✅ Reservation/Waitlist forms (farmer side)
- ✅ TypeScript compiles cleanly
- ✅ Prisma DB integration on dashboard

## Known Gaps
- No global products API (only farm-specific)
- No categories API endpoint
- Admin pages exist but untested
- Dashboard `findFirst()` gets ANY farm, not the logged-in user's farm
- No product availability toggle in dashboard UI
- Public farm pages use mock data, not real DB
- Onboarding form has no backend (no /api/onboarding route)

## Not in Scope
- Native payment processing
- Email notifications
- Farm verification workflow
- Analytics dashboard