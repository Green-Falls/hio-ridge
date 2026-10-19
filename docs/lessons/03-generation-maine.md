# Lessons from Generation Maine

Distilled 2026-10-19 from `mchljns/Generation-Maine` (theme v3.5.3). Its `REPORT.md` is out of date (describes the first build); the current state is in `generation-maine/README.md`, `generation-maine/PROJECT.md`, `qa/wordpress/QA-RECORD.md` and `brand/05-identity-system.md` from "The lean page" onward.

## Process: what worked
- **Static HTML preview first, published to GitHub Pages, approved, then the CMS theme generated from it.** A Python builder wrote the theme's CSS, JS and footer markup from the approved page, so the two could not drift; at 1440 every section height matched to the pixel.
- **A verbatim client-feedback file, each note followed by "What this changes."**
- **Every unknown fact `[CONFIRM: ...]`, listed for the client.** Settings fields hide or soften empty values instead of leaving dead links.
- **QA as separate testers on fresh sites, every finding reproduced twice.** Four rounds took findings from 74 → 53 → 20 → 10. Severity scale P1/P2/P3 (or critical/high/medium/low/info).
- **The README as the client manual**, plain steps, with a dashboard "Start here" box.

## What had to be redone (one line each)
- Two full creative concepts were thrown away when the client said it must "look cohesive with Maine Policy's branding". Ask for the parent or reference brand before exploring.
- Scope was overbuilt (creator stepper, newsletter, quote bands) when the client wanted "bare bones and basic splash page". The $9,500 quote was "on the upper end" with an RFP threatened. Agree the page's jobs before building.
- "Don't overthink it, it's a small-ish project." A two-concept comparison kept running anyway.
- Palette rebuilt twice to stay clear of other local brands (greenfalls.co lime, Baxter Brewing orange). Check local competitors before locking colours.
- Near-whites (#F7F8F6, #F9F8F6) rejected because they read as pale green beside green; became pure #FFFFFF.
- Client notes on one round: "too much monospace, too much eyebrow text, footer out of whack, imagery not too depressing."
- The family audit cut about half the motion: background crossfade, capsule header, progress bar, button lift, footer ping.
- A decorative signup field (input outside any form) made the visitor type their email twice.
- No share card, skip link or favicon until the conversion audit (29/50).
- Nine GIF clips loaded up front, 8.7-14MB on phones; now lazy via data-src.
- Hero CTAs below the fold at 1280×650 and 1024×700; fixed by sizing the hero to viewport height.
- No message on an invalid submit; now an error line with role=alert and the button reads "sent" on success.
- WP round-1 highs: anchor links dead on inner pages, archives showing one post, a seed script deleting hand-made posts, a picker doing nothing.
- WP 7.1 moved a field and broke the README. Write docs against the WP version the client runs.
- PROJECT.md shipped inside the public zip; the packager now skips it.
- An `http://` URL was silently erased on save; now upgraded to https or refused with a notice.

## Copy rules
- "Plain words, one idea per sentence. Short headlines. No hype, no em dashes, no italics, and no invented facts."
- Visible page under 300 words (shipped ~235). Headline under 10 words, ideally 7. SEO title 56 characters, meta 119.
- Mission statement ≤25 words beside an authentic photo, not over it.
- No promised cadence or plans. Every line does one job. Third-party names keep their casing. Curly quotes, opening mark hung. Pick 3 headline options, use 1, write down why.

## Design rules
- One accent with one job: the gold is "the dot", never a button colour, never highlighting words.
- Few weights. One control height (48px). No text under 13px. Tap targets 44px; phone nav links 44, close buttons 48.
- Contrast pairs measured and recorded.
- One section rhythm: 112px desktop, 56px phones. One 1280px container, 60px gutters.
- Hero CTA above the fold down to 650px viewport height.
- Rejected: pill buttons (squared to match the family), morphing capsule header (plain sticky bar instead), scroll background crossfade, hover lift (0.3s colour change instead), lowercase serif, Red Hat Display (client asked not to), a second concept, near-white "Snow".
- Motion kept: hero rise on load, section reveal ~0.6s, `prefers-reduced-motion` honoured.
- Photography: "the picture is of the thing, not of a mood." Daylight, people together. CC placeholders credited or replaced before launch.

## Theme architecture, and what is reusable
- Custom blocks with no build step (`block.json` with `"render": "file:./render.php"`, `wp.serverSideRender`, `save: null`, `supports.multiple: false`). `theme.json` disables nearly every editor control; only a 5-colour palette remains. Home page created on activation from patterns; sections block-locked so the client edits text but not layout.
- **Reusable:** `inc/seo.php` (title override, meta description and canonical, Open Graph, twitter card, JSON-LD; steps aside if Yoast/Rank Math/SEOPress/AIOSEO is active; admin overrides with a character counter). `inc/settings.php` (one array declares every field; sanitisers by type; `gm_setting()` with defaults; one place for phone, email, address, socials). Tokenised footer file (`{{YEAR}}`, `{{LEGAL}}`, `{{PRIVACY}}`, `{{CONTACT}}`, `{{BUILD}}`) filled with `strtr`. Admin: "start here" widget, comments off, head trimmed, fonts preloaded, cache-busting by build hash, UTM on outbound links, `no_texturize` so WP doesn't rewrite handles.
- **No form handling at all.** The newsletter form posted to Substack. For a venue inquiry form this project gives nothing to copy except: hide-until-configured with an admin-only note, the inline error line with role=alert, the button changing to "sent".

## QA harness
- `qa/run-qa.mjs`: Playwright at 375, 768, 1440; PHP error strings in HTML; horizontal overflow with offending elements; broken images; axe (`wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice`) at 1440 and 375; console errors; screenshots; `qa-results.json`.
- `qa/check-blocks.mjs`: parses every pattern and template with `wp.blocks.parse` and reports invalid blocks.
- Lighthouse mobile (early build): Performance 97-98, Accessibility 100, Best Practices 100, SEO 100; FCP 1.7s, LCP 2.1s, TBT 0, CLS 0.015. Command: `node_modules/.bin/lighthouse <url> --chrome-path=/opt/pw-browsers/chromium --chrome-flags="--headless=new --no-sandbox"`.
- Test environments: WP on SQLite with PHP's built-in server plus WP-CLI, one per tester per port (`qa/wordpress/env/`); Playground CLI for PHP 7.4 / WP 6.5; a public Playground blueprint as the client "test link". Pin `preferredVersions` because the Playground banner lies about PHP; PHP's server has no rewriting, so set permalinks with WP-CLI.

## Deploy and handoff
- Preview on GitHub Pages, verified by sha1 of the live files after the cache window.
- Reproducible zip (`package_theme.py`: sorted entries, fixed date, fixed permissions, skips PROJECT.md and dev files).
- Client install steps: upload zip, Live Preview, activate (creates Home), permalinks to Post name, fill Settings, pick the Privacy page, set a Site Icon.

## This project vs a small venue site
Over 2,500 lines of PHP, mostly working around the Site Editor, four QA rounds, 200+ findings across WP 6.5-7.1. Much of it existed to stop editors breaking the design, for a creator stepper the client had not asked for.

For ~6 pages, one inquiry form and a non-technical client on $3,500: if WordPress, a lightly customised block theme with `theme.json` locked, 5-8 patterns, locked sections, a form plugin plus SMTP plus Akismet or Turnstile; copy over `seo.php`, a cut-down settings page feeding a tokenised footer, the admin trims, `run-qa.mjs` and `check-blocks.mjs`, a Playground blueprint as the preview link. Avoid CPTs and server-rendered custom blocks for content the client edits. Process: get the reference brand and the page's jobs in writing; one concept; publish a static preview for approval; a client-feedback log; a `[CONFIRM]` list; one solid QA pass on the WP version the client runs.
