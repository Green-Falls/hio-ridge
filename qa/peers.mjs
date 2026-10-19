// Competitor capture: screenshots at desktop and phone plus a measured profile of each site, so the
// comparison is of things we looked at, not things we remember.
//   node qa/peers.mjs <out-dir> name=url [name=url ...]
// Records per site: title, h1, meta description, fonts actually used (by element count), body background
// and heading colour, button background, nav labels, CTA labels, whether prices appear, hero media type,
// platform (generator meta or telltale paths), schema types, visible word count, first-view weight,
// and the first 1200 characters of visible text. Writes <out>/peers.json and <out>/<name>--{desk,phone}.jpg.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const [out, ...pairs] = process.argv.slice(2);
if (!out || !pairs.length) { console.error('usage: node qa/peers.mjs <out-dir> name=url ...'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });
const exe = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ executablePath: exe, proxy });
const results = {};

for (const pair of pairs) {
  const [name, url] = pair.split(/=(.+)/);
  const r = { url };
  for (const [tag, vp, mobile] of [['desk', { width: 1440, height: 900 }, false], ['phone', { width: 390, height: 844 }, true]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1, userAgent: mobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
    const page = await ctx.newPage();
    let bytes = 0; page.on('response', async (res) => { try { const h = res.headers()['content-length']; if (h) bytes += +h; } catch {} });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    } catch (e) { r[tag + 'Error'] = String(e).slice(0, 120); try { await page.waitForTimeout(1500); } catch {} }
    try {
      await page.evaluate(async () => { for (let y = 0; y < Math.min(document.documentElement.scrollHeight, 12000); y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } scrollTo(0, 0); });
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(out, `${name}--${tag}.jpg`), fullPage: true, quality: 65, type: 'jpeg' });
      if (tag === 'desk') {
        r.firstViewBytes = bytes;
        Object.assign(r, await page.evaluate(() => {
          const txt = (el) => (el ? el.textContent.trim().replace(/\s+/g, ' ') : '');
          const fonts = {};
          document.querySelectorAll('h1,h2,h3,p,a,li,span,button').forEach((el) => { const f = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim(); if (f) fonts[f] = (fonts[f] || 0) + 1; });
          const h1 = document.querySelector('h1');
          const btns = [...document.querySelectorAll('a,button')].filter((el) => { const cs = getComputedStyle(el); return cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && el.offsetHeight > 30 && txt(el).length > 1 && txt(el).length < 40; });
          const nav = [...document.querySelectorAll('nav a, header a')].map(txt).filter((t) => t && t.length < 30);
          const body = document.body.innerText || '';
          const vid = !!document.querySelector('video, iframe[src*="vimeo"], iframe[src*="youtube"]');
          const gen = document.querySelector('meta[name=generator]')?.content || '';
          const html = document.documentElement.outerHTML;
          const platform = gen || (/wp-content/.test(html) ? 'WordPress' : /squarespace/.test(html) ? 'Squarespace' : /wixstatic|wix\.com/.test(html) ? 'Wix' : /showit/.test(html) ? 'Showit' : /webflow/.test(html) ? 'Webflow' : /godaddy|secureserver/.test(html) ? 'GoDaddy' : 'unknown');
          const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return JSON.stringify((j['@graph'] || [j]).map((x) => x['@type'])); } catch { return 'invalid'; } });
          const hero = document.querySelector('h1') || document.querySelector('main') || document.body;
          return {
            title: document.title, description: document.querySelector('meta[name=description]')?.content || '', h1: txt(h1),
            fonts: Object.entries(fonts).sort((a, b) => b[1] - a[1]).slice(0, 4),
            bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color,
            h1Color: h1 ? getComputedStyle(h1).color : '', h1Size: h1 ? getComputedStyle(h1).fontSize : '', h1Font: h1 ? getComputedStyle(h1).fontFamily.split(',')[0].replace(/["']/g, '') : '',
            buttons: [...new Set(btns.map((b) => `${txt(b)} [${getComputedStyle(b).backgroundColor} / ${getComputedStyle(b).color} / r${getComputedStyle(b).borderRadius}]`))].slice(0, 6),
            nav: [...new Set(nav)].slice(0, 14),
            pricesShown: /\$\s?\d{1,3}(,\d{3})+|\$\d{4,}|starting at|packages? start/i.test(body),
            priceSnippets: (body.match(/[^.\n]{0,60}\$\s?\d[\d,]{2,}[^.\n]{0,60}/g) || []).slice(0, 4),
            heroVideo: vid, platform, schema, words: body.split(/\s+/).filter(Boolean).length, sample: body.replace(/\s+/g, ' ').slice(0, 1200),
            images: document.images.length,
          };
        }));
      }
    } catch (e) { r[tag + 'Error2'] = String(e).slice(0, 120); }
    await ctx.close();
  }
  results[name] = r;
  console.log(name, r.deskError || r.deskError2 || '', r.platform || '', r.h1Font || '', r.pricesShown === undefined ? '' : `prices:${r.pricesShown}`);
}
await browser.close();
fs.writeFileSync(path.join(out, 'peers.json'), JSON.stringify(results, null, 2));
