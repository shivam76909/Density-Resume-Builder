"""
update_footers.py
Updates the footer in legacy main site pages to include the 5-column layout with Resume Guides links.
"""

import re, os

# ─────────────────────────────────────────────────────
# The new footer HTML to inject
# ─────────────────────────────────────────────────────
NEW_FOOTER_HTML = '''    <!-- Footer -->
    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-brand-col">
                <a href="index.html" class="footer-logo">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                        <defs>
                            <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#5F3DC4;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <rect x="5" y="5" width="28" height="28" fill="rgba(255,255,255,0.1)" rx="4" />
                        <rect x="37" y="37" width="28" height="28" fill="rgba(255,255,255,0.1)" rx="4" />
                        <rect x="69" y="37" width="28" height="28" fill="rgba(255,255,255,0.1)" rx="4" />
                        <rect x="37" y="69" width="28" height="28" fill="rgba(255,255,255,0.1)" rx="4" />
                        <rect x="0" y="0" width="30" height="30" fill="url(#footerLogoGrad)" rx="6" />
                        <rect x="32" y="32" width="30" height="30" fill="url(#footerLogoGrad)" rx="6" />
                        <rect x="64" y="32" width="30" height="30" fill="url(#footerLogoGrad)" rx="6" />
                        <rect x="32" y="64" width="30" height="30" fill="url(#footerLogoGrad)" rx="6" />
                    </svg>
                    <span class="footer-brand-name">Density</span>
                </a>
                <p class="footer-tagline">Engineered for recruiters, optimized for ATS. Build a high-performance resume that gets you hired in 2026.</p>
                <div class="social-links">
                    <a href="#" aria-label="LinkedIn"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                    <a href="#" aria-label="Twitter"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
                    <a href="#" aria-label="Instagram"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Product</h4>
                <ul>
                    <li><a href="templates.html">Resume Templates</a></li>
                    <li><a href="templates.html">ATS Resume Builder</a></li>
                    <li><a href="grader.html">AI Resume Grader</a></li>
                    <li><a href="ai-rewriter.html">AI Content Rewriter</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Resume Guides</h4>
                <ul>
                    <li><a href="ats-resume-checker.html">ATS Resume Checker</a></li>
                    <li><a href="resume-for-btech-freshers.html">BTech Fresher Resume</a></li>
                    <li><a href="resume-for-software-engineer.html">Software Engineer Resume</a></li>
                    <li><a href="resume-for-mba-students.html">MBA Student Resume</a></li>
                    <li><a href="resume-for-data-analyst.html">Data Analyst Resume</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>More Guides</h4>
                <ul>
                    <li><a href="resume-for-java-developer.html">Java Developer Resume</a></li>
                    <li><a href="resume-for-frontend-developer.html">Frontend Developer Resume</a></li>
                    <li><a href="ats-resume-template.html">ATS Resume Template</a></li>
                    <li><a href="resume-format-for-freshers.html">Fresher Resume Format</a></li>
                    <li><a href="ai-resume-builder.html">AI Resume Builder</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="blog.html">Career Blog</a></li>
                    <li><a href="about.html">About Density</a></li>
                    <li><a href="contact.html">Contact Support</a></li>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <p>© 2026 Density Resume Builder • Crafted for Career Excellence</p>
                <div class="footer-bottom-links">
                    <a href="sitemap.xml">Sitemap</a>
                    <a href="robots.txt">Robots</a>
                </div>
            </div>
        </div>
    </footer>'''

# The CSS grid line to update (old 4-col) → new 5-col
OLD_GRID_CSS_4COL = "grid-template-columns: 2fr 1fr 1fr 1fr;"
NEW_GRID_CSS_5COL = "grid-template-columns: 2fr 1fr 1fr 1fr 1fr;"

# ─────────────────────────────────────────────────────
# Files to update (legacy pages that have the old 4-col footer)
# ─────────────────────────────────────────────────────
BASE = os.path.dirname(os.path.abspath(__file__))
TARGET_FILES = [
    "index.html",
    "about.html",
    "ai-rewriter.html",
    "blog.html",
    "contact.html",
    "grader.html",
    "templates.html",
    "upload-choice.html",
    "disclaimer.html",
    "privacy-policy.html",
    "terms.html",
]

def replace_footer(content):
    """Replace everything from <!-- Footer --> or <footer ... > to </footer> with new footer."""
    # Try to replace the full footer block
    pattern = re.compile(
        r'([ \t]*)<!--\s*Footer\s*-->[\s\S]*?</footer>',
        re.IGNORECASE
    )
    if pattern.search(content):
        return pattern.sub(NEW_FOOTER_HTML, content, count=1)
    # Fallback: replace from <footer to </footer>
    pattern2 = re.compile(r'<footer[\s\S]*?</footer>', re.IGNORECASE)
    if pattern2.search(content):
        return pattern2.sub(NEW_FOOTER_HTML.strip(), content, count=1)
    return None  # Nothing replaced


def update_grid_css(content):
    """Update .footer-grid grid-template-columns from 4-col to 5-col."""
    return content.replace(OLD_GRID_CSS_4COL, NEW_GRID_CSS_5COL)


def add_social_links_css_if_missing(content):
    """Add social-links CSS after .footer-tagline if not already present."""
    if ".social-links" in content:
        return content
    social_css = """
        .social-links {
            display: flex;
            gap: 16px;
        }
        .social-links a {
            color: #64748b;
            transition: color 0.2s;
        }
        .social-links a:hover {
            color: #fff;
        }
"""
    # Insert just before </style> or before first footer CSS block
    if ".footer-tagline" in content:
        return content.replace(
            ".footer-tagline {",
            social_css + "\n        .footer-tagline {"
        )
    return content


results = {}
for fname in TARGET_FILES:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        results[fname] = "SKIPPED (not found)"
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        original = f.read()

    updated = replace_footer(original)
    if updated is None:
        results[fname] = "SKIPPED (no <footer> found)"
        continue

    updated = update_grid_css(updated)
    updated = add_social_links_css_if_missing(updated)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(updated)
    results[fname] = "UPDATED"

print("\n=== Footer Update Results ===")
for fname, status in results.items():
    print(f"  {fname}: {status}")
print("\nDone.")
