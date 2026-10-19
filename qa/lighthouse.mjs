// Three mobile Lighthouse runs against a local server. Usage: node qa/lighthouse.mjs [url]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const url = process.argv[2] || 'http://127.0.0.1:8080/';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname));
const lh = path.join(root, '..', 'node_modules', '.bin', 'lighthouse');
const chrome = fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined;
const rows = [];
for (let i = 1; i <= 3; i++) {
  const out = path.join(root, `lighthouse-mobile-run${i}`);
  const env = { ...process.env };
  if (chrome) env.CHROME_PATH = chrome;
  execFileSync(lh, [url, '--quiet', '--output=json', '--output=html', `--output-path=${out}`, '--only-categories=performance,accessibility,best-practices,seo', '--chrome-flags=--headless=new --no-sandbox --disable-gpu'], { env, stdio: 'inherit' });
  const j = JSON.parse(fs.readFileSync(out + '.report.json', 'utf8'));
  const c = j.categories, a = j.audits;
  rows.push({ run: i, performance: Math.round(c.performance.score * 100), accessibility: Math.round(c.accessibility.score * 100), bestPractices: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), fcp: a['first-contentful-paint'].displayValue, lcp: a['largest-contentful-paint'].displayValue, tbt: a['total-blocking-time'].displayValue, cls: a['cumulative-layout-shift'].displayValue });
}
console.table(rows);
fs.writeFileSync(path.join(root, 'lighthouse-summary.json'), JSON.stringify(rows, null, 2));
