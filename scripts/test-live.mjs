import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { execFileSync } from 'node:child_process';

const source = await createServer({configFile:false,server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
let projects, filters;
try {
  const data=await source.ssrLoadModule('/src/data.ts');
  projects=data.allProjects; filters=data.projectFilters;
} finally { await source.close(); }
const requiredOrder=['teamsync-ai','adhd-planner','scopion','shopping-qa','anomaly-detection','housing-price'];
assert.deepEqual(projects.map(p=>p.slug),requiredOrder,'Six projects must follow the requested order');

const base = (process.env.TEST_BASE_URL || 'https://ipp-portfolio-hazel.vercel.app').replace(/\/$/, '');
const expected = process.env.EXPECTED_REVISION || '';
const output = process.env.TEST_OUTPUT_DIR || 'test-results/live';
await mkdir(output, { recursive: true });
const report = { target: base, expectedRevision: expected || null, actualRevision: null,
  sourceRevision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  sourceDirty:!!execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim(),
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
  const localLinks=new Set();
  const go = async path => {
    assert.equal((await page.goto(`${base}${path}`)).status(), 200);
    assert.equal(await page.locator('a[href^="tel:"]').count(), 0, 'Telephone link must not be public');
    assert(!/\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b/.test(await page.locator('body').innerText()), 'Telephone value must not be public');
    assert.equal(await page.locator('meta[name=build-revision]').getAttribute('content'), report.actualRevision,
      'A new deployment replaced the target during this run');
    for(const href of await page.locator('a[href]').evaluateAll(nodes=>nodes.map(a=>a.href))){
      const url=new URL(href);
      assert(!['file:','sediment:'].includes(url.protocol),'Local file URI must not be public');
      assert(!url.pathname.startsWith('/workspace/')&&!url.pathname.startsWith('/tmp/'),'Workspace path must not be public');
      if(url.origin===new URL(base).origin){url.hash='';localLinks.add(url.href);}
    }
    for(const href of await page.locator('a[href^="#"]').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')))){
      assert(await page.locator(`[id="${href.slice(1)}"]`).count(),`Missing fragment ${href} on ${path}`);
    }
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
    assert.equal(await page.locator('.project-card').count(), projects.length);
    assert.deepEqual(await page.locator('.project-card').evaluateAll(cards=>cards.map(c=>c.dataset.project)),requiredOrder);
    assert.equal(await page.locator('.tech-category').count(),5);
    assert((await page.locator('.hero-description').innerText()).includes('일상에서 느낀 불편함을 개발로 해결해 보는 것을 좋아합니다.'));
    assert((await page.locator('.hero-description').innerText()).includes('필요한 기술을 하나씩 배우며 아이디어를 실제 기능으로 만들어 갑니다.'));
    assert.equal(await page.locator('.about-lead').innerText(),'작은 아이디어도 실제로 구현하는 여러 프로젝트를 경험하며 개발자로서의 방향을 찾아가고 있습니다.');
    assert.equal(await page.locator('#how-i-work-title').innerText(),'How I Work.');
    assert.equal(await page.locator('.work-principles article').count(),3);
    assert.equal(await page.locator('#tech-group-2').innerText(),'DB');
    assert.equal(await page.locator('#tech-group-2').locator('..').locator('p').count(),0);
    assert.equal(await page.locator('.hero-target').count(),0);
    for(const p of projects){
      const card=page.locator(`[data-project="${p.slug}"]`);
      const expectedTags=p.cardTags || p.tags.slice(0,6);
      assert(expectedTags.length>=4 && expectedTags.length<=6);
      assert.deepEqual(await card.locator('.tags span').allTextContents(),expectedTags);
      await card.scrollIntoViewIfNeeded();
      for(const image of await card.locator('img').all())assert(await image.evaluate(async el=>{await el.decode();return el.naturalWidth>0;}));
    }
    assert.equal(await page.locator('.card-adhd-planner img').count(),0,'Planner uses a labelled flow, never another project screenshot');
    assert.equal(await page.locator('.card-teamsync-ai img').getAttribute('src'),'./media/teamsync-dashboard.png');
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
    for (const {key} of [...filters.filter(f=>f.key!=='all'),filters.find(f=>f.key==='all')]) {
      const count=key==='all'?projects.length:projects.filter(p=>p.filters.includes(key)).length;
      assert.equal(await page.locator(`[data-filter=${key}] span`).innerText(),String(count).padStart(2,'0'));
      await page.locator(`[data-filter=${key}]`).click(); await page.waitForTimeout(400);
      assert.equal(await page.locator('.project-card:visible').count(), count);
    }
    assert.deepEqual(await page.locator('.card-number').allTextContents(), projects.map(p=>`/${p.number}`));
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
      assert(await pixels()); await page.screenshot({path:`${output}/trail-step-${step}.png`}); await page.waitForTimeout(750); assert.equal(await pixels(), false); await visible();
    }
    await page.mouse.down(); await page.waitForTimeout(60); assert(await pixels());
    await page.screenshot({path:`${output}/click-ripple.png`}); await page.mouse.up(); await page.waitForTimeout(650); assert.equal(await pixels(), false);
  });
  await check('Stationary cursor survives scroll', async () => {
    await page.mouse.move(720, 180); await visible(); await page.mouse.wheel(0, 180);
    await page.waitForTimeout(200); await visible();
  });
  await page.screenshot({ path: `${output}/desktop.png` });
  await check('All six direct/reloaded detail routes, navigation, evidence and media', async () => {
    for (const [index,p] of projects.entries()) {
      const slug=p.slug;
      await go(`/projects/${slug}/`); await page.locator('h1').hover(); await visible();
      assert.equal(await page.locator('.detail-breadcrumb a').getAttribute('href'), '../../#projects');
      assert.equal(await page.title(),`${p.title} | 정유진 포트폴리오`);
      assert.equal(await page.locator('meta[name=description]').getAttribute('content'),p.summary);
      assert((await page.locator('.detail-breadcrumb').innerText()).includes(p.number));
      assert.equal(await page.locator('.project-pagination a').first().getAttribute('href'),`../../projects/${projects[(index-1+projects.length)%projects.length].slug}/`);
      assert.equal(await page.locator('.project-pagination a').last().getAttribute('href'),`../../projects/${projects[(index+1)%projects.length].slug}/`);
      const reload=await page.reload();assert.equal(reload.status(),200);await page.locator('h1').hover();await visible();
      for(const link of await page.locator('.project-links a').all()){
        assert.equal(await link.getAttribute('target'),'_blank');
        assert((await link.getAttribute('rel')).includes('noopener'));
        assert((await link.getAttribute('rel')).includes('noreferrer'));
      }
      if(slug==='teamsync-ai'){
        assert((await page.locator('#results').innerText()).includes('3/6쌍'));
        assert((await page.locator('#results').innerText()).includes('오탐 2건'));
        assert((await page.locator('#limitations').innerText()).includes('합성 사례'));
        assert((await page.locator('#limitations').innerText()).includes('JSON Import'));
        assert.equal(await page.locator('.project-links a').count(),4);
      }
      if(slug==='adhd-planner'){
        assert((await page.locator('#role').innerText()).includes('Vanilla JavaScript'));
        assert(!((await page.locator('.detail-hero .tags').innerText()).includes('React')));
        assert.equal(await page.getByRole('link',{name:'View GitHub'}).getAttribute('href'),'https://github.com/solw29/adhd-planner');
        assert.equal(await page.getByRole('link',{name:'Live Demo'}).getAttribute('href'),'https://adhd-planner-five.vercel.app/');
        assert((await page.locator('.engineering-notes').innerText()).includes('expectedRevision'));
        assert((await page.locator('.engineering-notes').innerText()).includes('409'));
        assert.equal(await page.locator('.project-links a').count(),2);
      }
      if (slug === 'anomaly-detection') assert((await page.locator('table').first().innerText()).includes('0.5861 ± 0.0023'));
      for (const image of await page.locator('.visual-gallery img').all()) {
        await image.scrollIntoViewIfNeeded();
        assert(await image.evaluate(async el => { await el.decode(); return el.naturalWidth > 0; }));
      }
      if (slug === 'scopion' || slug === 'teamsync-ai') {
        await page.waitForFunction(() => document.querySelector('video').readyState >= 1);
        const duration=await page.locator('video').evaluate(v=>v.duration);assert(duration>0);
        if(slug==='scopion')assert(Math.abs(duration-90.8)<1);
        if(slug==='teamsync-ai')assert(Math.abs(duration-105)<1,'TeamSync must serve the updated 1:45 video');
        await page.locator('video').evaluate(v=>v.play());
        await page.waitForFunction(()=>document.querySelector('video').currentTime>0.1);
        await page.locator('video').evaluate(v=>v.pause());
      }
      if (slug === 'shopping-qa') assert.equal((await page.request.get(`${base}/documents/ack-2026-poster.pdf`)).status(), 200);
    }
  });
  await check('Internal navigation, download and evidence file paths',async()=>{
    for(const url of localLinks){
      const response=await page.request.head(url);assert.equal(response.status(),200,`Broken local link ${url}`);
      const type=response.headers()['content-type'] || '';
      if(/\.(zip|pdf|mp4|csv|svg)$/.test(new URL(url).pathname))assert(!type.includes('text/html'),`HTML fallback for evidence file ${url}`);
    }
    report.internalLinksChecked=localLinks.size;
  });
  await check('Responsive layouts and mobile keyboard navigation', async () => {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 }); await go('/');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.locator('.project-card').count(),projects.length);
      for(const p of projects){
        const card=page.locator(`[data-project="${p.slug}"]`);await card.scrollIntoViewIfNeeded();
        assert(await card.isVisible());
        assert(await card.evaluate(el=>el.scrollWidth<=el.clientWidth));
      }
      await page.screenshot({path:`${output}/projects-${width}.png`});
      for(const p of projects){
        await go(`/projects/${p.slug}/`);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width}px detail overflow: ${p.slug}`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 }); await go('/');
    await page.waitForFunction(()=>document.querySelector('.project-filters')?.hidden===false);
    const menu=page.locator('.menu-toggle');
    await menu.focus();
    assert.equal(await menu.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
    await menu.press('Enter');
    await page.waitForFunction(()=>document.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='true');
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
  if(process.env.TEST_EXTERNAL_LINKS==='1')await check('External GitHub evidence and Planner live URL',async()=>{
    report.externalLinks=[];
    const urls=[...new Set(projects.flatMap(p=>(p.links||[]).map(l=>l.url)).filter(url=>url.startsWith('https://')))];
    for(const url of urls){
      let response=await page.request.get(url,{timeout:30000});
      if(response.status()===429){await pause(5000);response=await page.request.get(url,{timeout:30000});}
      const result={url,status:response.status()};report.externalLinks.push(result);
      // GitHub can rate-limit shared hosted runners. Verify the exact public source
      // only for 429; preserve the original status instead of claiming HTTP 200.
      if(response.status()===429 && url.startsWith('https://github.com/')){
        const parts=new URL(url).pathname.split('/').filter(Boolean);
        const rawPath=parts[2]==='blob'?parts.slice(3).join('/'):'HEAD/README.md';
        result.sourceUrl=`https://raw.githubusercontent.com/${parts[0]}/${parts[1]}/${rawPath}`;
        const source=await page.request.get(result.sourceUrl,{timeout:30000});
        result.sourceStatus=source.status();
        assert.equal(source.status(),200,`Rate-limited evidence source unavailable: ${url}`);
        console.log(`GitHub HTTP 429 recorded; exact source verified: ${result.sourceUrl}`);
      }else assert.equal(response.status(),200,`External evidence unavailable: ${url}`);
      if(url==='https://adhd-planner-five.vercel.app/')assert((await response.text()).includes("Let's Go"),'Planner must return the actual app');
    }
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
