# Sprint Tasks - 2026-05-15 13:22 UTC

## Priority 1: Re-enable Route Protection Middleware (CRITICAL)
- [ ] Fix the EvalError that caused middleware to be disabled
  - Current: middleware.ts.disabled - all routes unprotected
  - Need: Investigate and fix the eval issue, then re-enable
- [ ] Verify unauthenticated users are redirected to /login
- [ ] Ensure public routes (/, /explore, /login, /register, /onboarding) still work
- **Impact**: Security vulnerability - admin/dashboard routes currently open to anyone

## Priority 2: Connect Profile Page to Authenticated User
- [ ] Replace hardcoded `defaultUser` in /profile/page.tsx with real user data
  - Currently: Static demo user with email "farmer@example.com"
  - Need: Fetch user from database using session/cookie auth
- [ ] Connect password change form to existing `/api/auth/password` endpoint
- [ ] Display real farm data from user's Farm record
- **Impact**: Profile shows demo data only, password change non-functional

## Priority 3: Connect Dashboard Waitlist to Real Data
- [ ] Replace mock waitlist data with Prisma query
  - Currently: Hardcoded `waitlists` array in /dashboard/waitlist/page.tsx
  - Need: Query Waitlist table filtered by farmer's products
- [ ] Add "Notify" button with API endpoint to update `notifiedAt` field
- [ ] Display real customer emails and join dates
- **Impact**: Farmers cannot manage actual waitlists - all data is mock

## Priority 4: Fix Mobile Touch Targets
- [ ] Increase category button height from h-8 (32px) to h-11 (44px)
- [ ] Increase CTA button height from h-9 (36px) to h-11 (44px)
- [ ] Verify all interactive elements meet 44px minimum
- **Impact**: ~40% mobile users - current 32-36px targets are below accessibility standard

## Priority 5: Verify/Complete Product CRUD for Farmers
- [ ] Test adding new product via /dashboard/products/new
- [ ] Test editing existing product via /dashboard/products/[id]
- [ ] Verify product images can be added (URL field exists, check if upload needed)
- [ ] Ensure created products appear on public farm page
- **Impact**: Farmers cannot add/edit their own products (MVP gap)

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
- Middleware disabled (EvalError) - security risk
- Profile page uses demo user instead of server data
- Waitlist page completely mock - no Prisma queries
- Mobile touch targets below 44px standard
- No email notification system (placeholder UI only)
- Product image upload not implemented (URL field only)
- Playwright testing not running in environment

---

## Backlog (Future Sprints)
- Email notifications system
- Payment integration (external links only currently)
- Review/rating system
- Farm favoriting
- Multi-farmer accounts support
- Advanced search/filtering
- Analytics dashboard for farmers