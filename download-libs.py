from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen
import json

root = Path(__file__).parent / 'vendor'
root.mkdir(exist_ok=True)
libs = [
('chart','chart.js@4.4.8/dist/chart.umd.js'),
('anime','animejs@3.2.2/lib/anime.min.js'),
('gsap','gsap@3.12.7/dist/gsap.min.js'),
('sortable','sortablejs@1.15.6/Sortable.min.js'),
('marked','marked@12.0.2/marked.min.js'),
('highlight','@highlightjs/cdn-assets@11.11.1/highlight.min.js'),
('fuse','fuse.js@7.1.0/dist/fuse.min.js'),
('dayjs','dayjs@1.11.13/dayjs.min.js'),
('lodash','lodash@4.17.21/lodash.min.js'),
('papa','papaparse@5.5.2/papaparse.min.js'),
('qrcode','qrcodejs@1.0.0/qrcode.min.js'),
('barcode','jsbarcode@3.12.1/dist/JsBarcode.all.min.js'),
('math','mathjs@14.2.1/lib/browser/math.js'),
('chroma','chroma-js@3.1.2/dist/chroma.min.cjs'),
('confetti','canvas-confetti@1.9.3/dist/confetti.browser.min.js'),
('swal','sweetalert2@11.17.2/dist/sweetalert2.all.min.js'),
('flatpickr','flatpickr@4.6.13/dist/flatpickr.min.js'),
('purify','dompurify@3.2.6/dist/purify.min.js'),
('lz','lz-string@1.5.0/libs/lz-string.min.js'),
('uuid','uuid@8.3.2/dist/umd/uuid.min.js'),
('flatpickr.css','flatpickr@4.6.13/dist/flatpickr.min.css'),
('highlight.css','@highlightjs/cdn-assets@11.11.1/styles/github-dark.min.css')
]
def download(item):
    name, path = item
    url = 'https://cdn.jsdelivr.net/npm/' + path
    data = urlopen(url, timeout=90).read()
    (root / (name if name.endswith('.css') else name + '.js')).write_bytes(data)
    return {'file': name, 'source': url, 'bytes': len(data)}
with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(download, libs))
(root / 'sources.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print('Downloaded', len(results), 'assets')
