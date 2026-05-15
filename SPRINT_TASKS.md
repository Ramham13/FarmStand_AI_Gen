# Sprint Tasks - Friday, May 15th, 2026 - 5:19 PM UTC

## Priority 1: Wire Up Admin Reports Action Buttons
- [ ] Create `/api/reports/[id]/route.ts` with PATCH handler for actions: "resolve", "dismiss"
- [ ] Convert `/admin/reports/page.tsx` to client component or add client action handlers
- [ ] Connect "Resolve" button to call PATCH endpoint
- [ ] Connect "Dismiss" button to call PATCH endpoint
- [ ] Add loading states and refresh list after action completes
- **Status**: Page shows real DB data but buttons have no onClick handlers (lines 130-136 in page.tsx show static buttons)
- **Impact**: Admins cannot act on flagged content — buttons do nothing

## Priority 2: Connect Farm Settings to Database
- [ ] Update `/dashboard/settings/page.tsx` to fetch current farm from DB via userId
- [ ] Create `PATCH /api/farms/[slug]/route.ts` endpoint for updates (or verify existing)
- [ ] Add client-side form handling to submit data to API
- [ ] Enable editing of: name, slug, description, location, phone, email, website, paymentLink
- **Status**: Form uses hardcoded mock values ("Sunny Acres Farm", etc.) — no real updates persist
- **Impact**: Farmers cannot update farm details after initial setup

## Priority 3: Implement Product Image Upload
- [ ] Add file upload input to `/dashboard/products/new` page
- [ ] Add file upload to `/dashboard/products/[id]/edit` page  
- [ ] Implement local storage in `/public/uploads` (MVP approach) or integrate cloud storage
- [ ] Display uploaded images on public farm pages and product detail
- **Status**: Schema supports imageUrl but only accepts URL strings — no upload UI exists
- **Impact**: Products lack visual appeal, customers can't see what they're reserving

## Priority 4: Add Farm Profile Image Upload
- [ ] Add image upload to onboarding flow (`/onboarding`)
- [ ] Add image upload to dashboard farm settings (`/dashboard/settings`)
- [ ] Store images locally in `/public/uploads` or cloud storage
- [ ] Display farm cover images on public farm pages (`/farm/[slug]`)
- **Status**: No farm image upload capability exists
- **Impact**: Farm profiles look incomplete without visuals

## Priority 5: Add Mobile Navigation Improvements
- [ ] Review navbar responsiveness on small screens
- [ ] Ensure cart drawer works well on mobile
- [ ] Test farm product grid on mobile viewports
- **Status**: Touch targets verified (44px), but overall mobile UX could be improved
- **Impact**: Some navigation patterns may be awkward on phone-sized screens

---

## Completed (Prior Sprints)
- ✅ Database seeded with 8 farms and products
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters now uses real DB (just fixed!)
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
- ✅ PostgreSQL migration complete (Neon)