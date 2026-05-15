const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // Mobile viewport
  });
  
  const results = [];
  
  // Test Home page
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    const homeTitle = await page.title();
    const homeErrors = [];
    page.on('pageerror', err => homeErrors.push(err.message));
    results.push({ page: 'Home', status: 'PASS', notes: `Title: ${homeTitle}` });
    await page.close();
  } catch (e) {
    results.push({ page: 'Home', status: 'FAIL', notes: e.message });
  }

  // Test Explore page
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3000/explore', { waitUntil: 'networkidle', timeout: 30000 });
    const exploreErrors = [];
    page.on('pageerror', err => exploreErrors.push(err.message));
    results.push({ page: 'Explore', status: 'PASS', notes: 'Page loaded' });
    await page.close();
  } catch (e) {
    results.push({ page: 'Explore', status: 'FAIL', notes: e.message });
  }

  // Test Farm Profile page
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3000/farm/sunny-meadow-farm', { waitUntil: 'networkidle', timeout: 30000 });
    const farmErrors = [];
    page.on('pageerror', err => farmErrors.push(err.message));
    results.push({ page: 'Farm Profile', status: 'PASS', notes: 'Page loaded' });
    await page.close();
  } catch (e) {
    results.push({ page: 'Farm Profile', status: 'FAIL', notes: e.message });
  }

  // Check horizontal scroll on mobile
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const hasHorizontalScroll = scrollWidth > viewportWidth;
    results.push({ page: 'Mobile Scroll', status: hasHorizontalScroll ? 'FAIL' : 'PASS', notes: `scrollWidth: ${scrollWidth}, viewport: ${viewportWidth}` });
    await page.close();
  } catch (e) {
    results.push({ page: 'Mobile Scroll', status: 'FAIL', notes: e.message });
  }

  // Check button tap sizes
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    const buttons = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a[href]'));
      const smallButtons = btns.filter(b => {
        const rect = b.getBoundingClientRect();
        return rect.width < 44 || rect.height < 44;
      });
      return { total: btns.length, smallCount: smallButtons.length };
    });
    results.push({ page: 'Touch Targets', status: buttons.smallCount === 0 ? 'PASS' : 'WARN', notes: `${buttons.smallCount} buttons < 44px` });
    await page.close();
  } catch (e) {
    results.push({ page: 'Touch Targets', status: 'FAIL', notes: e.message });
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();