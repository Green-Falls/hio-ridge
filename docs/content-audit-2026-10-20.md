# R&SVP website content audit and strategy
Reviewed October 20, 2026. Scope: the design-preview website and all ten content JSON files in Green-Falls/hio-ridge.

## Assessment
The previous copy was broadly accurate, but too much of it narrated the obvious. Repeated instructions to sit down, gather and get ready made the writing feel assembled. The opening sections repeated the ceremony-to-dinner sequence without giving the reader enough new information.

The site also asked for a tour before doing enough to help a couple compare this venue with others. Alcohol policy, seating limitations and practical rental information needed clearer placement. A prettier sentence would not fix that sequence.

## Content strategy
The business goal is a useful inquiry from a couple whose plans fit the venue, followed by a private tour with Susan. Pricing requests are a valid earlier step. A couple does not need a fixed date before contacting her.

Position the venue through its actual combination of features: a ceremony field facing Pleasant Mountain, a restored family barn on the same farm, separate rooms for getting ready, Sunday and weekday dates, and celebrations without alcohol. R&SVP is the primary name; Hio Ridge remains the secondary name.

The photograph and headline invite the reader to picture a wedding. The next sentences provide the information the photograph cannot: which spaces connect, what is included, how many guests the venue can host and what needs to be discussed before booking. Each section must add information.

Reader sequence:
1. Recognize a barn wedding venue in Bridgton, Maine and picture the setting.
2. Establish fit: up to 135 total, Sundays and weekdays, May through October, without alcohol.
3. Understand the ceremony, reception and getting-ready spaces.
4. Request pricing with a clear distinction between available facilities and confirmed rental inclusions.
5. Understand guest access, parking and the questions about seating and rain.
6. Meet Susan and Richard, then ask for pricing, available dates or a tour.

## Problems and corrections

| Previous issue | Why it hurt | Change |
| --- | --- | --- |
| Three opening sections repeated field vows and barn dinner | Scrolling added little decision value | Each section now adds a different detail about the ceremony, dining or getting ready |
| Repeated commands such as “Sit down to dinner” and “Get ready here, too” | The copy directed ordinary behavior instead of helping the reader picture this place | More specific scenes and fewer instructions |
| “You choose your caterer” | Unrestricted vendor choice is not established | Describe the prep kitchen and ask couples to confirm caterer requirements before hiring |
| “The mountain behind you” | Source material describes a field facing Pleasant Mountain | Use a mountain view and name Pleasant Mountain without inventing the couple's orientation |
| Alcohol policy appeared late | Couples could spend time imagining an unsuitable venue | State the policy in the opening facts row and explain it once in planning details |
| “Start planning your Sunday here” | Assumed a decision the reader had not made | Explain rental details and support comparison before a tour |
| “Seating, access and the weather” shared one answer | Three important questions became one vague instruction to ask Susan | Separate confirmed access/parking from seating and rain arrangements |
| 135 beside the list of dining spaces | Could imply 135 can dine together indoors in every configuration | State total event capacity and explain that seating varies by space and layout |
| Story reduced to a generic family-barn statement | Hid the details that distinguish the owners and property | Use the house windows, saved barn boards and family history |
| “Hio Ridge” remained the short name in site.json | Conflicted with the chosen brand hierarchy | Set the short name to R&SVP |
| Pricing brochure described as a verified full list of inclusions | The brochure has not been supplied | Ask for pricing; Susan separately confirms rental inclusions |
| Public classes and private event rental blurred together | Readers could mistake one type of inquiry for another | Events page now separates hosting an event from attending one |

## Page jobs and change log

| File | What the reader needs | What changed |
| --- | --- | --- |
| site.json | Recognize the venue and find a person to contact | R&SVP leads; contact language covers pricing, dates and tours |
| home.json | Picture the wedding and establish whether the venue fits | Keeps the concrete mountain-and-beams hero; introduces the alcohol policy early; orders the paths from preparation to reception |
| weddings.json | Understand the experience and resolve booking questions | Removes repetitive narration; prioritizes guest count, rain, dates and alcohol in the FAQ; keeps unknown booking terms marked |
| barn.json | Understand rooms, seating and access | Distinguishes total capacity from individual layouts and connects each space to its use |
| pricing.json | Know what to compare and how to obtain a price | Separates facilities from confirmed inclusions; removes the “without a bar bill” slogan; supports a brochure request before a tour |
| events.json | Choose between renting the barn and attending an event | Separates private events, classes and community plans |
| story.json | Understand who the hosts are and why the farm matters | Centers the windows story and family continuity; trims construction measurements and unrelated hotel history |
| gallery.json | See the actual spaces and understand what the photographs show | Uses clear space labels; identifies community gatherings; keeps the May-to-October season explicit |
| inquire.json | Contact Susan without having a complete wedding plan | Supports pricing first, makes an unknown month acceptable and keeps direct contact details clear |
| privacy.json | Understand how inquiry information will be handled | Tightens the introduction; preserves unresolved handling, hosting and tracking details |

## Voice rules for future edits
- Use the words a couple uses: guest count, ceremony, reception, getting ready, tables, pricing and dates.
- Let real details carry the warmth. Do not add a claim about a feeling, service or level of support the owners have not supplied.
- Use Susan's first-person plural voice. Keep “Contact Susan” where it makes the next step clear.
- A heading can introduce a moment. Practical labels and form fields should remain easy to scan.
- Avoid repeated “picture,” “imagine,” “gather” and “take your seat” instructions.
- Do not invent savings, exclusive use, coordination, unrestricted caterers, full-day access or a rain plan.
- Keep the names of actual places and materials. Avoid interchangeable wedding slogans.
- State Sunday and alcohol policy without apology, moral judgment or guaranteed savings.
- Keep factual alt text and no captions.

## Evidence and boundaries
Venue claims were checked against data/research/RESEARCH.md and data/research/facebook/NOTES.md. The brief, buyer research and decision record establish the audience and prior decisions, but do not override source evidence.

Key boundaries:
- 135 is total event capacity. The photos document individual arrangements, including 44 to 46 in one downstairs setup and 72 in a patio setup.
- Tables and chairs are expressly included. The existence of rooms, a field, a kitchen and hosts does not establish a complete rental package.
- Work began in 2020. The completed venue was not claimed to have been rebuilt in 2020.
- Outside caterer preparation space is documented; unrestricted vendor choice is not.
- A ramp to the main floor, an ADA bathroom and accessible parking are documented. Whole-property accessibility is not asserted.
- The preview is a design study. Its form still clearly says that it does not send or save information.
- All 24 existing CONFIRM markers remain in the content files. This is not a launch-ready claim.

Current competitor checks:
- [William Allen Farm weddings](https://www.williamallenfarm.com/weddings-2): connects the wedding sequence to concrete access arrangements, inclusions and booking actions.
- [Hardy Farm weddings](https://www.hardyfarm.com/maine-weddings/): names distinct venue spaces and gives availability a visible route.
These informed the information structure only. No services, prices or wording were imported.

## Questions for Susan
These are the promises we would like to make clearly but cannot support yet.

1. What does a wedding rental start at, and what changes the price?
2. Which spaces and services does the wedding rental include? Is the whole property reserved for one event?
3. For 80, 100 and 135 guests, where would everyone eat? Can everyone sit indoors together, and where would dancing take place?
4. If it rains, where would the ceremony happen? How would we change the room over for dinner, and when do we make that decision?
5. When can the couple and vendors arrive, and when must the event finish? Can they rehearse or set up the day before? Who handles setup and cleanup?
6. Can couples hire any outside caterer, or are there requirements they should know before booking one?
7. What does a couple need to do to reserve a date, including the deposit and contract?
8. How soon can someone normally expect to hear back after an inquiry?
9. For a larger wedding, which restrooms are available? What should guests know about access to the loft, ceremony field and getting-ready rooms?
10. Do you have the current pricing brochure and any wedding or styled-table photographs we can use?

The existing privacy, form-delivery, directions, arbor and parent-retreat questions also remain unresolved in their original markers. They were not silently removed.

## Review record
- Pass 1: buyer questions and page sequence, using the brief and survey notes.
- Pass 2: factual review against the venue record and editorial review of the revised pages.
- Pass 3: final voice and claim review; removed the unsupported brochure-inclusions promise and unnatural closing wording.
- Local content checks: valid JSON; unchanged key structure and non-string values; no image replacements; all existing markers retained; snippet lengths; factual alt lengths; prohibited words and punctuation.
- Staged browser review: desktop and 375px mobile checked. No horizontal overflow or clipped website headings. The pricing CTA correctly selects the brochure request. Preview form disclaimer remains visible. Final publication uses the existing automated content validator and build.
