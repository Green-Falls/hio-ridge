# Website preview: Refero and 21st.dev refinement

Date: 20 October 2026

## Scope

Refine the standalone website preview, continuing the navy R&SVP identity and existing venue photography. Keep brand explorations at `design-preview/brand.html`. No canonical content, build, styles, or image source files changed.

## Reference decisions

Refero searches covered boutique hospitality, dark photographic hotel sites, and venue/property detail pages. Full style records reviewed: BelArosa Chalet, Raus, and Kobu. Screens visually inspected:

- Raus Reiterhof detail: https://refero.design/pages/bdaf88b5-3e7a-4442-a81b-970b5195d1cc . Use a clearly bounded request area with practical information alongside it. Retain R&SVP's own palette and typography.
- Skyscanner hotel gallery: https://refero.design/pages/0c715644-366b-42c4-ab52-6ae36723b840 . Use selectable thumbnails alongside the large photograph and count. No captions or filter chips.

21st.dev patterns reviewed:

- Thumbnail Image Viewer, ibrandify: https://21st.dev/@ibrandify/components/thumbnail-image-viewer . Adapt the thumbnail and keyboard navigation pattern to the existing native dialog and vanilla JavaScript. No React, Motion, location tags, autoplay, or dependency imports.
- Simple Header, Efferd: https://21st.dev/@efferd/components/simple-header . Keep navigation accessible while scrolling. Use an opaque, compact header instead of blur or animated resizing.
- FAQs Two, Tailark: https://21st.dev/@meschacirung/components/faqs-component/faqs-two . Place an email option after the answers, including on mobile. Retain native details elements.

Accessibility references:

- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

Reference lock: retain the current navy identity, serif headings, plain body type, and real venue photos. Apply patterns to navigation, photograph selection, and requests. Avoid decorative framing, cream backgrounds, repeated cards, generic animation, and decorative icons.

## Changes

- Compact sticky navigation with anchor clearance and mobile menu.
- Explicit View all 6 photos button in the opening.
- Selectable photo thumbnails with current state, a single thumbnail tab stop, Arrow/Home/End navigation, and selected-thumbnail visibility.
- Native photo dialog retains Escape, close control, focus return, previous/next controls, and scroll lock.
- Bounded blue pricing request panel, rounded action controls, and an email link following the FAQ.
- Explicit image dimensions and larger contact targets.
- Changed the schedule question to “When do you host weddings?” so it does not suggest live availability.
- Corrected the field photo's alt text from farmhouse to barn after visual inspection.

The email controls open the visitor's email application. There is no form, availability lookup, confirmed price, or invented rain plan.

## Three review passes

1. Source and copy: HTML nesting, duplicate IDs, local anchors, gallery selectors, JavaScript syntax, banned words, alt length, and known facts reviewed. Independent source review completed. No new venue claims introduced.
2. Visual: staged page reviewed in Chrome at 1440 × 900, 1024 × 768, 390 × 844, 320 × 740, and gallery at 844 × 390. Independent review of desktop pricing screenshot found no blocking issue and prompted the schedule wording correction.
3. Interaction: explicit gallery opener, direct selection, End and ArrowLeft, Escape and focus return, mobile menu close on navigation, native FAQ expansion, and anchor positioning checked. All seven main-content images loaded; no captured browser console errors. No horizontal overflow at tested 1440, 1024, 390, and 320 widths. Pricing anchor top measured 111.7px below an 82px desktop header and 93.8px below a 68px mobile header. The last thumbnail stayed visible after selection at 390px. Gallery controls remained visible in landscape.

Stage commit: `1182babd5a73b9661e10461e7e154027db7a14a0`; Pages build and deployment succeeded. Promotion includes only the two final copy corrections above in addition to the browser-tested stage. These checks are a focused review, not a claim of complete accessibility certification or a measured conversion improvement.
