# Sprint Tasks - 2026-05-15 06:00 UTC

## Priority 1 - Core Features Missing

- [ ] **Checkout Flow** - Implement actual checkout/payment flow. Cart drawer exists but no way to complete a purchase. Need order creation, confirmation page, and status tracking.

- [ ] **Order Management for Farmers** - Farmers need to see customer reservations, accept/reject them, and manage order status. Create `/dashboard/orders` page.

- [ ] **Waitlist Notification System** - When a waitlisted product becomes available, farmers need ability to notify customers. Build notification trigger + email/display logic.

## Priority 2 - UX Improvements

- [ ] **Advanced Product Filtering** - Explore page needs filtering by category, price range, region, availability. Currently basic only.

- [ ] **Product Image Upload** - Farmers can't add images to products. Add image upload to product creation/edit (could use URL for MVP).

- [ ] **Farm Profile Completeness** - Many farms lack images, descriptions, contact info. Improve onboarding to encourage complete profiles.

## Priority 3 - Mobile & Polish

- [ ] **Mobile Cart Experience** - Review cart drawer on mobile: touch targets, scrolling, checkout button visibility.

- [ ] **Empty States** - Add helpful empty states across the app (no products, no reservations, no farms in search).

- [ ] **Loading Skeletons** - Replace Suspense fallbacks with proper skeleton loaders for better perceived performance.

## Priority 4 - Technical Debt

- [ ] **Authentication Hardening** - Add password reset flow, proper session handling, role-based access control beyond basic check.

- [ ] **API Error Handling** - Review API routes for consistent error responses and better error messages to users.

- [ ] **Database Indexes** - Add indexes on frequently queried fields (farm slug, product category, reservation status).