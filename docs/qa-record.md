# QA and audits: R&SVP – Hio Ridge

One section per audit pass. Each finding is one bullet: what was wrong, how it was measured, what was done. Findings accepted as is are listed too, with the reason.

Harness: `node qa/measure.mjs dist/index.html --viewports 320x568,375x667,390x844,430x932,844x390,768x1024,1280x650,1440x900`, `node qa/contrast.mjs`, `python3 qa/copy_check.py`, axe at 375 and 1440, three mobile Lighthouse runs. Every pass records the build stamp it measured.

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
