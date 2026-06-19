/**
 * Density ATS Scoring Engine (Internal API)
 * 
 * This module provides high-performance, client-side resume analysis.
 * It evaluates text based on recruiter-approved metrics, keyword density, 
 * and formatting signals.
 * 
 * Usage:
 * import { analyzeResume } from './ats-engine.js';
 * const results = analyzeResume(text);
 */

export function analyzeResume(text) {
    const cleanText = text.toLowerCase();
    let score = 0;
    
    // 1. Structural Signals
    const signals = {
        contact: /[\w\.-]+@[\w\.-]+\.\w+/.test(cleanText) && /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(cleanText),
        linkedin: /linkedin\.com/.test(cleanText),
        github: /github\.com/.test(cleanText),
        exp: /experience|employment|work history|professional background/.test(cleanText),
        edu: /education|university|college|degree|academic/.test(cleanText),
        skills: /skills|technologies|proficiencies|expertise/.test(cleanText),
        projects: /projects|portfolio|achievements/.test(cleanText),
        bullets: (text.match(/•|●|■|▪|◦|\-/g) || []).length,
        powerWords: (text.match(/spearheaded|developed|engineered|led|managed|optimized|implemented|architected|streamlined|pioneered/gi) || []).length,
        metrics: (text.match(/\d+%|\$\d+|\d+\s+percent|increased by|reduced by/gi) || []).length,
        wordCount: text.split(/\s+/).length
    };

    // 2. Scoring Algorithm (Total: 100)
    
    // Contact & Social (Max 20)
    if (signals.contact) score += 15;
    if (signals.linkedin || signals.github) score += 5;

    // Critical Sections (Max 40)
    if (signals.exp) score += 20;
    if (signals.edu) score += 10;
    if (signals.skills) score += 10;

    // Content Quality (Max 30)
    // Quantifiable Metrics (The "Recruiter Gold")
    if (signals.metrics >= 3) score += 15;
    else if (signals.metrics >= 1) score += 7;

    // Action Verbs
    if (signals.powerWords >= 5) score += 15;
    else if (signals.powerWords >= 2) score += 7;

    // Formatting & Length (Max 10)
    if (signals.bullets >= 10) score += 5;
    if (signals.wordCount >= 400 && signals.wordCount <= 1200) score += 5;

    // 3. Generate Feedback/Tips
    const tips = [];
    if (!signals.linkedin) tips.push({ title: "Missing LinkedIn", text: "Profiles with LinkedIn links get 40% more recruiter engagement." });
    if (signals.metrics < 3) tips.push({ title: "Low Impact Metrics", text: "Quantify your achievements with numbers (e.g., 'Increased revenue by 20%')." });
    if (signals.powerWords < 5) tips.push({ title: "Weak Action Verbs", text: "Use stronger verbs like 'Spearheaded' or 'Architected' to show leadership." });
    if (signals.bullets < 8) tips.push({ title: "Dense Text Blocks", text: "Break up paragraphs into bullets to improve 'skimmability' for busy recruiters." });
    if (!signals.skills) tips.push({ title: "Missing Skills Section", text: "Ensure you have a dedicated section for technical skills to help ATS scanners." });

    return {
        score: Math.min(score, 100),
        signals,
        tips,
        rating: getRating(score)
    };
}

function getRating(score) {
    if (score >= 85) return { label: "Excellent", color: "#10b981" };
    if (score >= 70) return { label: "Very Good", color: "#3b82f6" };
    if (score >= 50) return { label: "Fair", color: "#f59e0b" };
    return { label: "Needs Work", color: "#ef4444" };
}
