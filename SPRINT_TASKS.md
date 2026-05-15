# Sprint Tasks - 2026-05-15 13:42 UTC

## Priority 1: Re-enable Route Protection Middleware (CRITICAL - Security)
- [ ] Rename `src/middleware.ts.disabled` → `src/middleware.ts` to re-enable auth protection
- [ ] Verify middleware compiles without errors
- [ ] Test: unauthenticated users accessing /dashboard should redirect to /login
- [ ] Confirm public routes (/, /explore, /login, /register, /onboarding) still accessible
- **Impact**: Security vulnerability - dashboard/admin routes currently open to anyone

## Priority 2: Connect Profile Page to Real Authenticated User
- [ ] Replace hardcoded `defaultUser` in `/profile/page.tsx` with server-side user data from cookie
- [ ] Connect password change form to `/api/auth/password` endpoint
- [ ] Display actual farm name from user's Farm record
- **Impact**: Profile page shows demo user "farmer@example.com" instead of real user data

## Priority 3: Connect Dashboard Waitlist to Real Database Data
- [ ] Replace hardcoded mock `waitlists` array with Prisma query filtered by farmer
- [ ] Add "Notify" button to trigger `/api/waitlist` PATCH for `notifiedAt` timestamp
- [ ] Display real customer emails and join dates from database
- **Impact**: Farmers cannot manage actual waitlists - UI is completely mock data

## Priority 4: Verify/Complete Product Image Handling
- [ ] Add image URL input field to product form (if missing)
- [ ] Verify new products save imageUrl to database via `/api/products` POST
- [ ] Test editing existing products via `/dashboard/products/[id]/edit`
- [ ] Verify created products display images on public farm page
- **Impact**: Product images may not persist or display correctly

## Priority 5: Add "No Payments" Disclaimer to Key Pages
- [ ] Add platform disclaimer ("Transactions are directly with the farmer") to farm profile page
- [ ] Add to checkout flow (if missing)
- [ ] Verify on landing page
- **Impact**: Per SPEC.md - platform must disclaim native payments

---

## Completed (from prior sprints)
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Mobile responsive classes and touch-friendly styling
- ✅ Checkout confirmation page
- ✅ Category filtering on explore
- ✅ Farm page search
- ✅ Landing page with featured farms

## Known Issues / Technical Debt
- Middleware disabled - security risk (Priority 1 - still open)
- Profile page uses hardcoded user data
- Waitlist uses mock data
- Product images need verification
- Missing payment disclaimers (Priority 5)

## Project Structure Summary
```
src/app/
├── api/auth/        # Auth endpoints
├── api/farms/       # Farm CRUD
├── api/products/    # Product CRUD
├── api/reservations/# Reservation management
├── api/waitlist/    # Waitlist management
├── api/orders/      # Order (reservation) updates
├── dashboard/      # Farmer dashboard (protected)
├── admin/          # Admin dashboard
├── farm/[slug]/    # Public farm pages
├── explore/        # Farm discovery
├── categories/     # Category browsing
├── checkout/      # Checkout flow
├── profile/       # User profile (needs real data)
├── login/register/onboarding  # Auth flows
```