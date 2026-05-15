# Sprint Tasks - 2026-05-15 13:12 UTC

## Priority 1: Re-enable Route Protection Middleware (CRITICAL)
- [ ] Enable middleware for protected routes (/dashboard, /admin)
  - Current: middleware.ts.disabled - all routes unprotected
  - Need: Fix the EvalError issue that caused it to be disabled
- [ ] Verify unauthenticated users are redirected to /login
- [ ] Ensure public routes (/, /explore, /login, /register, /onboarding) still work
- **Impact**: Security vulnerability - unprotected admin/dashboard routes

## Priority 2: Connect Profile Page to Authenticated User
- [ ] Replace hardcoded `defaultUser` with real user data from session
  - Currently: Uses static demo user object with hardcoded email "farmer@example.com"
  - Need: Fetch user from database using session/cookie
  - Consider adding `/api/auth/me` endpoint if needed
- [ ] Connect password change form to existing `/api/auth/password` endpoint
- [ ] Display real farm data from user's Farm record
- **Impact**: Profile shows demo data, password change non-functional for real users

## Priority 3: Connect Dashboard Waitlist to Real Data
- [ ] Replace mock waitlist data with Prisma query
  - Currently: Hardcoded `waitlists` array with sample customers in /dashboard/waitlist/page.tsx
  - Need: Query Waitlist table filtered by farmer's products (via Product.farmId)
- [ ] Add "Notify" button functionality with API endpoint
  - Need: API endpoint to mark customer as notified (update `notifiedAt` field)
- [ ] Display real customer emails and join dates from database
- **Impact**: Farmers cannot manage actual waitlists - all data is mock

## Priority 4: Mobile UX Verification & Fixes
- [ ] Test responsive design on 375px viewport
  - Check for horizontal scroll issues
  - Verify touch targets are 44px+
- [ ] Test cart drawer on mobile (drawer component)
- [ ] Test checkout forms are mobile-friendly
- [ ] Verify navbar collapses properly on mobile
- **Impact**: ~40% of users access via mobile - poor UX loses customers

## Priority 5: Verify Admin Dashboard Data Integration
- [ ] Confirm admin stats queries are working correctly
  - Currently: Uses real Prisma queries for farm/product counts
  - Verify pending farms, suspended farms, flagged reports queries work
- [ ] Add admin actions (suspend farm, remove product) if missing
- **Impact**: Admin has visibility into platform usage

---

## Completed (from prior sprints)
- ✅ Global Products API with search & filters
- ✅ Global Products Browse UI (/products page)
- ✅ Farm page search functionality
- ✅ Dashboard reservations page with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order PATCH endpoint (status: CONFIRMED, COMPLETED, CANCELLED)
- ✅ Status badges (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- ✅ Cart functionality and checkout forms
- ✅ Registration/onboarding flow
- ✅ Category filtering on explore
- ✅ Farm settings page
- ✅ Checkout confirmation page
- ✅ Password change API endpoint exists

---

## Known Issues / Technical Debt
- Middleware was disabled due to EvalError during build (needs investigation)
- Profile page uses `useState` with demo user instead of server data fetching
- Waitlist page completely mock - no Prisma queries
- No email notification system (placeholder UI only)
- Product image upload not implemented (URL field only)

---

## Backlog (Future Sprints)
- Email notifications system
- Payment integration (external links only currently)
- Review/rating system
- Farm favoriting
- Product image upload to cloud storage
- Multi-farmer accounts support
- Advanced search/filtering
- Analytics dashboard for farmers