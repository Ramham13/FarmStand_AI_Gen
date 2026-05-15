# Sprint Tasks - Friday, May 15th, 2026 - 4:52 PM UTC

## Priority 1: CRITICAL - Seed Database with Farm Data
- [ ] Run `npx prisma db seed` to populate the database with demo farms
- [ ] Verify `/farm/sunny-meadow-farm`, `/farm/green-acres`, etc. now load correctly
- [ ] **Impact**: Database is empty (0 farms, 0 products) — farm profile pages return 404
- **Why Now**: This is blocking all customer-facing farm pages

## Priority 2: Wire Up Admin Reports Action Buttons
- [ ] Create `/api/reports/[id]/route.ts` with PATCH handler for actions: "resolve", "dismiss"
- [ ] Connect "Resolve" button in `/admin/reports` to call PATCH endpoint
- [ ] Connect "Dismiss" button to call PATCH endpoint  
- [ ] Add loading states and optimistic updates
- [ ] Refresh list after action completes
- **Impact**: Admins can act on flagged content — currently buttons do nothing
- **Why Now**: No API exists for reports at all — schema has Report model but no endpoint

## Priority 3: Fix Products API to Use Real Database Data
- [ ] Update `/api/products/route.ts` to query Prisma Product table
- [ ] Join with Farm table to get farmName, farmSlug, farmEmoji, farmLocation
- [ ] Keep existing search/filter logic but apply to real DB
- **Impact**: Products page shows actual database products, not mock data
- **Why Now**: Still using `getAllFarms()` from mock-data — core discovery feature broken

## Priority 4: Implement Product Image Upload
- [ ] Add file upload input to `/dashboard/products/new` page
- [ ] Add file upload to `/dashboard/products/[id]/edit` page
- [ ] Implement local storage in `/public/uploads` (MVP approach)
- [ ] Display uploaded images on public farm pages and product detail
- **Impact**: Products show real images, better visual appeal
- **Why Now**: Schema supports imageUrl but only accepts URL strings — no upload UI exists

## Priority 5: Connect Farm Settings to Database
- [ ] Update `/dashboard/settings/page.tsx` to fetch current farm from DB
- [ ] Create `PATCH /api/farms/[slug]/route.ts` endpoint for updates
- [ ] Connect form to submit data to API
- [ ] Ensure farmer can edit: name, slug, description, location, phone, email, website, paymentLink
- **Impact**: Farmers can update farm details after initial setup
- **Why Now**: Form uses hardcoded mock values — no real updates persist

---

## Completed (Prior Sprints)
- ✅ Middleware route protection enabled (security)
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters (UI)
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page (per-product)
- ✅ Explore & Categories pages connected to real DB
- ✅ Farm public page connected to real DB (needs seed data)
- ✅ Waitlist dashboard connected to real DB (API + UI)
- ✅ Admin reports page shows real data from DB
- ✅ Cart multi-farm UX (warns user, redirects to single farm checkout)
- ✅ Mobile responsive with touch targets verified
- ✅ Server Action Export Error fixed (farms.ts "use server" directive removed)