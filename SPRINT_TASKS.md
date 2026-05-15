# Sprint Tasks - 2026-05-15 07:44 UTC

## Priority 1: Checkout Flow (Blocking)
- [ ] **Fix checkout redirect**: Farm page (`/farm/[slug]`) doesn't handle `?checkout=true` param. Need to render a checkout form when this param is present.
- [ ] **Create checkout form UI**: Customer info (name, email, phone, message), order summary, and submit button that creates a reservation via POST `/api/reservations`.
- [ ] **Add success/confirmation page**: After checkout, show order confirmation with details.

## Priority 2: Onboarding Integration (Missing)
- [ ] **Hook up onboarding form**: Currently static UI. Need API route (`POST /api/onboarding`) to create User + Farm + initial Products.
- [ ] **Handle slug uniqueness**: Check if URL slug already exists, show error if taken.
- [ ] **Redirect after completion**: Send user to their dashboard after farm creation.

## Priority 3: Search API Integration (Data Consistency)
- [ ] **Replace mock search**: Homepage search currently filters `searchableFarms[]` in-page. Should call `/api/farms/search` for real DB results.
- [ ] **Add search highlighting**: Highlight matching terms in results (optional polish).

## Priority 4: Customer Order Tracking (Missing Feature)
- [ ] **Order history page**: Customer-facing `/orders` page showing their reservation history (fetch by email).
- [ ] **Order status lookup**: Simple page to check status by order ID + email.
- [ ] **Dashboard reservations view**: Farmers can see their incoming reservations (partially exists in dashboard/reservations).

## Priority 5: Auth Foundation (Technical Debt)
- [ ] **Real auth system**: Replace demo login with proper session/JWT auth.
- [ ] **Protect dashboard**: Currently open. Add auth check middleware.
- [ ] **Customer login/register**: Allow customers to create accounts (currently only farmers can register).

---

## Notes

**Completed (recent commits):**
- ✅ Mobile CSS fixes
- ✅ Category filtering (Explore/Categories pages)
- ✅ All pages load (200 OK)
- ✅ Cart drawer functionality
- ✅ Farmer dashboard (reservations, products, waitlist)
- ✅ Reservation/Waitlist forms (farmer side)

**Known Issues:**
- Checkout redirects but does nothing
- Onboarding form doesn't submit
- Search uses mock data
- No real authentication
- No customer order visibility