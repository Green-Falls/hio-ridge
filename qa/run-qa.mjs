// QA runner for every page in dist/: overflow, broken images, console errors, text under 13px,
// tap targets under 44px, the first-screen check (the inquiry button inside 375x812 on the home
// page), em dashes in visible text, dead internal links, axe-core, and a screenshot per page and width.
// Usage: node qa/run-qa.mjs [baseUrl]   (default http://127.0.0.1:8080; serve dist/ first: npm start)
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] || 'http://127.0.0.1:8080').replace(/\/$/, '');
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname));
const shots = path.join(root, 'screenshots');
fs.mkdirSync(shots, { recursive: true });
const exe = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
const pages = JSON.parse(fs.readFileSync(path.join(root, '..', 'dist', 'pages.json'), 'utf8')).map((p) => '/' + p.replace(/index\.html$/, '').replace(/^404\.html$/, '404.html'));
const WIDTHS = [[375, 812], [768, 1024], [1440, 900]];

const browser = await chromium.launch({ executablePath: exe });
const results = {};
let problems = 0;
const flag = (page, w, msg) => { problems++; console.log(`  ✗ ${page} @${w}: ${msg}`); };

for (const p of pages) {
  results[p] = {};
  for (const [w, h] of WIDTHS) {
    const context = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768, deviceScaleFactor: w < 768 ? 2 : 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    const resp = await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
    // Load every lazy image before the full-page screenshot, so the sheet shows photos, not placeholders.
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
      for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.8)) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      scrollTo(0, 0);
      const t0 = Date.now();
      while (Date.now() - t0 < 15000 && [...document.images].some((i) => !i.complete || (i.naturalWidth === 0 && i.getAttribute('src')))) await new Promise((r) => setTimeout(r, 100));
    });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const name = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
      const wide = [];
      document.querySelectorAll('body *').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.width && (b.right > docW + 1 || b.left < -1)) { const cs = getComputedStyle(el); if (cs.position !== 'fixed' && !el.closest('.skip, .sr-only, .menu, [hidden]')) wide.push(name(el)); }
      });
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && !i.closest('[hidden]')).map((i) => i.getAttribute('src'));
      const small = [], tiny = [], dashes = [];
      document.querySelectorAll('body *').forEach((el) => {
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!hasText) return;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('.sr-only, [hidden], [aria-hidden="true"], .menu')) return;
        const fs = parseFloat(cs.fontSize);
        if (fs < 13) small.push(name(el) + ' ' + fs.toFixed(1) + 'px');
        if (/—/.test(el.textContent)) dashes.push(name(el));
      });
      document.querySelectorAll('a, button, input, select, textarea, summary').forEach((el) => {
        if (el.closest('[hidden], .menu, .sr-only')) return;
        const b = el.getBoundingClientRect();
        if (b.width && b.height && (b.height < 44 || b.width < 44)) tiny.push(name(el) + ' "' + el.textContent.trim().slice(0, 24) + '" ' + Math.round(b.width) + 'x' + Math.round(b.height));
      });
      const vh = window.innerHeight;
      const cta = document.querySelector('.hero .btn');
      const ctaIn = cta ? (() => { const b = cta.getBoundingClientRect(); return b.top >= 0 && b.bottom <= vh; })() : null;
      const h1 = document.querySelectorAll('h1').length;
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h.startsWith('/') && !h.startsWith('//'));
      const landmarks = ['header', 'nav', 'main', 'footer'].filter((t) => !document.querySelector(t));
      return { wide: [...new Set(wide)], broken, small, tiny, dashes, ctaIn, h1, links: [...new Set(links)], landmarks, title: document.title, desc: document.querySelector('meta[name=description]')?.content || '' };
    });
    await page.screenshot({ path: path.join(shots, `${p === '/' ? 'home' : p.replace(/[\/.]/g, '-').replace(/^-|-$/g, '')}--${w}.jpg`), fullPage: true, quality: 70, type: 'jpeg' });
    if (resp.status() >= 400 && p !== '/404.html') flag(p, w, 'HTTP ' + resp.status());
    if (r.wide.length) flag(p, w, 'overflow: ' + r.wide.slice(0, 6).join(', '));
    if (r.broken.length) flag(p, w, 'broken images: ' + r.broken.join(', '));
    if (r.small.length) flag(p, w, 'text under 13px: ' + r.small.slice(0, 6).join(', '));
    if (r.tiny.length) flag(p, w, 'tap targets under 44px: ' + r.tiny.slice(0, 8).join(', '));
    if (r.dashes.length) flag(p, w, 'em dash in visible text: ' + r.dashes.slice(0, 4).join(', '));
    if (r.h1 !== 1) flag(p, w, r.h1 + ' h1 elements');
    if (r.landmarks.length) flag(p, w, 'missing landmarks: ' + r.landmarks.join(', '));
    if (p === '/' && w === 375 && r.ctaIn === false) flag(p, w, 'the hero button is below the first screen');
    if (errors.length) flag(p, w, 'console: ' + errors.slice(0, 3).join(' | '));
    if (w === 375 || w === 1440) {
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).exclude('.menu').analyze();
      r.axe = axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help }));
      if (r.axe.length) flag(p, w, 'axe: ' + r.axe.map((v) => `${v.id} (${v.impact}, ${v.nodes})`).join(', '));
    }
    // Dead internal links, checked once per page.
    if (w === 1440) for (const href of r.links) {
      const clean = href.split('?')[0].split('#')[0];
      if (!clean) continue;
      const f = path.join(root, '..', 'dist', clean.endsWith('/') ? clean + 'index.html' : clean);
      if (!fs.existsSync(f)) flag(p, w, 'dead link ' + href);
    }
    results[p][w] = r;
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(root, 'qa-results.json'), JSON.stringify(results, null, 2));
console.log(problems ? `\n${problems} problem(s) found. Screenshots in qa/screenshots/.` : `\nAll checks passed on ${pages.length} pages at ${WIDTHS.map((w) => w[0]).join('/')}. Screenshots in qa/screenshots/.`);
process.exit(problems ? 1 : 0);
