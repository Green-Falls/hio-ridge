# Brief: R&SVP – Hio Ridge website

Written 2026-10-19 before the first screenshot. Everything below comes from `data/research/RESEARCH.md`, `data/research/facebook/NOTES.md`, and the lessons in `docs/lessons/`. Facts not in those sources are marked `[CONFIRM]`.

## The deliverable, in the client's words

Susan's own words for the venue, from her posts: "a renovated barn on 22 acres in southern Maine, available for weddings, showers, concerts, parties, etc. Max capacity is 135." "A family friendly venue with no alcohol." The site's job is the one she repeats in every video: "Contact Susan to schedule a tour or book an event." Now booking 2027.

Mike's quote: the $3,500 package. About 28 hours: a template-based build, Susan's copy lightly edited rather than written from scratch, 4 pages. This build goes to 6 pages because one builder script makes extra pages nearly free, and the SEO lessons say one page per service. Nothing else widens.

**Conversions, in order:**
1. Inquiry form submitted (tour request or event inquiry).
2. Phone or text tap on 207.400.6353.
3. Email tap on Susan@437hioridge.events.

**Pages and the one job of each:**

| Page | Path | Job for the reader |
|---|---|---|
| Home | `/` | See the barn, learn what it is and where in one line, go to Weddings or Inquire |
| The Barn | `/the-barn/` | See the spaces: barn, loft, bridal and groom rooms, prep kitchen, patio, ceremony field, parking, accessibility. Capacity and what's included |
| Weddings | `/weddings/` | Decide this is their venue: Sunday weddings, alcohol-free, 135 guests, May to October, the view of Pleasant Mountain, how a day works here, FAQ, ask for the pricing brochure |
| Events & Gatherings | `/events/` | Showers, reunions, retreats, small concerts, teas, classes, corporate retreats, the parent retreats. The upcoming events list |
| Our Story | `/our-story/` | Susan and Richard, four generations, the Burnhams, the 1820 barn rebuilt from its own boards |
| Inquire | `/inquire/` | The form, the phone, the email, the address, directions |
| Thank you | `/thank-you/` | What happens next, the phone number. Noindexed |
| Privacy | `/privacy/` | Required because the form collects personal data |
| 404 | `/404.html` | Back to Home and Inquire |

## Locked and movable

**Locked (theirs):**
- The name "R&SVP – Hio Ridge". The hyphen form "R&SVP - Hio Ridge" is how they write it; the site uses an en dash in display and plain text elsewhere.
- The logo: the heart-shaped wreath sign. Used once per page, in the footer at its strongest size, and as the favicon source. The nav uses a text mark. `[CONFIRM: vector or large PNG of the logo]`
- Every fact in the research: 22 acres (the page description; one post says 23), 135 capacity, 1820 barn, May through October, Sunday through Friday, no alcohol, cannabis or smoking, 66-car lot plus 3 accessible spaces, ADA bathroom and ramp, prep kitchen, tables and chairs included, 207.400.6353, 619.948.7906, Susan@437hioridge.events, SusanBvoth@gmail.com, 437 Hio Ridge Rd, Bridgton, ME 04009.
- Susan's voice: warm, first person, plain, exclamation marks in her posts. The site keeps her words and her first person, drops the exclamation marks (the Garrick rule: the site is one register more professional than social).
- Photos: hers only. No stock, no generated images.

**Movable (ours):** palette, type, layout, the order of sections, the copy edits.

**Family:** none. There is no parent brand. The only reference is the logo's own palette: cream and blush roses, greens, dark brown sign, gold bells.

## Guardrails (checked every round)

**Rules added by Mike after the first build (Oct 19):** no image captions, anywhere. The site must look like the wedding a bride is picturing, not like the business that hosts it. The identity comes from the client's own logo (walnut sign, cream roses, wreath greenery, gold bells) and name (Caslon's italic ampersand is the device). **No eyebrow or kicker text, ever**: no small tracked-uppercase labels above headings; the only uppercase tracking on the site is "HIO RIDGE" in the lockup. The text never overpowers the photographs: the hero carries one line and one button; the photo does the selling. The navigation is a centered lockup with links either side.

Sector and place cliches, banned unless the record grants an exception: script or handwriting fonts; "rustic chic" eucalyptus and string-light illustrations; a barn icon; a Maine silhouette, lobsters, pine-tree icons, buoys; gold or rose-gold accents; cream or "AI off-white" template backgrounds (paper is pure #FFFFFF, the Generation Maine lesson); a gradient anywhere except a measured scrim over a photo; three-column icon grids; cards with a picture on top; carousels; stat counters; a hamburger-only menu (the word "Menu" in a 44px control: the audience is couples' parents and church groups); more than one solid button in the hero; eyebrows that restate the heading; em dashes; italics; a hand-typed year.

Numbers: control height 48px; tap targets 44px; text floor 13px; body 17px, line-height 1.6, max 65ch; gutter 20px under 640, 48px above; section padding 80px desktop, 56px phones; container 1280px; bar 64px (56 on phones); one ease `cubic-bezier(0.22,1,0.36,1)`; reveals 700ms, once, on arrival; hover only on `(hover:hover) and (pointer:fine)`; reduced motion gets a static page.

Budget: first view under 300KB on a phone; CSS under 30KB; JS under 15KB; fonts under 120KB; every photo through the build with 480/800/1200/1600 renditions, `width` and `height`, lazy below the fold, the hero eager with `fetchpriority="high"`.

Copy: the website-build rules (`docs/lessons/01`, section 3). Only facts Susan has published. `[CONFIRM: ...]` for the rest. No prices on the page until she gives them; "Ask for the pricing brochure" is her own phrase.

## Direction (one concept, not two)

**The idea:** the barn is the brand. Big photographs of the real place, a quiet serif that belongs to the year the barn was built, white paper, hairlines, and one green.

**Type.** Display and headlines: **Libre Caslon Text** (OFL, Impallari). Caslon was the type of New England in the decades the barn was raised; it reads as heritage without a script font. Body and labels: **IBM Plex Sans** (OFL). Capital I distinct from lowercase l, tabular figures, a plain zero for the phone number, a real bold. Neither face is on the AI-default list or used by another Green Falls client (see `docs/lessons/04`). Static instances, latin subset, two files preloaded, metric-matched fallbacks. `[CONFIRM: Susan has no font preference]`

**Palette (closed; contrast measured before admission):**

| Token | Value | Job |
|---|---|---|
| `--ink` | #1C1813 | Text, the dark field for the closing band. Warm near-black from the barn's interior shadow, not pure black |
| `--paper` | #FFFFFF | Page background |
| `--muted` | #5E574E | Secondary text, captions |
| `--rule` | #D9D3CA | Hairlines, derived from the stone wall |
| `--field` | #3B5A2A | The one accent: link underline colour, the focus ring, the form button. From the lawn in the photos |

No tints, no surface colours. Sections are separated by space and hairlines.

**Layout decisions, made once:** left-aligned sections; a plain bar, not a capsule; one button shape (square corners, 2px); the hero is a full-width photograph with the one line and the one button in the lower third over a measured scrim, `100svh` capped so the button clears 1280×650 and 390×664.

**Motion:** one idea per page: a single fade-up on arrival for section headings, 700ms, once. Nothing on the hero. Nothing tied to the pointer.

**Look-alikes to stay clear of:** The Knot's barn-venue template pages (serif plus script, blush and sage); the Noble House Inn and Highland Lake Resort sites in Bridgton (`[CONFIRM: competitor scan, tools/peers]`).

**Considered and left out:** a hero video (the YouTube clips are low-resolution and captioned; revisit when Susan shoots one); a gallery viewer (the photos are phone shots; a plain grid is honest); testimonials (none published yet; a block waits behind a flag); an availability calendar (future upgrade).

## Build

Static site, one zero-dependency builder (`build.mjs`) rendering `content/*.json` to `dist/`, with JSON-LD (`["LocalBusiness","EventVenue"]`, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`, `llms.txt`, `_redirects`. Hosting: Netlify, free tier, `command = "node scripts/check-content.js && node build.mjs"`, `publish = "dist"`. Form: Netlify Forms with the honeypot, `/thank-you/`, notifications to Susan and a Green Falls backstop; submissions stored in the dashboard so a lost email is never a lost lead. Editing: Sveltia CMS at `/admin/` over the content files for Susan, with an editing guide; Green Falls keeps a collaborator seat and makes edits on request. Preview: GitHub Pages at `hioridge.greenfalls.co` with noindex until launch. `[CONFIRM: Netlify account owner, domain 437hioridge.events DNS access (GoDaddy), who receives form notifications]`

QA: the website-build harness (`measure.mjs`, `contrast.mjs`, `copy_check.py`) across `320x568,375x667,390x844,430x932,844x390,768x1024,1280x650,1440x900`; axe at 375 and 1440; three mobile Lighthouse runs recorded in `qa/`; a first-screen check that the inquiry button sits inside 375×812.

## Gates

1. This brief and the first full mockup go to Mike before anything is called done.
2. Nothing goes to Susan from this session; Mike presents.
3. Launch waits on: the `[CONFIRM]` list cleared, a real form test the owners confirm they received, a real iPhone pass, the preview noindex removed on purpose.

## Open `[CONFIRM]` list (repeated at the end of every report)

1. Logo file (vector or large PNG).
2. Full-resolution originals of the hero and interior photos, and of the four captioned photos (`docs/photo-shortlist.md`).
3. Which building is the white-painted barn in four of the photos.
4. 22 or 23 acres.
5. Sunday through Friday: confirm Saturdays are never booked.
6. Pricing brochure: does Susan want starting prices on the site? (The SEO lesson: showing them wins.)
7. Catering: outside caterers only? Any list?
8. Restrooms: the indoor ADA bathroom plus rented porta-potties for large events?
9. Seventh-day Adventist: say it on the site, or only Sunday weddings and alcohol-free?
10. The parent-retreat program: ready to announce, or hold?
11. Susan's book title, if it goes on Our Story.
12. The jazz band's name (High Street Jazz Band, as captioned).
13. Which email receives inquiries: Susan@437hioridge.events or SusanBvoth@gmail.com.
14. Whether to list 619.948.7906 publicly beside 207.400.6353.
15. Domain and DNS: 437hioridge.events is on GoDaddy with a placeholder site; who has the login.
16. Instagram: do they have one? Only Facebook and YouTube are confirmed.
17. The two Facebook pages: merge or retire one (listings cleanup scope).
18. Season for 2027: May through October, as told to the town.
