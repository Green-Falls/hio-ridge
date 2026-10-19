# References and reference lock, round 4 (October 19, 2026)

Mike's read of round 3: "brand identity is still weak. lots of brown for a wedding. not very good UX/UI design. copy is pretty lame. lots of AI slop design." Rounds 1 to 3 were built from a rulebook (what to avoid). Round 4 was built from references (what to be like). Captures and measured profiles are in `qa/refs/` and `qa/refs2/` (`node qa/peers.mjs`).

## Skills used
- `refero:refero-design`: the method (research, reference lock, decision ledger, then build). The Refero MCP itself needs sign-in; the lock below was made from live captures of real sites instead.
- `anthropic-skills:stop-slop`: the copy pass (no filler, no "not X but Y", no quotables, active voice, specifics).
- Fonts MCP: serif recommendations checked; Caslon kept (nothing recommended beat it for an 1820 barn without a script face).
- Mobbin MCP: on a free plan, no results. Refero MCP: needs OAuth. Both would widen the reference set if Mike signs in.

## Sites captured (desktop and phone, with measured profile)
| Site | What it does well | Measured |
|---|---|---|
| Cedar Lakes Estate (Hudson Valley) | Deep fir green frame, cream page, photo inset under the bar with no text on it, 86px GT Alpina headline below the photo, three photo columns with hairline uppercase link rows and arrows, one tan band with an arched photo | h1 86px #14342A, Futura body, "Start Planning" gold button |
| Pippin Hill Farm (Virginia) | Full-bleed aerial, 72px serif on the photo, centered lockup with menu left and booking right, line-drawn botanicals as ornament, gold pill buttons, warm off-white page | GT Sectra 72px, Maison Neue body, bg #F7F5F1 |
| Hidden Pond (Kennebunkport) | Aerial hero, line botanical ornament beside the intro, teal CTA | Cormorant Garamond 55px, Montserrat body |
| Cunningham Farm (New Gloucester) | Fact list up front (acres, barns, restrooms, parking); a real bride photo | Brandon Grotesque, green #01402C |
| Marianmade Farm (Wiscasset) | Little: a Noto Sans template | 153 words |
| Barn on Walnut Hill, Pembroke Farms | Parked domains (two of the state's known barns have no site) | |
| Barn at Liberty Farms | One-screen splash | |
| Barn at Flanagan Farm | Domain hijacked by a gambling blog | |

What every strong one shares: a dark green or near-black frame, a white or near-white page, one big serif headline (55 to 86px), photographs with people or a dressed room, and a nav that puts the booking action at the right.

## Reference lock
```
Primary: Cedar Lakes Estate. Fir frame around an inset photo, headline below the photo on white,
  three photo columns with hairline link rows, one warm band with an arched photo.
Preserve: fir frame + white page; no text on the hero photo; display serif at 72 to 88px;
  hairline uppercase link rows; one arched photo in the one warm band.
Borrow only: Pippin Hill's centered lockup with the booking link at right (already ours);
  Cunningham's facts row.
Role rules: fir = frame, bands, buttons, footer. Gold = the ampersand and hairlines on fir, never
  text on white. Blush = one band. White = the page. Arch = one photo, the dress.
Media: Susan's photos only. The dress on the hook is the one bridal image we have; it leads the
  blush band. The head table at the open doors leads the fir band. Folding chairs and plastic
  rounds stay off the home page.
Reject: brown as a colour (walnut ink, linen page, gold text); italic word swaps in headlines;
  eyebrows; text over the hero; cream page.
Tokens: ink #1A2420, paper #FFFFFF, moss (fir) #16342A, linen (blush) #F4E6E0, gold #B8964F,
  muted #5C665F, rule #D9DED8. h1 clamp(44, 88)px, h2 clamp(32, 54)px, Caslon; Plex body.
```

## Decision ledger
| Decision | Source | Why |
|---|---|---|
| Fir frame, photo inset, headline below | Cedar Lakes | Mike: text must not overpower the photo; the photo gets no scrim at all now |
| Bar on fir with paper lockup | Cedar Lakes, Pippin Hill | A dark bar reads as a brand, a white bar reads as a template |
| Headline 88px max | Cedar Lakes 86, Pippin 72 | Rounds 1 to 3 at 46 to 60px read as a brochure |
| Paths with uppercase hairline link rows | Cedar Lakes | A link row with an arrow is the one UI pattern all three strong sites share |
| Blush band, arched dress photo | Cedar Lakes (tan band, arch), the logo's roses | The one bridal cue in Susan's photo set, given the one shaped frame |
| Head table at the doors on the fir band | our own capture | Only dressed-table photo; replaces an empty field |
| Copy: shorter, Susan in first person, one fact per sentence | stop-slop | "Hang your dress on the hook in the ell" is a thing she can say; "elegant rustic charm" is not |
| Gold off white paper | contrast measurement | 3.3:1 on white at text size; kept to the ampersand and hairlines on fir |

## What the references have that we cannot build yet
- Photographs of a wedding: a couple, guests, flowers on the tables. Every strong reference opens on one. Susan has no wedding yet; the first booked couple's photographer, or a styled shoot (a florist, a dress shop, two hours in the barn), would change the site more than any design round. The brief's `[CONFIRM]` list gets this as item 19.
- Line-drawn botanicals (Pippin Hill, Hidden Pond): the wreath logo is painted, not drawn, so it will not trace clean. A hand-drawn wreath from the logo's elements (rose, daisy, pine cone, bell) is a $300 to $500 illustration job, item 20.
