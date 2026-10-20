# Website preview: existing-photo art direction

## Goal

Help couples picture a wedding here, establish venue fit, then make pricing and a visit easy to request. Use only the venue's existing photography. Keep R&SVP primary, Hio Ridge secondary, and the website separate from brand explorations.

## Implemented direction

- Preserve the Concept 2 shared-initials artwork and Marcellus typography. Retain the optional direction=a link from the brand page.
- Use the barn exterior as the opening photograph. Match each supporting image's size to its role and available resolution.
- Follow the wedding through getting ready, ceremony and reception before presenting planning details.
- Give pale blue a spatial role in the ceremony oval and a practical role in the inquiry section. Deep blue marks the key planning section. Chalk provides space around photography. Brass is limited to rules and small brand details.
- Use an unequal reception spread and small dress detail instead of equal photo cards. Include a bounded sunset photograph and an oval owner portrait.
- Keep the core fit information visible near the opening: total capacity, days, season and alcohol policy.
- Make pricing available before a tour. State 135 as total venue capacity; do not imply that everyone can dine together on the main floor. Leave indoor capacity and rain arrangements for discussion with Susan.

Reference research informed composition rather than venue facts or copied copy: Liron Moran Interiors for expressive type around bounded photography; BelArosa Chalet for hospitality hierarchy and light/dark rhythm; EVOKE for deliberate photo-free color sections. The palette, identity, content and venue photographs remain specific to R&SVP.

## Three review passes

### 1. Composition and copy

Reviewed the rendered desktop opening, ceremony, reception and getting-ready sections. Removed a tilted-photo treatment and floating oval outlines. Replaced the generic hero with the supported mountain/beams pairing. Removed unnatural ceremony wording and the generic reception instruction. Separated the owner introduction from the invitation to tour. Corrected the reception image alt text and qualified the rain answer.

### 2. Mobile and interaction

Reviewed at 390 × 844. Verified the navigation dialog, section links, expandable planning answers, image viewer, next/previous controls, arrow keys and Escape. The viewer restores focus to its opening photo. Brochure links select the brochure intent. Corrected the joined words in the mobile inquiry headline, the ceremony image's aspect ratio, and the dress photo's clipped focus indicator. Matched the navigation label to its destination.

### 3. Finish and regression

Reviewed at 320 × 740, 1024 × 768 and 1440 × 900, plus the full desktop composition. No horizontal overflow at checked sizes. Corrected inherited arrow strokes and hover movement affecting the logos. Confirmed all eight displayed venue photographs load; lightbox alt text updates with the selected image. Source checks found one H1, no duplicate IDs, no broken internal anchors, no missing image alt attributes and no banned copy. Longest populated alt is 65 characters. Body text combinations checked exceed 4.5:1 contrast. Reduced-motion preferences disable smooth scrolling and transitions.

An independent visual review found no remaining publication-blocking composition issue. A skip link visible in the full-page capture was confirmed to be an off-screen capture artifact: its actual viewport position is -90px while unfocused. Keyboard visibility remains intact.

## Inquiry behavior

The form builds an encoded email draft addressed to Susan. It does not send a message, store information or claim that an inquiry was submitted. The button and helper explicitly explain that the visitor's email app opens for review and sending. Phone, text and direct email links remain available. A server-based inquiry service is not connected in this preview.

The email-draft builder was checked for recipient, intent, optional fields, Unicode and multiline input. No test email was sent.

## Scope

The website uses dedicated website.css and website.js. The separate brand.html, its styles and artwork are unchanged. Canonical content JSON, build code and production page templates are unchanged by this design round. The existing content validator and Pages build passed during staging.
