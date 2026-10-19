#!/usr/bin/env node
/* Checks the content files before a build. Runs in the Netlify build command, so a bad save in the
   editor fails the build and the last good site stays live. Run with: node scripts/check-content.js */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let problems = 0;
const fail = (m) => { problems++; console.error("  ✗ " + m); };
const load = (f) => { try { return JSON.parse(fs.readFileSync(path.join(root, "content", f), "utf8")); } catch (e) { fail(`${f} is not valid JSON: ${e.message}`); return null; } };
const images = JSON.parse(fs.readFileSync(path.join(root, "src/images/manifest.json"), "utf8"));

// Every string in every content file: no em dashes, no exclamation marks in headings, images exist, alt text present.
function walk(obj, where, file) {
  if (typeof obj === "string") {
    // The client writes the name "R&SVP – Hio Ridge" with a dash; a proper name keeps its own punctuation.
    const stripped = obj.split("R&SVP – Hio Ridge").join("");
    if (/—|\s–\s/.test(stripped)) fail(`${file} ${where}: contains an em dash or spaced en dash. Use a period, a comma or a new sentence.`);
    return;
  }
  if (Array.isArray(obj)) return obj.forEach((v, i) => walk(v, `${where}[${i}]`, file));
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (["image", "hero_image"].includes(k) && v && !images[v]) fail(`${file} ${where}.${k}: no image named "${v}" in src/images/manifest.json (run scripts/images.py after adding photos)`);
      if (k === "image" && v && !(obj.alt || obj.hero_alt)) fail(`${file} ${where}: photo "${v}" has no alt text`);
      if (k === "hero_image" && v && !obj.hero_alt) fail(`${file} ${where}: hero photo "${v}" has no hero_alt text`);
      if (["heading", "headline", "title"].includes(k) && typeof v === "string" && /!/.test(v)) fail(`${file} ${where}.${k}: headings do not take exclamation marks on the site`);
      if (k === "caption") fail(`${file} ${where}.caption: the site never uses image captions (Mike, Oct 19). Remove the field.`);
      walk(v, `${where}.${k}`, file);
    }
  }
}

const site = load("site.json");
if (site) {
  ["name", "url", "phone", "phone_tel", "email", "address", "capacity", "season", "days", "legal_name"].forEach((k) => { if (!site[k]) fail(`site.json: missing "${k}"`); });
  ["street", "city", "state", "zip", "maps"].forEach((k) => { if (!site.address?.[k]) fail(`site.json address: missing "${k}"`); });
  if (site.announcement?.enabled && String(site.announcement.text || "").length > 70) fail(`site.json announcement is ${site.announcement.text.length} characters; keep it at 70 or fewer so it fits on one line on a phone`);
  if (site.phone_tel && !/^\+1\d{10}$/.test(site.phone_tel)) fail(`site.json phone_tel must look like +12074006353`);
  if (site.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)) fail(`site.json email does not look like an email address`);
  walk(site, "", "site.json");
}

for (const f of ["home.json", "barn.json", "weddings.json", "pricing.json", "events.json", "story.json", "inquire.json", "privacy.json", "gallery.json"]) {
  const p = load(f);
  if (!p) continue;
  if (!p.title || !p.description) fail(`${f}: needs a title and a description (they appear in search results)`);
  if (p.title && p.title.length > 70) fail(`${f}: title is ${p.title.length} characters; keep it under 70`);
  if (p.description && p.description.length > 170) fail(`${f}: description is ${p.description.length} characters; keep it under 170`);
  if (f === "weddings.json") (p.faq || []).forEach((q, i) => { if (!q.q || !q.a) fail(`weddings.json faq[${i}]: needs a question and an answer`); });
  if (f === "events.json") (p.upcoming || []).forEach((u, i) => { if (u.title && !u.date) fail(`events.json upcoming[${i}]: "${u.title}" has no date`); });
  walk(p, "", f);
}

const confirms = [];
for (const f of fs.readdirSync(path.join(root, "content"))) {
  const t = fs.readFileSync(path.join(root, "content", f), "utf8");
  for (const m of t.matchAll(/\[CONFIRM:([^\]]*)\]/g)) confirms.push(`${f}: ${m[1].trim()}`);
}
if (confirms.length) { console.log(`\n${confirms.length} items still marked [CONFIRM] (visible on the site on purpose until the owners confirm them):`); confirms.forEach((c) => console.log("  - " + c)); }

if (problems) { console.error(`\n${problems} problem${problems > 1 ? "s" : ""} found. Fix the content and save again.`); process.exit(1); }
console.log("Content OK.");
