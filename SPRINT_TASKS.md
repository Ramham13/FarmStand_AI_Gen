# Sprint Tasks - 2026-05-16 01:34 UTC

## Priority 1: Authentication & Account Security
- [ ] Implement password reset flow - email-based reset link, new password page, proper auth error handling
- [ ] Add email verification on signup - send verification email, require verified email before making reservations

## Priority 2: Core E-commerce Features
- [ ] Add ratings/reviews system - customers can leave star ratings + text reviews for farms (needs new Review model, API, and UI components)

## Priority 3: UX Improvements
- [x] Add product search within farm pages - filter products by name on individual farm pages ✅ DONE
- [x] Add in-app notification center - view reservation status, waitlist updates (complements existing email notifications) ✅ DONE (UI exists, local storage based)
- [ ] Refine cart drawer mobile experience - full-screen slide-up on small screens

## Priority 4: Mobile & Performance
- [x] Lazy load product images with blur placeholder ✅ DONE (BlurImage component)
- [x] Add skeleton loading states for farm/product detail pages ✅ DONE (partial - needs refinement)
- [ ] Optimize cart drawer for mobile (slide-up fullscreen on small screens)

## Priority 5: Technical Debt & Security
- [ ] Add proper error boundaries per route (already has basic error.tsx, but per-route error handling for API failures)
- [ ] Set up cron job for cleaning old expired reservations (auto-cancel after 24h)
- [ ] Add rate limiting on reservation API endpoints