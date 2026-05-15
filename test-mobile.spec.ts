import { test, expect } from '@playwright/test';

test('mobile viewport and no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Check no horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  
  // Test Explore page
  await page.goto('http://localhost:3000/explore');
  await page.waitForLoadState('networkidle');
  const scrollWidth2 = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth2 = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth2).toBeLessThanOrEqual(clientWidth2);
  
  // Test Farm profile
  await page.goto('http://localhost:3000/farm/sunny-meadow-farm');
  await page.waitForLoadState('networkidle');
  const scrollWidth3 = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth3 = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth3).toBeLessThanOrEqual(clientWidth3);
});