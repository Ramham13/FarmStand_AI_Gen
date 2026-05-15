# Sprint Tasks - 2026-05-15 14:42 UTC

## Priority 1: Connect Profile Page to Real Authenticated User
- [ ] Replace hardcoded `defaultUser` in `/profile/page.tsx` with server-side user data from cookie/auth
- [ ] Connect password change form to `/api/auth/password` endpoint (create if missing)
- [ ] Display actual farm name from user's Farm record
- [ ] Make page work with real authentication (not demo mode)
- **Impact**: Profile page shows demo user "farmer@example.com" instead of real user data

## Priority 2: Connect Waitlist Dashboard to Real Database
- [ ] Replace hardcoded mock `waitlists` array in `/dashboard/waitlist/page.tsx` with Prisma query filtered by farmer's products
- [ ] Add real GET endpoint to `/api/waitlist` that queries Waitlist table join with Products and Farms
- [ ] Add PATCH endpoint to `/api/waitlist` for updating `notifiedAt` timestamp
- [ ] Add "Notify" button functionality that triggers the PATCH endpoint
- **Impact**: Farmers cannot manage actual waitlists - UI is completely mock data

## Priority 3: Complete Waitlist Notification Flow
- [ ] Track `notifiedAt` timestamp in database when "Notify" button clicked
- [ ] Show notification status (notified/not notified) in waitlist UI
- [ ] Prevent duplicate notifications (disable button after notifying)
- [ ] Add notification badge/color in customer row
- **Impact**: No way to actually notify customers on waitlist

## Priority 4: Migrate Products API from Mock to Real Database
- [ ] Replace `getAllFarms()` mock data calls in `/api/products` with Prisma query
- [ ] Ensure Product model includes `imageUrl` field population
- [ ] Connect `/api/products` POST to create new products in database
- **Impact**: Products page uses stale mock data instead of live farm products

## Priority 5: Mobile Dashboard UX Testing
- [ ] Test dashboard pages on mobile viewport (375px width)
- [ ] Ensure tables/cards are scrollable without breaking layout
- [ ] Verify touch targets meet 44px minimum
- [ ] Test navigation between dashboard sections on mobile
- **Impact**: Dashboard may be difficult to use on phones

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
- ✅ Category filtering on explore
- ✅ Farm page search
- ✅ Landing page with featured farms
- ✅ Auth cookie handling in middleware
- ✅ Demo mode for auth APIs to avoid DB errors
- ✅ Mobile viewport CSS (overflow-x-hidden)
- ✅ Touch targets (44px minimum with touch-manipulation class)

## Known Issues / Technical Debt
- Profile page uses hardcoded user data (Priority 1)
- Waitlist uses mock data (Priority 2)
- Waitlist API missing real DB operations (Priority 2, 3)
- Products API uses mock data instead of Prisma (Priority 4)
- Mobile dashboard UX needs real device testing (Priority 5)

## Project Structure
```
src/app/
├── api/auth/        # Auth endpoints
├── api/farms/       # Farm CRUD
├── api/products/    # Product CRUD (still mock data - Priority 4)
├── api/reservations/# Reservation management (done)
├── api/waitlist/    # Waitlist management (needs real DB - Priority 2,3)
├── api/orders/      # Order (reservation) updates (done)
├── dashboard/       # Farmer dashboard (protected)
├── admin/           # Admin dashboard
├── farm/[slug]/     # Public farm pages
├── explore/         # Farm discovery
├── categories/      # Category browsing
├── checkout/        # Checkout flow
├── profile/         # User profile (needs real data - Priority 1)
├── login/register/onboarding  # Auth flows
```

## Key Findings from Codebase Analysis

### Git History (recent commits)
- Focus has been on bug fixes: auth cookie handling, hydration errors, login redirects
- Middleware route protection was recently enabled
- Test reports being updated regularly

### Components Status
- **Profile**: Hardcoded `defaultUser` - not connected to auth (Priority 1)
- **Waitlist Page**: Completely mock data, no API integration (Priority 2)
- **Waitlist API**: Only demo POST, GET returns empty array, no PATCH (Priority 2, 3)
- **Products API**: Uses `getAllFarms()` mock data - not connected to Prisma (Priority 4)

### Data Layer
- Prisma schema is well-designed with proper relations
- Waitlist has `notifiedAt` field ready for Priority 3
- Product has `imageUrl` field - needs verification it works

### Test Status (latest)
- TypeScript: PASS
- Dev Server: PASS
- All core pages load: PASS
- Mobile Viewport: PASS (overflow-x-hidden on body)
- Touch Targets: PASS (buttons have touch-manipulation, min 44px heights)