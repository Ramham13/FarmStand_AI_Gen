# Sprint Tasks - 2026-05-15 07:49 UTC

## Priority 1: Checkout Flow (Blocking - Customer Can't Buy)
- [ ] **Fix checkout redirect**: Farm page (`/farm/[slug]`) doesn't handle `?checkout=true` param. Need to render checkout form when param present.
- [ ] **Create checkout form UI**: Customer info (name, email, phone, message), order summary, submit creates reservation via POST `/api/reservations`.
- [ ] **Add confirmation page**: After checkout, show order confirmation with details.

## Priority 2: Onboarding Integration (Farm Creation Broken)
- [ ] **Hook up onboarding form**: Currently static UI. Need API route (`POST /api/onboarding`) to create User + Farm + initial Products.
- [ ] **Handle slug uniqueness**: Check if URL slug already exists, show error if taken.
- [ ] **Redirect after completion**: Send user to dashboard after farm creation.

## Priority 3: Search API Integration (Data Inconsistency)
- [ ] **Replace mock search**: Homepage search currently filters `searchableFarms[]` array in-page. Should call `/api/farms/search` for real DB results.
- [ ] **Add search highlighting**: Highlight matching terms in results (optional polish).

## Priority 4: Customer Order Tracking (Missing Feature)
- [ ] **Order history page**: Customer-facing `/orders` page showing reservation history (fetch by email).
- [ ] **Order status lookup**: Simple page to check status by order ID + email.
- [ ] **Dashboard reservations view**: Farmers can see incoming reservations (partially exists - verify works end-to-end).

## Priority 5: Auth Foundation (Technical Debt)
- [ ] **Real auth system**: Replace demo login with proper session/JWT auth.
- [ ] **Protect dashboard**: Currently open. Add auth check middleware.
- [ ] **Customer login/register**: Allow customers to create accounts (currently only farmers can register).

---

## Notes

**Completed (recent commits):**
- ✅ Mobile CSS fixes (touch targets, breakpoints)
- ✅ Category filtering (Explore/Categories pages)
- ✅ All pages load (200 OK verification)
- ✅ Cart drawer functionality
- ✅ Farmer dashboard (reservations, products, waitlist)
- ✅ Reservation/Waitlist forms (farmer side)

**Known Gaps:**
- No global products API (only farm-specific)
- No categories API endpoint
- Admin pages exist but untested (/admin/farms, /admin/reports)

**Suggested Additions (Lower Priority):**
- Product availability toggle in dashboard
- Farm verification/approval workflow
- Email notifications for new reservations
- Analytics dashboard for farmers