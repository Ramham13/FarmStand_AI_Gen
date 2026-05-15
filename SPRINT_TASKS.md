# Sprint Tasks - 2026-05-15 13:02 UTC

## Priority 1: Fix Middleware / Route Protection (CRITICAL)
- [ ] Re-enable middleware with fix for edge runtime EvalError
  - Current: `middleware.ts.disabled` causes 500 on ALL routes
  - Error: `EvalError: Code generation from strings disallowed`
  - Need: Fix the regex/pattern matching OR remove complex logic
  - This blocks entire application - no pages load
- [ ] Verify route protection redirects unauthenticated users to /login
- **Impact**: Critical - app completely broken; security hole

## Priority 2: Connect Profile & Waitlist to Real Data
- [ ] Connect `/profile` page to authenticated user from session/cookie
  - Currently uses hardcoded `defaultUser` object
  - Need: Fetch from database using `auth-user-id` cookie
  - Implement `/api/auth/me` endpoint if needed
- [ ] Connect `/dashboard/waitlist` page to real Prisma waitlist data
  - Currently uses hardcoded mock data
  - Need: Query Waitlist table filtered by farmer's products
- [ ] Implement "Notify" button functionality
  - Need: `/api/waitlist/notify` endpoint to mark customer as notified
- **Impact**: Core farmer features non-functional with demo data

## Priority 3: Mobile UX Verification & Fixes
- [ ] Run mobile test suite to verify responsive design
  - Playwright environment issue (missing libnspr4.so)
  - If tests can't run, manually verify:
- [ ] Fix horizontal scroll on mobile viewports (375px)
- [ ] Verify touch targets meet 44px minimum
- [ ] Test cart drawer works on mobile
- [ ] Verify checkout forms are mobile-friendly
- **Impact**: ~40% of users access via mobile

## Priority 4: Admin Dashboard Real Database Integration
- [ ] Replace mock data in `/admin` with real Prisma queries
- [ ] Add farm count, product count, reservation stats to admin overview
- [ ] Ensure admin APIs use actual database data
- **Impact**: Admin has no visibility into actual platform usage

## Priority 5: Password Change Functionality
- [ ] Implement `/api/auth/password` endpoint for password changes
- [ ] Add password change form to profile page
- **Impact**: Users can't manage their account security

---

## Completed (from prior sprints)
- ✅ Global Products API with search & filters
- ✅ Global Products Browse UI (/products page)
- ✅ Farm page search functionality
- ✅ Dashboard reservations page
- ✅ Dashboard orders listing with status updates
- ✅ Order PATCH endpoint (status: CONFIRMED, COMPLETED, CANCELLED)
- ✅ Status badges (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- ✅ Cart functionality and checkout forms
- ✅ Route protection middleware (created, needs fix)
- ✅ Category filtering on explore
- ✅ Farm settings page
- ✅ Profile page UI (needs auth integration)
- ✅ Checkout confirmation page
- ✅ Registration/onboarding flow
- ✅ Waitlist page UI (needs backend integration)

---

## Backlog (Future Sprints)
- Email notifications system (placeholder UI only)
- Payment integration (external links only currently)
- Review/rating system
- Farm favoriting
- Product image upload to cloud storage
- Multi-farmer accounts support
- Advanced search/filtering
- Analytics dashboard for farmers