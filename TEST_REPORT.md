# Test Report - 2026-05-15 18:43 UTC

## Last Commit: 79647d3 Sprint: Add customer orders tracking page + CI/CD workflow + dynamic homepage

## Tests
| Page | Status | Notes |
|------|--------|-------|
| TypeScript | PASS | No type errors |
| Home (/) | FAIL | Returns 500 error - TypeError: Cannot read properties of undefined (reading 'clientModules') |
| Explore (/explore) | FAIL | Returns 200 but embedded 500 error in page props |
| Farm Profile (/farm/[slug]) | FAIL | No farms in DB to test; route exists but returns 404 for unknown slugs |

## Bugs Found
- [x] Runtime crash on home page - Next.js server error: "Cannot read properties of undefined (reading 'clientModules')"
- [x] Same error propagates to explore page
- [x] No farms accessible to test farm profile pages

## Summary
FAIL - Server returns 500 errors on all pages. TypeScript compiles but runtime crashes. The recent commit may have broken something in the app rendering pipeline.