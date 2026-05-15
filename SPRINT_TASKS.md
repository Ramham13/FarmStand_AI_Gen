# Sprint Tasks - 2026-05-15 07:24 UTC

## Priority 1 (Critical - Core Features)
- [ ] End-to-end reservation flow test: customer submits reservation on farm page → appears in farmer dashboard → can confirm/decline → status updates persist
- [ ] Waitlist dashboard integration: verify waitlist entries display in `/dashboard/waitlist`, farmer can notify/manage entries
- [ ] Verify Orders API and dashboard: check `/api/orders` creates orders from cart checkout, `/dashboard/orders` displays order history

## Priority 2 (High - Search & Discovery)
- [ ] Explore page text search: add farm name/location text search to `/explore` alongside existing category filters
- [ ] Verify `/onboarding` flow: after farmer registers, ensure they're directed to onboarding to create farm profile and acknowledge seller agreement

## Priority 3 (Medium - Compliance & UX)
- [ ] Platform disclaimers: add "no native payments" notice to cart drawer, checkout confirmation, and farm profile pages per SPEC.md
- [ ] Seller responsibility notice: verify acknowledgment checkbox and notice text appear on onboarding/farm setup
- [ ] Admin Reports page: verify `/admin/reports` displays flagged content and can moderate (hide/suspend) farms/products

## Priority 4 (Lower - Polish & Verification)
- [ ] Checkout flow end-to-end: verify cart checkout redirects to farm's paymentLink and creates order record
- [ ] Mobile cart drawer: verify cart drawer and checkout work smoothly on mobile viewports
- [ ] TypeScript/ESLint: ensure no new warnings introduced in this sprint cycle