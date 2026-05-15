# Sprint Tasks - 2026-05-15 15:32 UTC

## Priority 1: Connect Dashboard Waitlist to Real Database
- [ ] Replace hardcoded mock `waitlists` array in `/dashboard/waitlist/page.tsx` with fetch to `/api/waitlist`
- [ ] Add loading and error states to waitlist page
- [ ] Wire up "Notify" button to call PATCH `/api/waitlist` with `action: "notify"`
- [ ] Display `notifiedAt` status in customer row (badge/color)
- **Impact**: Farmers see their real waitlist data, not just mock customers
- **Why Now**: The API is already built — just needs the UI connected

## Priority 2: Migrate Products API from Mock to Real Database
- [ ] Replace `getAllFarms()` mock calls in `/api/products/route.ts` with Prisma query
- [ ] Ensure Product includes `imageUrl` field from Farm
- [ ] Connect POST to create new products in database
- **Impact**: Products page shows actual farm products, not stale mock data
- **Why Now**: Products page is a core discovery feature — needs real data

## Priority 3: Migrate Explore & Categories Pages from Mock to Real DB
- [ ] Replace `getAllFarms()` import in `/explore/page.tsx` with Prisma query
- [ ] Replace `getFarmsByCategory` in `/categories/page.tsx` with real DB filtering
- [ ] Ensure category buttons filter real farms
- **Impact**: Explore and Categories pages show real farm data
- **Why Now**: Primary entry points for finding farms — critical for customer experience

## Priority 4: Connect Farm Public Page to Real Database
- [ ] Replace hardcoded `mockFarms` object in `/farm/[slug]/page.tsx` with Prisma query
- [ ] Fetch farm by slug and include related products from DB
- [ ] Handle 404 for non-existent farms
- **Impact**: Public farm pages show actual farm details and products
- **Why Now**: Core public-facing page — what customers see when they browse farms

## Priority 5: Cart Multi-Farm Checkout Flow (OR Document Single-Farm Model)
- [ ] Current cart checkout restricts to one farm at a time
- [ ] Either implement multi-farm checkout (create separate reservations per farm), OR
- [ ] Document/implement clearer UX: warn user at add-to-cart if from different farm, or provide "checkout all" that creates multiple orders
- **Impact**: Enables bulk ordering from multiple farms OR clarifies checkout behavior
- **Why Now**: Cart UI exists but serves limited purpose without clear multi-farm handling

---

## Completed (from prior sprints)
- ✅ Middleware route protection enabled (security)
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates (reservations)
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page (per-product)
- ✅ Farm page search
- ✅ Landing page with featured farms
- ✅ Auth cookie handling in middleware
- ✅ Demo mode for auth APIs to avoid DB errors
- ✅ Mobile viewport CSS (overflow-x-hidden)
- ✅ Touch targets (44px minimum)
- ✅ Admin dashboard with real DB stats
- ✅ Dashboard products page uses real Prisma queries
- ✅ Waitlist API (GET/POST/PATCH) fully implemented with Prisma
- ✅ Cart persistence (localStorage) — UI components complete
- ✅ Profile page uses real /api/auth/me endpoint

## Known Issues / Technical Debt
- Waitlist dashboard page still uses mock data (Priority 1)
- Products API still uses mock data (Priority 2)
- Explore/Categories still using mock data (Priority 3)
- Farm public page still using hardcoded `mockFarms` (Priority 4)
- Cart multi-farm checkout UX unclear (Priority 5)

## Codebase Analysis Summary

### Project Structure
```
src/app/
├── api/
│   ├── auth/me         ✅ Returns real user + farm from DB (demo fallback)
│   ├── products/       ⚠️ Still uses mock data (Priority 2)
│   ├── waitlist/       ✅ Full CRUD with Prisma
│   ├── farms/          ✅ Real CRUD
│   ├── orders/         ✅ GET/POST/POST/PATCH (uses Reservation model)
│   └── reservations/   ✅ Full CRUD
├── dashboard/       
│   ├── orders/         ✅ Real DB (reservations)
│   ├── products/       ✅ Real DB
│   ├── reservations/   ✅ Real DB
│   └── waitlist/       ⚠️ Mock data (Priority 1)
├── explore/            ⚠️ Mock data (Priority 3)
├── categories/         ⚠️ Mock data (Priority 3)
├── farm/[slug]/        ⚠️ Mock data (Priority 4)
└── profile/            ✅ Uses /api/auth/me
```

### Data Model
- **Farm** → **Product** → **Reservation** (used as Orders)
- No separate Order model — reservations with status PENDING/CONFIRMED/COMPLETED serve as orders
- **Waitlist** tracks interested customers per product
- Cart persisted to localStorage (client-side only)

### Current Blockers
1. Waitlist dashboard page not fetching from `/api/waitlist`
2. Products API still using `getAllFarms()` mock
3. Explore/Categories still using mock data
4. Farm public page still using hardcoded `mockFarms`
5. Cart multi-farm checkout UX unclear

### What's Changed Since Last Sprint
- Added `/api/auth/me` with real user + farm data from DB (with demo fallback)
- Updated profile page to use real auth endpoint
- Updated waitlist API with comprehensive CRUD operations
- All completed items from previous sprint remain done
- No new features added since last sprint cycle

### Working Components
- Waitlist API: Full Prisma CRUD ✅
- Cart: Persistence + UI ✅
- Auth API: Real DB + demo fallback ✅
- Admin dashboard: Real Prisma queries ✅
- Dashboard products/orders/reservations: Real DB ✅
- Mobile-friendly: Touch targets, viewport, overflow handling ✅

## Test Coverage Status
- TypeScript: ✅ Compiles cleanly
- Dev server: ✅ Responding
- Pages load: ✅ No crashes
- Mobile: ✅ Touch targets, viewport meta, no horizontal scroll
- Playwright: ⚠️ Skipped (missing system library in environment)