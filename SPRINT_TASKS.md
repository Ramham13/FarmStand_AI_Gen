# Sprint Tasks - Friday, May 15th, 2026 - 6:07 PM UTC

## Priority 1: Order Status Change Notifications
- [ ] Add email notification to customer when farmer confirms/declines/cancels an order
- [ ] Create `sendOrderStatusUpdate()` function in email.ts
- [ ] Wire up PATCH /api/orders to trigger status update email
- **Status**: Missing - customers currently don't know when their order status changes
- **Impact**: Poor customer experience - no feedback on reservation requests

## Priority 2: Quantity Selection for Reservations
- [ ] Add quantity selector to reservation form on farm page
- [ ] Update orders API to accept and store quantity
- [ ] Display quantity in dashboard orders list
- [ ] Show quantity in farmer order notifications
- **Status**: Currently hardcoded to 1
- **Impact**: Customers can't order multiple of the same product

## Priority 3: Automated Test Suite in CI/CD
- [ ] Set up GitHub Actions workflow to run Playwright tests
- [ ] Add mobile viewport test to CI
- [ ] Add TypeScript compilation check to CI
- [ ] Add ESLint check to CI
- **Status**: Tests exist in test-mobile.spec.ts but not automated
- **Impact**: No regression detection between deploys

## Priority 4: Performance & Database Optimization
- [ ] Add database indexes for frequently queried fields (farmId, productId, status)
- [ ] Add loading skeletons to Explore and Products pages
- [ ] Implement pagination for products API (currently returns all)
- **Status**: Basic implementation works but could be slow at scale
- **Impact**: Poor performance with large datasets

## Priority 5: UX Polish - Empty States & Error Handling
- [ ] Improve empty state on dashboard with helpful CTAs
- [ ] Add better error boundaries for failed page loads
- [ ] Add retry buttons on failed API calls in dashboard
- [ ] Verify loading spinners display correctly during data fetches
- **Status**: Basic error handling exists
- **Impact**: Users may be confused when something fails

---

## Completed (Prior Sprints)
- ✅ TypeScript compiles cleanly
- ✅ Dev server runs and pages load correctly
- ✅ Database seeded with 8 farms and products
- ✅ Global Products API with search & filters uses real DB
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page (per-product)
- ✅ Explore & Categories pages connected to real DB
- ✅ Farm public page connected to real DB (includes imageUrl display)
- ✅ Waitlist dashboard connected to real DB (API + UI)
- ✅ Waitlist notification system (API + email + Notify button)
- ✅ Admin reports page shows real data from DB
- ✅ Admin Reports action buttons (Resolve/Dismiss) now work
- ✅ Farm Settings now connected to database (read/write)
- ✅ Cart multi-farm UX (warns user, redirects to single farm checkout)
- ✅ Mobile responsive with touch targets verified
- ✅ Server Action Export Error fixed
- ✅ Middleware route protection enabled (security)
- ✅ PostgreSQL migration complete (Neon)
- ✅ Image upload API and UI component created
- ✅ New product page image upload wired
- ✅ Edit product page image upload wired
- ✅ Farm settings page image upload wired
- ✅ Public pages display product images (explore, products, farm profile)
- ✅ Global "no native payments" disclaimer in footer
- ✅ Order confirmation emails (customer + farmer)