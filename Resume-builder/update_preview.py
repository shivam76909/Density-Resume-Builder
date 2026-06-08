import sys

with open('js/live-preview.backup.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Modify the check at the top
content = content.replace("if (templateId !== 'cream') {", "if (templateId !== 'cream' && templateId !== 'executive-dark') {")

# Add the CSS for executive-dark
css_insert = """
      /* --- EXECUTIVE DARK CSS --- */
      .ed-container {
        display: flex;
        width: 100%;
        height: 100%;
        font-family: 'Inter', sans-serif;
        background: #ffffff;
        box-sizing: border-box;
        overflow: hidden;
      }
      .ed-sidebar {
        width: 35%;
        background-color: #1b2638 !important;
        background: #1b2638 !important;
        color: #ffffff;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        height: 100%;
        overflow: hidden;
      }
      .ed-main {
        width: 65%;
        background: #ffffff;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 14px;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .ed-main::-webkit-scrollbar { display: none; }
      
      .ed-name {
        font-size: 20px;
        font-weight: 800;
        color: #1b2638;
        margin: 0 0 2px 0;
        line-height: 1.1;
        text-transform: uppercase;
        letter-spacing: 0.02em;
      }
      .ed-prof {
        font-size: 9px;
        font-weight: 600;
        color: #2563eb;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 0 0 10px 0;
      }
      .ed-sec-title {
        font-size: 10px;
        font-weight: 700;
        color: #ffffff;
        margin: 0 0 6px 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        padding-bottom: 3px;
      }
      .ed-main-sec-title {
        font-size: 12px;
        font-weight: 800;
        color: #1b2638;
        margin: 0 0 8px 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 2px solid #2563eb;
        padding-bottom: 4px;
        display: inline-block;
      }
      .ed-contact-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 6.5px;
        color: #cbd5e1;
        line-height: 1.4;
        word-break: break-all;
      }
      .ed-icon {
        width: 10px;
        height: 10px;
        color: #10b981;
        flex-shrink: 0;
      }
      .ed-edu-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 6px;
      }
      .ed-edu-school {
        font-size: 7px;
        font-weight: 700;
        color: #ffffff;
      }
      .ed-edu-degree {
        font-size: 6.5px;
        color: #cbd5e1;
      }
      .ed-edu-years {
        font-size: 6px;
        color: #94a3b8;
        font-weight: 500;
      }
      .ed-skill-item {
        font-size: 7px;
        color: #cbd5e1;
        margin-bottom: 3px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .ed-skill-item::before {
        content: '';
        width: 3px;
        height: 3px;
        background: #10b981;
        border-radius: 50%;
      }
      .ed-summary {
        font-size: 7.5px;
        color: #334155;
        line-height: 1.5;
        text-align: justify;
      }
      .ed-exp-item {
        margin-bottom: 10px;
      }
      .ed-exp-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 2px;
      }
      .ed-exp-role {
        font-size: 9px;
        font-weight: 700;
        color: #1b2638;
      }
      .ed-exp-company {
        font-size: 7.5px;
        font-weight: 600;
        color: #475569;
        margin-bottom: 3px;
      }
      .ed-exp-date {
        font-size: 6.5px;
        font-weight: 600;
        color: #2563eb;
      }
      .ed-exp-bullets {
        padding-left: 12px;
        margin: 0;
      }
      .ed-exp-bullet {
        font-size: 7.5px;
        color: #334155;
        line-height: 1.4;
        margin-bottom: 2px;
      }
"""

content = content.replace("/* Education */", css_insert + "\n      /* Education */")

# Add the html for executive-dark inside render()
html_insert = """
  function getExecutiveDarkHtml() {
    return `
    <div class="ed-container">
      <div class="ed-sidebar">
        <!-- Contact -->
        <div class="ed-section">
          <h2 class="ed-sec-title">Contact Info</h2>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <div class="ed-contact-item" id="ed-phone">
              <svg class="ed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span id="ed-phone-text"></span>
            </div>
            <div class="ed-contact-item" id="ed-email">
              <svg class="ed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span id="ed-email-text"></span>
            </div>
            <div class="ed-contact-item" id="ed-location">
              <svg class="ed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span id="ed-location-text"></span>
            </div>
          </div>
        </div>
        
        <!-- Education -->
        <div class="ed-section" style="margin-top: 10px;">
          <h2 class="ed-sec-title">Education</h2>
          <div id="ed-edu-list"></div>
        </div>
        
        <!-- Skills -->
        <div class="ed-section" style="margin-top: 10px;">
          <h2 class="ed-sec-title">Core Skills</h2>
          <div id="ed-skills-list"></div>
        </div>
      </div>
      
      <div class="ed-main">
        <div>
          <h1 id="ed-name" class="ed-name">First Last</h1>
          <div id="ed-prof" class="ed-prof">Profession</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <h2 class="ed-main-sec-title">Professional Summary</h2>
          <div id="ed-summary" class="ed-summary"></div>
        </div>
        
        <div>
          <h2 class="ed-main-sec-title">Work Experience</h2>
          <div id="ed-exp-list"></div>
        </div>
      </div>
    </div>
    `;
  }
"""

content = content.replace("let root = document.getElementById('lp-root');", html_insert + "\n  let root = document.getElementById('lp-root');")

render_logic_insert = """
    if (templateId === 'executive-dark') {
      if (!root.querySelector('.ed-container')) {
        root.innerHTML = getExecutiveDarkHtml();
      }
      
      // Populate Executive Dark
      const fn = val('firstName') ?? c.firstName ?? 'John';
      const ln = val('lastName') ?? c.lastName ?? 'Doe';
      const prof = val('profession') ?? c.profession ?? 'Executive Director';
      document.getElementById('ed-name').textContent = `${fn} ${ln}`.trim() || 'John Doe';
      document.getElementById('ed-prof').textContent = prof || 'Executive Director';
      
      const phoneT = document.getElementById('ed-phone-text');
      if (phone && phone !== '+91 ') { phoneT.textContent = phone; document.getElementById('ed-phone').style.display = 'flex'; }
      else document.getElementById('ed-phone').style.display = 'none';
      
      const emailT = document.getElementById('ed-email-text');
      if (email) { emailT.textContent = email; document.getElementById('ed-email').style.display = 'flex'; }
      else document.getElementById('ed-email').style.display = 'none';
      
      const locT = document.getElementById('ed-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locStr) { locT.textContent = locStr; document.getElementById('ed-location').style.display = 'flex'; }
      else document.getElementById('ed-location').style.display = 'none';
      
      const summary = val('summary') ?? d.summary ?? '';
      document.getElementById('ed-summary').textContent = summary || 'Dedicated and results-driven professional with a proven track record of executive leadership. Highly skilled in strategic planning, driving business growth, and leading cross-functional teams to exceed corporate objectives.';
      
      // Education
      const eduList = document.getElementById('ed-edu-list');
      eduList.innerHTML = '';
      if (edu.length === 0) {
          edu = [{ schoolName: 'Harvard University', degree: 'Master of Business Administration', startYear: '2015', endYear: '2017' }];
      }
      edu.forEach(e => {
        const div = document.createElement('div');
        div.className = 'ed-edu-item';
        div.innerHTML = `
          <span class="ed-edu-school">${e.schoolName || 'University'}</span>
          <span class="ed-edu-degree">${e.degree || 'Degree'}</span>
          <span class="ed-edu-years">${e.startYear || ''} - ${e.endYear || ''}</span>
        `;
        eduList.appendChild(div);
      });
      
      // Skills
      const sList = document.getElementById('ed-skills-list');
      sList.innerHTML = '';
      if (skills.length === 0) {
          skills = ['Strategic Planning', 'Team Leadership', 'Financial Modeling', 'Operations Management', 'Business Development'];
      }
      skills.forEach(n => {
        const div = document.createElement('div');
        div.className = 'ed-skill-item';
        div.textContent = n;
        sList.appendChild(div);
      });
      
      // Experience
      const expList = document.getElementById('ed-exp-list');
      expList.innerHTML = '';
      if (experiences.length === 0 || !experiences[0].jobTitle) {
        experiences = [{ jobTitle: 'Senior Manager', employer: 'Tech Corp', city: 'San Francisco, CA', startDate: '2020', endDate: 'Present', description: 'Led a team of 50 to streamline operations.\\nIncreased revenue by 20% year-over-year.\\nSpearheaded new strategic partnerships with key vendors.' }];
      }
      experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'ed-exp-item';
        let bulletHtml = '';
        if (exp.description) {
          const bullets = exp.description.split(/\\n+/).map(b => b.trim().replace(/^[•\\-\\.\\s]+/, '')).filter(Boolean);
          if (bullets.length > 0) {
            bulletHtml = '<ul class="ed-exp-bullets">' + bullets.map(b => '<li class="ed-exp-bullet">' + b + '</li>').join('') + '</ul>';
          }
        }
        item.innerHTML = `
          <div class="ed-exp-header">
            <span class="ed-exp-role">${exp.jobTitle || 'Role'}</span>
            <span class="ed-exp-date">${exp.startDate || ''} - ${exp.endDate || ''}</span>
          </div>
          <div class="ed-exp-company">${exp.employer || 'Company'}${exp.city ? ', ' + exp.city : ''}</div>
          ${bulletHtml}
        `;
        expList.appendChild(item);
      });
      return;
    }
"""

content = content.replace("document.getElementById('lp-name').textContent = `${fn} ${ln}`.trim() || 'First Last Name';", render_logic_insert + "\n    document.getElementById('lp-name').textContent = `${fn} ${ln}`.trim() || 'First Last Name';")

# We need to make sure root.innerHTML = ... only happens for cream
content = content.replace("root.innerHTML = `\n    <div class=\"lp-container\">", "if (templateId === 'cream' && !root.querySelector('.lp-container')) {\n      root.innerHTML = `\n    <div class=\"lp-container\">")
content = content.replace("</div>`;\n\n  // ── 4. Data helpers ──", "</div>`;\n    }\n\n  // ── 4. Data helpers ──")

with open('js/live-preview.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done writing js/live-preview.js")
