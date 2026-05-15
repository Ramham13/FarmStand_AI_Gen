# Sprint Tasks - 2026-05-15 11:51 UTC

## Priority 1: Dashboard Security - Data Leakage (CRITICAL)
- [ ] Fix `/src/app/dashboard/page.tsx` - `findFirst()` returns RANDOM farm to ANY visitor
- No user filtering - any visitor sees whoever is in DB first
- Must filter by logged-in user's ID (localStorage is client-only, RSC doesn't have access)
- Need: Proper session/cookie-based auth OR middleware that passes user context
- **Impact**: Any visitor can view all farmer data

## Priority 2: Route Protection Middleware
- [ ] Create `src/middleware.ts` for Next.js route protection
- Protect `/dashboard/*` and `/admin/*` routes
- Redirect unauthenticated users to `/login`
- Keep public: `/`, `/explore`, `/categories`, `/farm/*`, `/login`, `/register`
- **Impact**: Unprotected routes expose farmer data

## Priority 3: Admin Authentication Check
- [ ] Add auth check to `/admin/*` pages
- Currently admin pages are fully public with no access control
- Need: Verify user has admin role before rendering
- **Impact**: Anyone can access platform moderation tools

## Priority 4: Client-Side Auth Security Gaps
- [ ] Currently auth uses localStorage only (no HTTP-only cookies)
- `getUser()` in auth-client.ts returns null on server-side
- Dashboard RSC can't verify user identity securely
- Need: Proper session cookie + server-side validation OR middleware-based auth
- **Impact**: No real security - tokens stored in easily accessible localStorage

## Priority 5: TypeScript/Build Verification
- [ ] Run `npm run build` to confirm clean production build
- Verify no type errors or warnings
- **Impact**: Prevents deployment issues

---

## Already Fixed (from prior sprints)
- ✅ ESLint error - `let userId` → `const`
- ✅ Prisma User-Farm relation added
- ✅ Checkout confirmation page properly awaits searchParams
- ✅ Category filtering on Explore/Categories pages
- ✅ Cart functionality (drawer, add-to-cart)
- ✅ Search API with Prisma queries
- ✅ Reservations API (POST/GET)
- ✅ Waitlist form API
- ✅ Mobile CSS responsive breakpoints
- ✅ Farm pages wired to database
- ✅ Platform disclaimers

---

## Known Gaps (Backlog - Not Priority This Sprint)
- No global products API (only farm-specific via /api/farms/[slug]/listings)
- No email notifications (placeholder UI only)
- No user profile management page
- No search UI on individual farm pages
- Onboarding flow verification needed
- Order management flow not fully implemented (no Order model, just Reservations)
- Admin pages exist but lack real database data (hardcoded stats)