# Sprint Tasks - 2026-05-15 07:10 UTC

## Priority 1 (Critical - Blocks)
- [ ] Rebuild Explore page (`/explore`) - critical public browsing page, folder exists but is empty
- [ ] Create Categories page (`/categories`) - linked in navbar but doesn't exist

## Priority 2 (High - User-Facing)
- [ ] Verify Explore/Categories routing works - test navigation from homepage and navbar
- [ ] Test reservation → order flow: customer places reservation → appears in farmer's orders dashboard

## Priority 3 (Medium - Core Features)
- [ ] Complete Orders API integration - verify `GET /api/orders` and `POST /api/orders` work end-to-end with dashboard
- [ ] Review and commit uncommitted changes:
  - `src/app/dashboard/products/page.tsx`
  - `src/lib/farms.ts` and `src/lib/products.ts`
  - `components.json`

## Priority 4 (Lower - Cleanup)
- [ ] Clean up empty folders (`src/app/explore/` is empty)
- [ ] Mobile UX polish: verify responsiveness on dashboard, cart drawer, farm profiles
- [ ] Test cart flow end-to-end (add item → cart drawer → checkout/reservation)