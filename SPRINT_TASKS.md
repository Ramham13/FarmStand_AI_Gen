# Sprint Tasks - Friday, May 15th, 2026 - 4:57 PM UTC

## Priority 1: Fix Products API to Use Real Database Data
- [ ] Update `/api/products/route.ts` to query Prisma Product table
- [ ] Join with Farm table to get farmName, farmSlug, farmEmoji, farmLocation
- [ ] Keep existing search/filter logic but apply to real DB
- [ ] **Status**: Still using `getAllFarms()` from mock-data — core discovery feature broken despite seeded DB
- **Impact**: Products page (`/products`) not showing database products

## Priority 2: Wire Up Admin Reports Action Buttons
- [ ] Create `/api/reports/[id]/route.ts` with PATCH handler for actions: "resolve", "dismiss"
- [ ] Connect "Resolve" button in `/admin/reports` to call PATCH endpoint
- [ ] Connect "Dismiss" button to call PATCH endpoint
- [ ] Add loading states and optimistic updates
- [ ] Refresh list after action completes
- **Status**: Page shows real DB data but buttons have no onClick handlers
- **Impact**: Admins cannot act on flagged content — buttons do nothing

## Priority 3: Connect Farm Settings to Database
- [ ] Update `/dashboard/settings/page.tsx` to fetch current farm from DB
- [ ] Create `PATCH /api/farms/[slug]/route.ts` endpoint for updates
- [ ] Connect form to submit data to API
- [ ] Ensure farmer can edit: name, slug, description, location, phone, email, website, paymentLink
- **Status**: Form uses hardcoded mock values ("Sunny Acres Farm", etc.) — no real updates persist
- **Impact**: Farmers cannot update farm details after initial setup

## Priority 4: Implement Product Image Upload
- [ ] Add file upload input to `/dashboard/products/new` page
- [ ] Add file upload to `/dashboard/products/[id]/edit` page
- [ ] Implement local storage in `/public/uploads` (MVP approach)
- [ ] Display uploaded images on public farm pages and product detail
- **Status**: Schema supports imageUrl but only accepts URL strings — no upload UI exists
- **Impact**: Products lack visual appeal, customers can't see what they're reserving

## Priority 5: Add Farm Profile Image Upload
- [ ] Add image upload to onboarding flow (`/onboarding`)
- [ ] Add image upload to dashboard farm settings (`/dashboard/settings`)
- [ ] Store images locally in `/public/uploads`
- [ ] Display farm cover images on public farm pages (`/farm/[slug]`)
- **Status**: No farm image upload capability exists
- **Impact**: Farm profiles look incomplete without visuals

---

## Completed (Prior Sprints)
- ✅ Database seeded with 8 farms and products
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters (UI, needs DB connection)
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page (per-product)
- ✅ Explore & Categories pages connected to real DB
- ✅ Farm public page connected to real DB (after seed)
- ✅ Waitlist dashboard connected to real DB (API + UI)
- ✅ Admin reports page shows real data from DB
- ✅ Cart multi-farm UX (warns user, redirects to single farm checkout)
- ✅ Mobile responsive with touch targets verified
- ✅ Server Action Export Error fixed
- ✅ Middleware route protection enabled (security)