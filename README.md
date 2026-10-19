# R&SVP – Hio Ridge — website

A brochure and inquiry site for R&SVP – Hio Ridge, a barn event venue at 437 Hio Ridge Road, Bridgton, Maine. Built by Green Falls. Kept on its own branch (`hio-ridge`) and in its own folder, separate from other client work.

**Status (2026-10-19):** first build complete, all QA passing, not yet deployed. See `docs/qa-record.md` for the numbers and `docs/00-brief.md` for the open `[CONFIRM]` list.

## How it works

Plain HTML, CSS and JavaScript, no framework. One script, `build.mjs`, reads the words in `content/*.json` and the photos in `src/images/` and writes the finished site into `dist/`. Susan edits the words at `/admin/` (Sveltia CMS); every save is checked by `scripts/check-content.js`, then the site rebuilds. There is no database and no server to maintain.

| Path | What it is |
| --- | --- |
| `content/` | Every word on the site, one JSON file per page plus `site.json` for contact details. Edit these, not `dist/`. |
| `build.mjs` | Turns `content/` into `dist/`. Also writes the structured data, sitemap, robots and `llms.txt`. |
| `src/styles.css`, `src/site.js` | The stylesheet (one file, tokens at the top) and the one script (menu, reveal, form check). |
| `src/images/` | Photo renditions made by `scripts/images.py` from `scripts/photos.json`; `manifest.json` lists each photo's sizes and colour. |
| `src/fonts/` | Libre Caslon Text and IBM Plex Sans, cut by `scripts/fonts.py`, with their OFL licenses. |
| `admin/` | The editor (`config.yml` describes the forms Susan sees). |
| `scripts/` | `check-content.js` (the validator), `images.py`, `fonts.py`. |
| `qa/` | `run-qa.mjs`, `measure.mjs`, `contrast.mjs`, `hero-scrim.mjs`, `lighthouse.mjs`, `copy_check.py`, screenshots and results. |
| `docs/` | The brief, decision record, client feedback, QA record, photo shortlist, lessons from past sites. |
| `data/research/` | Everything collected about the venue before design, with sources. |
| `dist/` | The built site. Never edited by hand; not committed. |

## Commands

```bash
npm install                         # once; QA tools only
npm run build                       # check content, then build dist/
npm start                           # serve dist/ at http://127.0.0.1:8080
npm run qa                          # every page at 375/768/1440: overflow, tap targets, axe, screenshots
npm run measure                     # home page across 8 viewports (website-build harness)
node qa/hero-scrim.mjs              # hero text contrast against the pixels behind it
npm run lighthouse                  # three mobile Lighthouse runs
python3 -I scripts/images.py        # rebuild photo renditions after editing scripts/photos.json
python3 -I scripts/fonts.py         # rebuild fonts (needs the google/fonts sparse clone)
PREVIEW_HOST=hioridge.greenfalls.co node build.mjs   # noindex client preview
RELATIVE=1 node build.mjs           # noindex preview with relative links (artifact hosting)
```

## Hosting

Netlify, free tier. Import the repository, set the base directory to `hio-ridge`; `netlify.toml` carries the build command and headers. The inquiry form is Netlify Forms: turn on form detection, then add notification emails under Site configuration → Forms. Submissions are also stored in the Netlify dashboard. For the editor, install the GitHub OAuth provider under Access & security → OAuth, and give each editor a GitHub account with write access.

Before launch: see `docs/00-brief.md` "Gates" and the launch list in `docs/lessons/01-garrick-process-and-rules.md` §7. In short: clear the `[CONFIRM]` list, send a real test inquiry and have Susan find it, test on a real iPhone, set the domain, and confirm nothing is still noindexed.

## Adding a photo

1. Put the original (JPEG, 1600px or wider on the long side) in `src/images/originals/`.
2. Add a line to `scripts/photos.json`: `"short-name": "file.jpg"`.
3. Run `python3 -I scripts/images.py`.
4. Use `"image": "short-name"` with an `"alt"` in the content file.
