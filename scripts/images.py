#!/usr/bin/env python3
"""Makes the site's photo renditions, the favicons and the share-card source.

    python3 -I scripts/images.py

Reads scripts/photos.json (site name -> source file under data/research/facebook/images or
src/images/originals), writes src/images/<name>-{480,800,1200,1600}.{webp,jpg} (never upscaling
past the source width, except that every photo gets a 480), src/images/manifest.json with each
photo's size, dominant colour and renditions, plus favicon.png (48), apple-touch-icon.png (180)
and favicon.svg from the logo. build.mjs reads the manifest; scripts/check-content.js checks that
every photo named in content/ exists in it. Re-run after adding a photo to photos.json.
"""
import json, os, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIRS = [os.path.join(ROOT, 'src/images/originals'), os.path.join(ROOT, 'data/research/facebook/images')]
OUT = os.path.join(ROOT, 'src/images')
WIDTHS = (480, 800, 1200, 1600)
picks = json.load(open(os.path.join(ROOT, 'scripts/photos.json')))
os.makedirs(OUT, exist_ok=True)

def find(f):
    for d in SRC_DIRS:
        p = os.path.join(d, f)
        if os.path.exists(p): return p
    sys.exit(f'source not found: {f}')

meta = {}
for name, f in picks.items():
    im = ImageOps.exif_transpose(Image.open(find(f))).convert('RGB')
    w, h = im.size
    px = list(im.resize((8, 8)).get_flattened_data() if hasattr(im, 'get_flattened_data') else im.resize((8, 8)).getdata())
    avg = tuple(sum(c[i] for c in px) // len(px) for i in range(3))
    meta[name] = {'source': f, 'w': w, 'h': h, 'color': '#%02x%02x%02x' % avg, 'renditions': []}
    for tw in WIDTHS:
        if tw > w and tw != 480: continue
        r = im.copy(); r.thumbnail((tw, 10000))
        for ext, kw in (('webp', dict(quality=80, method=6)), ('jpg', dict(quality=78, optimize=True, progressive=True))):
            p = f'{OUT}/{name}-{tw}.{ext}'; r.save(p, **kw)
            meta[name]['renditions'].append([tw, ext, r.width, r.height, os.path.getsize(p)])
json.dump(meta, open(f'{OUT}/manifest.json', 'w'), indent=1)

# Favicons from the logo: the heart wreath on white, cropped square.
logo = ImageOps.exif_transpose(Image.open(find(picks['logo']))).convert('RGBA')
side = min(logo.size); box = ((logo.width - side) // 2, (logo.height - side) // 2, (logo.width + side) // 2, (logo.height + side) // 2)
sq = logo.crop(box)
for size, fn in ((48, 'favicon.png'), (180, 'apple-touch-icon.png'), (512, 'icon-512.png')):
    bg = Image.new('RGBA', (size, size), (255, 255, 255, 255)); r = sq.resize((size, size), Image.LANCZOS); bg.alpha_composite(r); bg.convert('RGB').save(f'{OUT}/../{fn}' if fn != 'icon-512.png' else f'{OUT}/{fn}')
# An SVG favicon that embeds the 48px PNG, so browsers that prefer SVG get the same mark.
import base64
b64 = base64.b64encode(open(f'{OUT}/../favicon.png', 'rb').read()).decode()
open(f'{OUT}/../favicon.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><image width="48" height="48" href="data:image/png;base64,{b64}"/></svg>')
total = sum(r[4] for m in meta.values() for r in m['renditions'])
print(f'{len(meta)} photos, {len([r for m in meta.values() for r in m["renditions"]])} renditions, {total/1e6:.1f} MB')
