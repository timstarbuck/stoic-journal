#!/usr/bin/env python3
"""generate_favicons.py — Next.js App Router favicon bundle generator."""

from PIL import Image
import zipfile, os, sys

# ── Config ──────────────────────────────────────────────
LOGO = "logo.png"           # ← point this at your source logo
OUTPUT_DIR = "favicon-bundle"
ZIP_NAME = "nextjs-favicon-bundle.zip"
PADDING_PCT = 0.08           # 8% padding to prevent clipping

APP_ROUTER = {               # auto-detected by Next.js in /app
    "icon.png": 32,
    "apple-icon.png": 180,
}

EXTENDED = {                 # for /public and manifest.json
    "icon-16x16.png": 16,
    "icon-32x32.png": 32,
    "icon-48x48.png": 48,
    "icon-96x96.png": 96,
    "icon-192x192.png": 192,
    "icon-512x512.png": 512,
    "apple-icon-120x120.png": 120,
    "apple-icon-152x152.png": 152,
    "apple-icon-180x180.png": 180,
    "mstile-150x150.png": 150,
}

ICO_SIZES = [16, 32, 48]    # multi-size favicon.ico

# ── Helpers ─────────────────────────────────────────────
def make_icon(source, size, path):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pad = max(int(size * PADDING_PCT), 1) if size >= 32 else 0
    inner = size - pad * 2
    resized = source.resize((inner, inner), Image.LANCZOS)
    offset = (size - inner) // 2
    canvas.paste(resized, (offset, offset), resized)
    canvas.save(path, "PNG", optimize=True)
    return canvas

# ── Main ────────────────────────────────────────────────
src = Image.open(LOGO).convert("RGBA")
os.makedirs(OUTPUT_DIR, exist_ok=True)
print(f"Source: {src.size[0]}×{src.size[1]}")

for name, sz in {**APP_ROUTER, **EXTENDED}.items():
    make_icon(src, sz, os.path.join(OUTPUT_DIR, name))
    print(f"  ✓ {name} ({sz}×{sz})")

# favicon.ico
ico_imgs = [make_icon(src, s, os.path.join(OUTPUT_DIR, f"_tmp{s}.png")) for s in ICO_SIZES]
ico_path = os.path.join(OUTPUT_DIR, "favicon.ico")
ico_imgs[0].save(ico_path, "ICO",
                 sizes=[(s, s) for s in ICO_SIZES],
                 append_images=ico_imgs[1:])
for s in ICO_SIZES:
    os.remove(os.path.join(OUTPUT_DIR, f"_tmp{s}.png"))
print(f"  ✓ favicon.ico ({ICO_SIZES})")

# ZIP with correct folder structure
with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as zf:
    for f in APP_ROUTER:
        zf.write(os.path.join(OUTPUT_DIR, f), f"app/{f}")
    zf.write(ico_path, "app/favicon.ico")
    for f in EXTENDED:
        zf.write(os.path.join(OUTPUT_DIR, f), f"public/{f}")

print(f"\n📦 {ZIP_NAME} ({os.path.getsize(ZIP_NAME)/1024:.1f} KB) — ready!")
