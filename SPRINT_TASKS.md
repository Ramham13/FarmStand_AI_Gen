# Sprint Tasks - 2026-05-15 11:29 UTC

## Priority 1: Build Failure - ESLint Error (BLOCKER)
- [ ] Fix ESLint error in `/src/app/dashboard/page.tsx` line 11
- `let userId` is never reassigned - should be `const`
- **Impact**: Build fails, can't deploy

## Priority 2: Login API - Missing Prisma Relation
- [ ] Fix `/src/app/api/auth/login/route.ts` - attempts `include: { farm: true }` but User model has NO farm relation
- User model in Prisma schema lacks `farms` relation (Farm has `userId`, but User doesn't have relation back)
- Either: Add `farms Farm[]` relation to User model + migration, OR query farm separately by userId
- **Impact**: Login returns farm as null always, breaks farmer dashboard

## Priority 3: Dashboard Security - Data Leakage (CRITICAL)
- [ ] Fix `/src/app/dashboard/page.tsx` - `findFirst()` returns RANDOM farm to ANY visitor
- No user filtering - any visitor sees whoever is in DB first
- Must filter by logged-in user's ID (localStorage is client-only, RSC doesn't have access)
- **Impact**: Any visitor can view all farmer data

## Priority 4: Checkout Confirmation - Order ID Broken
- [ ] Fix `/src/app/checkout/confirmation/page.tsx` - async IIFE doesn't block RSC render
- The `(async () => { ... })()` pattern resolves AFTER component renders
- `orderId` is always "unknown" - confirmation shows no order details
- Need proper `await searchParams` pattern (already typed as Promise) and wire checkout-form to pass orderId
- **Impact**: Customers can't see order details after checkout

## Priority 5: Route Protection Middleware
- [ ] Create `src/middleware.ts` for Next.js route protection
- Protect `/dashboard/*` and `/admin/*` routes
- Redirect unauthenticated users to `/login`
- Keep public: `/`, `/explore`, `/categories`, `/farm/*`, `/login`, `/register`
- **Impact**: Unprotected routes expose farmer data

---

## Completed (from prior sprints)
- ✅ Prisma schema + migrations
- ✅ Cart functionality (drawer, add-to-cart button)
- ✅ Category filtering on Explore/Categories pages
- ✅ Search API with Prisma queries
- ✅ Reservations API (POST/GET)
- ✅ Waitlist form API
- ✅ Farmer dashboard UI structure
- ✅ Mobile CSS responsive breakpoints
- ✅ Farm pages wired to database
- ✅ Checkout UI components
- ✅ Register page exists
- ✅ Login page exists
- ✅ Admin pages structure
- ✅ Platform disclaimers

## Known Gaps (Backlog)
- No global products API (only farm-specific via /api/farms/[slug]/listings)
- Admin pages exist but untested (/admin/farms, /admin/reports)
- No email notifications
- No user profile management
- No search UI on individual farm pages
- Onboarding flow verification needed
- Client-only auth (localStorage) - no HTTP-only cookies
- No admin authentication check
- Order management flow not fully implemented (no Order model, just Reservations)