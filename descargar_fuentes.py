"""
descargar_fuentes.py
────────────────────
Baja las fuentes Poppins (400/600/700) e Inter (400/500/600) desde Google Fonts
en formato woff2 (latin subset) y las guarda en public/fonts/.
Genera también el archivo CSS con las @font-face apuntando a /fonts/*.

Uso: correr desde la raíz del repo (C:\\Users\\ippol\\gestor-la-plata\\)
    python descargar_fuentes.py
"""

import os
import re
import urllib.request
import ssl

# User-Agent de Chrome (necesario, si no Google Fonts manda TTF viejo)
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

# Google Fonts CSS con las mismas familias/pesos que ya usa el sitio
CSS_URL = (
    "https://fonts.googleapis.com/css2?"
    "family=Poppins:wght@400;600;700&"
    "family=Inter:wght@400;500;600&"
    "display=swap"
)

OUT_DIR = os.path.join("public", "fonts")
os.makedirs(OUT_DIR, exist_ok=True)

ctx = ssl.create_default_context()

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=ctx) as r:
        return r.read()

print("→ Descargando CSS de Google Fonts...")
css_raw = fetch(CSS_URL).decode("utf-8")

# Quedarse solo con los bloques del subset 'latin' (los que importan para español)
# Google Fonts manda múltiples @font-face por familia con distintos unicode-range.
# Para LP argentino con texto en español, 'latin' cubre todo lo necesario.
blocks = re.split(r"/\*\s*(\w[\w-]*)\s*\*/", css_raw)
# blocks = ['prefacio', 'subset1', 'bloque1', 'subset2', 'bloque2', ...]

latin_blocks = []
for i in range(1, len(blocks) - 1, 2):
    subset = blocks[i].strip()
    block = blocks[i + 1]
    if subset == "latin":
        latin_blocks.append(block)

print(f"→ Bloques 'latin' detectados: {len(latin_blocks)}")

# Extraer URLs woff2 y rewrite a /fonts/NOMBRE.woff2
downloaded = {}
local_css_parts = []

for block in latin_blocks:
    # Detectar familia y peso para nombrar el archivo
    fam_match = re.search(r"font-family:\s*'([^']+)'", block)
    wt_match = re.search(r"font-weight:\s*(\d+)", block)
    url_match = re.search(r"url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)", block)

    if not (fam_match and wt_match and url_match):
        continue

    fam = fam_match.group(1).replace(" ", "")
    wt = wt_match.group(1)
    url = url_match.group(1)

    filename = f"{fam}-{wt}.woff2"
    local_path = os.path.join(OUT_DIR, filename)

    if url not in downloaded:
        print(f"  · {filename}  ({fam} {wt})")
        data = fetch(url)
        with open(local_path, "wb") as f:
            f.write(data)
        downloaded[url] = filename

    # Reescribir el bloque con ruta local
    new_block = block.replace(url, f"/fonts/{filename}")
    # También remover el 'format('woff2')' de otras URLs viejas si quedaron
    local_css_parts.append("@font-face {" + new_block.strip())

# Ensamblar el CSS final
final_css = (
    "/* Fuentes self-hosted generadas por descargar_fuentes.py */\n"
    "/* Subset: latin */\n\n"
    + "\n\n".join(local_css_parts)
    + "\n"
)

# Cerrar llaves: el split dejó algunos bloques sin la llave final
final_css = re.sub(r"\}\s*$", "}\n", final_css, flags=re.MULTILINE)

css_out = os.path.join("public", "fonts.css")
with open(css_out, "w", encoding="utf-8") as f:
    f.write(final_css)

print(f"\n✅ Listo.")
print(f"   Fuentes en: {OUT_DIR}/  ({len(downloaded)} archivos)")
print(f"   CSS en:     {css_out}")
print(f"\nPróximo paso: reemplazar el index.html por el que te pasa Claude.")
