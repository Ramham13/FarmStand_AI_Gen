# Sprint Tasks - 2026-05-15 12:22 UTC

## Priority 1: Critical Bug Fix (Build Broken)
- [ ] Fix TypeScript error in `/api/products/route.ts` - lines 19, 20 have implicit `any` type
  - `p` and `product` parameters need explicit types or proper type inference
  - **Impact**: Build fails, blocks all testing and deployment

## Priority 2: User Account Management
- [ ] Create `/profile` page for user account settings (separate from farm settings)
- [ ] Allow password change with current password verification
- [ ] Show account metadata (email, role, created date)
- [ ] Implement proper auth - current `/dashboard/settings` is farm settings only
- **Impact**: Users cannot manage their own account - security gap

## Priority 3: Mobile UX Verification
- [ ] Run mobile test suite after TypeScript fix
- [ ] Verify horizontal scroll doesn't occur on mobile viewports (375px)
- [ ] Test touch targets are adequate (44px minimum)
- [ ] Test cart drawer works on mobile
- [ ] Verify checkout forms are mobile-friendly
- **Impact**: Mobile users may have poor experience

## Priority 4: Order Status Workflow
- [x] Add PATCH endpoint to update order/reservation status (CONFIRMED, COMPLETED, CANCELLED) - DONE
- [x] Add status update buttons on dashboard orders page - DONE
- [x] Add visual status badges (PENDING=yellow, CONFIRMED=blue, COMPLETED=green, CANCELLED=red) - DONE
- **Impact**: Order fulfillment workflow complete ✅

## Priority 5: Global Products Browse UI
- [x] Create `/products` page to consume `/api/products` endpoint - DONE
- [x] Add search bar with query param - DONE
- [x] Add category filter UI - DONE
- [x] Add price range filter UI - DONE
- [x] Display product grid with farm info - DONE
- **Impact**: Products discovery now available ✅

---

## Completed (from prior sprints)
- ✅ Global Products API with search & filters
- ✅ Farm page search functionality
- ✅ Dashboard reservations page
- ✅ Dashboard orders listing
- ✅ Order API (uses reservations)
- ✅ Cart functionality
- ✅ Route protection middleware
- ✅ Security hardening
- ✅ Category filtering on explore
- ✅ Farm settings page
- ✅ Checkout confirmation page (wired to checkout form)

---

## Backlog (Future Sprints)
- Email notifications system
- Admin dashboard with real database stats
- Onboarding flow improvements
- Payment integration (currently external payment links only)
- Review/rating system
- Farm favoriting
- Waitlist management UI improvements