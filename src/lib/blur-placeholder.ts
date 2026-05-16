// Simple blur placeholder utility
// Generates a tiny base64-encoded gray image for Next.js Image blur placeholder

function generateBlurDataURL(): string {
  // Simple 1x1 gray pixel base64 - creates a subtle gray blur
  // This is the smallest possible blur placeholder
  return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxjZWxsIHg9IjAiIHk9IjAiIGZpbGw9IiNlN2U3ZTciLz48L3N2Zz4="
}

export function getBlurDataURL(): string {
  return generateBlurDataURL()
}