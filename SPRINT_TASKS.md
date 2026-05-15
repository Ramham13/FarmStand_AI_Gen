# Sprint Tasks - 2026-05-15 14:07 UTC

## Priority 1: Connect Profile Page to Real Authenticated User
- [ ] Replace hardcoded `defaultUser` in `/profile/page.tsx` with server-side user data from cookie/auth
- [ ] Connect password change form to `/api/auth/password` endpoint
- [ ] Display actual farm name from user's Farm record
- [ ] Make page work with real authentication (not demo mode)
- **Impact**: Profile page shows demo user "farmer@example.com" instead of real user data

## Priority 2: Connect Dashboard Waitlist to Real Database Data
- [ ] Replace hardcoded mock `waitlists` array in `/dashboard/waitlist/page.tsx` with Prisma query filtered by farmer
- [ ] Add `/api/waitlist` PATCH endpoint for `notifiedAt` timestamp (currently only GET/POST exist)
- [ ] Add "Notify" button to UI that triggers the PATCH endpoint
- [ ] Display real customer emails and join dates from database
- **Impact**: Farmers cannot manage actual waitlists - UI is completely mock data

## Priority 3: Add Waitlist API PATCH Endpoint for Notifications
- [ ] Implement PATCH handler in `/api/waitlist/route.ts` to set `notifiedAt` timestamp
- [ ] Add GET handler to fetch waitlist entries by productId (filtered by farmer's products)
- [ ] Convert from demo mode to real database operations
- **Impact**: No way to mark customers as notified on waitlist

## Priority 4: Verify/Complete Product Image Handling
- [ ] Add image URL input field to product form (if missing)
- [ ] Verify new products save imageUrl to database via `/api/products` POST
- [ ] Test editing existing products via `/dashboard/products/[id]/edit`
- [ ] Verify created products display images on public farm page
- **Impact**: Product images may not persist or display correctly

## Priority 5: Mobile UX Testing & Fixes for Dashboard
- [ ] Test dashboard on mobile device/viewport
- [ ] Ensure tables/cards are scrollable without breaking layout
- [ ] Verify touch targets meet 44px minimum on mobile
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

## Known Issues / Technical Debt
- Profile page uses hardcoded user data (Priority 1)
- Waitlist uses mock data (Priority 2)
- Waitlist API missing PATCH endpoint (Priority 3)
- Product images need verification (Priority 4)
- Dashboard mobile UX needs testing (Priority 5)

## Project Structure
```
src/app/
├── api/auth/        # Auth endpoints
├── api/farms/       # Farm CRUD
├── api/products/    # Product CRUD
├── api/reservations/# Reservation management
├── api/waitlist/    # Waitlist management (needs PATCH)
├── api/orders/      # Order (reservation) updates
├── dashboard/      # Farmer dashboard (protected)
├── admin/          # Admin dashboard
├── farm/[slug]/    # Public farm pages
├── explore/        # Farm discovery
├── categories/     # Category browsing
├── checkout/       # Checkout flow
├── profile/       # User profile (needs real data)
├── login/register/onboarding  # Auth flows
```