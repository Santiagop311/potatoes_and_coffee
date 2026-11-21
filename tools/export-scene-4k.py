"""Create explicitly enlarged 3840px WebP masters from the native PNGs."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import sys
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
out = ROOT / 'art-masters/exports-4k'
out.mkdir(parents=True, exist_ok=True)
slugs = sys.argv[1:] or ['empanada', 'salchipapota', 'pataconsote', 'chimichanga', 'despeinada', 'pataconada']

def export(slug):
    src = ROOT / f'art-masters/scenes/{slug}.png'
    if not src.exists():
        return None
    dst = out / f'{slug}.webp'
    if dst.exists():
        raise FileExistsError(dst)
    with Image.open(src) as native:
        im = native.convert('RGBA')
        ratio = 3840 / max(im.size)
        dimensions = [round(x * ratio) for x in im.size]
        large = im.resize(dimensions, Image.Resampling.LANCZOS)
        large.save(dst, 'WEBP', quality=90, method=4, exact=True)
        with Image.open(dst) as check:
            assert max(check.size) == 3840 and check.mode == 'RGBA'
            assert check.getchannel('A').getextrema()[0] == 0
        return {'slug': slug, 'source': str(src.relative_to(ROOT)),
                'nativeDimensions': list(native.size), 'path': str(dst.relative_to(ROOT)),
                'exportDimensions': dimensions, 'upscaled': ratio > 1,
                'bytes': dst.stat().st_size,
                'note': 'Enlarged from native generated image. 3840px export is not native 4K generation; no retouching or additional detail synthesized.'}

with ThreadPoolExecutor(max_workers=2) as pool:
    rows = [row for row in pool.map(export, slugs) if row]
manifest = ROOT / 'art-masters/export4k.json'
old = json.loads(manifest.read_text()) if manifest.exists() else {'assets': []}
assets = {x['slug']: x for x in old['assets']}
assets.update({x['slug']: x for x in rows})
old['assets'] = list(assets.values())
manifest.write_text(json.dumps(old, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(rows, indent=2, ensure_ascii=False))
