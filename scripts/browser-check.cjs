const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5173';
(async () => {
  const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), headless: true });
  try {
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'], acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const routes = ['/', '/about', '/services', '/doctors', '/appointment', '/contact', '/project', '/missing'];
    for (const width of (process.env.SKIP_MATRIX ? [] : [320, 390, 768, 1024, 1440])) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(`${BASE_URL}${route}`);
        await page.locator('main h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        assert.equal(overflow, false, `Overflow at ${width} ${route}`);
        assert.equal(await page.locator('main h1').count(), 1, `One h1 at ${route}`);
      }
      console.log(`PASS routes + horizontal overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.locator('#finder-heading').waitFor();
    await page.waitForTimeout(800);
    await page.screenshot({ path: '/tmp/smilecare-mobile.png' });
    const before = await page.locator('main').boundingBox();
    const menu = page.getByRole('button', { name: 'Open main navigation menu' });
    await menu.click();
    const after = await page.locator('main').boundingBox();
    assert.equal(before.y, after.y, 'Opening menu must not move main content');
    assert.equal(await page.locator('main').getAttribute('inert'), '');
    await page.screenshot({ path: '/tmp/smilecare-menu.png' });
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await menu.evaluate(el => document.activeElement === el), true);
    await menu.click();
    await page.locator('#mobile-navigation-drawer').getByRole('link', { name: 'Services', exact: true }).click();
    await page.locator('main h1').waitFor();
    assert.equal(await page.locator('main').getAttribute('inert'), null);
    console.log('PASS mobile menu: no layout shift, inert background, Escape, focus restore, navigation');

    await page.goto(BASE_URL);
    await page.getByLabel('Teeth alignment', { exact: true }).check();
    await page.getByRole('link', { name: 'Prepare an inquiry', exact: true }).click();
    await page.locator('#service').waitFor();
    assert.equal(await page.locator('#service').inputValue(), 'Orthodontics');
    await page.getByRole('button', { name: 'Prepare WhatsApp Request' }).click();
    assert.equal(await page.locator('#fullName').getAttribute('aria-invalid'), 'true');
    assert.equal(await page.locator('#fullName').evaluate(el => document.activeElement === el), true);
    await page.locator('#fullName').fill('Demo Visitor');
    await page.locator('#mobileNumber').fill('9876543210');
    await page.locator('#email').fill('demo@example.com');
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 2);
    const date = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth()+1).padStart(2,'0')}-${String(tomorrow.getDate()).padStart(2,'0')}`;
    await page.locator('#preferredDate').fill(date);
    await page.getByRole('radio', { name: /9 AM/ }).check();
    await page.locator('#consent').check();
    await page.getByRole('button', { name: 'Prepare WhatsApp Request' }).click();
    await page.locator('#inquiry-preview-section').waitFor();
    assert.match(await page.locator('#inquiry-preview-section pre').textContent(), /Orthodontics/);
    await page.getByRole('button', { name: 'Copy Message', exact: true }).click();
    assert.match(await page.evaluate(() => navigator.clipboard.readText()), /Demo Visitor/);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Download follow-up reminder/ }).click();
    const download = await downloadPromise;
    const calendar = await fs.readFile(await download.path(), 'utf8');
    assert.match(calendar, /STATUS:TENTATIVE/);
    assert.doesNotMatch(calendar, /Demo Visitor|9876543210/);
    assert.equal(await page.locator('a[href*="wa.me"]').count(), 0);
    console.log('PASS finder preselection, empty form/focus, valid preview, real clipboard, calendar download, disabled WhatsApp');

    await page.goto(`${BASE_URL}/contact`);
    await page.locator('#name').fill('Demo Visitor');
    await page.locator('#email').fill('demo@example.com');
    await page.locator('#subject').fill('Service information');
    await page.locator('#message').fill('Please share information about your demonstration services.');
    await page.locator('#consent').check();
    await page.getByRole('button', { name: 'Prepare Message', exact: true }).click();
    await page.locator('#contact-preview-panel').waitFor();
    await page.getByRole('button', { name: 'Copy Message', exact: true }).click();
    assert.match(await page.evaluate(() => navigator.clipboard.readText()), /Service information/);
    await page.evaluate(() => {
      Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('Blocked for test'); }, configurable: true });
      document.execCommand = () => false;
    });
    await page.getByRole('button', { name: 'Message Copied!', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Copy was blocked' }).waitFor();
    console.log('PASS contact preview, clipboard, and blocked-copy feedback');
    await page.goto(`${BASE_URL}/services#pediatric-dentistry`);
    await page.waitForFunction(() => { const target = document.getElementById('pediatric-dentistry'); return target && target.getBoundingClientRect().y < 200; });
    const faq = page.getByRole('button', { name: 'Can I request an appointment online?' });
    await faq.click(); assert.equal(await faq.getAttribute('aria-expanded'), 'true');
    await faq.click(); assert.equal(await faq.getAttribute('aria-expanded'), 'false');
    console.log('PASS service hash and FAQ disclosure');
    for (const file of ['prompt-documentation.pdf', 'prompt-documentation.md', 'original-prompts.txt', 'video-script.md', 'reviewer-guide.md', 'validation-report.md']) {
      const response = await context.request.get(`${BASE_URL}/submission/${file}`);
      assert.equal(response.status(), 200); assert.ok((await response.body()).length > 500);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${BASE_URL}/project`);
    await page.locator('main h1').waitFor();
    await page.screenshot({ path: '/tmp/smilecare-project.png', fullPage: true });
    await page.goto(BASE_URL);
    await page.waitForTimeout(800);
    await page.screenshot({ path: '/tmp/smilecare-desktop.png' });
    assert.deepEqual(errors, []);
    console.log('PASS document downloads; no uncaught browser errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
