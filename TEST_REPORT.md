# Test Report - 2026-05-16 01:36 UTC

## Last Commit: 2d3ac2e Sprint: Add edge case handling for suspended/banned farms

## Tests
| Page | Status | Notes |
|------|--------|-------|
| TypeScript | FAIL | 7 errors in notification-center.tsx - missing exports from @/lib/notifications |
| Home | PASS | Page loads correctly, no crash |
| Explore | PASS | Page loads correctly with farm listings |
| Farm Profile | PASS | Page loads correctly with products |

## Bugs Found
- [ ] **TypeScript Error**: `notification-center.tsx` imports non-existent functions from `@/lib/notifications`:
  - `getStoredNotifications` (suggested: `useNotifications`)
  - `markAsRead`
  - `markAllAsRead`
  - `clearAllNotifications`
  - `getUnreadCount`
  - `formatTimestamp`
- [ ] **TypeScript Error**: Invalid prop `system` passed to component - does not exist in `Record<NotificationType, Element>`

## Summary
FAIL - TypeScript compilation failed. The notification-center.tsx component has broken imports that need to be fixed before merging. Pages render correctly when dev server is running.