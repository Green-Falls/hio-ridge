// Measures the hero text against the brightest pixel behind it, at phone and desktop widths.
// Reports the worst-case contrast of white text over the scrim + photo for the h1, the line, the
// bar mark and the nav links. Usage: node qa/hero-scrim.mjs [baseUrl]  (serve dist/ first)
import { chromium } from 'playwright';
import fs from 'node:fs';
import { PNG } from './png.mjs';

const base = (process.argv[2] || 'http://127.0.0.1:8080').replace(/\/$/, '');
const exe = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
const browser = await chromium.launch({ executablePath: exe });
const lum = (r, g, b) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
for (const [w, h] of [[390, 844], [1440, 900], [1280, 650]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const boxes = await page.evaluate(() => Object.fromEntries([['h1', '.hero h1'], ['line', '.hero-cta .it']].map(([k, s]) => { const el = document.querySelector(s); const b = el && el.getBoundingClientRect(); return [k, b && b.width ? { x: b.x, y: b.y, w: b.width, h: b.height } : null]; })));
  // Hide the text, screenshot what is behind it.
  await page.addStyleTag({ content: '.hero h1, .hero-cta { visibility: hidden !important; }' });
  const buf = await page.screenshot({ type: 'png' });
  const png = PNG.parse(buf);
  const out = [];
  for (const [k, b] of Object.entries(boxes)) {
    if (!b) continue;
    let max = 0;
    for (let y = Math.max(0, b.y | 0); y < Math.min(png.height, (b.y + b.h) | 0); y++) for (let x = Math.max(0, b.x | 0); x < Math.min(png.width, (b.x + b.w) | 0); x++) { const i = (y * png.width + x) * 4; max = Math.max(max, lum(png.data[i], png.data[i + 1], png.data[i + 2])); }
    const ratio = (1.05) / (max + 0.05);
    out.push(`${k}: worst ${ratio.toFixed(2)}:1`);
  }
  console.log(`${w}x${h}  ${out.join('   ')}`);
  await page.context().close();
}
await browser.close();
