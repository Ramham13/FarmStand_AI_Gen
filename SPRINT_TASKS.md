# Sprint Tasks - 2026-05-15

## Priority 1
- [ ] **Onboarding Backend Integration** - The multi-step onboarding form is static with no backend. Need API route to create Farm + link to user account.

- [ ] **Checkout Flow** - Cart drawer exists but no checkout. Need order creation, confirmation page, and customer order history.

## Priority 2
- [ ] **Real Search Integration** - Homepage and Explore search UI uses hardcoded data. Wire up to `/api/farms/search` endpoint.

- [ ] **Customer Account Page** - No way for customers to view their profile, past orders, or manage their account. Need `/account` or `/orders` page.

## Priority 3
- [ ] **Mobile Polish** - Recent commits show active mobile work. Continue refining touch targets, responsive layouts, and mobile navigation.

- [ ] **Notification System** - No email/notification triggers for new reservations, waitlist updates, or order status changes.

- [ ] **Settings Page Completion** - Dashboard settings page exists but needs full CRUD for farm profile (image upload, description, payment link updates).

---

### Notes
- Recent sprints focused heavily on mobile UX (horizontal scroll fixes, navbar improvements, explore page)
- Auth flow works (login/register → dashboard), but customer-side order tracking is missing
- Admin has farms list + reports - consider adding farm approval/rejection workflow
