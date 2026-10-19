# Garrick tooling: what to reuse, adapt, drop

Audit of `garrick-hoffman/tools/` and the theme, 2026-10-19, for a 5-6 page static brochure site. Paths relative to `garrick-hoffman/`.

## Verdict
Reuse as-is (after fixing paths): `tools/screenshot.mjs`, `tools/qa/page-weight.mjs`, `tools/qa/axe.mjs`, `tools/qa/section-shots.mjs`, `tools/peer-capture.mjs` (venue competitor scan), `.gitignore`. Adapt: `fetch-fonts.py`, `brand-assets.mjs`, `encode-hero.sh`, `v5-chrome.py` and `v5-jsonld.py` (the best basis for a static build), `frame-colors.py`, `qa/copy-lint.py`. Drop the WordPress theme approach, `build-preview*.py`, `frames-html.py`, `wp-test/*`, the portfolio CPT and REST, WooCommerce, base64-inlined production fonts.

## Dependencies
- Every `.mjs` imports Playwright from the hard-coded `/opt/node-tools/node_modules/playwright/index.mjs` and launches `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Replace with `import { chromium } from 'playwright'` plus a `package.json`, and make the executable path an env var (`PW_CHROMIUM`).
- Python scripts are stdlib only, except `frame-colors.py` (Pillow).
- No `package.json` existed. Add one with playwright and axe-core.

## The scripts

| Script | Does | Usage | Reuse? |
|---|---|---|---|
| `build-mockups.py` | WP block templates → static HTML; inlines header/footer parts; expands shortcodes; wraps each page in a head | `python3 tools/build-mockups.py` | Keep the ideas (one source; nav with `aria-current`; FAQ data reused for HTML and JSON-LD; a mock form script), not the code |
| `screenshot.mjs` | Full-page JPEGs at 1440×900 DPR1 and 390×844 DPR2 (isMobile, hasTouch, reducedMotion); scrolls to trigger lazy images, forces them loaded; writes `report.json` with status, title, h1Count, horizontalScroll, brokenImages, consoleErrors, ms | `node tools/screenshot.mjs <baseUrlOrDir> <outDir> [pages...]` | Yes. Note it filters `net::ERR|Failed to load resource|favicon` from console errors, so asset 404s only show as brokenImages. Exits 0 always; add a non-zero exit for CI |
| `page-capture.mjs` | Captures at 1440 / 1920 / 390@2x with bounding boxes for selectors | | Selectors are v5-specific; skip |
| `peer-capture.mjs` | Competitor review: screenshots plus nav labels, fonts, platform, schema types, keyword signals; 4 sites in parallel | `node tools/peer-capture.mjs <out-dir> tier:url ...` | Yes, for a venue competitor scan; change the keyword list |
| `brand-assets.mjs` | Renders 1200×630 OG card, favicon 512/180/96 PNGs, SVG favicon with font embedded | `node tools/brand-assets.mjs <background.jpg>` | Adapt: wordmark, monogram, tagline, font file, output path |
| `encode-hero.sh` | Two-pass VP9 WebM (CRF 34/36) and H.264 MP4 (faststart) at 1080 and 720, plus posters | `tools/encode-hero.sh <src> <out> [width] [seconds]` | Only if a hero video; rename outputs |
| `fetch-fonts.py` | Downloads Google Fonts woff2 (latin, latin-ext), writes `fonts.css` and `fontface.json` | `python3 -I tools/fetch-fonts.py <out-dir>` | Adapt the hard-coded family URL and two naming special cases. Keep self-hosting with latin subsets and `font-display: swap`; 2 families, ≤180KB total |
| `frame-colors.py` | Average colour per image → `--c` on `<figure class="frame">` | `python3 -I tools/frame-colors.py <cache> page.html...` | Adapt for gallery placeholders (needs Pillow) |
| `v5-chrome.py` | Keeps nav, menu sheet and footer identical across static pages from one Python list; injects a shared `<head>` from a `<!-- head: Title :: Description -->` marker | `python3 -I tools/v5-chrome.py <dir>` | Best pattern for a static site; replace NAV, phone, email, handles |
| `v5-jsonld.py` | JSON-LD per page from one model, then validates: JSON parses, every `@id` resolves, no `[CONFIRM]` left | `python3 -I tools/v5-jsonld.py <dir>` | Keep the validator; switch the graph to LocalBusiness/EventVenue with address, geo, openingHours |
| `qa/page-weight.mjs` | Bytes by type, LCP element, CLS, assets over 150KB; desktop and phone | `node tools/qa/page-weight.mjs <base> /paths...` | Yes |
| `qa/axe.mjs` | axe-core, WCAG 2.0/2.1 A+AA, 2.2 AA, best-practice, at 1440 | `node tools/qa/axe.mjs <base> /paths...` (needs `npm i axe-core`) | Yes |
| `qa/copy-lint.py` | Banned words, headings ending in a full stop, em dashes, exclamation marks; lists open `[CONFIRM]` | `python3 -I tools/qa/copy-lint.py page.html...` | Adapt the NEVER list to the venue's voice |
| `qa/section-shots.mjs` | Element screenshots by selector at desk/phone/tab | | Yes |
| `qa/scrim-contrast.mjs` | White-on-poster contrast | base URL hard-coded | Adapt for the hero photo |
| `qa/v5-pages-r2.mjs` | Overflow at 8 widths and 44px tap targets | | Lift the loop (the website-build skill's `measure.mjs` does the same) |
| `wp-test/*`, `smoke.sh` | Throwaway WP on SQLite, seed, 17 curl checks | | Only if WordPress |

The README also points to the website-build skill harness (`measure.mjs`, `contrast.mjs`, `copy_check.py`) with the viewport matrix `320x568,375x667,390x844,430x932,844x390,768x1024,1280x650,1440x900`.

## Mockup approach, and its drift
- Fonts were inlined as base64 in `mockups/fonts/fonts.css` (999,504 bytes) because "Chrome refuses cross-origin font loads from file:// pages". Fine for previews, not production. Serve previews with `python3 -m http.server` instead.
- Content photos were hotlinked from the live site; the hero video files did not exist in the folder. The mockups were not self-contained.
- The committed mockups drifted from the theme (`styles.css` diverged; `animations.js` had 1500ms vs 900ms). "One source of truth" only holds after a rebuild. Lesson: build output in CI or a pre-commit step, never hand-edit it.

## Theme and CSS, what to keep
- `theme.json` token structure: a closed 7-colour palette, contentSize 720 / wideSize 1440, fluid `clamp()` font sizes, custom easings and durations (160/240/800ms), self-hosted `fontFace` entries.
- `custom.css` (60KB, over its own 50KB budget): keep the `:root` token structure (`--gutter: clamp(1.25rem,4vw,4rem)`, `--space-section: clamp(4rem,10vw,8rem)`, z-index scale header 10 / overlay 20 / lightbox 30 / skip 50), the reduced-motion, reduced-transparency, `prefers-contrast` and print blocks, hover gating `(hover:hover) and (pointer:fine)`, the `.reveal` pattern. Breakpoints were ad hoc (880, 720, 600, 640, 560, 540, 520); use 2-3 named sizes. Aim for 20-25KB.
- `animations.js` (10KB vanilla): reuse the overlay focus trap, reveal observer and inline form validation; drop wordmark and video logic.
- Fonts on disk were about 747KB (Merriweather variable files 125-186KB each) against a 180KB budget. Use static latin instances.
- The inquiry handler (`functions.php` 828-953) is the reference for form hardening: same-host redirect check, honeypot `website` field, 4-second time trap, rate limit 5 per IP per 10 minutes via transient, server validation with errors stored in a token and redirected `?inquiry=error&t=`, a private record saved before `wp_mail()`, Reply-To header, `?inquiry=sent` on success. `docs/11` notes the page cache must exclude `/contact/` because of the nonce.

## Why not WordPress this time
WP was chosen for Garrick because he already had WP with WooCommerce (144 products), WPForms, Plausible and 2,392 media items. The costs the docs record: a caching plugin plus a cache exclusion for the form, security plugins, an SEO plugin coordinated so schema isn't output twice, sub-size regeneration, staging, a PHP host. The theme's templates were mostly `wp:html` blocks and shortcodes, so the "edit in WordPress" benefit was weak: footer, nav, FAQ and contact details meant editing HTML.

For Hio Ridge: a static site on free hosting (Netlify or Cloudflare Pages), a form service or function for the inquiry form, and either a Git-backed CMS (Decap/Sveltia/Pages CMS) over one content file or Mike making edits on request. WordPress only if the owner insists, wants a blog, or will edit text herself without a Git-backed CMS.

## Hard-coded Garrick names to never carry over
`ghoff_` prefix, `GHOFF_VERSION`, `ghoff-wm`, "Garrick Hoffman Photography", the GH monogram, `garrickhoffman.com` URLs, `garrick@garrickhoffman.com`, `(207) 939-6304`, the Instagram/Facebook/LinkedIn handles, Portland area data, `garrick-hero.*`, the WP test user and password.
