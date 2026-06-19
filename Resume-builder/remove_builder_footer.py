"""
remove_builder_footer.py  — Removes injected dark footer HTML + CSS from builder pages.
"""
import os, re

BASE = os.path.dirname(os.path.abspath(__file__))

TARGET_FILES = [
    "builder.html",
    "builder-education.html",
    "builder-experience.html",
    "builder-skills.html",
    "builder-references.html",
    "builder-summary.html",
    "builder-review.html",
]

print("=== Removing footer from builder pages ===")
for fname in TARGET_FILES:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        print(f"  {fname}: SKIPPED (not found)")
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # 1) Remove the footer HTML block (<!-- Footer --> ... </footer>)
    content = re.sub(
        r'\s*<!-- Footer -->.*?</footer>',
        '',
        content,
        flags=re.DOTALL
    )

    # 2) Remove the injected FOOTER CSS block inside <style>
    content = re.sub(
        r'\s*/\* ===== FOOTER ===== \*/.*?(?=\s*</style>)',
        '',
        content,
        flags=re.DOTALL
    )

    if content == original:
        print(f"  {fname}: UNCHANGED (nothing to remove)")
    else:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  {fname}: CLEANED")

print("\nDone.")
