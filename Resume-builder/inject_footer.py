"""
inject_footer.py  —  Injects the full footer block before </body> for pages that have no footer.
Also injects footer CSS before </style>.
"""
import os, re

BASE = os.path.dirname(os.path.abspath(__file__))

FOOTER_HTML = '''\n    <!-- Footer -->\n    <footer class="footer">\n        <div class="footer-grid">\n            <div class="footer-brand-col">\n                <a href="index.html" class="footer-logo">\n                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">\n                        <rect x="5" y="5" width="28" height="28" fill="rgba(255,255,255,0.2)" />\n                        <rect x="37" y="37" width="28" height="28" fill="rgba(255,255,255,0.2)" />\n                        <rect x="69" y="37" width="28" height="28" fill="rgba(255,255,255,0.2)" />\n                        <rect x="37" y="69" width="28" height="28" fill="rgba(255,255,255,0.2)" />\n                        <rect x="0" y="0" width="30" height="30" fill="#7c3aed" />\n                        <rect x="32" y="32" width="30" height="30" fill="#7c3aed" />\n                        <rect x="64" y="32" width="30" height="30" fill="#7c3aed" />\n                        <rect x="32" y="64" width="30" height="30" fill="#7c3aed" />\n                    </svg>\n                    <div class="footer-brand-title">\n                        <span class="footer-brand-name">Density</span>\n                        <span class="footer-brand-sub">Resume Builder</span>\n                    </div>\n                </a>\n                <p class="footer-tagline">Engineered for recruiters, optimized for ATS. Build a high-performance resume that gets you hired in 2026.</p>\n                <div class="social-links">\n                    <a href="#" aria-label="LinkedIn"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>\n                    <a href="#" aria-label="Twitter"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>\n                    <a href="#" aria-label="Instagram"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>\n                </div>\n            </div>\n            <div class="footer-col">\n                <h4>Product</h4>\n                <ul>\n                    <li><a href="resume-builder.html">Resume Builder</a></li>\n                    <li><a href="ai-resume-builder.html">AI Resume Builder</a></li>\n                    <li><a href="#">ATS Resume Optimizer</a></li>\n                    <li><a href="#">CV Builder</a></li>\n                    <li><a href="#">Resume Templates</a></li>\n                    <li><a href="#">Resume Examples</a></li>\n                    <li><a href="#">Cover Letter Builder</a></li>\n                    <li><a href="#">ATS Resume Checker</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>Popular Resume Examples</h4>\n                <ul>\n                    <li><a href="#">Software Engineer Resume</a></li>\n                    <li><a href="#">Data Analyst Resume</a></li>\n                    <li><a href="#">Executive Assistant Resume</a></li>\n                    <li><a href="#">UI/UX Developer Resume</a></li>\n                    <li><a href="#">Project Manager Resume</a></li>\n                    <li><a href="#">Teacher Resume</a></li>\n                    <li><a href="#">HR Resume</a></li>\n                    <li><a href="#">Financial Analyst Resume</a></li>\n                    <li><a href="#">Digital Marketing Resume</a></li>\n                    <li><a href="#">Product Manager Resume</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>Resume Resources</h4>\n                <ul>\n                    <li><a href="#">Resume Help</a></li>\n                    <li><a href="#">Resume Format</a></li>\n                    <li><a href="#">ATS Resume Format</a></li>\n                    <li><a href="#">Resume Summary Examples</a></li>\n                    <li><a href="#">Resume Objective Examples</a></li>\n                    <li><a href="#">Resume Skills Examples</a></li>\n                    <li><a href="#">Career Advice</a></li>\n                    <li><a href="#">Interview Questions</a></li>\n                    <li><a href="#">Salary Guide</a></li>\n                    <li><a href="#">Cover Letter Examples</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>Popular Templates</h4>\n                <ul>\n                    <li><a href="#">ATS Resume Template</a></li>\n                    <li><a href="#">Professional Resume Template</a></li>\n                    <li><a href="#">Modern Resume Template</a></li>\n                    <li><a href="#">Simple Resume Template</a></li>\n                    <li><a href="#">Creative Resume Template</a></li>\n                    <li><a href="#">One Page Resume Template</a></li>\n                    <li><a href="#">Two Page Resume Template</a></li>\n                    <li><a href="#">Fresher Resume Template</a></li>\n                </ul>\n            </div>\n            <div class="footer-col">\n                <h4>Company</h4>\n                <ul>\n                    <li><a href="#">About Us</a></li>\n                    <li><a href="#">Contact Us</a></li>\n                    <li><a href="#">Blog</a></li>\n                    <li><a href="#">Sitemap</a></li>\n                    <li><a href="#">Privacy Policy</a></li>\n                    <li><a href="#">Terms & Conditions</a></li>\n                    <li><a href="#">Cookie Policy</a></li>\n                    <li><a href="#">Disclaimer</a></li>\n                </ul>\n            </div>\n        </div>\n        <div class="footer-bottom">\n            <div class="footer-bottom-container">\n                <p>&#169; 2026 Density Resume Builder &#8226; Crafted for Career Excellence</p>\n                <div class="footer-bottom-links">\n                    <a href="sitemap.xml">Sitemap</a>\n                    <a href="robots.txt">Robots</a>\n                </div>\n            </div>\n        </div>\n    </footer>\n'''

FOOTER_CSS = """
        /* ===== FOOTER ===== */
        .footer { background: #0f172a; color: #fff; padding: 80px 48px 40px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr; gap: 30px; max-width: 1400px; margin: 0 auto; }
        .footer-brand-col { display: flex; flex-direction: column; gap: 24px; }
        .footer-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #fff; }
        .footer-brand-title { display: flex; flex-direction: column; line-height: 1.1; }
        .footer-brand-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 20px; letter-spacing: -0.02em; color: #fff; }
        .footer-brand-sub { font-weight: 400; font-size: 15px; color: #fff; }
        .footer-tagline { color: #fff; font-size: 14px; line-height: 1.6; max-width: 280px; }
        .social-links { display: flex; gap: 16px; }
        .social-links a { color: #fff; transition: color 0.2s; }
        .social-links a:hover { color: #fff; }
        .footer-col h4 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 18px; color: #cbd5e1; }
        .footer-col ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .footer-col ul li a { text-decoration: none; color: #fff; font-size: 13px; transition: color 0.2s; }
        .footer-col ul li a:hover { color: #14B8A6; padding-left: 0; }
        .footer-bottom { margin-top: 60px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-bottom-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 12px; }
        .footer-bottom-links { display: flex; gap: 24px; }
        .footer-bottom-links a { color: #fff; text-decoration: none; transition: color 0.2s; }
        .footer-bottom-links a:hover { color: #fff; }
        @media (max-width: 1200px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px; } }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; } .footer-bottom-container { flex-direction: column; gap: 16px; text-align: center; } }
"""

TARGET_FILES = ["index.html", "contact.html", "grader.html"]

print("=== Footer Injection Results ===")
for fname in TARGET_FILES:
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        print(f"  {fname}: SKIPPED (not found)")
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if "footer-grid" in content:
        # Force re-inject: remove old footer block and re-inject
        content = re.sub(r'\s*<!-- Footer -->.*?</footer>', '', content, flags=re.DOTALL)
        print(f"  {fname}: RE-INJECTING (replacing old footer)")
    else:
        print(f"  {fname}: INJECTING")

    # Inject CSS before last </style>
    if "</style>" in content:
        # Remove old footer CSS if it exists
        content = re.sub(r'\s*/\* ===== FOOTER ===== \*/.*?\n(?=\s*</style>)', '', content, flags=re.DOTALL)
        idx = content.rfind("</style>")
        content = content[:idx] + FOOTER_CSS + "\n    </style>" + content[idx+8:]

    # Inject footer before </body>
    content = content.replace("</body>", FOOTER_HTML + "</body>", 1)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  {fname}: UPDATED")

print("\nDone.")
