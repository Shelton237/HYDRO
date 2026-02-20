from pathlib import Path
text = Path('resources/js/pages/produit-details.tsx').read_text(encoding='utf-8')
start = text.find('Chaque flexible')
print(text[start:start+200])
