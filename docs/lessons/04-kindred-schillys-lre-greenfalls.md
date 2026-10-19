# Lessons from Kindred Farms, Schilly's, Lake Region Energy, Green Falls, garrickhoffman-site

Distilled 2026-10-19 from `Green-Falls/Kindred-Farms`, `mchljns/Schilly-s-Catering`, `Green-Falls/Lake-Region-Energy`, `mchljns/Green-Falls`, `Green-Falls/garrickhoffman-site`. Read-only clones at `/home/user/kindred-farms`, `/home/user/mchljns/schillys`, `/home/user/lake-region-energy`, `/home/user/mchljns/green-falls-site`, `/home/user/garrickhoffman-site`.

## Project by project

**Kindred Farms (farm stand, Casco).** One page of plain HTML/CSS/JS, no build step; `app.js` renders `content/*.json` in the browser. Netlify, `publish="."`, `X-Robots-Tag: noindex` on `/admin/*`, `max-age=0` on `/content/*`. Owner edits in Sveltia CMS at `/admin/` (Decap-compatible, GitHub backend, Netlify OAuth; Netlify Identity was retired in 2025, so each editor needs a GitHub account). No form. QA: `npm run qa` (Playwright + axe at 375/768/1440: overflow, broken images, console errors, text under 12px, tap targets under 40, the key fact and primary button inside 375×812, em dashes, content vs config match); `npm run lighthouse` three mobile runs. **Scores 97/97/96, A11y 100, BP 100, SEO 100, CLS 0, LCP 2.5s.** First screen ~209KB vs a 300KB budget. Lessons: CLS came from late JSON content and font swap (fixed with an always-present strip, reserved heights, metric-matched fallbacks with `size-adjust`); a synchronous content request cost 18 Best Practices points; **a Facebook extract was lost when the cloud workspace was reclaimed before commit, so commit research the same day**; the owner's own Facebook outranked listings for the true logo and hours; photo provenance needs tracking (10-shot list, 1600px minimum on the long side).

**Schilly's (catering, Casco).** Static multi-page site from one zero-dependency `build.mjs` (writes pages, JSON-LD, sitemap, robots, llms.txt, `_redirects` into `dist/`). No CMS; developer edits data files. Hours were duplicated in two files (avoid). Form: custom JS posting to FormSubmit, endpoint never set, no honeypot, delivery never tested. QA gates: a **content gate** (every visible string must trace to `brand/source/`; fails on emojis, gradients, lift animations, eyebrows, uppercase tracking over 0.02em, figcaptions, more than one h1, AI-overused typefaces) and a **layout gate** at 360/390/768/1280 (overflow, text under 14px, contrast under AA, control edges under 3:1, targets under 40px, first load over 600KB, hours below the first phone screen). Preview via GitHub Pages at `schillys.greenfalls.co` with noindex and a disallow-all robots in preview mode. Lessons: an earlier draft invented copy (hero line, FAQ answers) and all of it was removed; fonts took five rounds (client called one set "juvenile"); colour tokens matched Tailwind defaults (slate-600, orange-50) and the client said "cream still present"; the weight budget broke twice on photos (fixed with 800/900px renditions and a 24KB static font instead of a 132KB variable one); sticky header collided with a sticky chip rail on phones; all eight fields required was flagged as a problem.

**Lake Region Energy (HVAC).** Astro 5, ~186 pages, Netlify (`npm run build`, `publish="dist"`, immutable cache on `/_astro/*`). Owner does not edit. **Form: Netlify Forms**: plain `<form method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field">` with hidden `form-name`; honeypot `<p class="sr-only" aria-hidden="true"><label>Don't fill this out: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>`; submissions stored in the Netlify dashboard and emailed; `/thank-you/` noindexed; phone beside the form; consent checkbox unticked by default. CTA band: dark field, the phone as a big link plus one button, "A real, local person answers the phone." Font funnel: 1,950 families to 24 by rules (OFL, not an AI default, not a top-25 face, not a sibling client's face, x-height ≥70% of cap height, capital I distinct from lowercase l, tabular figures); Atkinson's slashed zero meant phone numbers set in Chivo. Every old URL kept.

**garrickhoffman-site (WordPress).** GoDaddy cPanel. WPForms Lite: **every notification had been failing for months**: WP Mail SMTP Gmail mailer `401`, SPF `include:secureserver.net -all` hard-failing Google, no DKIM or DMARC; 12,857 lifetime submissions "likely mostly spam"; the wedding form was embedded nowhere and wedding leads went to a Google Form. No Google Business Profile existed. Lessons: deliverability (SPF, DKIM, DMARC) is part of the form; content structure must not live in the theme; backups were thin.

**Green Falls (Mike's site).** React/Vinext on Cloudflare Workers. Form: FormSubmit AJAX to info@greenfalls.co with a honeypot, `_captcha:"false"`, 20s timeout, success only if `result.success === true || "true"` (a parsing bug had treated `"false"` as success); on error a `role="alert"` with a mailto fallback; GA4 `generate_lead` on success. Inbox delivery was never verified in any review. Staging isolation (noindex, analytics off, form off) must be reversed on purpose at launch. On phones the form comes before the explanation and the header scrolls with the page. "Don't fill gaps with invented proof"; a 4.16:1 link colour was rejected.

## Kindred's CMS setup (the reusable part)
- `admin/config.yml`: `backend: {name: github, repo, branch: main, base_url: https://api.netlify.com, auth_endpoint: auth}`, `local_backend: true`, `media_folder: images/uploads`. File collections with plain-language labels, hints, `summary`, `collapsed`. The settings file holds contact, address, hours, announcement (validator caps it at 70 characters), photos with alt and caption, about, faq, copy headlines with `*asterisks*` marking the accent word.
- Gaps to fix for Hio Ridge: `logo_url` pointed to a missing file; uploads are committed raw with nothing resizing them; the validator (`scripts/check-content.js`) runs as a GitHub Action *after* the CMS commits, so nothing blocks a bad deploy. Fix: run the validator inside the Netlify build command so a bad save fails the build and the last good deploy stays live; resize at build time; require alt text; check image paths exist.
- `EDITING-GUIDE.md` format: written for the people at the counter, one task per section with a time estimate, numbered steps using the exact field labels, a Tips list, an "If something looks wrong" section, "Nothing you do in the editor can break the site permanently."
- Retiree friction: GitHub OAuth means accounts they will forget. Budget a password-manager setup, and keep a Green Falls collaborator seat to make edits for them.

## Forms: the comparison

| | Netlify Forms | FormSubmit | WPForms Lite |
|---|---|---|---|
| Markup | Plain HTML POST, no JS needed | JS fetch | Shortcode |
| Spam | honeypot + Netlify filtering | hand honeypot | nothing effective |
| Where it goes | Stored in dashboard **and** emailed | email only, after an activation step | email only, and it broke |
| Delivery verified | not recorded | never, in two projects | failing for months |

**Use Netlify Forms.** Submissions are stored, so a lost email is not a lost lead; no JS; no activation step. Notify both owners plus a Green Falls address. At launch send a real test and have the owners find it and mark the sender safe; write that into the editing guide. Require only name, email and date. Fallback if the site ever leaves Netlify: FormSubmit with the Green Falls parsing code and Schilly's "show the phone number when sending fails".

## Design and copy rules that recur
- Fonts: self-hosted, OFL, latin subset, preload two files, metric-matched fallbacks. Excluded every time: AI defaults (Inter, DM Sans, Fraunces, Space Grotesk, Manrope, Plus Jakarta, Outfit, Sora, Syne, Geist, Bricolage, Instrument, Playfair, Nunito, Cormorant, EB Garamond, Young Serif, Figtree, Onest, Hanken Grotesk); web-wide favourites (Roboto, Open Sans, Lato, Montserrat, Poppins, Oswald, Raleway, Merriweather, Lora); **faces already used by other Green Falls clients** (Labrada, Commissioner, Hedvig, Archivo, Libre Franklin, Besley, Chivo, Big Shoulders, Radio Canada, Atkinson); script and handwriting fonts (a wedding venue will tempt you).
- Funnel rules: x-height ≥70% of cap height, capital I distinct from lowercase l, tabular figures, a real bold, no slashed zero in phone numbers.
- Avoid: em dashes; invented facts, testimonials, prices or awards; stock and generated images; emojis, gradients, glows, lift animations, icon-tile grids, stat counters, carousels; eyebrows and tracked-uppercase micro-labels (pick one rule and keep it); captions that restate the photo; shaded-left-border callouts; more than one h1; Tailwind-default grays and creams; more than one solid CTA in the hero.
- Phones: the first screen is the design; the key fact and the primary button inside 375×812 and 390×844, checked by the QA runner. Targets ≥44px. Text floor 12-14px. No overflow at 320/360/390/768/1280/1440. Header scrolls away on phones. Bottom quick bar (Call, Directions) worked for Kindred. Form before the explanation on phones. First-load budget 300-600KB. **Every project left "test on a real iPhone" open.**

## Structured data and local SEO
Write JSON-LD at build time (Kindred's was client-side JS; avoid): `"@type": ["LocalBusiness","EventVenue"]` with `@id`, address, `geo`, `telephone`, `maximumAttendeeCapacity`, `sameAs`, `image`; FAQPage from the FAQ content; BreadcrumbList on inner pages. Generate sitemap, robots and llms.txt from the same content JSON. One OG card per page. Noindex `/thank-you/` and `/admin/`. Create a Google Business Profile (Garrick had none).

## Recommended template, file by file
Base: **Kindred Farms** (owner editing, validator, QA runner, best scores, Netlify, no server). Add a Schilly's-style zero-dependency `build.mjs` rendering `content/*.json` to 5-6 pages plus JSON-LD, sitemap and llms.txt; CMS saves trigger a Netlify rebuild. This breaks Kindred's "no build step" rule on purpose: several pages, build-time structured data, and validation that blocks a bad deploy.

| From | File | Action |
|---|---|---|
| Kindred | `admin/index.html` | copy |
| Kindred | `admin/config.yml` | keep backend/media/local_backend; keep settings fields for contact, address, announcement, photos, about, faq, copy; add pages, gallery, testimonials; fix repo, site_url, logo_url |
| Kindred | `scripts/check-content.js` | copy the structure, rewrite the rules, add alt-text and path checks |
| Kindred | `netlify.toml` | copy headers; `command = "node scripts/check-content.js && node build.mjs"`, `publish = "dist"` |
| Kindred | `.github/workflows/check-content.yml` | copy |
| Kindred | `EDITING-GUIDE.md` | copy the format |
| Kindred | `qa/run-qa.mjs`, `qa/lighthouse.mjs`, devDeps (playwright 1.56.1, @axe-core/playwright, lighthouse 12) | copy; point the first-screen check at the inquiry button |
| Kindred | `css/styles.css` | keep tokens-at-top, rem/em, focus-visible, reduced-motion, metric-matched `@font-face` fallbacks; new palette and fonts |
| Schilly's | `build.mjs` page loop, `ld()`, `sitemap()`, `robots()` with PREVIEW, `llms()`, `_redirects` | adapt |
| Schilly's | `.github/workflows/preview.yml` | copy for a noindexed preview at `<venue>.greenfalls.co` |
| Schilly's | content and layout gate rules | port into the QA runner |
| LRE | `LeadForm.astro`, `CtaBand.astro`, `thank-you.astro` | port to plain HTML |
| LRE | `docs/decision-record.md` | copy the format and the font-funnel table |
| Green Falls | staging checklist | restore indexing, analytics and form delivery on purpose at launch |
| Garrick | site-research §19 | confirm the owners' inbox provider and that notifications are not spam-filtered |

Launch checklist drawn from all five: commit research and photos the same day; photo permissions and a shot list; a real form test the owners confirm; test on a real iPhone; remove preview noindex; Google Business Profile; a Lighthouse baseline in `qa/`.
