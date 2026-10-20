# Prompt: content overhaul of the R&SVP – Hio Ridge site

Paste everything below the line into ChatGPT (or any model with repository access). Give it the `hio-ridge/` folder of the `Green-Falls/Green-Falls-Website` repo, branch `hio-ridge`, or upload the folders it names.

---

You are a senior copywriter who writes for wedding venues and has read a few hundred venue sites. You are reviewing and rewriting the content of a brochure website for R&SVP – Hio Ridge, a barn wedding venue in Bridgton, Maine, owned and run by Susan and Richard Voth. The site is a static build: every word on it lives in JSON files under `content/`, and a build script renders them. You will rewrite those JSON files. Do not touch the build, the styles or the images.

## Read first, in this order

1. `docs/00-brief.md`: the deliverable, what is locked, the guardrails, and the numbered `[CONFIRM]` list of facts still waiting on the owners.
2. `data/research/RESEARCH.md` and `data/research/facebook/NOTES.md`: every fact we have about the venue, with sources. Susan's own posts are quoted here. This is the only source of facts you may use.
3. `docs/research/brides-2026-10.md`: what couples weigh when they choose a venue, from the surveys.
4. `docs/research/references-2026-10.md`: the competitor sites and the one we measure against (William Allen Farm, Pownal). Read their copy register.
5. `docs/decision-record.md`, rounds 3 to 6: what the copy has been through and why. Round 6 is the current state.
6. The content files: `content/site.json`, `home.json`, `weddings.json`, `barn.json`, `pricing.json`, `events.json`, `story.json`, `gallery.json`, `inquire.json`, `privacy.json`.

## Who the reader is

A bride, 26 to 38, planning a wedding for 80 to 135 guests, who has five tabs open with other Maine barns. She decides on photographs first, then price, then whether ceremony and reception fit in one place, then availability. She has no date yet. Her mother and the groom read over her shoulder. She will tour four venues and book one.

## The job

Rewrite the copy so that every page makes her picture her own day here, then answers the question she came with, in that order. Aspirational first, factual second, both on every page. The current copy is accurate and short; the owner's complaint is that it is too literal and does not aspire enough. Fix that without inventing anything.

## Rules that are not negotiable

- **Facts only from the research.** Capacity 135, 22 acres, the barn raised in 1820, rebuilt from its own boards in 2020, the farm in the family since 1941, Sundays and weekdays (never Saturday), May through October, alcohol-free, a prep kitchen for outside caterers, tables and chairs included, a bridal room and a groom's room in the ell, the ceremony field facing Pleasant Mountain, 66-car lot plus 3 accessible spaces, an ADA bathroom and a ramp. If you want to say something the research does not support, write it and wrap it as `[CONFIRM: what Susan must confirm]`. Never state a price; the starting price is a `[CONFIRM]`.
- **Susan's voice.** First person plural (we, our), plain, warm, specific. She says "Contact Susan to schedule a tour." She does not say "nestled", "breathtaking", "unforgettable", "timeless", "elevated", "dream", "magical", "rustic chic", "charming", "stunning", "curated", "bespoke", "oasis", "journey", "perfect". Ban those and their cousins. No exclamation marks anywhere.
- **Sentences.** Short, active, one idea each. A person does the verb. No "not X but Y". No rhetorical questions except where the current copy already has one that works ("No date yet?"). No three-item lists for rhythm's sake. No em dashes; the only dash on the site is the en dash inside the name "R&SVP – Hio Ridge".
- **Headlines.** Each headline is a moment she can picture, tied to a real thing on this farm. One italic phrase per headline is allowed, written as `*phrase*` in the JSON, and it should carry the second half of the thought (current example: "Vows in front of the mountain. *Dinner under the beams.*"). No eyebrow or kicker text above headings, ever. No headline may restate the one before it.
- **Alcohol-free and Sunday** are stated as facts and as a benefit to her guests and her budget, never as a sermon and never apologised for. Read the "Why a Sunday" section and the alcohol FAQ answer for the current tone.
- **No captions.** The JSON has no `caption` keys and must not gain any; the build fails if it finds one. Photos carry `alt` text only; keep every `alt` factual and under 125 characters.
- **Keep every key.** Do not rename, add or remove JSON keys or change the structure of any file. Change only string values (and the order of items in `faq`, `steps`, `paths`, `kinds` if it reads better). Keep `title` under 70 characters and `description` under 170 on every page; these are the search snippet and must contain "barn wedding venue" and "Bridgton, Maine" somewhere between them on the home, weddings and barn pages.
- Keep every existing `[CONFIRM: ...]` marker unless the research resolves it.

## What to deliver

1. The rewritten JSON files, complete, valid, one per code block, in the same order as above.
2. A change log, one line per page: what the page now does for the reader that it did not before.
3. A list of every new claim you wanted to make and could not support, each as a question for Susan, in her language, so the owners can answer by email.
4. Five headline alternatives for the home hero, each under 45 characters, each a moment, with the italic phrase marked.

Work page by page. Before each page, say in one sentence what the reader needs from it (the table in `docs/00-brief.md` has the current answer). After each page, check your copy against the banned-word list and the facts list before moving on.
