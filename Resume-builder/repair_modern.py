with open('js/live-preview.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The corrupted section in getCreamHtml (lines 1170-1224 approx)
# Replace from the bad "Left Column: Contact" comment up to the stray </div>
# with the correct cream contact section + close getCreamHtml + add getModernHtml

bad_section = '''        <!-- Left Column: Contact, Education, Skills -->
                        <!-- Contact Title -->
        <div style="position: absolute; top: 21.5%; left: 2.5%; width: 26.5%;">
          <h2 style="font-family: 'Open Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Contact</h2>
        </div>
        
        <!-- Contact List -->
        <div style="position: absolute; top: 24.5%; left: 2.5%; width: 26.5%; display: flex; flex-direction: column; gap: 1px;">
          <div id="modern-phone" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
            <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span id="modern-phone-text" class="modern-editable" contenteditable="true" placeholder="+91 9301306891" style="font-family: 'Open Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;">+91 9301306891</span>
          </div>
          <div id="modern-email" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
            <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span id="modern-email-text" class="modern-editable" contenteditable="true" placeholder="shivam@example.com" style="font-family: 'Open Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;">shivam@example.com</span>
          </div>
          <div id="modern-location" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
            <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span id="modern-location-text" class="modern-editable" contenteditable="true" placeholder="India" style="font-family: 'Open Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;">India</span>
          </div>
          <div id="modern-linkedin" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <span id="modern-linkedin-text" class="modern-editable" contenteditable="true" placeholder="linkedin" style="font-family: 'Open Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;"></span>
          </div>
          <div id="modern-github" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span id="modern-github-text" class="modern-editable" contenteditable="true" placeholder="github" style="font-family: 'Open Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;"></span>
          </div>
          <div id="modern-portfolio" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span id="modern-portfolio-text" class="modern-editable" contenteditable="true" placeholder="portfolio" style="font-family: 'Open Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;"></span>
          </div>
        </div>

        <!-- Education Title -->
        <div id="modern-edu-sec-title" style="position: absolute; top: 35.5%; left: 2.5%; width: 26.5%;">
          <h2 style="font-family: 'Open Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Education</h2>
        </div>
        
        <!-- Education List -->
        <div id="modern-edu-list" style="position: absolute; top: 38.5%; left: 2.5%; width: 26.5%; display: flex; flex-direction: column; gap: 6px;">
          <!-- Dynamically populated education items -->
        </div>

        <!-- Skills Title -->
        <div id="modern-skills-sec-title" style="position: absolute; top: 47.5%; left: 2.5%; width: 26.5%;">
          <h2 style="font-family: 'Open Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Skills</h2>
        </div>
        
        <!-- Skills List -->
        <div id="modern-skills-list" style="position: absolute; top: 50.5%; left: 2.5%; width: 26.5%; display: flex; flex-direction: column; gap: 2.5px;">
          <!-- Dynamically populated skills -->
        </div>

        </div>

        <!-- Right Column: Profile, Work Experience, References -->'''

good_section = '''        <!-- Left Column: Contact, Education, Skills -->
        <!-- Contact Title -->
        <div style="position: absolute; top: 19.5%; left: 3%; width: 25%;">
          <h2 style="font-family: 'Merriweather', Georgia, serif; font-size: 7px; font-weight: 700; color: #000000; margin: 0;">Contact</h2>
        </div>
        <div style="position: absolute; top: 22%; left: 3%; width: 25%; display: flex; flex-direction: column; gap: 3px;">
          <div id="cream-phone" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span id="cream-phone-text" class="cream-editable" contenteditable="true" placeholder="+91 9301306891" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
          </div>
          <div id="cream-email" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span id="cream-email-text" class="cream-editable" contenteditable="true" placeholder="email@example.com" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
          </div>
          <div id="cream-location" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span id="cream-location-text" class="cream-editable" contenteditable="true" placeholder="India" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
          </div>
          <div id="cream-linkedin" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <span id="cream-linkedin-text" class="cream-editable" contenteditable="true" placeholder="linkedin" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
          </div>
          <div id="cream-github" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span id="cream-github-text" class="cream-editable" contenteditable="true" placeholder="github" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
          </div>
          <div id="cream-portfolio" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
            <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span id="cream-portfolio-text" class="cream-editable" contenteditable="true" placeholder="portfolio" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
          </div>
        </div>

        <!-- Education Title -->
        <div id="cream-edu-sec-title" style="position: absolute; top: 38%; left: 3%; width: 25%;">
          <h2 style="font-family: 'DM Serif Display', serif; font-size: 9px; font-weight: 700; color: #000000; margin: 0;">Education</h2>
        </div>
        <!-- Education List -->
        <div id="cream-edu-list" style="position: absolute; top: 41%; left: 3%; width: 25%; display: flex; flex-direction: column; gap: 6px;"></div>

        <!-- Skills Title -->
        <div id="cream-skills-sec-title" style="position: absolute; top: 64%; left: 3%; width: 25%;">
          <h2 style="font-family: 'DM Serif Display', serif; font-size: 9px; font-weight: 700; color: #000000; margin: 0;">Skills</h2>
        </div>

        <!-- Right Column: Profile, Work Experience, References -->'''

if bad_section in content:
    content = content.replace(bad_section, good_section)
    print('Replaced bad cream section')
else:
    print('ERROR: bad section not found exactly - check whitespace')

with open('js/live-preview.js', 'w', encoding='utf-8') as f:
    f.write(content)
