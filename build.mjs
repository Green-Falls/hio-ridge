// Builds the R&SVP – Hio Ridge site into dist/. No dependencies.
//
//   node build.mjs                      production build (indexable, canonical = site.url)
//   PREVIEW_HOST=hioridge.greenfalls.co node build.mjs   client preview: noindex, robots disallow, CNAME
//   RELATIVE=1 node build.mjs           noindex preview with relative links (for a host that serves the
//                                       folder at a sub-path, such as a claude.ai artifact)
//
// Every visible word comes from content/*.json. Facts the client has not confirmed are written as
// [CONFIRM: ...] in the content and left visible on purpose. scripts/check-content.js validates the
// content before this runs (npm run build). Images come from src/images/ (made by scripts/images.py),
// fonts from src/fonts/, CSS from src/styles.css, JS from src/site.js.
//
// Rules this builder enforces: one h1 per page, every image a real <img> with srcset, width and
// height, lazy below the fold, the hero eager; the year by code; a build stamp in the footer; one
// JSON-LD graph per page; sitemap, robots and llms.txt from the same content.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, "content", f), "utf8"));
const SITE = read("site.json");
const PAGES = { home: read("home.json"), barn: read("barn.json"), weddings: read("weddings.json"), pricing: read("pricing.json"), events: read("events.json"), story: read("story.json"), inquire: read("inquire.json"), privacy: read("privacy.json") };
const IMAGES = JSON.parse(fs.readFileSync(path.join(ROOT, "src/images/manifest.json"), "utf8"));
const PREVIEW = process.env.PREVIEW_HOST || "";
const BASE = PREVIEW ? `https://${PREVIEW}` : SITE.url;
const DIST = path.join(ROOT, "dist");
const STAMP = (() => { try { return execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim(); } catch { return "local"; } })() + " " + new Date().toISOString().slice(0, 10);

const NAV = [
  ["/the-barn/", "The Barn"],
  ["/weddings/", "Weddings"],
  ["/pricing/", "Pricing"],
  ["/events/", "Events"],
  ["/our-story/", "Our Story"],
];
const INQUIRE = ["/inquire/", "Inquire"];

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Typographic care: curly quotes and apostrophes in running text. Content is written with straight marks.
const typo = (s) => esc(s).replace(/(\w)'(\w)/g, "$1’$2").replace(/'(\d\d)/g, "’$1").replace(/"([^"]*)"/g, "“$1”").replace(/(^|\s)'/g, "$1‘").replace(/'/g, "’");
const paras = (arr) => arr.map((p) => `<p>${typo(p)}</p>`).join("\n");
const addr = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;

// ---------- images ----------
function picture(key, { sizes = "100vw", eager = false, cls = "", alt = "" } = {}) {
  const m = IMAGES[key];
  if (!m) throw new Error(`no image "${key}" in src/images/manifest.json`);
  const webp = m.renditions.filter((r) => r[1] === "webp");
  const jpg = m.renditions.filter((r) => r[1] === "jpg");
  const largest = jpg[jpg.length - 1];
  const set = (list) => list.map((r) => `/images/${key}-${r[0]}.${r[1]} ${r[2]}w`).join(", ");
  return `<picture class="pic ${cls}" style="--c:${m.color}"><source type="image/webp" srcset="${set(webp)}" sizes="${sizes}"><img src="/images/${key}-${largest[0]}.jpg" srcset="${set(jpg)}" sizes="${sizes}" width="${largest[2]}" height="${largest[3]}" alt="${esc(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""}></picture>`;
}

// ---------- chrome ----------
function head({ title, description, pathname, ogImage = "hero-barn-day", jsonld, noindex = false }) {
  const canonical = BASE + pathname;
  const og = `${BASE}/images/${ogImage}-1200.jpg`;
  const alt = IMAGES[ogImage] ? "" : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${PREVIEW || noindex ? '<meta name="robots" content="noindex, nofollow">' : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="${IMAGES[ogImage] ? IMAGES[ogImage].renditions.find((r) => r[0] === 1200 && r[1] === "jpg")?.[3] ?? 900 : 900}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/caslon-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/plex-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script>document.documentElement.className+=" js"</script>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>`;
}

function bar(pathname) {
  const link = ([href, label], cls = "") => `<li><a href="${href}"${pathname === href ? ' aria-current="page"' : ""}${cls ? ` class="${cls}"` : ""}>${label}</a></li>`;
  const left = NAV.slice(0, 3).map((l) => link(l)).join("");
  const right = NAV.slice(3).map((l) => link(l)).join("") + link(INQUIRE, "nav-inq");
  const menuLinks = [...NAV, INQUIRE].map((l) => link(l)).join("");
  return `<a class="skip" href="#main">Skip to content</a>
<header class="head">
<div class="bar" data-bar>
<nav class="nav nav-l" aria-label="Site"><ul>${left}</ul></nav>
<a class="mark" href="/"><span class="mark-a">R<span class="amp">&amp;</span>SVP</span> <span class="mark-b">Hio Ridge</span></a>
<nav class="nav nav-r" aria-label="Site, continued"><ul>${right}</ul></nav>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-open>Menu</button>
</div>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
<div class="menu-top"><span class="mark-a">R<span class="amp">&amp;</span>SVP</span><button class="menu-close" type="button" data-menu-close>Close</button></div>
<ul class="menu-list"><li><a href="/"${pathname === "/" ? ' aria-current="page"' : ""}>Home</a></li>${menuLinks}</ul>
<a class="btn btn-paper" href="/inquire/">Schedule a tour</a>
<p class="menu-contact"><a href="tel:${SITE.phone_tel}">${esc(SITE.phone)}</a><br><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
</div>`;
}

function footer() {
  const links = [...NAV, INQUIRE].map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("");
  const social = [["Facebook", SITE.social.facebook], ["YouTube", SITE.social.youtube], ["Instagram", SITE.social.instagram]].filter(([, u]) => u).map(([n, u]) => `<li><a href="${esc(u)}" rel="noopener">${n}</a></li>`).join("");
  return `<footer class="foot">
<div class="wrap foot-grid">
<div class="foot-brand">
${picture("logo", { sizes: "160px", alt: "R&SVP – Hio Ridge: a heart-shaped wreath of roses, daisies, pine cones and bells around a dark sign", cls: "foot-logo" })}
<p>${typo(SITE.footer_line)}</p>
</div>
<div class="foot-col">
<h2 class="foot-h">Visit</h2>
<address><a href="${esc(SITE.address.maps)}" rel="noopener">${esc(SITE.address.street)}<br>${esc(SITE.address.city)}, ${esc(SITE.address.state)} ${esc(SITE.address.zip)}</a></address>
<p><a href="tel:${SITE.phone_tel}">${esc(SITE.phone)}</a><br><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
<p class="small">${esc(SITE.season)}. ${esc(SITE.days)}.</p>
</div>
<div class="foot-col">
<h2 class="foot-h">Pages</h2>
<ul class="foot-links"><li><a href="/">Home</a></li>${links}</ul>
</div>
<div class="foot-col">
<h2 class="foot-h">Follow</h2>
<ul class="foot-links">${social}</ul>
</div>
</div>
<div class="wrap foot-legal">
<p class="small">&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(SITE.legal_name)}. <a href="${esc(SITE.privacy_page)}">Privacy</a>. Site by <a href="https://greenfalls.co" rel="noopener">Green Falls</a>.</p>
<p class="small stamp">Build ${STAMP}</p>
</div>
</footer>
<nav class="quick" aria-label="Quick actions"><a href="tel:${SITE.phone_tel}">Call</a><a href="/inquire/">Inquire</a></nav>
<script src="/site.js" defer></script>
</body>
</html>`;
}

const breadcrumb = (pathname, name) => ({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" }, { "@type": "ListItem", position: 2, name, item: BASE + pathname }] });
const business = () => ({
  "@type": ["LocalBusiness", "EventVenue"],
  "@id": BASE + "/#venue",
  name: SITE.name,
  url: BASE + "/",
  telephone: SITE.phone_tel,
  email: SITE.email,
  image: BASE + "/images/hero-barn-day-1200.jpg",
  logo: BASE + "/images/logo-480.jpg",
  description: PAGES.home.description,
  address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.state, postalCode: SITE.address.zip, addressCountry: "US" },
  ...(SITE.address.lat ? { geo: { "@type": "GeoCoordinates", latitude: SITE.address.lat, longitude: SITE.address.lng } } : {}),
  maximumAttendeeCapacity: SITE.capacity,
  areaServed: ["Bridgton, ME", "Lakes Region, Maine", "Western Maine"],
  sameAs: Object.values(SITE.social).filter(Boolean),
  founder: SITE.hosts,
});
const graph = (items) => ({ "@context": "https://schema.org", "@graph": [business(), { "@type": "WebSite", "@id": BASE + "/#website", url: BASE + "/", name: SITE.name, publisher: { "@id": BASE + "/#venue" } }, ...items] });

const section = (cls, inner, id = "") => `<section class="sec ${cls.startsWith("sec-") ? cls : "sec-" + cls}"${id ? ` id="${id}"` : ""}><div class="wrap">${inner}</div></section>`;
const closing = (c) => `<section class="band"><div class="wrap band-grid"><div><h2>${typo(c.heading)}</h2><p>${typo(c.body)}</p></div><p class="band-cta"><a class="btn btn-paper" href="${esc(c.cta_href)}">${typo(c.cta)}</a><a class="band-phone" href="tel:${SITE.phone_tel}">or call ${esc(SITE.phone)}</a></p></div></section>`;
const pageHero = (p) => `<section class="phero"><div class="wrap"><h1>${typo(p.heading)}</h1><p class="lede">${typo(p.lede)}</p></div>${picture(p.hero_image, { eager: true, alt: p.hero_alt, sizes: "100vw", cls: "phero-pic" })}</section>`;
const facts = (heading, list) => section("facts", `<h2 class="reveal">${typo(heading)}</h2><dl class="dl">${list.map((f) => `<div><dt>${typo(f.label)}</dt><dd>${typo(f.value)}</dd></div>`).join("")}</dl>`);
const splitRow = (s, i, { sizes = "(min-width: 48em) 50vw, 100vw" } = {}) => `<div class="split${i % 2 ? " split-flip" : ""}"><div class="split-text"><h2 class="reveal">${typo(s.heading || s.title)}</h2>${Array.isArray(s.body) ? paras(s.body) : `<p>${typo(s.body)}</p>`}${s.href ? `<p><a class="more" href="${esc(s.href)}">${typo(s.link || "Learn more")}</a></p>` : ""}</div><figure>${picture(s.image, { alt: s.alt, sizes })}</figure></div>`;

// ---------- pages ----------
function homePage() {
  const p = PAGES.home;
  const h = p.hero;
  const body = `<body class="home">
${bar("/")}
<main id="main">
<section class="hero">
${picture(h.image, { eager: true, alt: h.alt, sizes: "100vw", cls: "hero-pic" })}
</section>
<div class="hero-text"><div class="wrap"><h1>${typo(h.headline)}</h1><div class="hero-cta"><a class="btn" href="${esc(h.cta_href)}">${typo(h.cta)}</a><span class="it">${typo(h.line)}</span></div></div></div>
</section>
<div class="wrap"><ul class="facts">${h.facts.map((f) => `<li><strong>${esc(f.value)}</strong> ${esc(f.label)}</li>`).join("")}${SITE.announcement?.enabled ? `<li><a href="${esc(SITE.announcement.link || "/inquire/")}"><strong>${typo(SITE.announcement.text)}</strong></a></li>` : ""}</ul></div>
${section("sec-linen", `<div class="statement"><div><span class="amp-big" aria-hidden="true">&amp;</span><h2 class="reveal">${typo(p.statement.quote)}</h2><p class="small">${typo(p.statement.who)}</p></div><figure class="arch">${picture("dress", { alt: "A wedding dress on the hook in the bridal room", sizes: "(min-width: 48em) 40vw, 100vw" })}</figure></div>`)}
${section("intro", splitRow(p.intro, 0))}
${section("paths", `<ul class="paths-list">${p.paths.map((x) => `<li><a href="${esc(x.href)}">${picture(x.image, { alt: x.alt, sizes: "(min-width: 48em) 33vw, 100vw" })}<h2>${typo(x.title)}</h2><p>${typo(x.body)}</p><span class="more"><span>${typo(x.link || "See " + x.title.toLowerCase())}</span><span aria-hidden="true">&rarr;</span></span></a></li>`).join("")}</ul>`)}
${section("sec-moss", `<div class="split split-wide"><div class="split-text"><h2 class="reveal">The barn, the ell, the field and the patio. Tables and chairs. Susan and Richard.</h2><p>${typo(PAGES.pricing.compare)}</p><p><a class="btn btn-paper" href="/pricing/">See pricing and what is included</a></p></div><figure>${picture("head-table", { alt: "The head table set at the open French doors, the patio and field beyond", sizes: "(min-width: 48em) 55vw, 100vw" })}</figure></div>`)}
<figure class="photo-band">${picture("barn-october", { alt: p.setting.alt, sizes: "100vw" })}</figure>
${section("setting", `<div class="narrow"><h2 class="reveal">${typo(p.setting.heading)}</h2><p>${typo(p.setting.body)}</p></div>`)}
${section("proof", `<h2 class="reveal">${typo(p.proof_heading)}</h2><ul class="proof">${p.proof.map((x) => `<li><span class="small">${typo(x.date)}</span><h3>${x.href ? `<a href="${esc(x.href)}" rel="noopener">${typo(x.title)}</a>` : typo(x.title)}</h3><p>${typo(x.body)}</p></li>`).join("")}</ul>`)}
${section("teaser", splitRow(p.story_teaser, 1, { sizes: "(min-width: 48em) 40vw, 100vw" }))}
${closing(p.closing)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/", ogImage: "barn-interior", jsonld: graph([]) }) + body;
}

function pricingPage() {
  const p = PAGES.pricing;
  const body = `<body>
${bar("/pricing/")}
<main id="main">
<section class="phero phero-plain"><div class="wrap"><h1>${typo(p.heading)}</h1><p class="lede">${typo(p.lede)}</p></div></section>
${section("sec-moss", `<div class="split"><div class="split-text"><span class="label">${typo(p.price_label)}</span><p class="price">${typo(p.price)}</p><p>${typo(p.price_note)}</p></div><div><h2 class="reveal">${typo(p.included_heading)}</h2><ul class="included">${p.included.map((i) => `<li>${typo(i)}</li>`).join("")}</ul></div></div>`)}
${section("compare", `<div class="narrow"><h2 class="reveal">${typo(p.compare_heading)}</h2><p>${typo(p.compare)}</p></div>`)}
${section("events", `<div class="narrow"><h2 class="reveal">${typo(p.events_heading)}</h2><p>${typo(p.events)}</p></div>`)}
${closing(p.closing)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/pricing/", ogImage: "ceremony-field", jsonld: graph([breadcrumb("/pricing/", p.heading)]) }) + body;
}

function barnPage() {
  const p = PAGES.barn;
  const body = `<body>
${bar("/the-barn/")}
<main id="main">
${pageHero(p)}
${section("spaces", p.spaces.map((s, i) => splitRow(s, i)).join(""))}
${facts(p.facts_heading, p.facts)}
${closing(p.closing)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/the-barn/", ogImage: "barn-interior", jsonld: graph([breadcrumb("/the-barn/", p.heading)]) }) + body;
}

function weddingsPage() {
  const p = PAGES.weddings;
  const faq = { "@type": "FAQPage", mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const body = `<body>
${bar("/weddings/")}
<main id="main">
${pageHero(p)}
${section("steps", `<h2 class="reveal">${typo(p.day.heading)}</h2><ol class="steps-list">${p.day.steps.map((s) => `<li><h3>${typo(s.title)}</h3><p>${typo(s.body)}</p></li>`).join("")}</ol>`)}
${facts(p.details_heading, p.details)}
${section("sunday", `<div class="narrow"><h2 class="reveal">${typo(p.sunday.heading)}</h2><p>${typo(p.sunday.body)}</p></div>`)}
${section("faq", `<h2 class="reveal">${typo(p.faq_heading)}</h2><div class="faq-list">${p.faq.map((f) => `<details><summary>${typo(f.q)}</summary><p>${typo(f.a)}</p></details>`).join("")}</div>`)}
${closing(p.closing)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/weddings/", ogImage: "ceremony-field", jsonld: graph([breadcrumb("/weddings/", p.heading), faq]) }) + body;
}

function eventsPage() {
  const p = PAGES.events;
  const upcoming = p.upcoming.filter((u) => u.title);
  const up = upcoming.length
    ? `<ul class="events-list">${upcoming.map((u) => `<li><p class="small">${typo(u.date)}</p><h3>${u.link ? `<a href="${esc(u.link)}">${typo(u.title)}</a>` : typo(u.title)}</h3><p>${typo(u.details)}</p></li>`).join("")}</ul>`
    : `<p>${typo(p.upcoming_empty)}</p><p><a class="more" href="${esc(SITE.social.facebook)}" rel="noopener">R&amp;SVP – Hio Ridge on Facebook</a></p>`;
  const body = `<body>
${bar("/events/")}
<main id="main">
${pageHero(p)}
${section("kinds", `<h2 class="reveal">${typo(p.kinds_heading)}</h2><ul class="kinds-list">${p.kinds.map((k) => `<li><h3>${typo(k.title)}</h3><p>${typo(k.body)}</p></li>`).join("")}</ul>`)}
${section("classes", splitRow(p.classes, 1, { sizes: "(min-width: 48em) 40vw, 100vw" }))}
${section("upcoming", `<h2 class="reveal">${typo(p.upcoming_heading)}</h2>${up}`)}
${section("retreats", `<div class="narrow"><h2 class="reveal">${typo(p.retreats.heading)}</h2><p>${typo(p.retreats.body)}</p><p><a class="more" href="${esc(p.retreats.cta_href)}">${typo(p.retreats.cta)}</a></p></div>`)}
${closing(p.closing)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/events/", ogImage: "barn-patio", jsonld: graph([breadcrumb("/events/", p.heading)]) }) + body;
}

function storyPage() {
  const p = PAGES.story;
  const body = `<body>
${bar("/our-story/")}
<main id="main">
${pageHero(p)}
${section("story", p.sections.map((s, i) => splitRow(s, i)).join(""))}
${section("credits", `<h2 class="reveal">${typo(p.credits_heading)}</h2><dl class="dl">${p.credits.map((c) => `<div><dt>${typo(c.name)}</dt><dd>${typo(c.role)}</dd></div>`).join("")}</dl>`)}
${closing(p.closing)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/our-story/", ogImage: "susan-richard", jsonld: graph([breadcrumb("/our-story/", p.heading)]) }) + body;
}

function inquirePage() {
  const p = PAGES.inquire;
  const f = p.form;
  const types = f.types.map((t) => `<option value="${esc(t.value)}">${esc(t.label)}</option>`).join("");
  const body = `<body>
${bar("/inquire/")}
<main id="main">
<section class="phero phero-plain"><div class="wrap"><h1>${typo(p.heading)}</h1><p class="lede">${typo(p.lede)}</p></div></section>
${section("inquire", `<div class="inq-grid">
<form class="form" name="${esc(f.name)}" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" novalidate>
<input type="hidden" name="form-name" value="${esc(f.name)}">
<p class="sr-only" aria-hidden="true"><label>Leave this field empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
<div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
<div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required></div>
<div class="field"><label for="f-phone">Phone <span class="opt">optional</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
<div class="field"><label for="f-type">What are you planning?</label><select id="f-type" name="event_type">${types}</select></div>
<div class="field-row">
<div class="field"><label for="f-date">Date, if you have one <span class="opt">optional</span></label><input id="f-date" name="event_date" type="date"></div>
<div class="field"><label for="f-guests">About how many guests <span class="opt">optional</span></label><input id="f-guests" name="guests" type="number" inputmode="numeric" min="1" max="135"></div>
</div>
<div class="field"><label for="f-message">Anything else</label><textarea id="f-message" name="message" rows="5"></textarea></div>
<p class="form-status" role="alert" aria-live="polite" hidden></p>
<p class="form-actions"><button class="btn" type="submit">${typo(f.submit)}</button><span class="small">${typo(f.privacy_line)}</span></p>
</form>
<aside class="inq-aside">
<h2>${typo(p.aside.heading)}</h2>
<p class="big"><a href="tel:${SITE.phone_tel}">${esc(SITE.phone)}</a></p>
<p>${esc(SITE.phone_note)}. ${typo(p.aside.reply_line)}</p>
<p><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
<h2>${typo(p.aside.directions_heading)}</h2>
<address><a href="${esc(SITE.address.maps)}" rel="noopener">${esc(SITE.address.street)}<br>${esc(SITE.address.city)}, ${esc(SITE.address.state)} ${esc(SITE.address.zip)}</a></address>
<p>${typo(p.aside.directions)}</p>
</aside>
</div>`)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/inquire/", ogImage: "barn-night", jsonld: graph([breadcrumb("/inquire/", p.heading), { "@type": "ContactPage", "@id": BASE + "/inquire/#page", url: BASE + "/inquire/", about: { "@id": BASE + "/#venue" } }]) }) + body;
}

function thankYouPage() {
  const t = PAGES.inquire.thank_you;
  const body = `<body>
${bar("/thank-you/")}
<main id="main">
<section class="phero phero-plain"><div class="wrap"><h1>${typo(t.heading)}</h1><p class="lede">${typo(t.body)}</p><p><a class="more" href="/">Back to the home page</a></p></div></section>
</main>
${footer()}`;
  return head({ title: t.title, description: t.body, pathname: "/thank-you/", noindex: true, jsonld: graph([]) }) + body;
}

function privacyPage() {
  const p = PAGES.privacy;
  const body = `<body>
${bar("/privacy/")}
<main id="main">
<section class="phero phero-plain"><div class="wrap"><h1>${typo(p.heading)}</h1></div></section>
${section("prose", `<div class="narrow">${paras(p.body)}</div>`)}
</main>
${footer()}`;
  return head({ title: p.title, description: p.description, pathname: "/privacy/", jsonld: graph([breadcrumb("/privacy/", p.heading)]) }) + body;
}

function notFoundPage() {
  const body = `<body>
${bar("/404.html")}
<main id="main">
<section class="phero phero-plain"><div class="wrap"><h1>That page is not here</h1><p class="lede">Try the home page, or ask Susan directly.</p><p><a class="btn" href="/">Home</a> <a class="more" href="/inquire/">Schedule a tour</a></p></div></section>
</main>
${footer()}`;
  return head({ title: "Page not found | " + SITE.name, description: "Page not found.", pathname: "/404.html", noindex: true, jsonld: graph([]) }) + body;
}

// ---------- files ----------
const OUT = {
  "index.html": homePage(),
  "the-barn/index.html": barnPage(),
  "weddings/index.html": weddingsPage(),
  "pricing/index.html": pricingPage(),
  "events/index.html": eventsPage(),
  "our-story/index.html": storyPage(),
  "inquire/index.html": inquirePage(),
  "thank-you/index.html": thankYouPage(),
  "privacy/index.html": privacyPage(),
  "404.html": notFoundPage(),
};
const INDEXABLE = ["/", "/the-barn/", "/weddings/", "/pricing/", "/events/", "/our-story/", "/inquire/", "/privacy/"];

// RELATIVE mode: root-absolute URLs become relative to each page's depth and directory links point at
// their index.html, so the folder works from any sub-path. Pages are marked noindex.
const RELATIVE = !!process.env.RELATIVE;
function relativize(html, rel) {
  const depth = rel.split("/").length - 1;
  const up = depth ? "../".repeat(depth) : "./";
  const fix = (u) => {
    if (!u.startsWith("/") || u.startsWith("//")) return u;
    const [p, q = ""] = u.split("?");
    const t = p === "/" ? "index.html" : p.endsWith("/") ? p.slice(1) + "index.html" : p.slice(1);
    return up + t + (q ? "?" + q : "");
  };
  return html
    .replace(/(href|src|action)="(\/[^"]*)"/g, (m, a, u) => `${a}="${fix(u)}"`)
    .replace(/srcset="([^"]*)"/g, (m, s) => `srcset="${s.split(",").map((e) => { const [u, w] = e.trim().split(/\s+/); return fix(u) + (w ? " " + w : ""); }).join(", ")}"`)
    .replace(/<meta name="robots" content="[^"]*">/, "")
    .replace("</head>", '<meta name="robots" content="noindex, nofollow">\n</head>');
}

fs.rmSync(DIST, { recursive: true, force: true });
for (const [rel, html] of Object.entries(OUT)) {
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, RELATIVE ? relativize(html, rel) : html);
}
fs.cpSync(path.join(ROOT, "src/images"), path.join(DIST, "images"), { recursive: true, filter: (s) => !s.endsWith("manifest.json") });
fs.cpSync(path.join(ROOT, "src/fonts"), path.join(DIST, "fonts"), { recursive: true });
for (const f of ["styles.css", "site.js", "favicon.svg", "favicon.png", "apple-touch-icon.png"]) if (fs.existsSync(path.join(ROOT, "src", f))) fs.copyFileSync(path.join(ROOT, "src", f), path.join(DIST, f));
if (RELATIVE) { const c = path.join(DIST, "styles.css"); fs.writeFileSync(c, fs.readFileSync(c, "utf8").replace(/url\("\/fonts\//g, 'url("fonts/')); }
if (fs.existsSync(path.join(ROOT, "admin"))) fs.cpSync(path.join(ROOT, "admin"), path.join(DIST, "admin"), { recursive: true });

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${INDEXABLE.map((p) => `  <url><loc>${BASE}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, "robots.txt"), PREVIEW ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /thank-you/\n\nSitemap: ${BASE}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, "llms.txt"), `# ${SITE.name}\n\n> ${PAGES.home.description}\n\n- Address: ${addr}\n- Phone: ${SITE.phone}\n- Email: ${SITE.email}\n- Capacity: ${SITE.capacity}\n- Season: ${SITE.season}, ${SITE.days}\n- Alcohol-free venue\n\n## Pages\n${INDEXABLE.map((p) => `- ${BASE}${p}`).join("\n")}\n`);
fs.writeFileSync(path.join(DIST, "_redirects"), `/contact/  /inquire/  301\n/contact  /inquire/  301\n/tour  /inquire/  301\n/barn  /the-barn/  301\n/story  /our-story/  301\n`);
if (PREVIEW) fs.writeFileSync(path.join(DIST, "CNAME"), PREVIEW + "\n");
fs.writeFileSync(path.join(DIST, "pages.json"), JSON.stringify(Object.keys(OUT)));

const total = (dir) => fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? total(path.join(dir, e.name)) : fs.statSync(path.join(dir, e.name)).size), 0);
console.log(`built ${Object.keys(OUT).length} pages into dist/ (${(total(DIST) / 1024 / 1024).toFixed(1)} MB incl. images), stamp ${STAMP}${PREVIEW ? ", PREVIEW " + PREVIEW : ""}`);
