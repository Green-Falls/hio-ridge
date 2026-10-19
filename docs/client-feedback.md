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

## Mike Jones, session chat, October 19, after round 2

> getting better. we need a better nav/homepage hero design. the text is overpowering the photos and we need much better copy

Applied (round 3): the nav is a paper bar above the photo, not floating over it. The hero is the photograph at full width with one short line and one button in the lower corner under a light local scrim; the kicker, the italic paragraph, the second button and the fact column came off the photo. Facts moved to a hairline strip under the photo. A full-bleed photo with no text was added mid-page. Display sizes came down one step across the site. Every page's copy was rewritten to a bride, in Susan's voice: shorter lines, one specific per sentence, fewer blocks.
Open: Mike's read of round 3.

## October 19, after round 3

Mike: "nav is better. brand identity is still weak. lots of brown for a wedding. not very good UX/UI design. copy is pretty lame. lots of AI slop design. what skills and references sites can we use to improve?"

What changed (round 4): the method. Eight reference sites captured and measured, a reference lock written (`docs/research/references-2026-10.md`), then the build: brown out (fir green frame, white page, one blush band), text off the hero photo, headline size doubled, hairline link rows, the dress photo, home copy rewritten with the stop-slop pass. Kept: the centered lockup nav, no captions, no eyebrows.

## October 19, after round 4

Mike: "can you look at refero and 21st dev to find better components that are much better UX? Copy is still too literal and not aspiring enough. research what brides are looking for in their venues."

What changed (round 5): a Photos page with a lightbox, a seating viewer on The Barn, a month picker on the form, the nav reordered for brides, the FAQ extended from the tour checklists, and the copy rewritten to moments rather than facts. Research in `docs/research/brides-2026-10.md`; the 21st.dev and Refero notes in the decision record.
