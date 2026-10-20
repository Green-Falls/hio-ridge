#!/usr/bin/env python3
"""Cuts the site's web fonts: static instances from the Google Fonts variable files, latin subset, woff2.

    python3 -I scripts/fonts.py [path/to/google-fonts-clone]

Needs fonttools and brotli (pip install fonttools brotli). Expects the two families fetched with the
website-build skill's fonts_fetch.sh (a sparse clone of google/fonts) at the given clone path, default
/tmp/google-fonts. Writes src/fonts/{caslon-400,caslon-400i,caslon-700,plex-400,plex-600}.woff2 and
the two OFL.txt files, and prints each file's size and the metrics used for the CSS fallback faces
(size-adjust = web avg width / fallback avg width; ascent- and descent-override = web metric / size-adjust).
"""
import os, sys, glob
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLONE = sys.argv[1] if len(sys.argv) > 1 else '/tmp/google-fonts'
OUT = os.path.join(ROOT, 'src/fonts')
os.makedirs(OUT, exist_ok=True)
# Round 6: Cormorant Garamond (display) and Jost (body), the pairing the category reads as bridal
# (reference lock: William Allen Farm). Caslon and Plex are gone.
JOBS = [
    ('cormorantgaramond/CormorantGaramond[wght].ttf', 'cormorant-300', {'wght': 300}, 'OFL-CormorantGaramond.txt'),
    ('cormorantgaramond/CormorantGaramond[wght].ttf', 'cormorant-500', {'wght': 500}, None),
    ('cormorantgaramond/CormorantGaramond-Italic[wght].ttf', 'cormorant-300i', {'wght': 300}, None),
    ('jost/Jost[wght].ttf', 'jost-400', {'wght': 400}, 'OFL-Jost.txt'),
    ('jost/Jost[wght].ttf', 'jost-500', {'wght': 500}, None),
]
UNICODES = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
SAMPLE = "the quick brown fox jumps over the lazy dog and runs away, 1820 Hio Ridge Road Bridgton Maine"

def metrics(path):
    f = TTFont(path); upm = f['head'].unitsPerEm; hh = f['hhea']; hm = f['hmtx']; cmap = f.getBestCmap()
    w = sum(hm[cmap[ord(c)]][0] for c in SAMPLE if ord(c) in cmap) / len(SAMPLE)
    return dict(avg=w / upm, asc=hh.ascent / upm, desc=abs(hh.descent) / upm)

for src, name, loc, lic in JOBS:
    srcp = os.path.join(CLONE, 'ofl', src)
    if not os.path.exists(srcp): sys.exit(f'missing {srcp}: fetch the ofl/<family> folder from github.com/google/fonts into the clone first')
    inst = instancer.instantiateVariableFont(TTFont(srcp), loc)
    tmp = f'{OUT}/{name}.ttf'; inst.save(tmp)
    opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['kern', 'liga', 'tnum', 'pnum', 'lnum', 'onum', 'calt', 'case', 'ss01']; opts.name_IDs = ['*']; opts.notdef_outline = True
    font = subset.load_font(tmp, opts); s = subset.Subsetter(opts); s.populate(unicodes=subset.parse_unicodes(UNICODES)); s.subset(font); subset.save_font(font, f'{OUT}/{name}.woff2', opts); os.remove(tmp)
    if lic:
        import shutil; shutil.copy(os.path.join(os.path.dirname(srcp), 'OFL.txt'), f'{OUT}/{lic}')
    print(name, os.path.getsize(f'{OUT}/{name}.woff2') // 1000, 'KB', metrics(f'{OUT}/{name}.woff2'))

for fb in glob.glob('/usr/share/fonts/**/Liberation{Serif,Sans}-Regular.ttf', recursive=True) + glob.glob('/usr/share/fonts/**/LiberationSerif-Regular.ttf', recursive=True) + glob.glob('/usr/share/fonts/**/LiberationSans-Regular.ttf', recursive=True):
    print('fallback', os.path.basename(fb), metrics(fb))
print('total', sum(os.path.getsize(p) for p in glob.glob(OUT + '/*.woff2')) // 1000, 'KB')
