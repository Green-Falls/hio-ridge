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

## Round 3: nav, hero and copy, October 19

Mike: "the text is overpowering the photos and we need much better copy"; "play with a navigation where the logo is centered"; "do eyebrow text audit too. i hate how much AI overuses it."
- **Nav:** a centered stacked lockup (R&SVP with the gold italic ampersand over HIO RIDGE), three links left (The Barn, Weddings, Pricing), three right (Events, Our Story, Inquire in moss with a gold underline). The bar is paper, above the photo, never over it. The green announcement strip is gone; "Now booking 2027" lives in the facts strip under the hero. On phones: lockup centered, Menu at right.
- **Hero:** the photograph at 16:8.5 (4:5 on phones), one line in the lower-left ("Your wedding in a barn raised in 1820", 46px max), one paper button, the italic place-and-season line beside it, a scrim that covers only the lower band. Kicker, paragraph, second button and fact column removed from the photo. Facts moved to a hairline strip below. A full-bleed October photo with no text sits mid-page.
- **Scale:** h1 max 60px (was 80), h2 max 42px (was 52), lede max 23px. The statement ampersand 88px max (was 144).
- **Eyebrows:** audited and removed: the "What is included" kicker, the "Weddings start at" kicker (now a plain muted line), the tracked-caps footer column labels (now small Caslon headings). The `.kicker` class is deleted so one cannot come back by accident.
- **Copy:** every page rewritten to a bride, in Susan's voice: "The farm has been ours since 1941. The barn is yours for the day."; "Any day but Saturday."; "Come stand in it. Photos only go so far."; "Pick a Sunday in 2027." Facts unchanged; the `[CONFIRM]` set unchanged.
- **Bug fixed at the root:** section class names collided with component classes (`.proof`, `.facts`); sections are now prefixed `sec-` by the builder.
- Set aside: a hairline gold rule under the bar (tried in thought, not built: the lockup's gold ampersand is the one gold element in the bar).

## Round 2: competitor audit and identity rebuild, October 19

Mike's read of the first build: "very bland. the brand identity is very weak and not appealing to brides." Also: never use image captions; keep in mind the aesthetic brides want on their wedding. The method changed, not the sheet count:
- **Audit first.** Six competitor sites within 40 minutes captured and measured (`docs/research/competitors-2026-10.md`, `qa/peers/`). Every one opens on a wedding photograph or a lit, dressed space; runs a serif at 36 to 89px; keeps a white page with one warm accent; and puts Pricing, Open Dates or Inquire in the nav. Ours opened on an empty facade with a text nav and no mark.
- **Identity from the client's own logo and name.** Walnut sign → `--ink #26190F`; wreath greenery → `--moss #3B5131` for the dark bands and footer; gold bells → `--gold #A8843F` for the ampersand, hairlines and display-size kickers; cream roses → `--linen #F6F1EA` for one alternate band, never the page. The device is Caslon's italic ampersand from "R&SVP", in the mark, large once on the home page, and in the menu. The heart wreath appears once, at 200px, in the footer.
- **Hero:** the barn lit at night from inside, a title card with the kicker "Bridgton, Maine", the line "A 206-year-old barn, rebuilt for your Sunday", an italic lede, two actions (tour, pricing) and three facts. The facade photo moved to The Barn page.
- **Home order:** hero → Susan's own line beside the barn at night (linen) → the story paragraph → three photo paths → "what is included" on moss with the pricing comparison → October → proof row (open house, ribbon cutting, occupancy) → Susan and Richard → closing band.
- **Pricing page added** (every competitor has one): starting price as a `[CONFIRM]`, the included list, the honest comparison to the $8,000 to $13,000 set and why (no bar), event rates `[CONFIRM]`.
- **What we say that nobody else does:** alcohol-free Sunday weddings; the field facing Pleasant Mountain; four generations.
- Set aside: script fonts (every competitor flourish is a script; the ampersand does that job here); a video hero (no footage yet); a reviews widget (no reviews yet); stock couples (never).
- Open: Mike's read of round 2; Susan's photos of a dressed room or a couple, which would replace the interior hero the day they exist.

## First build, October 19

Built all 9 pages from `content/*.json` with `build.mjs`; QA in `docs/qa-record.md`. Decisions made while building:
- The client's name keeps its en dash ("R&SVP – Hio Ridge"); the no-dash rule exempts that exact string and nothing else.
- Fonts: static instances cut from the variable files (Caslon 400, 400 italic, 700; Plex 400, 600), latin subset, 108KB total. Fallbacks measured: Caslon over Liberation Serif at `size-adjust: 116.7%`, Plex over Liberation Sans at 100.1%.
- A gap before every comma and period at display size was first blamed on Libre Caslon Text's comma. Wrong: the cause was `font-variant-numeric: tabular-nums` on `body`. Caslon's (and Plex's) tabular-figures feature also sets the comma and period to figure width so "1,000.00" aligns, which spaced every comma on the page. Fixed by applying tabular figures only where numbers stack (facts, details, prices). The glyph surgery tried in between was reverted; fonts are cut clean by `scripts/fonts.py`. Lesson for the guide: a feature meant for numbers can change punctuation; test "n," at display size whenever `tnum` is on.
- Hero scrims are measured, not eyeballed: `qa/hero-scrim.mjs` reports the worst-case contrast of each text element against the pixels behind it. Floor 3:1 for the headline, 4.5:1 for the line; both pass with margin.
- Phones get a fixed Call / Inquire bar at the bottom (the Kindred Farms pattern) instead of a sticky header.
- The menu is the word "Menu" in a bordered 44px control, not a hamburger (the Garrick lesson about couples' parents).
- The form is Netlify Forms with a honeypot and a `/thank-you/` page; only name and email are required.
- Inner pages open with the heading and lede above a 16:7 photo, not text over a photo; only the home hero puts text over a photograph, under a measured scrim.
- Build modes: production; `PREVIEW_HOST` (noindex, robots disallow, CNAME); `RELATIVE=1` (noindex, relative links) for a claude.ai artifact preview.

Set aside: a gallery page (the photos are phone shots; the pages carry them in context instead); testimonials (none exist); Instagram (none confirmed).

## Kickoff, October 19

Read every past site project (Garrick Hoffman in this repo and in `garrickhoffman-site`, Generation Maine, Kindred Farms, Schilly's, Lake Region Energy, Green Falls) and the website-build skill, and wrote the reusable rules into `docs/lessons/`. Wrote the brief. Set aside: a second concept, a hero video, a gallery viewer, testimonials (behind a flag), an availability calendar. Open: everything in the `[CONFIRM]` list; Mike's review of the brief.
