from pathlib import Path
lines = Path('resources/js/pages/produit-details.tsx').read_text(encoding='utf-8').splitlines()
for idx in range(60, 70):
    print(idx, repr(lines[idx]))
