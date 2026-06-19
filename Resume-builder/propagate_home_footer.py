import os
import re

# Workspace directory
workspace_dir = r"d:\Downloads\Density-Resume-Builder-main\Density-Resume-Builder-main\Resume-builder"

# Read source footer HTML from index.html
index_path = os.path.join(workspace_dir, "index.html")
with open(index_path, "r", encoding="utf-8") as f:
    index_content = f.read()

# Extract footer HTML block from index.html (from <!-- Footer --> to </footer>)
footer_match = re.search(r'(<!--\s*Footer\s*-->[\s\S]*?</footer>)', index_content, re.IGNORECASE)
if not footer_match:
    footer_match = re.search(r'(<footer[\s\S]*?</footer>)', index_content, re.IGNORECASE)

if not footer_match:
    print("Error: Could not find footer block in index.html!")
    exit(1)

new_footer_html = footer_match.group(1)
print("Extracted footer HTML from index.html successfully.")

# Skip index.html itself
skip_files = ["index.html"]

# Scan for all HTML files
all_files = [f for f in os.listdir(workspace_dir) if f.endswith(".html")]

updated_files = []
skipped_files = []

def update_footer_grid_css(content):
    def replace_main_grid(match):
        block = match.group(1)
        # Find the value of grid-template-columns inside the block
        col_match = re.search(r'grid-template-columns:\s*([^;]+);', block, re.IGNORECASE)
        if col_match:
            cols_val = col_match.group(1).strip()
            # If the columns list is just a media query layout (like 1fr, 1fr 1fr, 1fr 1fr 1fr), skip it
            if cols_val in ["1fr", "1fr 1fr", "1fr 1fr 1fr"]:
                return match.group(0)
            
            # Replace columns, gap, max-width in the block
            block = re.sub(r'grid-template-columns:\s*[^;]+;', 'grid-template-columns: 2.2fr 1fr 1.2fr 1.1fr 1fr;', block, flags=re.IGNORECASE)
            block = re.sub(r'gap:\s*[^;]+;', 'gap: 24px;', block, flags=re.IGNORECASE)
            block = re.sub(r'max-width:\s*[^;]+;', 'max-width: 1400px;', block, flags=re.IGNORECASE)
        return ".footer-grid {" + block + "}"

    # Match .footer-grid followed by { and any text up to }
    content = re.sub(r'\.footer-grid\s*\{([^\}]+)\}', replace_main_grid, content, flags=re.IGNORECASE)
    return content

for fname in all_files:
    if fname in skip_files:
        continue
        
    fpath = os.path.join(workspace_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
        
    original_content = content
    
    # 1. Replace the HTML footer block
    replaced_content = re.sub(
        r'<!--\s*Footer\s*-->[\s\S]*?</footer>',
        new_footer_html,
        content,
        flags=re.IGNORECASE
    )
    if replaced_content == content:
        # Fallback replacement
        replaced_content = re.sub(
            r'<footer[\s\S]*?</footer>',
            new_footer_html,
            content,
            flags=re.IGNORECASE
        )
        
    content = replaced_content
    
    # 2. Replace the CSS block
    content = update_footer_grid_css(content)
    
    # 3. Double-check hardcoded layout columns replacements (handling any variable spacing/newlines)
    content = re.sub(r'grid-template-columns:\s*1\.5fr\s+1fr\s+1fr\s+1fr\s+1fr\s+1fr\s*;', 'grid-template-columns: 2.2fr 1fr 1.2fr 1.1fr 1fr;', content)
    content = re.sub(r'grid-template-columns:\s*1\.5fr\s+1fr\s+1fr\s+1fr\s+1fr\s*;', 'grid-template-columns: 2.2fr 1fr 1.2fr 1.1fr 1fr;', content)
    content = re.sub(r'grid-template-columns:\s*2fr\s+1fr\s+1fr\s+1fr\s+1fr\s*;', 'grid-template-columns: 2.2fr 1fr 1.2fr 1.1fr 1fr;', content)
    content = re.sub(r'grid-template-columns:\s*2fr\s+1fr\s+1fr\s+1fr\s*;', 'grid-template-columns: 2.2fr 1fr 1.2fr 1.1fr 1fr;', content)
    
    if content != original_content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        updated_files.append(fname)
    else:
        skipped_files.append(fname)

print(f"\nPropagation completed!")
print(f"Updated {len(updated_files)} files: {updated_files}")
print(f"Skipped {len(skipped_files)} files: {skipped_files}")
