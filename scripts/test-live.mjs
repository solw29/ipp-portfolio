import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = (process.env.TEST_BASE_URL || 'https://ipp-portfolio-hazel.vercel.app').replace(/\/$/, '');
const expected = process.env.EXPECTED_REVISION || '';
const output = process.env.TEST_OUTPUT_DIR || 'test-results/live';
await mkdir(output, { recursive: true });
const report = { target: base, expectedRevision: expected || null, actualRevision: null,
  startedAt: new Date().toISOString(), checks: [], errors: [], status: 'running' };
let browser;
const check = async (name, action) => {
  await action(); report.checks.push({ name, status: 'passed' }); console.log(`PASS ${name}`);
};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  // A push can finish before Vercel has built it. Never silently test an old commit.
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(base, { signal: AbortSignal.timeout(20000), cache: 'no-store' });
    assert.equal(response.status, 200, `Home HTTP ${response.status}`);
    const html = await response.text();
    report.actualRevision = html.match(/name="build-revision" content="([^"]+)"/)?.[1] || null;
    if (!expected || report.actualRevision === expected) break;
    if (attempt >= 35) throw new Error(`Deployment revision mismatch: expected ${expected}, got ${report.actualRevision}`);
    console.log(`Waiting for deployment ${expected}; currently ${report.actualRevision}`);
    await pause(10000);
  }
  browser = await chromium.launch({ headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 },
    recordVideo: { dir: `${output}/videos`, size: { width: 1440, height: 1000 } },
    permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400) report.errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  page.setDefaultTimeout(15000);
  const go = async path => {
    assert.equal((await page.goto(`${base}${path}`)).status(), 200);
    assert.equal(await page.locator('a[href^="tel:"]').count(), 0, 'Telephone link must not be public');
    assert(!/\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b/.test(await page.locator('body').innerText()), 'Telephone value must not be public');
    assert.equal(await page.locator('meta[name=build-revision]').getAttribute('content'), report.actualRevision,
      'A new deployment replaced the target during this run');
  };
  const visible = async () => { await page.waitForTimeout(40); assert(await page.locator('#custom-cursor').isVisible()); };
  const pixels = () => page.evaluate(() => {
    const c = document.querySelector('#cursor-trail');
    return c.getContext('2d').getImageData(0, 0, c.width, c.height).data.some((v, i) => i % 4 === 3 && v > 0);
  });
  await go('/'); await page.waitForTimeout(1100);
  await check('Hero and exact 15 technology cards', async () => {
    assert((await page.locator('h1').innerText()).includes('CHUNG'));
    assert.deepEqual(await page.locator('#skills .skill-name').allTextContents(), ['Python','C','Java','TypeScript','JSP','Vite','Tailwind CSS','Oracle Database','MySQL','PyTorch','TensorFlow','Hugging Face Transformers','Linux','Git','GitHub']);
    assert.equal(await page.locator('.project-card').count(), 4);
  });
  await check('Cursor on heading, description, navigation, skill and project', async () => {
    await page.mouse.move(700, 180); await visible();
    for (const target of ['h1', '.hero-description', '#nav a', '.skill-card', '.project-card']) {
      await page.locator(target).first().hover(); await visible(); await page.waitForTimeout(180);
    }
  });
  await check('Border glow and no hover size shift', async () => {
    const tile = page.locator('.skill-card').first(); await tile.scrollIntoViewIfNeeded();
    const before = await tile.boundingBox(); await tile.hover(); await page.waitForTimeout(300);
    const after = await tile.boundingBox(); assert(Math.abs(after.width - before.width) < .1);
    assert(Math.abs(after.height - before.height) < .1);
    assert((await tile.evaluate(e => getComputedStyle(e).boxShadow)).includes('50, 230, 255'));
  });
  await check('Project filters and data', async () => {
    for (const [key, count] of [['web', 1], ['ai', 3], ['data', 3], ['all', 4]]) {
      await page.locator(`[data-filter=${key}]`).click(); await page.waitForTimeout(400);
      assert.equal(await page.locator('.project-card:visible').count(), count);
    }
    assert.deepEqual(await page.locator('.card-number').allTextContents(), ['/01', '/02', '/03', '/04']);
  });
  await check('Contact: email/GitHub only, copy works, no telephone', async () => {
    assert.equal(await page.locator('#contact .contact-row').count(), 2);
    assert.equal(await page.locator('#contact .contact-row a[href^="mailto:"]').getAttribute('href'), 'mailto:minteugene59@gmail.com');
    assert.equal(await page.locator('#contact a[href*="github.com/"]').getAttribute('href'), 'https://github.com/solw29');
    await page.locator('.copy-email').click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'minteugene59@gmail.com');
  });
  await check('Navigation and current section', async () => {
    await page.locator('#nav a[href="#skills"]').click(); await page.waitForTimeout(1000);
    assert.equal(await page.locator('#nav a[aria-current]').getAttribute('href'), '#skills');
  });
  await go('/'); await page.waitForTimeout(700);
  await check('Fast/slow petal trail, ripple and idle fade', async () => {
    for (const step of [12, 2]) {
      for (let i = 0; i < 28; i++) { await page.mouse.move(650 + i * step, 180 + 45 * Math.sin(i / 6)); await page.waitForTimeout(12); }
      assert(await pixels()); await page.waitForTimeout(750); assert.equal(await pixels(), false); await visible();
    }
    await page.mouse.down(); await page.waitForTimeout(60); assert(await pixels());
    await page.mouse.up(); await page.waitForTimeout(650); assert.equal(await pixels(), false);
  });
  await check('Stationary cursor survives scroll', async () => {
    await page.mouse.move(720, 180); await visible(); await page.mouse.wheel(0, 180);
    await page.waitForTimeout(200); await visible();
  });
  await page.screenshot({ path: `${output}/desktop.png` });
  await check('All four direct detail routes, data and actual media', async () => {
    for (const slug of ['scopion', 'anomaly-detection', 'shopping-qa', 'housing-price']) {
      await go(`/projects/${slug}/`); await page.locator('h1').hover(); await visible();
      assert.equal(await page.locator('.detail-breadcrumb a').getAttribute('href'), '../../#projects');
      assert(await page.locator('meta[name=description]').getAttribute('content'));
      if (slug === 'anomaly-detection') assert((await page.locator('table').first().innerText()).includes('0.5861 ± 0.0023'));
      for (const image of await page.locator('.visual-gallery img').all()) {
        await image.scrollIntoViewIfNeeded();
        assert(await image.evaluate(async el => { await el.decode(); return el.naturalWidth > 0; }));
      }
      if (slug === 'scopion') {
        await page.waitForFunction(() => document.querySelector('video').readyState >= 1);
        assert(Math.abs(await page.locator('video').evaluate(v => v.duration) - 90.8) < 1);
      }
      if (slug === 'shopping-qa') assert.equal((await page.request.get(`${base}/documents/ack-2026-poster.pdf`)).status(), 200);
    }
  });
  await check('Responsive layouts and mobile keyboard navigation', async () => {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 }); await go('/');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    await page.setViewportSize({ width: 390, height: 844 }); await go('/');
    await page.locator('.menu-toggle').focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement === document.querySelector('#nav a'), null, { timeout: 5000 });
    await page.keyboard.press('Escape'); assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.screenshot({ path: `${output}/mobile.png` });
  });
  await check('Reduced Motion and touch fallback', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(100);
    assert.equal(await page.locator('#custom-cursor').isVisible(), false);
    const mobile = await browser.newContext({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });
    const m = await mobile.newPage(); assert.equal((await m.goto(base)).status(), 200);
    await m.touchscreen.tap(220, 180); assert.equal(await m.locator('#custom-cursor').isVisible(), false); await mobile.close();
  });
  await check('No page/console/asset errors', async () => assert.deepEqual(report.errors, []));
  await context.close();
  report.status = 'passed';
} catch (error) {
  report.status = 'failed'; report.failure = String(error.stack || error);
  console.error(report.failure); process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(`Test status: ${report.status}; target ${base}; revision ${report.actualRevision}`);
}
