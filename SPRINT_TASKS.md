# Sprint Tasks - Saturday, May 16th, 2026 - 12:20 AM UTC

## Priority 1: Waitlist UX - Customer Facing
- [ ] **Complete waitlist form on product pages**:
  - Verify waitlist form shows when product is unavailable (UNAVAILABLE status)
  - Add waitlist position/queue number display for customers who joined
  - Show waitlist count on product cards in farm listings

- [ ] **Add "Notify Next" bulk action in farmer dashboard**:
  - Button to notify next person in queue when product becomes available
  - Track notifiedAt timestamp in waitlist table

## Priority 2: Session & Auth Improvements
- [ ] **Implement proper authentication**:
  - Current login is demo-only (generates fake user IDs)
  - Wire up real user authentication with database lookup
  - Add "Remember Me" toggle (extend cookie maxAge)
  - Implement session refresh mechanism for active users
  - Ensure logout fully clears session cookies

## Priority 3: Empty States & Error Handling
- [ ] **Add empty states to dashboard sections**:
  - No products: "You haven't added any products yet"
  - No reservations: "No reservations yet"
  - No orders: "No orders to display"
  - Use illustrated empty states with call-to-action
- [ ] **Improve API error handling**:
  - Add user-friendly error messages (not just "Failed to fetch")
  - Show retry buttons on errors
  - Handle network failures gracefully with toast notifications
- [ ] **Prevent duplicate submissions**:
  - Add debounce to reservation form submit
  - Disable button while submitting
  - Show loading state during API calls

## Priority 4: Discovery & Search Gaps
- [ ] **Add global search feature**:
  - Search farms and products from header
  - Search within individual farm pages
- [ ] **Add category filter to farm product listings**:
  - Filter products by category on /farm/[slug] page
- [ ] **Wire up email notifications**:
  - Email library exists (src/lib/email.ts) but not called
  - Send confirmation emails on reservation create
  - Send waitlist notifications when product becomes available

## Priority 5: Edge Cases & Mobile Polish
- [ ] **Handle deleted/missing products gracefully**:
  - Reservations referencing deleted products should show "Product unavailable"
  - Orders should handle missing product data gracefully
- [ ] **Verify suspended farms are filtered**:
  - Ensure SUSPENDED/REMOVED farms don't appear in /explore and /categories
  - Ensure suspended farms still accessible to their owners
- [ ] **Mobile polish**:
  - Ensure touch targets are 44px+ everywhere
  - Test checkout flow on mobile
  - Add skeleton loading states for all async content

---

## Completed (Previous Sprints)

- ✅ Build issues: node_modules reinstall, @types/node added
- ✅ Product availability UI: badges, disabled add-to-cart for unavailable
- ✅ Mobile navigation: hamburger menu, touch targets 44px+
- ✅ Open Graph meta tags for social sharing
- ✅ Cart page with localStorage persistence
- ✅ Dashboard wired to Prisma database
- ✅ Checkout confirmation page
- ✅ Reservations API and dashboard page (confirm/decline)
- ✅ Customer orders tracking page (`/orders`)
- ✅ Admin farms page with search and status badges
- ✅ Farm status update API (`/api/admin/farms/[id]/status`)
- ✅ Payment link display on farm pages
- ✅ Categories and explore pages with search
- ✅ Waitlist dashboard: shows position, notified status, notify button
- ✅ User order history in profile (`/api/orders/me`)
- ✅ Admin farm moderation (Ban/Activate actions)

---

## Codebase Analysis

| Area | Status | Notes |
|------|--------|-------|
| Build | ✅ | Passing - TypeScript clean |
| Cart | ✅ | Full localStorage persistence |
| Product Availability | ✅ | Badges + disabled buttons |
| Mobile Nav | ✅ | Hamburger menu, 44px targets |
| OG Tags | ✅ | Added to product/farm pages |
| Dashboard Data | ✅ | Prisma queries wired |
| Order Tracking | ✅ | Works with email lookup |
| Admin Farm Status | ✅ | API + frontend wired |
| Auth System | ⚠️ | Demo mode only - needs real users |
| Empty States | ❌ | Missing in dashboard sections |
| Error Handling | ⚠️ | Basic - needs improvement |
| Global Search | ❌ | Not implemented |
| Email Notifications | ❌ | Library exists but not wired |
| Farm Category Filter | ❌ | Missing on farm page |
| Duplicate Prevention | ❌ | Not implemented |

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma