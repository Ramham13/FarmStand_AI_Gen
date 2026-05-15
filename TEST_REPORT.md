# Test Report - 2026-05-15 23:23 UTC

## Last Commit: 9a78daa Post-test fixes and updates

## Tests
| Page | Status | Notes |
|------|--------|-------|
| TypeScript | PASS | No type errors |
| Dev Server | FAIL | 500 error on home page |
| Home | FAIL | ModuleBuildError: metadata export conflict with "use client" |
| Explore | SKIP | Server error blocks testing |
| Farm Profiles | SKIP | Server error blocks testing |

## Bugs Found
- [x] **Critical**: `src/app/page.tsx` has `"use client"` directive but exports `metadata`. In Next.js App Router, Server Components can export metadata, but Client Components cannot. The page uses useState/useEffect so it needs to be client-side, but then metadata must be removed or moved to layout.tsx.

## Summary
FAIL - Dev server returns 500 error due to Next.js metadata export conflict. The home page cannot load because it's attempting to export `metadata` from a component marked with "use client".

## Fix Required
Move metadata to `src/app/layout.tsx` (the proper place for root metadata in Next.js App Router), or use `generateMetadata` function in a Server Component wrapper, then import the client component.