# Sprint Tasks - Friday, May 15th, 2026 - 5:27 PM UTC

## Priority 1: Product Image Upload
- [ ] Add file upload input to `/dashboard/products/new` page
- [ ] Add file upload to `/dashboard/products/[id]/edit` page
- [ ] Connect upload to existing `/api/upload` endpoint or implement cloud storage
- [ ] Display uploaded product images on public farm pages and product detail
- **Status**: Schema supports imageUrl but only accepts manual URL strings — no upload UI exists
- **Impact**: Products lack visual appeal, customers can't see what they're reserving

## Priority 2: Farm Profile Image Upload
- [ ] Add image upload to onboarding flow (`/onboarding`)
- [ ] Add image upload to dashboard farm settings (`/dashboard/settings`)
- [ ] Store images locally in `/public/uploads` or use cloud storage
- [ ] Display farm cover images on public farm pages (`/farm/[slug]`)
- **Status**: No farm image upload capability exists
- **Impact**: Farm profiles look incomplete without visuals

## Priority 3: Waitlist Notification System
- [ ] Create email notification when farmer marks product "AVAILABLE"
- [ ] Process waitlist in FIFO order
- [ ] Add "Notified" timestamp to waitlist entries
- [ ] Add UI to dashboard waitlist page showing notification status
- **Status**: Waitlist exists in DB but no notification system triggers
- **Impact**: Customers never know when products they wanted become available

## Priority 4: Mobile Navigation Improvements
- [ ] Review navbar responsiveness - hamburger menu for mobile
- [ ] Ensure cart drawer works smoothly on mobile (touch-friendly)
- [ ] Test farm product grid on mobile viewports (2 columns is minimum)
- [ ] Add proper mobile meta viewport if missing
- **Status**: Touch targets OK (44px), but overall mobile UX could be improved
- **Impact**: Some navigation patterns may be awkward on phone-sized screens

## Priority 5: Checkout Flow Enhancement
- [ ] Test payment link flow - ensure external payment URLs work correctly
- [ ] Add order confirmation email to customers
- [ ] Add "Order Received" notification to farmers (dashboard)
- **Status**: Checkout creates reservation but no email notifications
- **Impact**: Farmers miss orders, customers unsure their reservation went through

---

## Completed (Prior Sprints)
- ✅ Database seeded with 8 farms and products
- ✅ TypeScript compiles cleanly
- ✅ Dev server responds, core pages load
- ✅ Global Products API with search & filters uses real DB
- ✅ Dashboard reservations with real data
- ✅ Dashboard orders listing with status updates
- ✅ Order status PATCH endpoint
- ✅ Registration/onboarding flow
- ✅ Checkout confirmation page (per-product)
- ✅ Explore & Categories pages connected to real DB
- ✅ Farm public page connected to real DB
- ✅ Waitlist dashboard connected to real DB (API + UI)
- ✅ Admin reports page shows real data from DB
- ✅ Admin Reports action buttons (Resolve/Dismiss) now work
- ✅ Farm Settings now connected to database (read/write)
- ✅ Cart multi-farm UX (warns user, redirects to single farm checkout)
- ✅ Mobile responsive with touch targets verified
- ✅ Server Action Export Error fixed
- ✅ Middleware route protection enabled (security)
- ✅ PostgreSQL migration complete (Neon)