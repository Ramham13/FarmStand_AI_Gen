# Sprint Tasks - Saturday, May 16th, 2026 - 12:07 AM UTC

## Priority 1: User Dashboard Order History
- [x] **Add "My Orders" to user dashboard** (`/profile`):
  - ✅ Currently `/orders` requires email lookup each visit
  - ✅ Persist authenticated user's order history in dashboard
  - ✅ Show PENDING/CONFIRMED/DECLINED status with visual indicators
  - ✅ Include quick actions (view farm, contact farm)

## Priority 2: Admin Farm Moderation Actions
- [x] **Implement farm status update API**:
  - ✅ Admin can suspend/activate farms (`/api/admin/farms/[id]/status`)
  - ✅ Admin can remove farms (set status to REMOVED)
  - ✅ Frontend: wire up Ban button in admin/farms page to call API
  - ⏳ Verify suspended farms don't appear in public listings

## Priority 3: Waitlist UX Polish
- [ ] **Improve waitlist management**:
  - Verify waitlist form shows on unavailable products
  - Add "Notified" status when customer is notified via waitlist
  - Add "Notify Next" button in farmer dashboard waitlist
  - Show waitlist position/queue number to customers

## Priority 4: Session & Auth Improvements
- [ ] **Fix auth session persistence**:
  - Check JWT token expiration settings
  - Verify "Remember Me" functionality works
  - Add session refresh on active use
  - Test logout fully clears session

## Priority 5: Edge Case Handling
- [ ] **Improve error states and edge cases**:
  - Empty states for dashboard sections (no products, no reservations)
  - Better error messages when API calls fail
  - Handle deleted products in reservations/orders gracefully
  - Prevent duplicate reservation submissions

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
- ✅ Payment link display on farm pages
- ✅ Categories and explore pages with search

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
| Order Tracking | ⚠️ | Works but email lookup only |
| Admin Actions | ⚠️ | UI exists, API incomplete |
| Waitlist | ⚠️ | Basic, needs polish |
| Auth Sessions | ⚠️ | May need expiration tuning |

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma