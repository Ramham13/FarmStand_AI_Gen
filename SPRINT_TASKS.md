# Sprint Tasks - Friday, May 15th, 2026 - 5:37 PM UTC

## Priority 1: Product Image Upload to Edit Page
- [ ] Add ImageUpload component to `/dashboard/products/[id]/edit` page
- [ ] Ensure uploaded images save to product record and display on public pages
- [ ] Test image upload flow end-to-end (upload → DB → display)
- **Status**: Component exists, new product page wired, edit page pending
- **Impact**: Farmers can't update existing product images

## Priority 2: Public Pages Image Display
- [ ] Add product image display to `/products` page (products-client.tsx)
- [ ] Add farm/product images to `/explore` page (explore-client.tsx)
- [ ] Ensure image display handles missing images gracefully (fallback placeholder)
- **Status**: API/upload UI ready, but public pages don't render images
- **Impact**: Customers see no visuals on products and explore pages

## Priority 3: Waitlist Notification System
- [ ] Create API endpoint to trigger waitlist notifications
- [ ] When farmer marks product "AVAILABLE" via dashboard, notify waitlist in FIFO order
- [ ] Update `notifiedAt` timestamp in DB
- [ ] Add UI indicator on dashboard waitlist page showing "Notified" status
- **Status**: Waitlist schema has `notifiedAt`, no notification logic
- **Impact**: Customers never know products they wanted are available

## Priority 4: Email Notification System
- [ ] Add email provider (Resend, SendGrid, or nodemailer with SMTP)
- [ ] Send order confirmation email to customer on checkout
- [ ] Send "New Order Received" notification to farmer
- [ ] Add notification settings to dashboard (email on/off toggle)
- **Status**: No email system exists
- **Impact**: Farmers miss orders, customers unsure reservation went through

## Priority 5: Mobile Navigation & Polish
- [ ] Verify navbar hamburger menu works on mobile
- [ ] Ensure cart drawer is touch-friendly (44px+ targets)
- [ ] Check explore/product grid is 2-column minimum on mobile
- **Status**: Touch targets OK but mobile UX could be tightened
- **Impact**: Mobile experience feels awkward on small screens

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
- ✅ Farm public page connected to real DB (includes imageUrl display)
- ✅ Waitlist dashboard connected to real DB (API + UI)
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
- ✅ Farm settings page image upload wired