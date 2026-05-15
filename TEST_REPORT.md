# Test Report - 2026-05-15 12:34 UTC

## Last Commit: Fix: Add type for map parameter

## Tests
| Page | Status | Notes |
|------|--------|-------|
| TypeScript | PASS | No type errors |
| Home | FAIL | 500 Error - middleware edge runtime issue |
| Explore | FAIL | 500 Error - middleware edge runtime issue |
| Farm Profiles | FAIL | 500 Error - middleware edge runtime issue |

## Bugs Found
- [x] **Critical**: All routes return HTTP 500 due to middleware failure
  - Error: `EvalError: Code generation from strings disallowed for this context`
  - Source: Edge runtime middleware compilation
  - Affects: All pages (/, /explore, /farm profiles)
  - The middleware in `src/middleware.ts` runs in edge runtime and fails during webpack compilation. This is blocking the entire application.

## Summary
**FAIL** - TypeScript compiles successfully but the dev server is completely broken due to middleware edge runtime error. All pages return 500 errors.

### Root Cause
The Next.js middleware uses edge runtime by default, which fails with "Code generation from strings disallowed" error in the current environment. This appears to be a sandbox/security restriction in the container environment.

### Recommended Fix
1. Add `export const runtime = 'nodejs'` is NOT supported for middleware
2. Try configuring `next.config.mjs` with `experimental: { serverActions: { bodyParser: false } }` 
3. Or disable middleware temporarily by renaming `src/middleware.ts` to `src/middleware.ts.disabled`
4. Check if Next.js 14.2.21 has known edge runtime issues - consider upgrading/downgrading