
import { saveResume } from "./resume-service.js";
import { auth, onAuthStateChanged } from "./firebase-config.js";

export function initAutoSave(templateName) {
    const cloudStatus = document.getElementById('cloud-status');
    if (!cloudStatus) return;

    const statusText = cloudStatus.querySelector('span');
    const statusIcon = cloudStatus.querySelector('i');

    let autoSaveId = null;
    let autoSaveTimer = null;

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            statusText.innerText = "Login for cloud sync";
            statusIcon.className = "fas fa-lock";
        } else {
            statusText.innerText = "All changes saved";
            statusIcon.className = "fas fa-check-circle";

            const urlParams = new URLSearchParams(window.location.search);
            autoSaveId = urlParams.get('id');

            // Aggressively handle back button
            const backBtn = document.querySelector('.form-header a[href*="templates.html"]');
            if (backBtn) backBtn.href = "dashboard.html";

            document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link && (link.getAttribute('href')?.includes('templates.html') || link.innerText.includes('Back'))) {
                    if (auth.currentUser) {
                        e.preventDefault();
                        window.location.href = "dashboard.html";
                    }
                }
            }, true);

            if (autoSaveId) {
                await loadResumeData(autoSaveId);
            }
        }
    });

    async function loadResumeData(id) {
        statusText.innerText = "Loading data...";
        statusIcon.className = "fas fa-sync fa-spin";

        try {
            const { getResume } = await import("./resume-service.js");
            const resume = await getResume(id);
            if (resume && resume.content) {
                const c = resume.content;

                // Personal Info
                if (c.personal) {
                    const mappings = {
                        'in-name': c.personal.name,
                        'in-title': c.personal.role,
                        'in-role': c.personal.role,
                        'in-email': c.personal.email,
                        'in-phone': c.personal.phone,
                        'in-web': c.personal.website,
                        'in-address': c.personal.address,
                        'in-about': c.personal.about
                    };
                    for (const [id, value] of Object.entries(mappings)) {
                        const el = document.getElementById(id);
                        if (el && value) el.value = value;
                    }
                }

                // Dynamic Sections
                if (c.experience && Array.isArray(c.experience)) {
                    for (const exp of c.experience) {
                        if (typeof window.addExperienceField === 'function') {
                            window.addExperienceField();
                            const inputs = document.querySelectorAll('#experience-form-container input');
                            inputs[inputs.length - 1].value = exp;
                        }
                    }
                }

                if (c.education && Array.isArray(c.education)) {
                    for (const edu of c.education) {
                        if (typeof window.addEducationField === 'function') {
                            window.addEducationField();
                            const containers = document.querySelectorAll('#education-form-container > div');
                            const last = containers[containers.length - 1];
                            const lastId = last.id.split('-').pop();

                            const univ = document.getElementById(`in-edu-${lastId}-univ`);
                            const prog = document.getElementById(`in-edu-${lastId}-prog`);
                            const start = document.getElementById(`in-edu-${lastId}-start`);
                            const end = document.getElementById(`in-edu-${lastId}-end`);

                            if (univ) univ.value = edu.univ || "";
                            if (prog) prog.value = edu.prog || "";
                            if (start) start.value = edu.start || "";
                            if (end) end.value = edu.end || "";
                        }
                    }
                }

                if (c.skills && Array.isArray(c.skills)) {
                    for (const skill of c.skills) {
                        if (typeof window.addSkillField === 'function') {
                            window.addSkillField();
                            const inputs = document.querySelectorAll('#skills-form-container input');
                            inputs[inputs.length - 1].value = skill;
                        }
                    }
                }

                if (c.awards && Array.isArray(c.awards)) {
                    for (const award of c.awards) {
                        if (typeof window.addAwardField === 'function') {
                            window.addAwardField();
                            const inputs = document.querySelectorAll('#awards-form-container input');
                            inputs[inputs.length - 1].value = award;
                        }
                    }
                }

                // Trigger preview update
                if (typeof window.updatePreview === 'function') {
                    window.updatePreview();
                }

                statusText.innerText = "All changes saved";
                statusIcon.className = "fas fa-check-circle";
                statusIcon.style.color = "#0D9488";
            }
        } catch (error) {
            console.error("Error loading resume data:", error);
            statusText.innerText = "Load failed";
        }
    }

    document.body.addEventListener('input', (e) => {
        if (auth.currentUser && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
            triggerAutoSave();
        }
    });

    let snapshotTimer = null;

    function triggerAutoSave() {
        statusText.innerText = "Saving...";
        statusIcon.className = "fas fa-sync fa-spin";
        statusIcon.style.color = "#4F46E5";

        clearTimeout(autoSaveTimer);

        autoSaveTimer = setTimeout(async () => {
            try {
                const resumeData = captureResumeData();
                const id = await saveResume(resumeData, autoSaveId);

                if (!autoSaveId && id) {
                    autoSaveId = id;
                    const newUrl = window.location.pathname + '?id=' + id;
                    window.history.replaceState({ path: newUrl }, '', newUrl);
                }

                statusText.innerText = "Changes saved";
                statusIcon.className = "fas fa-check-circle";
                statusIcon.style.color = "#0D9488";

                // Schedule snapshot separately - much longer delay and less frequent
                triggerSnapshot();

            } catch (error) {
                console.error("Auto-save error:", error);
                statusText.innerText = "Sync failed";
                statusIcon.className = "fas fa-exclamation-circle";
                statusIcon.style.color = "#ef4444";
            }
        }, 2000);
    }

    function captureResumeData() {
        const nameIn = document.getElementById('in-name');
        const titleIn = document.getElementById('in-title') || document.getElementById('in-role');
        const mailIn = document.getElementById('in-email');
        const phoneIn = document.getElementById('in-phone');
        const webIn = document.getElementById('in-web');
        const addrIn = document.getElementById('in-address');
        const aboutIn = document.getElementById('in-about');

        const experience = Array.from(document.querySelectorAll('#experience-form-container input')).map(i => i.value).filter(v => v);
        const skills = Array.from(document.querySelectorAll('#skills-form-container input')).map(i => i.value).filter(v => v);
        const awards = Array.from(document.querySelectorAll('#awards-form-container input')).map(i => i.value).filter(v => v);

        const education = [];
        const eduContainers = document.querySelectorAll('#education-form-container > div');
        eduContainers.forEach(div => {
            const idParts = div.id.split('-');
            const id = idParts[idParts.length - 1];
            const univ = document.getElementById(`in-edu-${id}-univ`)?.value || "";
            const prog = document.getElementById(`in-edu-${id}-prog`)?.value || "";
            const start = document.getElementById(`in-edu-${id}-start`)?.value || "";
            const end = document.getElementById(`in-edu-${id}-end`)?.value || "";
            if (univ || prog) education.push({ univ, prog, start, end });
        });

        return {
            title: nameIn?.value || "Untitled Resume",
            template: templateName,
            content: {
                personal: {
                    name: nameIn?.value || "",
                    role: titleIn?.value || "",
                    email: mailIn?.value || "",
                    phone: phoneIn?.value || "",
                    website: webIn?.value || "",
                    address: addrIn?.value || "",
                    about: aboutIn?.value || ""
                },
                experience, education, skills, awards
            }
        };
    }

    function triggerSnapshot() {
        if (typeof html2canvas === 'undefined') return;

        clearTimeout(snapshotTimer);
        // Take snapshot ONLY when user is idle for 8 seconds
        snapshotTimer = setTimeout(() => {
            if (window.requestIdleCallback) {
                window.requestIdleCallback(generateSnapshot);
            } else {
                generateSnapshot();
            }
        }, 8000);
    }

    async function generateSnapshot() {
        try {
            const previewEl = document.getElementById('resume-preview');
            if (previewEl && autoSaveId) {
                previewEl.classList.add('is-snapshotting');
                const canvas = await html2canvas(previewEl, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });
                const snapshot = canvas.toDataURL('image/jpeg', 0.8);
                previewEl.classList.remove('is-snapshotting');

                // Silent update of snapshot only
                const { db } = await import("./firebase-config.js");
                const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                await updateDoc(doc(db, "resumes", autoSaveId), { snapshot: snapshot });
                console.log("Dashboard thumbnail updated");
            }
        } catch (err) {
            console.error("Snapshot failed:", err);
        }
    }
}
