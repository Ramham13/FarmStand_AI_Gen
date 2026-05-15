# Sprint Tasks - Friday, May 15th, 2026 - 6:42 PM UTC

## Priority 1: Complete Checkout Flow
- [ ] Create `/checkout` page for cart checkout flow
- [ ] Implement checkout API to process cart items into reservations
- [ ] Add order summary with farmer contact info (phone, email)
- [ ] Connect "Proceed to Checkout" from cart drawer to actual checkout page
- [ ] Handle multi-farm cart edge case (currently shows alert)
- **Status**: NOT STARTED - Cart drawer exists but no checkout page
- **Impact**: Users can't complete checkout to submit reservations

## Priority 2: Error Handling & Resilience
- [ ] Add error boundaries to prevent full-page crashes on component errors
- [ ] Add retry buttons on failed API calls (Explore, Products, Reservations)
- [ ] Implement loading states with proper skeletons for Explore/Products
- [ ] Add toast notifications for failed actions (server action errors)
- **Status**: NOT STARTED - No error UI
- **Impact**: Users see blank pages or confusing errors when things fail

## Priority 3: Automated Test Suite
- [ ] Install Playwright browser dependencies
- [ ] Create e2e tests for critical flows (homepage load, farm browse, reservation)
- [ ] Add mobile viewport test
- [ ] Configure CI to run tests on push/PR
- **Status**: PARTIAL - test-mobile.spec.ts exists but can't run (missing browser deps)
- **Impact**: No regression detection, manual testing required

## Priority 4: Dashboard UX Polish
- [ ] Add helpful empty states with CTAs for:
  - No products (link to add first product)
  - No reservations (explanation text)
  - No waitlist (explanation text)
- [ ] Add quick stats cards on dashboard overview
- [ ] Add "View on Site" button to easily preview farm page
- **Status**: PARTIAL - Basic empty states exist but not helpful
- **Impact**: New farmers confused about next steps

## Priority 5: Performance Optimization
- [ ] Add loading skeletons to Explore and Products pages
- [ ] Implement pagination for products API (currently returns all)
- [ ] Add database indexes for frequently queried fields
- **Status**: NOT STARTED
- **Impact**: Poor performance with large datasets

---

## Completed (This Sprint)
- ✅ Customer orders tracking page (/orders) - email lookup
- ✅ CI/CD workflow (.github/workflows/test.yml)
- ✅ Dynamic homepage with featured farms from DB
- ✅ Order status email notifications
- ✅ Quantity selection for reservations
- ✅ TypeScript compiles cleanly
- ✅ Dev server runs correctly

## Completed (Prior Sprints)
- ✅ Global Products API with search & filters
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page
- ✅ Explore & Categories pages
- ✅ Farm public page
- ✅ Waitlist dashboard & notification
- ✅ Admin reports page
- ✅ Farm Settings connected to DB
- ✅ Cart multi-farm UX
- ✅ Mobile responsive verified
- ✅ PostgreSQL (Neon) configured