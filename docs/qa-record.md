# QA and audits: R&SVP – Hio Ridge

One section per audit pass. Each finding is one bullet: what was wrong, how it was measured, what was done. Findings accepted as is are listed too, with the reason.

Harness: `node qa/measure.mjs dist/index.html --viewports 320x568,375x667,390x844,430x932,844x390,768x1024,1280x650,1440x900`, `node qa/contrast.mjs`, `python3 qa/copy_check.py`, axe at 375 and 1440, three mobile Lighthouse runs. Every pass records the build stamp it measured.

No passes yet.
