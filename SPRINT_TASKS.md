# Sprint Tasks - 2026-05-15 07:34 UTC

## Priority 1: Core Checkout Flow (Blocking)
- [ ] **Create checkout page**: The cart "Checkout" button redirects to `/farm/[slug]?checkout=true` but no page handles this param. Need a proper checkout form that creates a reservation via POST /api/orders.
- [ ] **Add Order model to Prisma schema**: Current system reuses Reservation for orders. For clarity and tracking, consider a dedicated Order model with status (PENDING, PAID, COMPLETED, CANCELLED).

## Priority 2: Multi-Farm Cart UX (Critical UX)
- [ ] **Resolve multi-farm cart conflict**: Cart allows adding items from multiple farms, but checkout only works for single farms. Decision needed:
  - Option A: Prevent adding items from different farms (show warning, clear cart first)
  - Option B: Implement split checkout (create separate orders/reservations per farm)
- [ ] **Cart clear prompt**: When adding from a new farm, warn user and offer to clear cart or keep current items.

## Priority 3: Customer Order Tracking (Missing Feature)
- [ ] **Customer order history**: No way for customers to view their order/reservation history or check status.
- [ ] **Order confirmation page**: After checkout, show confirmation with reservation details and status.
- [ ] **Order status page**: Simple `/orders/[id]` page where customers can check status by email/phone.

## Priority 4: Search Integration (Data Consistency)
- [ ] **Connect search to API**: Homepage search filters mock data in `src/lib/mock-data.ts`. Should call `/api/farms/search` for consistent DB-backed results.
- [ ] **Add search highlighting**: Highlight matching terms in results.

## Priority 5: Mobile & Polish
- [ ] **Mobile checkout form**: Ensure checkout form has proper touch targets, inputs, and validation on mobile.
- [ ] **Add loading states**: Cart operations and checkout submission need loading spinners.
- [ ] **Error handling**: Add user-friendly error toasts when API calls fail.
- [ ] **Toast notifications**: Implement proper toast system for success/error feedback.

---

## Notes

**Completed in recent commits:**
- ✅ Mobile CSS fixes
- ✅ Category filtering on Explore/Categories pages
- ✅ All pages loading (200 OK)
- ✅ TypeScript compiles without errors
- ✅ Cart drawer functionality
- ✅ Reservation/Waitlist workflows (farmer dashboard)

**Technical Debt:**
- Search uses mock data instead of real API
- Orders are using Reservation model (conceptual mismatch)
- No customer-facing order tracking
- Checkout flow incomplete