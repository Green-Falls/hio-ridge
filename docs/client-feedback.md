# Client feedback: R&SVP – Hio Ridge

Every note from the client, in their words, with the date and the channel it came through. Below each note, what was done about it and where. Keep the client's wording verbatim.

Susan and Richard Voth have not seen anything yet. Mike presents.

## Mike Jones, session chat, October 19

> i need you to make a new branch for R&SVP - Hio Ridge

Applied: branch `hio-ridge`, folder `hio-ridge/`.

> let's do it. this will be separate from garrick

Applied: the branch was rebuilt from scratch with no Garrick files or history.

> now I want to build them the $3500 website. can you collect all the skills and knowledge we've gathered across building websites so far and apply it to this brochure/lead generation site

> we've built other sites than garrick too. we did generation maine

Applied: read Garrick, Generation Maine, Kindred Farms, Schilly's, Lake Region Energy, Green Falls and garrickhoffman-site; lessons in `docs/lessons/`; brief in `docs/00-brief.md`.

## Mike Jones, session chat, October 19, after the first-build preview

> can you audit competitors websites and figure out how yours would sit against the competition? also never use image captions.

> early read: this is very bland. the brand identity is very weak and not appealing to brides

Applied: rule for the rest of the project: **no image captions, anywhere**. Caption rendering removed from `build.mjs`, caption fields dropped from the content and the editor, and the validator fails any `caption` key. Competitor audit in `docs/research/competitors-2026-10.md`. The first build is recorded as rejected for identity, not for mechanics; the redesign changes the method (identity first, from the client's own logo and the bride's comparison set), not the sheet count.
Open: the redesign round.

> also keep in mind the aesthetic brides want on their wedding

Applied: the test for the round is "does this look like the wedding she is picturing, not the business that hosts it". It changed the hero (the lit barn interior, not the facade), the palette (walnut, moss, gold, linen from the logo's roses, greenery and bells), the italic Caslon ledes, the photo-first paths, and the order of the home page (the barn at night and Susan's own line before any facts). What it did not change: no script fonts, no stock, no eucalyptus-and-string-light illustration; the aesthetic comes from the real place lit well.
