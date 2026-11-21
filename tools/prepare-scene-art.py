"""Copy generated scene masters and export responsive WebP without retouching.

Reads art-masters/generated-scene-inputs.json. Image generation happens through
the built-in imagegen tool; this script only copies, resizes and converts files.
"""
from pathlib import Path
import json
import filecmp
import shutil
import sys
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
input_file = ROOT / (sys.argv[1] if len(sys.argv) > 1 else 'art-masters/generated-scene-inputs.json')
inputs = json.loads(input_file.read_text())
masters = ROOT / 'art-masters/scenes'
exports = ROOT / 'dist/assets/scenes'
masters.mkdir(parents=True, exist_ok=True)
exports.mkdir(parents=True, exist_ok=True)
records = []
for item in inputs:
    slug = item['slug']
    target = masters / f'{slug}.png'
    if target.exists():
        if not filecmp.cmp(item['generatedPath'], target, shallow=False):
            raise FileExistsError(f'Refusing to replace a different existing master: {target}')
    else:
        shutil.copy2(item['generatedPath'], target)
    with Image.open(target) as native:
        rgba = native.convert('RGBA')
        alpha = rgba.getchannel('A')
        lo, hi = alpha.getextrema()
        if lo != 0 or hi < 200:
            raise ValueError(f'Missing usable transparent alpha: {slug}')
        variants = []
        for width in (510, 1200, 1920):
            height = round(rgba.height * width / rgba.width)
            path = exports / f'{slug}-{width}.webp'
            usable = False
            if path.exists():
                try:
                    with Image.open(path) as old:
                        old.load()
                        usable = old.mode == 'RGBA' and old.size == (width, height)
                except OSError:
                    pass
            if not usable:
                resized = rgba.resize((width, height), Image.Resampling.LANCZOS)
                pending = path.with_suffix('.pending.webp')
                resized.save(pending, 'WEBP', quality=88, method=4, exact=True)
                pending.replace(path)
            with Image.open(path) as check:
                assert check.mode == 'RGBA' and check.getchannel('A').getextrema()[0] == 0
            variants.append({'path': str(path.relative_to(ROOT)), 'dimensions': [width, height],
                             'upscaled': width > rgba.width, 'bytes': path.stat().st_size})
        records.append({'slug': slug, 'tool': 'built-in imagegen',
                        'kind': 'generated-product-render' if item['reference'] else 'generated-decorative-ingredient',
                        'reference': item['reference'], 'prompt': item['prompt'],
                        'master': str(target.relative_to(ROOT)),
                        'nativeDimensions': list(native.size), 'masterDimensions': list(native.size),
                        'alphaExtrema': [lo, hi], 'exports': variants,
                        'notes': item.get('provenanceNote', 'Generated interpretation based on supplied reference, not original product photography. Native master kept unchanged; 1920px export is enlarged when indicated.')})

provenance = ROOT / 'art-masters/provenance.json'
previous = json.loads(provenance.read_text()) if provenance.exists() else {'assets': []}
if isinstance(previous, list):
    previous = {'assets': previous}
previous.setdefault('assets', [])
existing = {x.get('slug'): x for x in previous['assets']}
existing.update({x['slug']: x for x in records})
previous['assets'] = list(existing.values())
previous.setdefault('description', 'Scene artwork provenance; generated with the built-in imagegen tool. Dimensions and enlarged exports are recorded explicitly.')
provenance.write_text(json.dumps(previous, ensure_ascii=False, indent=2) + '\n')
print(json.dumps([{'slug': x['slug'], 'native': x['nativeDimensions'], 'alpha': x['alphaExtrema'],
                   'exports': [{'path': v['path'], 'bytes': v['bytes']} for v in x['exports']]}
                  for x in records], ensure_ascii=False, indent=2))
