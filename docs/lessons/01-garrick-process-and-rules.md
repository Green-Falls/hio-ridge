# Lessons from the Garrick Hoffman site: process, rules, mistakes

Distilled 2026-10-19 from the Garrick Hoffman project (branch `claude/serene-wozniak-w9vvxh`, folder `garrick-hoffman/`) for reuse on Hio Ridge. Source files are cited in brackets; paths are relative to `garrick-hoffman/`. "$3.5k note" items are inferences for this project, not something the Garrick docs say.

## 1. The process that worked

1. **Research, measured rather than described.** Playwright pulled real CSS from peer sites (fonts, sizes, hex, grids) [docs/critique/garrick-theme-critique-log.md]. The client's own live site was audited the same way. A competitive scan recorded each site's title, H1, fonts, platform and schema [docs/research/competitive-2026-10.md]. The SEO memo used only primary sources (Google Search Central, web.dev, bot docs) [docs/research/seo-aeo-2026-10.md]. A voice guide was built from the client's own writing [docs/research/voice-garrick-2026-10.md].
2. **A direction doc before any build.** One goal sentence from the client; a section-by-section page spec; a borrowings table (what we saw, where, what we do with it); a look-alike list of competitor devices to avoid; a "set aside, with the reason" list [docs/10-design-direction-v5.md].
3. **Static HTML mockups from one source** (`tools/build-mockups.py`) so docs, mockups and theme shared a source [docs/decision-record.md].
4. **Critique rounds, each with an aim.** Per decision: state it, attack it, find a real counter-example, revise, then the gut check "Would I be able to tell this is the client's site with the logo removed?" [docs/continuation-prompt.md]. Then a system-level critique, a critique against the client's real site, a creative-director critique of the build, a copy pass, and the "$30k" elevation rounds [docs/critique/].
5. **Build, then run on a real install.** Seeded with real photos, 17-check smoke test (routes, llms.txt, the inquiry round trip and its error state) [README.md, docs/qa-record.md].
6. **Harness audit at 8 viewports:** 320x568, 375x667, 390x844, 430x932, 844x390, 768x1024, 1280x650, 1440x900. Contrast, copy lint, scrim check against the brightest pixel, Playwright interaction scripts, page weight / LCP / CLS, axe-core [docs/07-improvement-audit.md].
7. **Three running records:** client feedback (verbatim, then Applied / Open), decision record (with Why), QA record (what was wrong, how measured, what was done, plus "known and accepted").
8. **A launch runbook** [docs/05-launch-and-migration-plan.md, docs/11-migration-and-build-plan.md].

**What the critique rounds kept catching:**
- AI-default choices. Cormorant + DM Sans is "the Squarespace luxury-wedding starter pack"; Playfair is "reject on sight"; Inter is "the React-developer default"; Newsreader + Inter + Figtree is "the exact default an AI assistant produces".
- Design-flexing. Asymmetric 5/2 + 3/4 grids and vertical-offset image rows "read as overproduced". Equal weight was "more confident".
- Drifting from the client's real identity; many upgrades were reverted to his existing fonts and patterns.
- Invented facts.
- Slow or ornamental motion.
- Template rhythm: "After the splash, every section is built the same way. By the third section it reads as a template."
- Bugs found only by running the build.

## 2. Design rules the critiques converged on

**Identity**
- Keep the client's existing identity where it is real and theirs. "Preserving a working photographer's identity beats inventing a new one" [docs/06].
- Zero accent colour on a photo-led site: "Photographs are the only chroma" [docs/01]. A gold accent was rejected as "a luxury-wedding template tic". A palette sampled from the Maine landscape was rejected: "Maine landscape colors → tourism brand". "Maine without the merch."

**Typography**
- One display face and one sans; each has a job. Body 17px, line-height 1.7, max 65ch. Eyebrows 11-12px uppercase +0.16em (12px floor). Display headings -0.01 to -0.025em tracking; buttons +0.12em. `tabular-nums` on numbers. Text floor 12px. Fonts under 150KB per page, self-hosted [docs/01, docs/10, docs/07 C2].
- Cut eyebrows that restate the heading. Headings are plain labels with no full stops.

**Spacing and layout**
- Bar 64px (56 on phones). Gutter 20px under 640, 56px above. Container 1440. Section padding capped at 80px (64 on phones); every full Refero style sits at or under 80px [docs/10, docs/research/refero-2026-10.md].
- Decide alignment once (centred bookends vs left-aligned sections). One change of scale per screen. No sidebars, no carousels ("carousels hide content from search engines and AI crawlers") [docs/01].

**Hero**
- One full-viewport frame, one line saying what and where, one pill, a scroll cue. Nothing else over the photo.
- A splash with no headline or CTA scored 2/10 on first impression. The fix is one line plus one "Start an inquiry" pill [docs/07 B3].
- `100svh`. Cap display type by height too: `min(12vw, 28vh)` keeps it above the fold at 844x390 and 1280x650 [docs/07 B2].
- Measure the scrim against the brightest pixel under the text: 4.5:1 body, 3:1 large [docs/07 B1].
- Hero video loads after the page, fades in only once playing, never loads under reduced motion, Data Saver or 2G, and rests when off screen [docs/decision-record.md].

**Navigation**
- Small text mark in a persistent bar; the large mark used once. Bar turns from transparent to paper after 80px of scroll.
- Phone menu: full-screen overlay, large left-aligned links, one pill, the email at the foot. Focus to Close, Escape returns to Menu.
- The word "Menu" in a 44px pill beat the hamburger because the audience "includes couples' parents" [docs/critique/v5-creative-director-critique.md]. (Directly relevant to Hio Ridge: retirees, parents, church groups.)

**Imagery**
- Real photos only; AI-generated images are banned even as placeholders [docs/01]. Captions carry place and month.
- Each frame shows its dominant colour until the photo loads, then fades in over 200ms. "No grey boxes."
- Hover is brightness or opacity, never scale. No cards around photos: "cards with a picture on top is the template look."
- Put photos into service and pricing sections; text-only rows "looked like a spreadsheet beside a portfolio". Text over photos in price rows was rejected because contrast fails unpredictably.

**Motion**
- One ease token `cubic-bezier(0.22,1,0.36,1)`. 240ms ease-out hover; 180ms cross-document view transition. No scroll reveals on a photo site. No bouncy easing, parallax, preloader, scroll-jacking, custom cursor, right-click blocking or dark mode. Hover only on `(hover:hover) and (pointer:fine)`; UI motion under 300ms.

**What separated $30k from $3k** [docs/critique/v5-30k-roadmap.md]: a real full-screen viewer; art direction (changes of scale, a title-card opening, sections of different shapes); proof (case studies, about, clients, press); "craft nobody notices" (page transitions, colour placeholders, keyboard parity, speed, structured data).

## 3. Copy and voice rules

- Build the voice from the client's own writing, with counts. Use the client's own word for things [docs/research/voice-garrick-2026-10.md].
- Banned words that "made the mockup read as generated": passion, storytelling, timeless, memories, authentic, curated, elevate, bespoke, incredible, awesome, imagery, "capture your story", "moments that matter".
- Banned patterns: slogans with no information; fragment lists written for rhythm; groups of three adjectives; em dashes; headings ending in a full stop; the same phrase three times.
- Website register is more professional than social posts: keep first person and plain words, leave jokes and exclamation marks on the blog.
- Facts rule: only facts the client has published; everything else `[CONFIRM: ...]`, enforced by a copy lint.
- Weave in local specifics: named places, people, years.
- Collect client questions in one numbered list, each closing a `[CONFIRM]`.

## 4. SEO and local search (reusable for any local business)

- **Google Business Profile is the local anchor.** Name exactly as branded; the most specific primary category (category is the #1 pack factor); 10+ photos; website link to the main service page; a review link in every follow-up email [docs/12, seo-aeo].
- The local pack shows about 93% of the time on "[service] [city]" queries, versus about 15% for AI Overviews.
- Organic factors in order: a dedicated page per service, geographic relevance in the copy, inbound links, the GBP landing-page title, internal linking.
- Same name, phone and URL everywhere: The Knot, WeddingWire, Zola, Yelp, Bing Places, Apple Business Connect, Facebook, Instagram.
- AI visibility tracks brand mentions on other sites (r=0.664) more than backlinks (0.218). Pursue "best Maine wedding venues" lists, press, vendor lists.
- Real-wedding posts titled "[Names]' [Venue] Wedding, [Town], Maine", 150-400 words, 20-40 photos.
- Each service page opens with a 40-60 word answer-first paragraph: what, where, starting price, how to book. Then a visible HTML FAQ and the price range. Show starting prices even though competitors hide them: "The Knot publishes them and outranks the competitors."
- Title pattern "Maine [Service] [Category] | Name". Slugs 17-40 characters. Breadcrumbs.
- Every photo a real `<img>` with src, srcset, sizes, width, height. Never a CSS background. Server-rendered galleries.
- JSON-LD: one `@graph` with shared `@id`s; `["LocalBusiness", <subtype>]` with name, url, logo 112px+, telephone, email, address, areaServed, sameAs; WebSite; BreadcrumbList; ImageObject with licence fields.
- Don't bother with: FAQPage rich results (ended May 2026; keep the visible FAQ), self-authored review stars, llms.txt (harmless), rewriting copy "for AI", SearchAction without a search form.
- robots.txt allows Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot.
- Search Console and Bing Webmaster Tools both verified. Monthly: ask ChatGPT, Claude, Perplexity, Gemini the target queries and record the answers.

## 5. Performance budget and accessibility

| Metric | Target | Stretch |
|---|---|---|
| LCP (mobile p75) | ≤2.0s | ≤1.5s |
| INP | ≤200ms | ≤100ms |
| CLS | ≤0.05 | ≤0.02 |
| TTFB | ≤600ms | |
| FCP | ≤1.5s | |

Lighthouse: mobile Performance ≥92, desktop ≥98, Accessibility ≥95, Best Practices 100, SEO 100.

| Asset | Budget |
|---|---|
| HTML | ≤50KB compressed |
| Critical CSS | ≤14KB inline |
| Total CSS | ≤50KB |
| JS | ≤50KB gzipped, vanilla |
| Fonts | <150KB (project hit 69KB) |
| Below-fold images | ≤250KB each |
| Hero poster | ≤200KB AVIF / ≤350KB WebP |
| Hero video | ≤6MB MP4 / ≤4MB WebM |

Encoding: AVIF q70, WebP q80-86, mozjpeg q80; srcset breakpoints 480/768/1280/1920; lazy below the fold, eager + `fetchpriority="high"` on the hero, preload the LCP image. Self-host woff2 latin subsets; preload first-paint files. Third-party players on click only (Vimeo costs about 1.5MB).

Accessibility (WCAG 2.2 AA, enforced): contrast 4.5:1 / 3:1, text over photos vs brightest pixel; one skip link; `:focus-visible` 2px outline 3px offset; 44px tap targets including width (footer links were 44 tall but 27 wide); one h1; no nested header/footer landmarks; 0px overflow at 320; reduced motion gets a static page; `viewport-fit=cover`; menu and viewer as `role=dialog` with focus trap, Escape, focus return; native `<details>` for FAQ; `lang`; labelled inputs. Recorded accepted risk: autoplaying video over 5s with no pause control fails WCAG 2.2.2.

## 6. Analytics

- North star: bookings, inquiry-to-booked rate. Leading: inquiry submissions, phone and email clicks. Diagnostic: sessions by source, entry pages, AI referrals, CWV.
- Plausible (cookieless, no consent banner), Search Console, Bing Webmaster, CrUX. Clarity for 30 days after launch only. GA4/Meta pixels only with paid ads (then Consent Mode v2).
- Events: inquiry_form_view, inquiry_form_field_focus, inquiry_form_submit, _success, _error, email_link_click, phone_link_click, cta_click, nav_click, faq_expand, lightbox_open, outbound_click, lcp_fail. A goal on the confirmation URL.
- UTMs from fixed value lists. Weekly 15 minutes; monthly 1 hour with the client.

## 7. Launch checklist

- T-14: inventory live URLs; 301 map; staging with `Disallow: /`; Lighthouse, axe, real devices, VoiceOver/NVDA, a test inquiry from each browser.
- T-7: final photos and copy; clear every `[CONFIRM]`; fresh sitemap; Search Console baseline.
- T-1: DNS TTL to 300s; full backup; launch Tuesday or Wednesday evening.
- Launch: smoke test, redirects, submit sitemap to Google and Bing, update GBP, hash-check the served page against the build.
- T+1 to T+7: daily Coverage errors, 404s, a daily test submission from a different browser. T+3 request indexing. T+28 CrUX; re-run Lighthouse; test the AI assistants.
- Before launch: privacy page linked in the footer (the form collects personal data); year by code; share card and favicons.

## 8. Mistakes and the lesson from each

- Invented facts shipped in schema, FAQ and llms.txt (prices, a guessed address, wrong years, a fake testimonial, the wrong email). Structured data gets "repeated by Google and the AI assistants as fact." Only client-published facts; `[CONFIRM]` the rest.
- The client called the copy "garbage AI copy" twice. Write from the client's own sentences, measure the voice, lint it.
- Font churn across about 8 systems and a palette that churned the same way. Run the AI-default funnel once, show 3-4 directions in real copy, let the client choose early.
- Asymmetric grids from peer research, not from the client. Equal weight was more confident.
- CSS-columns masonry reordered a curated sequence. Use justified rows when order matters.
- 3.4MB of hard-coded originals; homepage 4.2MB with 13s LCP. Every image through a pipeline with srcset.
- "Validated by reading, not running." Running a real install found 4 bugs. Always run it.
- Mockup bugs: figure margins, a phone menu linking to a missing anchor, 16 tap targets under 44px. Automated interaction checks every round.
- Fonts over budget at 247-428KB from variable files. Use static latin instances.
- Portfolio empty without JavaScript. Server-render; real `<a href>` URLs.
- Logo animation at 1.88s held back the name. Measure frame by frame; the name reads in under 0.5s.
- Early SEO claims ("FAQ schema ≈74% of AI citations", "GEO score") fell to primary sources. Primary sources only.
- Hours lost on connector access (Refero, Mobbin). Check tool availability at kickoff.
- A text-free splash scored 24/50. An identity hero still needs one line and one CTA.

## 9. Lead-gen and inquiry forms

- Placement: one CTA pill on the hero; a closing inquiry section on every long page; the form ends the main service page with a photo beside it; package rows carry "Ask about this package" which pre-fills the form.
- Default the service dropdown to the highest-value lead (Weddings).
- Fields: name, email, service, date ("approx."), guests, package, source, phone, message.
- Layout: small uppercase labels, stacked fields, button left-aligned.
- States: pending (button disabled, "Sending"); errors server-side with `aria-invalid`, `aria-describedby`, `role=alert`, focus to first invalid; success as `role="status" aria-live="polite"` naming the person. The success message names the channel and reply window: "I reply by email, usually within [two business days]".
- Spam: honeypot (`aria-hidden`, `tabindex=-1`); time trap (under 4 seconds is a bot); rate limit 5 per address per 10 minutes, keyed on the real client IP behind a proxy.
- Silent-failure trap: a nonce on a cached page expires. Drop the nonce on public forms or fetch a token at render.
- Delivery: a verified sender (SMTP or a form service), never bare `wp_mail()`. Keep a private record of each inquiry. Test daily for the first week after launch.
- Future upgrades: HoneyBook or Dubsado for inquiry → quote → contract; an availability calendar.

**$3.5k note.** Carry over cheaply: the facts rule and `[CONFIRM]` list; voice from the client's own words (Susan's Facebook posts and ribbon-cutting speech); GBP, NAP and reviews plan; answer-first pages with visible prices; the image pipeline and font budget; form hardening; the 8-viewport check with 44px, contrast and overflow rules; the launch runbook. Skip: multi-round font exploration, case studies, a custom viewer, WooCommerce, the 35-round critique volume.
