# Prompt for a browser agent: collect R&SVP – Hio Ridge from Facebook

Paste everything below the line into a browser agent (for example Claude in Chrome) running in a browser where you are already logged in to Facebook.

---

You're helping me research a local business for a website project. I'm already logged in to Facebook in this browser.

**Business:** R&SVP – Hio Ridge, a barn event venue at 437 Hio Ridge Rd, Bridgton, ME 04009. The owners are Susan Bobbitt-Voth and Richard Voth. Contact on their posts: Susan@437hioridge.events, 207-400-6353.

## Rules
- **Read and save only.** Do not like, react, comment, share, follow, join, message, RSVP, or click "Interested" on anything. Do not post or send anything from my account.
- Collect only content that R&SVP – Hio Ridge or Susan Bobbitt-Voth posted, and photos of the venue. Skip other people's profile photos and personal info. Where a commenter is relevant, record their comment text but not their name.
- Go at a normal human pace. If Facebook shows a warning, a checkpoint, or "You're temporarily blocked", stop immediately and tell me.
- If something isn't visible to you, write "not visible" for it. Don't guess.

## Sources, in order

1. **The Facebook page "R&SVP - Hio Ridge"** (search Facebook for it and confirm the address matches).
   - **About:** copy every field verbatim: category, intro or bio, address, phone, email, website, hours, price range, page creation date, and any "Page transparency" info.
   - **Photos tab:** open every album, including Profile pictures, Cover photos and Timeline photos. Save every photo at full size: open each one in the photo viewer, then right-click the image and choose "Save image as" or open it in a new tab. For each photo, record its URL, its date, and the caption.
   - **Videos and Reels tabs:** for each item, record the title or caption, date, length, view count and URL. Save a screenshot of the opening frame. Don't download the videos.
   - **Posts:** scroll back to the very first post. For each post, record its date, its full text (expand "See more"), every hashtag, and its URL. Save its images as above.
   - **Reviews or recommendations tab:** copy each one's text and date, without the reviewer's name.
   - **Events tab:** for each event, record its name, date, description and URL.
2. **These three posts in the group "Bridgton Community & Business":**
   - https://facebook.com/groups/6572637532809132/permalink/39592876123691847/ (10/18/2026, fall cardmaking event photos)
   - https://facebook.com/groups/6572637532809132/permalink/39582237374755722/ (10/18/2026, open-house invite)
   - https://facebook.com/groups/6572637532809132/permalink/39445153515130776/ (10/13/2026, venue video)

   For each, record the full text, who posted it, the date, the hashtags and any reply from Susan or the page. Save every image.
3. **Group search:** in that same group, search "Hio Ridge", then "R&SVP", then "Bobbitt-Voth". Process every result back to September 2026 the same way as source 2.

## Output

Create a folder named `facebook` containing:

- **`images/`:** every saved image, named `YYYY-MM-DD_<source>_<n>.jpg`, for example `2026-10-18_group-cardmaking_1.jpg` or `2026-09-08_page-timeline_3.jpg`.
- **`MANIFEST.csv`:** one row per image, with columns `file, what_it_shows, post_or_photo_url, date_posted, caption, source` (source is page, group or album name).
- **`NOTES.md`**, with these sections:
  1. **About:** the page's About fields, verbatim.
  2. **Posts:** every post in date order, giving date, URL, full text and hashtags.
  3. **Videos and reels:** a table of title, date, length, views and URL.
  4. **Events:** every event, in date order.
  5. **Reviews:** every review's text and date.
  6. **Facts worth noting**, each with the URL it came from:
     - capacity;
     - pricing or packages;
     - amenities;
     - catering and alcohol policy;
     - days they book (especially Sundays);
     - any faith or Seventh-day Adventist mentions;
     - how to book a tour;
     - the 619-948-7906 phone number, wherever it appears;
     - the name of the band at their summer open house (possibly "High Street Jazz Band");
     - the title of Susan's book (possibly "Amber's Mom: Lessons Learned");
     - any mention of "the Bridgton House".
  7. **Not visible:** anything you couldn't open or see.

When you're done, zip the `facebook` folder and tell me where it is, how many images you saved, and anything you couldn't reach.
