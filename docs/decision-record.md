# Decisions: R&SVP – Hio Ridge

A running record. Newest entries at the bottom. One entry per decision or pass, written the day it happens.

## Decisions so far
- 2026-10-19 Separate branch `hio-ridge`, separate folder `hio-ridge/`, nothing shared with Garrick. Mike asked for it to be separate.
- 2026-10-19 Research collected before design: town Planning Board minutes, the owner's YouTube channel, the ribbon-cutting transcript, 119 Facebook photos and all page posts. Committed the same day (the Kindred Farms lesson: an uncommitted Facebook extract was lost once).
- 2026-10-19 The $3,500 package, built as 6 pages because one builder makes pages cheap and SEO wants one page per service. Scope does not widen beyond `docs/00-brief.md`.
- 2026-10-19 Static site, one builder, Netlify, Netlify Forms, Sveltia CMS over JSON. Why: no server to maintain, submissions stored, owner can edit, best measured scores of the five past projects (`docs/lessons/04`). WordPress rejected: hosting, updates, email deliverability and backup burdens a $3,500 site cannot carry (`docs/lessons/02`, `03`).
- 2026-10-19 One concept, not two. Why: Generation Maine threw away two concepts; the client said "don't overthink it".
- 2026-10-19 Type: Libre Caslon Text and IBM Plex Sans. Why: in the brief. Not on the AI-default list, not used by another Green Falls client, Caslon fits an 1820 barn without a script face.
- 2026-10-19 Palette: ink #1C1813, paper #FFFFFF, muted #5E574E, rule #D9D3CA, field #3B5A2A. One accent with one job. Pure white paper (Generation Maine rejected near-whites). Contrast to be measured before the first sheet.
- 2026-10-19 Copy: Susan's own sentences, lightly edited, first person, no exclamation marks on the site. Facts only from her published posts and the town record. No prices until she supplies them.
- 2026-10-19 Photos: her Facebook photos launch the site; a shot list goes to her for originals. No stock, no generated images.

## Open
- See the numbered `[CONFIRM]` list at the end of `docs/00-brief.md`.

## Files
- Research: `data/research/RESEARCH.md`, `data/research/facebook/NOTES.md`, `data/research/facebook/MANIFEST.csv`, images in `data/research/facebook/images/` and `data/research/images/`.
- Lessons from past sites: `docs/lessons/01` to `04`.
- Brief and guardrails: `docs/00-brief.md`. Photo picks: `docs/photo-shortlist.md`.
- Source: `content/*.json`, `build.mjs`, `src/`. Output: `dist/`. QA: `qa/`.

## First build, October 19

Built all 9 pages from `content/*.json` with `build.mjs`; QA in `docs/qa-record.md`. Decisions made while building:
- The client's name keeps its en dash ("R&SVP – Hio Ridge"); the no-dash rule exempts that exact string and nothing else.
- Fonts: static instances cut from the variable files (Caslon 400, 400 italic, 700; Plex 400, 600), latin subset, 108KB total. Fallbacks measured: Caslon over Liberation Serif at `size-adjust: 116.7%`, Plex over Liberation Sans at 100.1%.
- Libre Caslon Text's comma reads as a gap before it at headline size. Measured: no kerning fault ("n," is exactly n plus comma); the comma is a large, low teardrop, which is the face. Tried narrowing the punctuation glyphs in the subset (2px at 60px, no visible change) and reverted it; the fonts are cut clean by `scripts/fonts.py`. The hero headline was rewritten without commas ("A 206-year-old barn on 22 acres facing Pleasant Mountain"). One comma in a heading is accepted. If Mike or Susan dislike it, the fallback is a different display face, not glyph surgery.
- Hero scrims are measured, not eyeballed: `qa/hero-scrim.mjs` reports the worst-case contrast of each text element against the pixels behind it. Floor 3:1 for the headline, 4.5:1 for the line; both pass with margin.
- Phones get a fixed Call / Inquire bar at the bottom (the Kindred Farms pattern) instead of a sticky header.
- The menu is the word "Menu" in a bordered 44px control, not a hamburger (the Garrick lesson about couples' parents).
- The form is Netlify Forms with a honeypot and a `/thank-you/` page; only name and email are required.
- Inner pages open with the heading and lede above a 16:7 photo, not text over a photo; only the home hero puts text over a photograph, under a measured scrim.
- Build modes: production; `PREVIEW_HOST` (noindex, robots disallow, CNAME); `RELATIVE=1` (noindex, relative links) for a claude.ai artifact preview.

Set aside: a gallery page (the photos are phone shots; the pages carry them in context instead); testimonials (none exist); Instagram (none confirmed).

## Kickoff, October 19

Read every past site project (Garrick Hoffman in this repo and in `garrickhoffman-site`, Generation Maine, Kindred Farms, Schilly's, Lake Region Energy, Green Falls) and the website-build skill, and wrote the reusable rules into `docs/lessons/`. Wrote the brief. Set aside: a second concept, a hero video, a gallery viewer, testimonials (behind a flag), an availability calendar. Open: everything in the `[CONFIRM]` list; Mike's review of the brief.
