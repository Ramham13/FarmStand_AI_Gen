# Sprint Tasks - 2026-05-15 15:12 UTC

## Priority 1: Connect Waitlist Dashboard to Real DB
- [ ] Replace hardcoded mock `waitlists` array in `/dashboard/waitlist/page.tsx` with fetch to `/api/waitlist`
- [ ] Add loading and error states to waitlist page
- [ ] Wire up "Notify" button to call PATCH `/api/waitlist` with `action: "notify"`
- [ ] Display `notifiedAt` status in customer row (badge/color)
- **Impact**: Farmers see their real waitlist data, not just mock customers

## Priority 2: Migrate Products API from Mock to Real Database
- [ ] Replace `getAllFarms()` mock calls in `/api/products/route.ts` with Prisma query
- [ ] Ensure Product includes `imageUrl` field from Farm
- [ ] Connect POST to create new products in database
- **Impact**: Products page shows actual farm products, not stale mock data

## Priority 3: Migrate Explore & Categories Pages from Mock to Real
- [ ] Replace `getAllFarms()` import in `/explore/page.tsx` with Prisma query
- [ ] Replace `getFarmsByCategory` in `/categories/page.tsx` with real DB filtering
- [ ] Ensure category buttons filter real farms
- **Impact**: Explore and Categories pages show real farm data

## Priority 4: Connect Farm Public Page to Real Database
- [ ] Replace hardcoded `mockFarms` object in `/farm/[slug]/page.tsx` with Prisma query
- [ ] Fetch farm by slug and include related products from DB
- [ ] Handle 404 for non-existent farms
- **Impact**: Public farm pages show actual farm details

## Priority 5: Profile Page Demo Mode Enhancement
- [ ] The `/api/auth/me` returns hardcoded "demo@farm.com" for demo users
- [ ] Consider using actual demo farm from DB instead of hardcoded values
- [ ] Ensure profile page loads without errors for demo users
- **Impact**: Profile shows consistent demo data across the app

---

## Completed (from prior sprints)
- ✅ Middleware route protection enabled (security)
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page
- ✅ Farm page search
- ✅ Landing page with featured farms
- ✅ Auth cookie handling in middleware
- ✅ Demo mode for auth APIs to avoid DB errors
- ✅ Mobile viewport CSS (overflow-x-hidden)
- ✅ Touch targets (44px minimum)
- ✅ Admin dashboard with real DB stats
- ✅ Dashboard products page uses real Prisma queries
- ✅ Waitlist API (GET/POST/PATCH) fully implemented with Prisma

## Known Issues / Technical Debt
- Waitlist dashboard page still uses mock data (Priority 1 - *this sprint*)
- Products API uses mock data (Priority 2)
- Explore/Categories pages use mock data (Priority 3)
- Farm public page uses mock data (Priority 4)
- Profile demo mode returns hardcoded values (Priority 5)

## Codebase Analysis Summary

### Project Structure
```
src/app/
├── api/auth/me     # ✅ Returns real user + farm from DB (demo fallback)
├── api/products/   # ⚠️ Still uses mock data (Priority 2)
├── api/waitlist/   # ✅ Full CRUD with Prisma (Priority 1 - page needs connecting)
├── api/farms/      # ✅ Real CRUD
├── dashboard/      
│   ├── orders/     # ✅ Real DB
│   ├── products/   # ✅ Real DB
│   ├── reservations/# ✅ Real DB
│   └── waitlist/  # ⚠️ Mock data (Priority 1 - needs API connection)
├── explore/        # ⚠️ Mock data (Priority 3)
├── categories/     # ⚠️ Mock data (Priority 3)
├── farm/[slug]/    # ⚠️ Mock data (Priority 4)
└── profile/        # ✅ Uses /api/auth/me (demo fallback in API)
```

### What's Changed Since Last Sprint
- **Waitlist API** (`/api/waitlist/route.ts`): Now has full GET/POST/PATCH with real Prisma queries!
- **Profile API** (`/api/auth/me`): Returns real user + farm from DB
- **Tests passing**: All pages load, TypeScript clean, mobile-friendly

### Current Blockers
1. Waitlist dashboard page not fetching from `/api/waitlist`
2. Products API still using `getAllFarms()` mock
3. Explore/Categories still using mock data
4. Farm public page still using hardcoded `mockFarms`

### Working Components
- Waitlist API: Full Prisma CRUD ✅
- Auth API: Real DB + demo fallback ✅
- Admin dashboard: Real Prisma queries ✅
- Dashboard products/orders/reservations: Real DB ✅
- Mobile-friendly: Touch targets, viewport, overflow handling ✅