# QA and audits: R&SVP – Hio Ridge

One section per audit pass. Each finding is one bullet: what was wrong, how it was measured, what was done. Findings accepted as is are listed too, with the reason.

Harness: `node qa/measure.mjs dist/index.html --viewports 320x568,375x667,390x844,430x932,844x390,768x1024,1280x650,1440x900`, `node qa/contrast.mjs`, `python3 qa/copy_check.py`, axe at 375 and 1440, three mobile Lighthouse runs. Every pass records the build stamp it measured.

## Round 4, palette, hero, type, copy, October 19, 2026

Measured: `run-qa.mjs` on all 10 pages at 375/768/1440; `contrast.mjs` on the home page at 390 and 1440 (new fir and blush surfaces); three mobile Lighthouse runs.

Found and fixed:
- The paths' link rows got two arrows (the generic `.more::after` plus the row's own). Scoped off.
- The closing band was hard-coded in the builder, so the copy rewrite did not reach it. It reads from `home.json` now.

Measured, passing: `run-qa.mjs` 0 problems on 10 pages; contrast 0 under target at both widths (paper on fir 13.5:1, ink on blush 13.1:1, gold on fir 4.8:1); Lighthouse mobile 99 / 100 / 100 / 100, LCP 2.0s, CLS 0. The hero no longer carries text, so the scrim measurement does not apply to the home page.

## Round 3, nav, hero, copy, eyebrows, October 19, 2026

Measured as before on all 10 pages, plus `hero-scrim.mjs` on the new corner scrim and Lighthouse's layout-shift audit.

Found and fixed:
- The lockup's "Hio Ridge" line was 11px. Set to 13px, tracked 0.2em.
- The corner scrim, lightened so the photo shows, let the headline fall to 2.3:1 on the 1280×650 frame and 2.8:1 on phones. Deepened the lower band only; now 7.3:1 at 1440×900, 5.8:1 at 390×844, 4.0:1 at 1280×650.
- "Now booking 2027" link in the facts strip was 18px tall. 44px hit area.
- On phones the Menu button wrapped to a second row because the empty right-hand nav kept its grid cell. The right nav is hidden below 64em.
- The "Open since August" row rendered in three squeezed columns: the section's class name `proof` collided with the list's `.proof` rules. Sections are now prefixed `sec-` by the builder, which also removed a latent collision on `facts`.
- Lighthouse reported one layout shift (CLS 0.058): the linen statement block, caused by the web font landing. The 88px ampersand used the size-adjusted fallback face, so its line box changed height on swap. It now falls back to Georgia at the same size, with a fixed 0.8em box.
- Eyebrow audit: three removed (home band, pricing label, footer column labels); the kicker class deleted.

Measured, passing: `run-qa.mjs` 0 problems on 10 pages; Lighthouse mobile 99 / 100 / 100 / 100 (see the run table in `qa/lighthouse-summary.json` for CLS after the fix).

## Round 2, identity rebuild, October 19, 2026

Measured as before: `run-qa.mjs` on all 10 pages at 375/768/1440, `hero-scrim.mjs`, `contrast.mjs` on the Pricing page (the new moss band with gold kicker), three mobile Lighthouse runs. Build stamp bef3522 plus working changes.

Found and fixed:
- A gap before every comma and period at display size. Root cause: `font-variant-numeric: tabular-nums` on `body`; Caslon's and Plex's `tnum` feature widens the comma and period to figure width. Tabular figures now apply only to the facts, details, prices and event dates. (The first pass misdiagnosed this as the comma glyph; corrected in the decision record.)
- New hero (the lit barn interior) measured darker behind the headline: 3.45:1 at 1440×900 on the first scrim. Scrim deepened; now headline 5.31:1 at 1440×900, 5.47:1 at 390×844, 6.37:1 at 1280×650; the italic line 8.9 to 13.9:1; nav 3.92:1 worst case.
- Pricing page description 192 characters; shortened to fit.

Measured, passing:
- `run-qa.mjs`: 0 problems on 10 pages: no overflow, no text under 13px, no tap target under 44px, one h1, landmarks, no em dashes, no dead links, no console errors, axe 0 violations at 375 and 1440.
- `contrast.mjs` on `/pricing/` at 390 and 1440: 0 under target (paper on moss, gold kicker on moss at display size, ink on linen).
- Lighthouse mobile, home, 3 runs: 99 / 99 / 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2s, LCP 2.0s, TBT 0, CLS 0.

Known and accepted:
- The gold (#A8843F) is used for text only at kicker size on moss (passes) and for the ampersand at display size; never for small text on white, where it would be 3.3:1.
- Competitor captures in `qa/peers/` are from a proxy'd headless browser; The Knot served a bot check and Highland Lake timed out. The facts for those came from fetched listing pages instead.

## First build pass, October 19, 2026

Measured at 375×812 (phone emulation, DPR 2), 768×1024 and 1440×900 with `qa/run-qa.mjs` on all 9 pages; the home page also at 320×568, 375×667, 390×844, 430×932, 844×390, 768×1024, 1280×650 and 1440×900 with `qa/measure.mjs`; hero text against the brightest pixel behind it with `qa/hero-scrim.mjs`; three mobile Lighthouse runs with `qa/lighthouse.mjs`. Build stamp 04f75ae.

Found and fixed:
- The nav mark's small label was 12px against a 13px floor. Set to 13px.
- Announcement-strip link, footer links, "more" links, the band's phone link and the aside's contact links were 21 to 39px tall. Given a 44px hit area with `inline-flex` and `min-height`, no visual change. "Privacy" was 42px wide; given `min-width: 44px`.
- axe `label-content-name-mismatch` (serious): the mark's `aria-label` did not contain its visible text. Removed the aria-label; the visible name is the accessible name.
- axe `region` (moderate): the announcement strip and the phone quick bar sat outside landmarks. The strip now lives inside `<header>`; the quick bar is a `<nav>`.
- One inline Facebook link inside running text on the Events page was 22px tall. Moved to its own line as a "more" link.
- Hero text contrast. First scrim: h1 2.56:1 at 1440×900 and 3.70:1 at 390×844; nav links over the sky 2.12:1. Strengthened both scrims (top band to 0.78 over 240px; bottom from 0.92). Now h1 4.81:1 at 1440×900, 5.32:1 at 390×844, 5.20:1 at 1280×650; line 8.2 to 11.8:1; nav 4.18:1 at 1440×900 worst case, 6.21:1 at 1280×650.
- The announcement strip rendered as a narrow box on inner pages (the paragraph `max-width` applied). Set `max-width: none`.
- The Weddings page hero crop showed mostly lawn. Inner-page hero photos now use `object-position: 50% 65%`.
- On phones the fixed quick bar covered the bottom 48px of the page. `body` gets matching bottom padding; the hero's bottom padding grows by the bar height so the button clears it.
- Three meta descriptions over 170 characters. Shortened.
- The content validator flagged the en dash in the client's own name "R&SVP – Hio Ridge". The exact name string is exempt; dashes elsewhere still fail the build.

Measured, passing:
- `run-qa.mjs`: 0 problems on 9 pages at 375/768/1440: no overflow, no broken images, no text under 13px, no tap targets under 44px, one h1, all four landmarks, no em dashes, no dead internal links, no console errors, axe 0 violations at 375 and 1440.
- Lighthouse mobile, home page, 3 runs: Performance 99 / 99 / 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2s, LCP 2.2s, TBT 0ms, CLS 0.
- Weight: `styles.css` 16KB, `site.js` 4KB, home HTML 14KB, fonts 108KB (five files), hero 188KB WebP at 1600.
- At 1440×900 with `networkidle`, 12 media files requested at load (fonts, the hero and six lazy photos Chromium pre-fetches within its lazy margin). First-view set is the hero plus two fonts.

Known and accepted:
- Libre Caslon Text's comma and period are 0.26em wide, which reads as a gap before commas in headlines. The roman subsets had the four punctuation glyphs shifted and narrowed (recorded in the decision record); re-measured in the next pass.
- The full-page QA screenshots show solid colour blocks where lazy photos had not loaded at capture; that is the capture, not the page (the dominant-colour placeholder is the designed loading state). The runner now scrolls the page and waits for every image before capturing.
- The contrast script reports the nav links over the hero as 1:1 because it cannot see through to the photo; the pixel check in `hero-scrim.mjs` is the measurement for those.
- Not yet done: a real iPhone pass; a real form submission (needs Netlify); the share card is the 1200px hero with no text.
