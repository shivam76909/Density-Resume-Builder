/**
 * Live Preview Engine for Templates
 * Supports all 12 templates: cream, dark, modern, minimalist, monochrome, peach, teal, textual, 9, 10, 11, 12
 * Modern Beige and Creative Peach are loaded as locked background templates with direct editable text overlay.
 */
(function () {
  'use strict';

  // ── 0. Only run for supported templates ──
  const urlParams = new URLSearchParams(window.location.search);
  let templateId = urlParams.get('template');

  const validTemplates = ['cream', 'dark', 'modern', 'minimalist', 'monochrome', 'peach', 'teal', 'textual', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

  if (templateId && validTemplates.includes(templateId)) {
    localStorage.setItem('selectedTemplate', templateId);
  } else {
    templateId = localStorage.getItem('selectedTemplate') || 'cream';
  }

  // Ensure templateId is valid
  if (!validTemplates.includes(templateId)) {
    templateId = 'cream';
  }

  // ── 1. Inject Google Fonts ──
  if (!document.getElementById('lp-fonts')) {
    const link = document.createElement('link');
    link.id = 'lp-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@300;400;500&family=Merriweather:wght@300;400;700&family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }

  // ── 2. Inject scoped CSS ──
  if (!document.getElementById('lp-styles')) {
    const s = document.createElement('style');
    s.id = 'lp-styles';
    s.textContent = `
      /* --- SHARED CSS --- */
      #lp-root {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--main-bg, #ffffff);
      }
      #lp-root * {
        box-sizing: border-box;
      }
      
      /* --- DYNAMIC THEME VARIABLES --- */
      .theme-cream {
        --primary-color: #000000;
        --secondary-color: #334155;
        --accent-bg: #dedcb7;
        --header-bg: #edf3f6;
        --font-family: 'Merriweather', Georgia, serif;
        --header-font: 'DM Serif Display', serif;
      }
      .theme-dark {
        --primary-color: #1b263b;
        --secondary-color: #2563eb;
        --sidebar-bg: #1b263b;
        --sidebar-text: #ffffff;
        --sidebar-muted: #cbd5e1;
        --main-bg: #ffffff;
        --font-family: 'Inter', sans-serif;
        --header-font: 'Outfit', sans-serif;
      }
      .theme-modern {
        --font-family: 'Outfit', sans-serif;
        --header-font: 'Outfit', sans-serif;
      }
      .theme-peach {
        --font-family: 'Outfit', sans-serif;
        --header-font: 'Outfit', sans-serif;
      }
      .theme-minimalist {
        --primary-color: #0f172a;
        --secondary-color: #475569;
        --border-style: 1px solid #cbd5e1;
        --font-family: 'Inter', sans-serif;
        --header-font: 'Inter', sans-serif;
      }
      .theme-monochrome {
        --primary-color: #000000;
        --secondary-color: #000000;
        --border-style: 2px solid #000000;
        --font-family: 'Inter', sans-serif;
        --header-font: 'Inter', sans-serif;
      }
      .theme-teal {
        --primary-color: #0d5c56;
        --secondary-color: #0d5c56;
        --sidebar-bg: #0d5c56;
        --sidebar-text: #ffffff;
        --sidebar-muted: #cbd5e1;
        --main-bg: #ffffff;
        --font-family: 'Inter', sans-serif;
        --header-font: 'Outfit', sans-serif;
      }
      .theme-textual {
        --primary-color: #1e293b;
        --secondary-color: #0f172a;
        --border-style: 1.5px solid #1e293b;
        --font-family: 'Merriweather', Georgia, serif;
        --header-font: 'DM Serif Display', serif;
      }
      .theme-9 {
        --primary-color: #1e3a8a;
        --secondary-color: #3b82f6;
        --border-style: 1px solid #cbd5e1;
        --font-family: 'Inter', sans-serif;
        --header-font: 'Inter', sans-serif;
      }
      .theme-10 {
        --primary-color: #0f172a;
        --secondary-color: #334155;
        --border-style: 1px solid #334155;
        --font-family: 'Inter', monospace;
        --header-font: 'Inter', sans-serif;
      }
      .theme-11 {
        --primary-color: #0f172a;
        --secondary-color: #b45309;
        --border-style: 1.5px solid #f59e0b;
        --font-family: 'Outfit', sans-serif;
        --header-font: 'Outfit', sans-serif;
      }
      .theme-12 {
        --primary-color: #ca6702;
        --secondary-color: #ca6702;
        --sidebar-bg: #ca6702;
        --sidebar-text: #ffffff;
        --sidebar-muted: #cbd5e1;
        --main-bg: #faf6f0;
        --font-family: 'Outfit', sans-serif;
        --header-font: 'Outfit', sans-serif;
      }

      /* --- LAYOUT 1: CREAM STYLE CSS --- */
      .lp-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: var(--font-family);
        background: var(--main-bg, #ffffff);
      }
      .lp-header {
        height: 18%;
        background: var(--header-bg);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        text-align: center;
        border-top: 1.5px solid var(--primary-color);
        border-bottom: 1.5px solid var(--primary-color);
        width: 100%;
      }
      .lp-name {
        font-family: var(--header-font);
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 0 2px 0;
        letter-spacing: -0.01em;
        line-height: 1.1;
      }
      .lp-prof {
        font-family: var(--font-family);
        font-size: 7.5px;
        font-weight: 700;
        color: var(--secondary-color);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 0;
      }
      .lp-body {
        display: flex;
        height: 82%;
        width: 100%;
        overflow: hidden;
      }
      .lp-left-col {
        width: 30%;
        background: var(--accent-bg) !important;
        padding: 12px 10px;
        border-right: 1.5px solid var(--primary-color);
        display: flex;
        flex-direction: column;
        gap: 12px;
        height: 100%;
        overflow: hidden;
      }
      .lp-right-col {
        width: 70%;
        background: var(--main-bg, #ffffff);
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .lp-right-col::-webkit-scrollbar {
        display: none;
      }
      .lp-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .lp-sec-title {
        font-family: var(--header-font);
        font-size: 9px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 0 2px 0;
        text-transform: none;
        border: none;
        padding: 0;
      }
      .lp-contact-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 5.5px;
        color: #1a1a1a;
        line-height: 1.3;
        word-break: break-all;
      }
      .lp-icon {
        width: 8px;
        height: 8px;
        color: var(--primary-color);
        flex-shrink: 0;
      }
      .lp-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .lp-edu-item {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .lp-edu-years {
        font-size: 5px;
        font-weight: 700;
        color: var(--primary-color);
      }
      .lp-edu-school {
        font-size: 5.5px;
        font-weight: 700;
        color: var(--primary-color);
        text-transform: uppercase;
      }
      .lp-edu-degree {
        font-size: 5px;
        color: #222222;
      }
      .lp-skills-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .lp-skill-item {
        font-size: 5.5px;
        color: #1a1a1a;
        line-height: 1.2;
      }
      .lp-right-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .lp-rsec-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }
      .lp-rsec-title {
        font-family: var(--header-font);
        font-size: 9.5px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0;
        white-space: nowrap;
      }
      .lp-rsec-line {
        flex: 1;
        height: 1.2px;
        background: var(--primary-color);
      }
      .lp-summary {
        font-size: 6px;
        color: #1a1a1a;
        line-height: 1.4;
        margin: 0;
        text-align: justify;
        white-space: pre-wrap;
      }
      .lp-exp-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .lp-exp-item {
        display: flex;
        flex-direction: column;
        gap: 0px;
      }
      .lp-exp-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        line-height: 1.1;
      }
      .lp-exp-role {
        font-size: 6.5px;
        font-weight: 700;
        color: var(--primary-color);
        line-height: 1.1;
      }
      .lp-exp-date {
        font-size: 5px;
        color: #444444;
        line-height: 1.1;
      }
      .lp-exp-company {
        font-size: 5.8px;
        font-weight: 500;
        color: #222222;
        line-height: 1.1;
        margin-top: 0.5px;
      }
      .lp-exp-bullets {
        list-style-type: disc;
        padding-left: 10px;
        margin: 2px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 2.5px;
      }
      .lp-exp-bullet {
        font-size: 5.5px;
        color: #222222;
        line-height: 1.3;
      }
      .lp-ref-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .lp-ref-item {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .lp-ref-name {
        font-size: 6px;
        font-weight: 700;
        color: var(--primary-color);
      }
      .lp-ref-title {
        font-size: 5.5px;
        color: #444444;
      }
      .lp-ref-contact {
        font-size: 5px;
        color: #222222;
      }

      /* --- LAYOUT 2: EXECUTIVE SIDEBAR CSS --- */
      .ed-container {
        display: flex;
        width: 100%;
        height: 100%;
        font-family: var(--font-family);
        background: var(--main-bg, #ffffff);
        overflow: hidden;
      }
      .ed-sidebar {
        width: 32%;
        background-color: var(--sidebar-bg) !important;
        background: var(--sidebar-bg) !important;
        color: var(--sidebar-text);
        padding: 16px 12px;
        display: flex;
        flex-direction: column;
        gap: 11px;
        height: 100%;
        overflow: hidden;
      }
      .ed-main {
        width: 68%;
        background: var(--main-bg, #ffffff);
        padding: 27px 12px 12px 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .ed-main::-webkit-scrollbar { display: none; }
      
      .ed-avatar-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 2px;
      }
      .ed-avatar {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        border: 1.5px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        overflow: hidden;
      }
      .ed-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.35) translate(2px, -0.3px);
        transition: transform 0.2s ease;
      }
      .ed-avatar-img.custom-photo {
        transform: none !important;
      }
      .ed-header {
        border-bottom: 0.8px solid var(--primary-color);
        padding-bottom: 5px;
        margin-bottom: 6px;
      }
      .ed-name {
        font-size: 19px;
        font-weight: 500;
        color: var(--primary-color);
        margin: 0;
        line-height: 1.1;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-family: var(--header-font);
      }
      .ed-prof {
        font-size: 8.6px;
        font-weight: 500;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin: 3px 0 0 0;
      }
      .ed-sec-title {
        font-size: 8px;
        font-weight: 700;
        color: var(--sidebar-text);
        margin: 0 0 4px 0;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .ed-main-sec-title-profile {
        font-size: 8px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 0 3px 0;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .ed-main-sec-title {
        font-size: 8px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 0 3px 0;
        letter-spacing: 0.02em;
      }
      .ed-contact-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 7.6px;
        color: var(--sidebar-text);
        line-height: 1.3;
        word-break: break-all;
      }
      .ed-icon {
        width: 8px;
        height: 8px;
        color: var(--sidebar-text);
        flex-shrink: 0;
      }
      .ed-edu-item {
        display: flex;
        flex-direction: column;
        gap: 1.5px;
      }
      .ed-edu-degree {
        font-size: 6.8px;
        font-weight: 400;
        color: var(--sidebar-text);
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .ed-edu-school {
        font-size: 6.4px;
        color: var(--sidebar-text);
      }
      .ed-edu-years {
        font-size: 6.0px;
        color: var(--sidebar-muted, #cbd5e1);
      }
      .ed-skills-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .ed-skill-item {
        font-size: 6.4px;
        color: var(--sidebar-text);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .ed-skill-item::before {
        content: '';
        width: 2px;
        height: 2px;
        background: var(--sidebar-text);
        border-radius: 50%;
        flex-shrink: 0;
      }
      .ed-summary {
        font-size: 7.6px;
        color: #222222;
        line-height: 1.4;
        text-align: justify;
        margin: 0;
        white-space: pre-wrap;
      }
      .ed-exp-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .ed-exp-item {
        display: flex;
        flex-direction: column;
        gap: 0px;
      }
      .ed-exp-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        line-height: 1.1;
      }
      .ed-exp-role {
        font-size: 8.2px;
        font-weight: 700;
        color: var(--primary-color);
        line-height: 1.1;
      }
      .ed-exp-date {
        font-size: 7.2px;
        color: #222222;
        font-weight: 500;
        line-height: 1.1;
      }
      .ed-exp-company {
        font-size: 7.6px;
        font-weight: 500;
        color: #222222;
        line-height: 1.1;
        margin-top: 0.5px;
      }
      .ed-exp-bullets {
        list-style-type: disc;
        padding-left: 10px;
        margin: 2px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .ed-exp-bullet {
        font-size: 7.6px;
        color: #222222;
        line-height: 1.3;
      }
      .ed-ref-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .ed-ref-item {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .ed-ref-name {
        font-size: 7.8px;
        font-weight: 700;
        color: var(--primary-color);
      }
      .ed-ref-title {
        font-size: 7.4px;
        color: #222222;
      }
      .ed-ref-contact {
        font-size: 7px;
        color: #222222;
      }

      /* --- LAYOUT 3: SINGLE COLUMN STYLE CSS --- */
      .sc-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: var(--main-bg, #ffffff);
        font-family: var(--font-family);
        padding: 24px 28px;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .sc-container::-webkit-scrollbar { display: none; }
      
      .sc-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 12px;
      }
      .sc-name {
        font-family: var(--header-font);
        font-size: 20px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 0 2px 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .sc-prof {
        font-size: 9px;
        font-weight: 600;
        color: var(--secondary-color);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 0 0 6px 0;
      }
      .sc-contacts {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        font-size: 6.5px;
        color: #475569;
        margin-top: 2px;
      }
      .sc-contact-item {
        display: inline-flex;
        align-items: center;
        gap: 3px;
      }
      .sc-contact-item:not(:last-child)::after {
        content: '•';
        margin-left: 8px;
        color: #94a3b8;
      }
      .sc-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sc-section {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .sc-sec-title {
        font-family: var(--header-font);
        font-size: 9.5px;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0 0 3px 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: var(--border-style, 1px solid #cbd5e1);
        padding-bottom: 2px;
      }
      .sc-summary {
        font-size: 7.2px;
        color: #1e293b;
        line-height: 1.4;
        margin: 0;
        text-align: justify;
        white-space: pre-wrap;
      }
      .sc-exp-list, .sc-edu-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .sc-exp-item, .sc-edu-item {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .sc-exp-header, .sc-edu-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      .sc-exp-role, .sc-edu-degree {
        font-size: 8.2px;
        font-weight: 700;
        color: var(--primary-color);
      }
      .sc-exp-date, .sc-edu-years {
        font-size: 6.8px;
        color: #475569;
        font-weight: 500;
      }
      .sc-exp-company, .sc-edu-school {
        font-size: 7.4px;
        font-weight: 600;
        color: #334155;
      }
      .sc-exp-bullets {
        list-style-type: disc;
        padding-left: 12px;
        margin: 2px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .sc-exp-bullet {
        font-size: 7.2px;
        color: #334155;
        line-height: 1.35;
      }
      .sc-skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .sc-skill-pill {
        font-size: 6.8px;
        color: #1e293b;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 500;
        border: 0.5px solid #cbd5e1;
      }
      .sc-ref-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .sc-ref-item {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .sc-ref-name {
        font-size: 7.8px;
        font-weight: 700;
        color: var(--primary-color);
      }
      .sc-ref-title {
        font-size: 7px;
        color: #475569;
      }
      .sc-ref-contact {
        font-size: 6.5px;
        color: #64748b;
      }

      /* --- SPECIFIC STYLE SELECTOR OVERRIDES --- */
      /* Corporate Modern Header Overrides */
      .theme-9 .sc-header {
        background: #1e3a8a;
        width: calc(100% + 56px);
        margin-left: -28px;
        margin-top: -24px;
        padding: 16px 28px;
        box-sizing: border-box;
        color: #ffffff;
      }
      .theme-9 .sc-name {
        color: #ffffff;
      }
      .theme-9 .sc-prof {
        color: #93c5fd;
      }
      .theme-9 .sc-contact-item {
        color: #cbd5e1;
      }
      .theme-9 .sc-contact-item:not(:last-child)::after {
        color: #64748b;
      }
      .theme-9 .sc-sec-title {
        border-left: 3px solid #1e3a8a;
        padding-left: 6px;
      }
      
      /* Elite Technical overrides */
      .theme-10 .sc-prof, .theme-10 .sc-contact-item, .theme-10 .sc-exp-date, .theme-10 .sc-edu-years, .theme-10 .sc-skill-pill {
        font-family: monospace;
      }
      
      /* Monochrome Pill Overrides */
      .theme-monochrome .sc-skill-pill {
        background: #ffffff;
        border: 1px solid #000000;
        border-radius: 0;
        color: #000000;
      }

      /* Modern Textual Left Alignment overrides */
      .theme-textual .sc-header {
        align-items: flex-start;
        text-align: left;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 8px;
      }
      .theme-textual .sc-contacts {
        justify-content: flex-start;
        gap: 12px;
      }

      /* --- MODERN BEIGE EDITABLE OVERLAY CSS --- */
      .theme-modern .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/mordern_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .modern-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .modern-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .modern-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .modern-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #a3a3a3;
        font-style: italic;
      }

      /* --- CREATIVE PEACH EDITABLE OVERLAY CSS --- */
      .theme-peach .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/creative_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .peach-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .peach-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .peach-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .peach-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #a3a3a3;
        font-style: italic;
      }

      /* --- CORPORATE MODERN (TEMPLATE 9) EDITABLE OVERLAY CSS --- */
      .theme-9 .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/corporate_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .corporate-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .corporate-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .corporate-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .corporate-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #a3a3a3;
        font-style: italic;
      }

      /* --- ARTISTIC OCHRE (TEMPLATE 12) EDITABLE OVERLAY CSS --- */
      .theme-12 .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/artistic_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .artistic-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .artistic-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .artistic-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .artistic-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #b5a68e;
        font-style: italic;
      }

      /* --- ELITE TECHNICAL (TEMPLATE 10) EDITABLE OVERLAY CSS --- */
      .theme-10 .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/elite_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .elite-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .elite-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .elite-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .elite-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #a0a8b4;
        font-style: italic;
      }

      /* --- MONOCHROME CLEAN EDITABLE OVERLAY CSS --- */
      .theme-monochrome .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/monochrome_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .mono-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .mono-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .mono-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .mono-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #aaa;
        font-style: italic;
      }
      
      .modern-contact-item svg {
        flex-shrink: 0;
      }

      /* --- CONTEMPORARY CREAM EDITABLE OVERLAY CSS --- */
      .theme-cream .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url('img/cream_preview.png') !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        overflow: hidden !important;
        border: none !important;
        clip-path: none !important;
      }
      .cream-editable {
        border: 1px dashed transparent !important;
        border-radius: 2px !important;
        padding: 1px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 25px;
        min-height: 8px;
        display: inline-block;
      }
      .cream-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .cream-editable:focus {
        border-color: transparent !important;
        background: transparent !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .cream-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #a3a3a3;
        font-style: italic;
      }

      /* --- MINIMALIST CLASSIC EDITABLE OVERLAY CSS --- */
      .theme-minimalist .lp-container {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: #ffffff !important;
        overflow-y: auto !important;
        border: none !important;
        clip-path: none !important;
      }
      .mini-editable {
        border: 1px solid transparent !important;
        border-radius: 2px !important;
        padding: 0px 2px !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease !important;
        min-width: 20px;
        min-height: 7px;
        display: inline-block;
      }
      .mini-editable:hover {
        border-color: transparent !important;
        background: transparent !important;
        cursor: text !important;
      }
      .mini-editable:focus {
        border-color: transparent !important;
        background: rgba(0, 0, 0, 0.02) !important;
        outline: none !important;
        box-shadow: none !important;
      }
      .mini-editable[placeholder]:empty:before {
        content: attr(placeholder);
        color: #a3a3a3;
        font-style: italic;
      }
    `;
    document.head.appendChild(s);
  }

  // ── 3. Build DOM inside .preview-card ──
  const card = document.querySelector('.preview-card');
  if (!card) return;

  let root = document.getElementById('lp-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'lp-root';
    card.appendChild(root);
  }

  // Hide the static image
  const img = document.getElementById('template-preview-image');
  if (img) img.style.display = 'none';

  function getLayoutType(id) {
    if (id === 'modern') return 'modern';
    if (id === 'peach') return 'peach';
    if (id === '9') return 'corporate';
    if (id === '10') return 'elite';
    if (id === '12') return 'artistic';
    if (id === 'monochrome') return 'mono';
    if (id === 'cream') return 'cream';
    if (id === 'minimalist') return 'minimalist';
    if (id === 'dark' || id === 'teal' || id === '14' || id === '16') return 'sidebar';
    return 'single'; // textual, 11, 13, 15, 17, 18
  }

  function getCreamHtml() {
    return `
      <div class="lp-container">
        <!-- Top Header: Name & Profession (centered in light blue header band) -->
        <div style="position: absolute; top: 5.5%; left: 5%; width: 90%; height: 11%; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 id="cream-name" class="cream-editable" contenteditable="true" placeholder="First Last Name" style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 19px; font-weight: 500; color: #1a1a1a; margin: 0 0 2px 0; outline: none; border: 1px dashed transparent; width: 100%; letter-spacing: -0.01em; line-height: 1.1;">First Last Name</h1>
          <div id="cream-prof" class="cream-editable" contenteditable="true" placeholder="Software Engineer" style="font-family: 'Merriweather', Georgia, serif; font-size: 7.5px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; outline: none; border: 1px dashed transparent; width: 100%;">Software Engineer</div>
        </div>

        <!-- Left Column: Contact, Education, Skills -->
        <div style="position: absolute; top: 23%; left: 3%; width: 26.5%; display: flex; flex-direction: column; gap: 18px;">
          <!-- Contact Section -->
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <h2 id="cream-contact-sec-title" style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 9px; font-weight: 600; color: #1a1a1a; margin: 0;">Contact</h2>
            <div style="display: flex; flex-direction: column; gap: 1px;">
              <div id="cream-phone" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
                <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span id="cream-phone-text" class="cream-editable" contenteditable="true" placeholder="+91 9301306891" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
              </div>
              <div id="cream-email" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
                <svg style="width: 8px; height: 8px; color: #000; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span id="cream-email-text" class="cream-editable" contenteditable="true" placeholder="shivam@example.com" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%;"></span>
              </div>
              <div id="cream-location" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
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
          </div>

          <!-- Education Section -->
          <div id="cream-edu-sec" style="display: flex; flex-direction: column; gap: 4px;">
            <div id="cream-edu-sec-title">
              <h2 style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 9px; font-weight: 600; color: #1a1a1a; margin: 0;">Education</h2>
            </div>
            <div id="cream-edu-list" style="display: flex; flex-direction: column; gap: 3px;">
              <!-- Dynamically populated education items -->
            </div>
          </div>

          <!-- Skills Section -->
          <div id="cream-skills-sec" style="display: flex; flex-direction: column; gap: 4px;">
            <div id="cream-skills-sec-title">
              <h2 style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 9px; font-weight: 600; color: #1a1a1a; margin: 0;">Skills</h2>
            </div>
            <div id="cream-skills-list" style="display: flex; flex-direction: column; gap: 0.5px;">
              <!-- Dynamically populated skills -->
            </div>
          </div>
        </div>

        <!-- Right Column: Profile, Work Experience, References -->
        <div style="position: absolute; top: 23%; left: 34%; width: 60%; display: flex; flex-direction: column; gap: 9px;">
          <!-- Profile Section -->
          <div id="cream-profile-sec" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
              <h2 style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 9.5px; font-weight: 600; color: #1a1a1a; margin: 0; white-space: nowrap;">Profile</h2>
              <div style="flex: 1; height: 0.9px; background: #1a1a1a;"></div>
            </div>
            <p id="cream-summary" class="cream-editable" contenteditable="true" placeholder="Enter your profile summary here..." style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #222222; line-height: 1.4; text-align: justify; margin: 0; outline: none; border: 1px dashed transparent; white-space: pre-wrap; width: 100%;"></p>
          </div>

          <!-- Work Experience Section -->
          <div id="cream-exp-sec" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
              <h2 style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 9.5px; font-weight: 600; color: #1a1a1a; margin: 0; white-space: nowrap;">Work Experience</h2>
              <div style="flex: 1; height: 0.9px; background: #1a1a1a;"></div>
            </div>
            <div id="cream-exp-list" style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
              <!-- Dynamically populated experience items -->
            </div>
          </div>

          <!-- References Section -->
          <div id="cream-ref-sec" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
              <h2 style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 9.5px; font-weight: 600; color: #1a1a1a; margin: 0; white-space: nowrap;">References</h2>
              <div style="flex: 1; height: 0.9px; background: #1a1a1a;"></div>
            </div>
            <div id="cream-ref-list" style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
              <!-- Dynamically populated references -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getMinimalistHtml() {
    return `
      <div class="lp-container mini-container" style="position: relative; width: 100%; height: 100%; box-sizing: border-box; background: #ffffff; padding: 18px 14px 14px; display: flex; flex-direction: column; gap: 12px; font-family: 'Canva Sans', sans-serif; overflow: hidden;">
        
        <!-- Header Section -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; margin-bottom: 4px;">
          <div style="display: flex; flex-direction: column; gap: 0; width: calc(100% - 84px);">
            <h1 id="mini-name" class="mini-editable" contenteditable="true" placeholder="Shivam Rajoriya" style="font-family: 'Canva Sans', sans-serif; font-size: 17px; font-weight: 700; color: #111111; margin: 0; line-height: 1; outline: none; border: none;">Shivam Rajoriya</h1>
            <div id="mini-prof" class="mini-editable" contenteditable="true" placeholder="Marketing Assistant" style="font-family: 'Canva Sans', sans-serif; font-size: 9.5px; font-weight: 500; color: #444444; outline: none; border: none; margin-top: -1.5px;">Marketing Assistant</div>
            
            <!-- Contact details -->
            <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 8px; gap: 10px;">
              <div style="display: flex; flex-direction: column; gap: 2px; width: 48%;">
                <div id="mini-email" class="mini-editable" contenteditable="true" placeholder="youremail@gmail.com" style="font-size: 6px; color: #222222; outline: none; border: none; word-break: break-all;">youremail@gmail.com</div>
                <div id="mini-location" class="mini-editable" contenteditable="true" placeholder="272020 CP Colony,near complex INDIA" style="font-size: 6px; color: #222222; outline: none; border: none; word-break: break-word;">272020 CP Colony,near complex INDIA</div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 2px; width: 48%;">
                <div id="mini-phone" class="mini-editable" contenteditable="true" placeholder="+91 XXXXXXXXXX" style="font-size: 6px; color: #222222; outline: none; border: none; word-break: break-all;">+91 XXXXXXXXXX</div>
                <div id="mini-linkedin" class="mini-editable" contenteditable="true" placeholder="linkedin profile" style="font-size: 6px; color: #222222; outline: none; border: none; word-break: break-all;"></div>
              </div>
            </div>
          </div>
          
          <!-- Profile Photo Frame -->
          <div style="width: 72px; height: 72px; border: 1.2px solid #222222; background: #cccccc; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; margin-top: -2px;">
            <img id="mini-photo" src="img/icon.png" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        </div>

        <!-- Profile Section -->
        <div id="mini-profile-sec" style="display: flex; flex-direction: column; gap: 1px; width: 100%;">
          <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 8px; font-weight: 700; color: #111111; margin: 0; text-transform: capitalize;">Profile</h2>
          <div style="height: 0.8px; background: #222222; width: 100%; margin-bottom: 2px;"></div>
          <p id="mini-summary" class="mini-editable" contenteditable="true" placeholder="Enter your profile summary here..." style="font-size: 7px; color: #333333; line-height: 1.35; margin: 0; outline: none; border: none; text-align: justify; white-space: pre-wrap; width: 100%;">To secure a dynamic role in marketing with a well-established organization where I can apply my skills and expertise to contribute to business expansion and success.</p>
        </div>

        <!-- Professional Experience Section -->
        <div id="mini-exp-sec" style="display: flex; flex-direction: column; gap: 1px; width: 100%;">
          <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 8px; font-weight: 700; color: #111111; margin: 0; text-transform: capitalize;">Professional Experience</h2>
          <div style="height: 0.8px; background: #222222; width: 100%; margin-bottom: 2px;"></div>
          <div id="mini-exp-list" style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Education Section -->
        <div id="mini-edu-sec" style="display: flex; flex-direction: column; gap: 1px; width: 100%;">
          <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 8px; font-weight: 700; color: #111111; margin: 0; text-transform: capitalize;">Education</h2>
          <div style="height: 0.8px; background: #222222; width: 100%; margin-bottom: 2px;"></div>
          <div id="mini-edu-list" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Skills Section -->
        <div id="mini-skills-sec" style="display: flex; flex-direction: column; gap: 1px; width: 100%;">
          <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 8px; font-weight: 700; color: #111111; margin: 0; text-transform: capitalize;">Skills</h2>
          <div style="height: 0.8px; background: #222222; width: 100%; margin-bottom: 2px;"></div>
          <div id="mini-skills-list" style="display: flex; flex-wrap: wrap; justify-content: space-between; row-gap: 5px; width: 100%;">
            <!-- Dynamically populated 2-column list -->
          </div>
        </div>

      </div>
    `;
  }

  function getModernHtml() {
    return `
      <div class="lp-container">
        <!-- Top Header: Name & Profession -->
        <div class="modern-field modern-name-wrap" style="position: absolute; top: 4.3%; left: 24%; width: 69.9%; height: 4.1%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 id="modern-name" class="modern-editable" contenteditable="true" placeholder="First Last Name" style="font-family: 'Canva Sans', sans-serif; font-size: 18px; font-weight: 400; color: #1a1a1a; margin: 0; outline: none; border: 1px dashed transparent; width: 100%; text-align: center; transition: border-color 0.2s; letter-spacing: -0.01em; line-height: 1.1;">First Last Name</h1>
        </div>
        <div class="modern-field modern-prof-wrap" style="position: absolute; top: 9.1%; left: 24%; width: 69.9%; height: 2%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div id="modern-prof" class="modern-editable" contenteditable="true" placeholder="Software Engineer" style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 600; color: #222222; text-transform: uppercase; letter-spacing: 0.12em; margin: 0; outline: none; border: 1px dashed transparent; width: 100%; text-align: center; transition: border-color 0.2s;">Software Engineer</div>
        </div>

        <!-- Left Column: Contact, Education, Skills -->
        <div style="position: absolute; top: 21.5%; left: 2.5%; width: 26.5%; display: flex; flex-direction: column; gap: 18px;">
          <!-- Contact Section -->
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <h2 style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Contact</h2>
            <div style="display: flex; flex-direction: column; gap: 1px;">
              <div id="modern-phone" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
                <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span id="modern-phone-text" class="modern-editable" contenteditable="true" placeholder="+91 9301306891" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;">+91 9301306891</span>
              </div>
              <div id="modern-email" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
                <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span id="modern-email-text" class="modern-editable" contenteditable="true" placeholder="shivam@example.com" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;">shivam@example.com</span>
              </div>
              <div id="modern-location" class="modern-contact-item" style="display: flex; align-items: center; gap: 4px;">
                <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span id="modern-location-text" class="modern-editable" contenteditable="true" placeholder="India" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;">India</span>
              </div>
              <div id="modern-linkedin" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
                <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span id="modern-linkedin-text" class="modern-editable" contenteditable="true" placeholder="linkedin" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;"></span>
              </div>
              <div id="modern-github" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
                <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span id="modern-github-text" class="modern-editable" contenteditable="true" placeholder="github" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;"></span>
              </div>
              <div id="modern-portfolio" class="modern-contact-item" style="display: none; align-items: center; gap: 4px;">
                <svg style="width: 7px; height: 7px; color: #1a1a1a; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span id="modern-portfolio-text" class="modern-editable" contenteditable="true" placeholder="portfolio" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #1a1a1a; outline: none; border: 1px dashed transparent; word-break: break-all; width: 100%; line-height: 1.1;"></span>
              </div>
            </div>
          </div>

          <!-- Education Section -->
          <div id="modern-edu-sec" style="display: flex; flex-direction: column; gap: 4px;">
            <div id="modern-edu-sec-title">
              <h2 style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Education</h2>
            </div>
            <div id="modern-edu-list" style="display: flex; flex-direction: column; gap: 3px;">
              <!-- Dynamically populated education items -->
            </div>
          </div>

          <!-- Skills Section -->
          <div id="modern-skills-sec" style="display: flex; flex-direction: column; gap: 4px;">
            <div id="modern-skills-sec-title">
              <h2 style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Skills</h2>
            </div>
            <div id="modern-skills-list" style="display: flex; flex-direction: column; gap: 0.5px;">
              <!-- Dynamically populated skills -->
            </div>
          </div>
        </div>

        <!-- Right Column: Profile, Work Experience, References -->
        <div style="position: absolute; top: 21.5%; left: 34%; width: 60%; display: flex; flex-direction: column; gap: 9px;">
          <!-- Profile Section -->
          <div id="modern-profile-sec" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
              <h2 style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0; white-space: nowrap;">Profile</h2>
            </div>
            <p id="modern-summary" class="modern-editable" contenteditable="true" placeholder="Enter your profile summary here..." style="font-family: 'Canva Sans', sans-serif; font-size: 6.5px; color: #222222; line-height: 1.4; text-align: justify; margin: 0; outline: none; border: 1px dashed transparent; white-space: pre-wrap; width: 100%;"></p>
          </div>

          <!-- Work Experience Section -->
          <div id="modern-exp-sec" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
              <h2 style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0; white-space: nowrap;">Professional Experience</h2>
            </div>
            <div id="modern-exp-list" style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
              <!-- Dynamically populated experience items -->
            </div>
          </div>

          <!-- References Section -->
          <div id="modern-ref-sec" style="display: flex; flex-direction: column; gap: 3px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
              <h2 style="font-family: 'Canva Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0; white-space: nowrap;">References</h2>
            </div>
            <div id="modern-ref-list" style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
              <!-- Dynamically populated references -->
            </div>
          </div>
        </div>

        <!-- Floating Avatar Container -->
        <div class="lp-avatar-container" style="position: absolute; left: 2.5%; top: 4%; z-index: 10; display: flex;">
          <div class="lp-avatar" style="width: 75px; height: 75px; border-radius: 50%; border: 1px solid #1a1a1a; background: #ffffff; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; z-index: 2;">
            <img src="img/photo_icon.png" alt="Avatar" class="lp-avatar-img" style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.05);">
          </div>
        </div>
      </div>
    `;
  }

  function getPeachHtml() {
    return `
      <div class="lp-container">
        <!-- Top Header: Name & Profession -->
        <div class="peach-field modern-name-wrap" style="position: absolute; top: 4.5%; left: 5%; width: 90%; height: 5.5%; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 id="peach-name" class="peach-editable" contenteditable="true" placeholder="Shivam Rajoriya" style="font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #4a3e3d; margin: 0; outline: none; border: 1px dashed transparent; width: 100%; transition: border-color 0.2s;">Shivam Rajoriya</h1>
        </div>
        <div class="peach-field modern-prof-wrap" style="position: absolute; top: 10.5%; left: 5%; width: 90%; height: 3.5%; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div id="peach-prof" class="peach-editable" contenteditable="true" placeholder="Lead Cloud Engineer" style="font-family: 'Outfit', sans-serif; font-size: 6.5px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: #e07a5f; margin: 0; outline: none; border: 1px dashed transparent; width: 100%; transition: border-color 0.2s;">Lead Cloud Engineer</div>
        </div>

        <!-- Left Column: Contact, Education, Skills -->
        <div style="position: absolute; top: 21.5%; left: 2.5%; width: 26.5%; display: flex; flex-direction: column; gap: 18px;">
          <!-- Contact Section -->
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <h2 style="font-family: 'Open Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Contact</h2>
            <div style="display: flex; flex-direction: column; gap: 1px;">
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
          </div>

          <!-- Education Section -->
          <div id="modern-edu-sec" style="display: flex; flex-direction: column; gap: 4px;">
            <div id="modern-edu-sec-title">
              <h2 style="font-family: 'Open Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Education</h2>
            </div>
            <div id="modern-edu-list" style="display: flex; flex-direction: column; gap: 3px;">
              <!-- Dynamically populated education items -->
            </div>
          </div>

          <!-- Skills Section -->
          <div id="modern-skills-sec" style="display: flex; flex-direction: column; gap: 4px;">
            <div id="modern-skills-sec-title">
              <h2 style="font-family: 'Open Sans', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a; margin: 0;">Skills</h2>
            </div>
            <div id="modern-skills-list" style="display: flex; flex-direction: column; gap: 0.5px;">
              <!-- Dynamically populated skills -->
            </div>
          </div>
        </div>

        </div>

        <!-- Right Column: Profile, Work Experience, References -->
        
        <!-- Profile Section -->
        <div id="peach-profile-sec" style="position: absolute; top: 17%; left: 34%; width: 60%; display: flex; flex-direction: column; gap: 3px;">
          <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #e07a5f; margin: 0; white-space: nowrap;">Profile</h2>
            <div style="flex: 1; height: 1px; background: #e07a5f;"></div>
          </div>
          <p id="peach-summary" class="peach-editable" contenteditable="true" placeholder="Enter your profile summary here..." style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #4a3e3d; line-height: 1.4; text-align: justify; margin: 0; outline: none; border: 1px dashed transparent; white-space: pre-wrap; width: 100%;"></p>
        </div>

        <!-- Work Experience Section -->
        <div id="peach-exp-sec" style="position: absolute; top: 32%; left: 34%; width: 60%; display: flex; flex-direction: column; gap: 3px;">
          <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #e07a5f; margin: 0; white-space: nowrap;">Work Experience</h2>
            <div style="flex: 1; height: 1px; background: #e07a5f;"></div>
          </div>
          <div id="peach-exp-list" style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
            <!-- Dynamically populated experience items -->
          </div>
        </div>

        <!-- References Section -->
        <div id="peach-ref-sec" style="position: absolute; top: 78%; left: 34%; width: 60%; display: flex; flex-direction: column; gap: 3px;">
          <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #e07a5f; margin: 0; white-space: nowrap;">References</h2>
            <div style="flex: 1; height: 1px; background: #e07a5f;"></div>
          </div>
          <div id="peach-ref-list" style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            <!-- Dynamically populated references -->
          </div>
        </div>

        <!-- Floating Avatar Container -->
        <div class="lp-avatar-container" style="display: none; position: absolute; left: 20px; top: calc(20% - 35px); z-index: 10;">
          <div style="position: absolute; width: 65px; height: 65px; border-radius: 50%; background-color: #e07a5f; transform: translate(6px, 6px); z-index: 1;"></div>
          <div class="lp-avatar" style="width: 65px; height: 65px; border-radius: 50%; border: 2px solid #4a3e3d; background: #ffffff; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; z-index: 2;">
            <img src="img/pic_icon.png" alt="Avatar" class="lp-avatar-img" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    `;
  }

  function getCorporateHtml() {
    return `
      <div class="lp-container">
        <!-- Top Header: Name & Profession -->
        <div class="corporate-field modern-name-wrap" style="position: absolute; top: 3.5%; left: 5%; width: 90%; height: 5.5%; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1 id="corporate-name" class="corporate-editable" contenteditable="true" placeholder="Shivam Rajoriya" style="font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #ffffff; margin: 0; outline: none; border: 1px dashed transparent; width: 100%; transition: border-color 0.2s;">Shivam Rajoriya</h1>
        </div>
        <div class="corporate-field modern-prof-wrap" style="position: absolute; top: 9.5%; left: 5%; width: 90%; height: 3.5%; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div id="corporate-prof" class="corporate-editable" contenteditable="true" placeholder="Lead Cloud Engineer" style="font-family: 'Outfit', sans-serif; font-size: 6.5px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: #a5b1c2; margin: 0; outline: none; border: 1px dashed transparent; width: 100%; transition: border-color 0.2s;">Lead Cloud Engineer</div>
        </div>

        <!-- Left Column: Contact, Education, Skills -->
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

        <!-- Right Column: Profile Summary, Experience, References -->
        <!-- Profile Summary -->
        <div id="corporate-profile-sec" style="position: absolute; top: 19.5%; left: 34%; width: 60%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #2b343e; margin: 0;">Profile</h2>
          <div style="display: flex; align-items: center; margin: 2px 0 6px 0;">
            <div style="width: 15px; height: 1.5px; background: #2b343e;"></div>
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
          </div>
          <p id="corporate-summary" class="corporate-editable" contenteditable="true" placeholder="Brief professional summary..." style="font-family: 'Outfit', sans-serif; font-size: 5.8px; color: #4a5568; margin: 0; line-height: 1.45; width: 100%; text-align: justify; word-break: break-word;">Innovative and results-driven Software Engineer with 5+ years of experience building scalable web applications. Expertise in cloud architectures, frontend design, and collaborative Agile methodologies.</p>
        </div>

        <!-- Work Experience -->
        <div id="corporate-exp-sec" style="position: absolute; top: 35.5%; left: 34%; width: 60%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #2b343e; margin: 0;">Experience</h2>
          <div style="display: flex; align-items: center; margin: 2px 0 6px 0;">
            <div style="width: 15px; height: 1.5px; background: #2b343e;"></div>
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
          </div>
          <div id="corporate-exp-list" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            <!-- Dynamically populated experience -->
          </div>
        </div>

        <!-- References -->
        <div id="corporate-ref-sec" style="position: absolute; top: 76.5%; left: 34%; width: 60%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #2b343e; margin: 0;">References</h2>
          <div style="display: flex; align-items: center; margin: 2px 0 6px 0;">
            <div style="width: 15px; height: 1.5px; background: #2b343e;"></div>
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
          </div>
          <div id="corporate-ref-list" style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            <!-- Dynamically populated references -->
          </div>
        </div>
      </div>
    `;
  }

  function getArtisticHtml() {
    return `
      <div class="lp-container">
        <!-- Name -->
        <div style="position: absolute; top: 18%; left: 38%; width: 55%;">
          <h1 id="artistic-name" class="artistic-editable" contenteditable="true" placeholder="Shivam Rajoriya" style="font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #3d3027; margin: 0; outline: none; border: 1px dashed transparent; width: 100%;">Shivam Rajoriya</h1>
        </div>
        <!-- Profession -->
        <div style="position: absolute; top: 24%; left: 38%; width: 55%;">
          <div id="artistic-prof" class="artistic-editable" contenteditable="true" placeholder="Lead Cloud Engineer" style="font-family: 'Outfit', sans-serif; font-size: 7px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: #c4956a; margin: 0; outline: none; border: 1px dashed transparent; width: 100%;">Lead Cloud Engineer</div>
        </div>

        <!-- Contact -->
        <div style="position: absolute; top: 30%; left: 38%; width: 55%; display: flex; flex-direction: column; gap: 3px;">
          <div id="artistic-email" style="display: none; font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #3d3027;">
            <span id="artistic-email-text" class="artistic-editable" contenteditable="true" placeholder="email@example.com" style="font-family: inherit; font-size: inherit; color: inherit;">email@example.com</span>
          </div>
          <div id="artistic-phone" style="display: none; font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #3d3027;">
            <span id="artistic-phone-text" class="artistic-editable" contenteditable="true" placeholder="+91 9999999999" style="font-family: inherit; font-size: inherit; color: inherit;">+91 9999999999</span>
          </div>
          <div id="artistic-location" style="display: none; font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #3d3027;">
            <span id="artistic-location-text" class="artistic-editable" contenteditable="true" placeholder="City, Country" style="font-family: inherit; font-size: inherit; color: inherit;">City, Country</span>
          </div>
          <div id="artistic-socials" style="display: flex; flex-direction: column; gap: 3px;"></div>
        </div>

        <!-- Profile Summary -->
        <div id="artistic-profile-sec" style="position: absolute; top: 42%; left: 38%; width: 55%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3d3027; margin: 0 0 4px 0;">Profile</h2>
          <p id="artistic-summary" class="artistic-editable" contenteditable="true" placeholder="Brief professional summary..." style="font-family: 'Outfit', sans-serif; font-size: 5.8px; color: #5a4a3a; margin: 0; line-height: 1.45; width: 100%; text-align: justify;">Innovative and results-driven engineer.</p>
        </div>

        <!-- Education -->
        <div id="artistic-edu-sec" style="position: absolute; top: 55%; left: 38%; width: 55%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3d3027; margin: 0 0 4px 0;">Education</h2>
          <div id="artistic-edu-list" style="display: flex; flex-direction: column; gap: 5px;"></div>
        </div>

        <!-- Experience -->
        <div id="artistic-exp-sec" style="position: absolute; top: 55%; left: 5%; width: 28%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3d3027; margin: 0 0 4px 0;">Experience</h2>
          <div id="artistic-exp-list" style="display: flex; flex-direction: column; gap: 6px;"></div>
        </div>

        <!-- Skills -->
        <div id="artistic-skills-sec-title" style="position: absolute; top: 76%; left: 38%; width: 55%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3d3027; margin: 0 0 4px 0;">Skills</h2>
        </div>
        <div id="artistic-skills-list" style="position: absolute; top: 79%; left: 38%; width: 55%; display: flex; flex-wrap: wrap; gap: 3px;"></div>

        <!-- References -->
        <div id="artistic-ref-sec" style="position: absolute; top: 86%; left: 38%; width: 55%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7.5px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3d3027; margin: 0 0 4px 0;">References</h2>
          <div id="artistic-ref-list" style="display: flex; flex-direction: column; gap: 4px;"></div>
        </div>
      </div>
    `;
  }

  function getEliteHtml() {
    return `
      <div class="lp-container">
        <!-- Name in blue header -->
        <div style="position: absolute; top: 1.5%; left: 3%; width: 45%;">
          <h1 id="elite-name" class="elite-editable" contenteditable="true" placeholder="Shivam Rajoriya" style="font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #ffffff; margin: 0; outline: none; border: 1px dashed transparent; width: 100%;">Shivam Rajoriya</h1>
        </div>
        <!-- Profession below name -->
        <div style="position: absolute; top: 5.5%; left: 3%; width: 45%;">
          <div id="elite-prof" class="elite-editable" contenteditable="true" placeholder="Lead Cloud Engineer" style="font-family: 'Outfit', sans-serif; font-size: 6.5px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: #ccd6e6; margin: 0; outline: none; border: 1px dashed transparent; width: 100%;">Lead Cloud Engineer</div>
        </div>

        <!-- Contact row -->
        <div style="position: absolute; top: 10%; left: 3%; width: 94%; display: flex; flex-wrap: wrap; gap: 6px;">
          <div id="elite-email" style="display: none; font-family: 'Outfit', sans-serif; font-size: 5px; color: #333;"><span id="elite-email-text" class="elite-editable" contenteditable="true" placeholder="email" style="font-family: inherit; font-size: inherit; color: inherit;"></span></div>
          <div id="elite-phone" style="display: none; font-family: 'Outfit', sans-serif; font-size: 5px; color: #333;"><span id="elite-phone-text" class="elite-editable" contenteditable="true" placeholder="phone" style="font-family: inherit; font-size: inherit; color: inherit;"></span></div>
          <div id="elite-location" style="display: none; font-family: 'Outfit', sans-serif; font-size: 5px; color: #333;"><span id="elite-location-text" class="elite-editable" contenteditable="true" placeholder="location" style="font-family: inherit; font-size: inherit; color: inherit;"></span></div>
          <div id="elite-socials" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
        </div>

        <!-- Profile Summary -->
        <div id="elite-profile-sec" style="position: absolute; top: 15%; left: 3%; width: 94%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a4b8c; margin: 0; border-bottom: 1.5px solid #1a4b8c; padding-bottom: 2px;">Profile</h2>
          <p id="elite-summary" class="elite-editable" contenteditable="true" placeholder="Professional summary..." style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #444; margin: 4px 0 0 0; line-height: 1.5; width: 100%; text-align: justify;"></p>
        </div>

        <!-- Experience -->
        <div id="elite-exp-sec" style="position: absolute; top: 28%; left: 3%; width: 94%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a4b8c; margin: 0; border-bottom: 1.5px solid #1a4b8c; padding-bottom: 2px;">Experience</h2>
          <div id="elite-exp-list" style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;"></div>
        </div>

        <!-- Education -->
        <div id="elite-edu-sec" style="position: absolute; top: 62%; left: 3%; width: 45%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a4b8c; margin: 0; border-bottom: 1.5px solid #1a4b8c; padding-bottom: 2px;">Education</h2>
          <div id="elite-edu-list" style="display: flex; flex-direction: column; gap: 5px; margin-top: 4px;"></div>
        </div>

        <!-- Skills -->
        <div id="elite-skills-sec-title" style="position: absolute; top: 62%; left: 52%; width: 45%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a4b8c; margin: 0; border-bottom: 1.5px solid #1a4b8c; padding-bottom: 2px;">Skills</h2>
        </div>
        <div id="elite-skills-list" style="position: absolute; top: 65.5%; left: 52%; width: 45%; display: flex; flex-wrap: wrap; gap: 3px;"></div>

        <!-- References -->
        <div id="elite-ref-sec" style="position: absolute; top: 82%; left: 3%; width: 94%; display: none;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 7px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a4b8c; margin: 0; border-bottom: 1.5px solid #1a4b8c; padding-bottom: 2px;">References</h2>
          <div id="elite-ref-list" style="display: flex; flex-direction: column; gap: 4px; margin-top: 4px;"></div>
        </div>
      </div>
    `;
  }

  function getMonoHtml() {
    return `
      <div class="lp-container">
        <!-- Name in grey header -->
        <div style="position: absolute; top: 0.5%; left: 4%; width: 92%;">
          <h1 id="mono-name" class="mono-editable" contenteditable="true" placeholder="Shivam Rajoriya" style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#fff;margin:0;outline:none;border:1px dashed transparent;width:100%;">Shivam Rajoriya</h1>
        </div>
        <div style="position: absolute; top: 4%; left: 4%; width: 92%;">
          <div id="mono-prof" class="mono-editable" contenteditable="true" placeholder="Lead Cloud Engineer" style="font-family:'Outfit',sans-serif;font-size:6.5px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:#d0d0d0;margin:0;outline:none;border:1px dashed transparent;width:100%;">Lead Cloud Engineer</div>
        </div>
        <!-- Contact row -->
        <div style="position: absolute; top: 8.5%; left: 4%; width: 92%; display:flex; flex-wrap:wrap; gap:8px;">
          <div id="mono-email" style="display:none;font-family:'Outfit',sans-serif;font-size:5px;color:#444;"><span id="mono-email-text" class="mono-editable" contenteditable="true" style="font-family:inherit;font-size:inherit;color:inherit;"></span></div>
          <div id="mono-phone" style="display:none;font-family:'Outfit',sans-serif;font-size:5px;color:#444;"><span id="mono-phone-text" class="mono-editable" contenteditable="true" style="font-family:inherit;font-size:inherit;color:inherit;"></span></div>
          <div id="mono-location" style="display:none;font-family:'Outfit',sans-serif;font-size:5px;color:#444;"><span id="mono-location-text" class="mono-editable" contenteditable="true" style="font-family:inherit;font-size:inherit;color:inherit;"></span></div>
          <div id="mono-socials" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
        </div>
        <!-- Profile -->
        <div id="mono-profile-sec" style="position:absolute;top:13%;left:4%;width:92%;display:none;">
          <h2 style="font-family:'Outfit',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#333;margin:0;border-bottom:1px solid #333;padding-bottom:2px;">Profile</h2>
          <p id="mono-summary" class="mono-editable" contenteditable="true" placeholder="Summary..." style="font-family:'Outfit',sans-serif;font-size:5.5px;color:#555;margin:4px 0 0;line-height:1.5;width:100%;text-align:justify;"></p>
        </div>
        <!-- Experience -->
        <div id="mono-exp-sec" style="position:absolute;top:26%;left:4%;width:92%;display:none;">
          <h2 style="font-family:'Outfit',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#333;margin:0;border-bottom:1px solid #333;padding-bottom:2px;">Experience</h2>
          <div id="mono-exp-list" style="display:flex;flex-direction:column;gap:6px;margin-top:4px;"></div>
        </div>
        <!-- Education -->
        <div id="mono-edu-sec" style="position:absolute;top:60%;left:4%;width:44%;display:none;">
          <h2 style="font-family:'Outfit',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#333;margin:0;border-bottom:1px solid #333;padding-bottom:2px;">Education</h2>
          <div id="mono-edu-list" style="display:flex;flex-direction:column;gap:5px;margin-top:4px;"></div>
        </div>
        <!-- Skills -->
        <div id="mono-skills-sec-title" style="position:absolute;top:60%;left:52%;width:44%;display:none;">
          <h2 style="font-family:'Outfit',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#333;margin:0;border-bottom:1px solid #333;padding-bottom:2px;">Skills</h2>
        </div>
        <div id="mono-skills-list" style="position:absolute;top:63.5%;left:52%;width:44%;display:flex;flex-wrap:wrap;gap:3px;"></div>
        <!-- References -->
        <div id="mono-ref-sec" style="position:absolute;top:80%;left:4%;width:92%;display:none;">
          <h2 style="font-family:'Outfit',sans-serif;font-size:7px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#333;margin:0;border-bottom:1px solid #333;padding-bottom:2px;">References</h2>
          <div id="mono-ref-list" style="display:flex;flex-direction:column;gap:4px;margin-top:4px;"></div>
        </div>
      </div>
    `;
  }

  function getExecutiveDarkHtml() {
    return `
      <div class="ed-container">
        <div class="ed-sidebar">
          <div class="ed-avatar-container">
            <div class="ed-avatar">
              <img src="img/pic_icon.png" alt="Avatar" class="ed-avatar-img">
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 10px;">
            <!-- Contact Section -->
            <div class="ed-section" style="margin: 0;">
              <h2 class="ed-sec-title">Contact</h2>
              <div style="display:flex; flex-direction:column; gap:1px;">
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
                <div class="ed-contact-item" id="ed-linkedin" style="display: none;">
                  <svg class="ed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <span id="ed-linkedin-text"></span>
                </div>
                <div class="ed-contact-item" id="ed-github" style="display: none;">
                  <svg class="ed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span id="ed-github-text"></span>
                </div>
                <div class="ed-contact-item" id="ed-portfolio" style="display: none;">
                  <svg class="ed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <span id="ed-portfolio-text"></span>
                </div>
              </div>
            </div>

            <!-- Education Section -->
            <div class="ed-section" style="margin: 0;">
              <h2 class="ed-sec-title">Education</h2>
              <div id="ed-edu-list" style="display:flex; flex-direction:column; gap:3px;"></div>
            </div>

            <!-- Skills Section -->
            <div class="ed-section" style="margin: 0;">
              <h2 class="ed-sec-title">Skills</h2>
              <div id="ed-skills-list" class="ed-skills-list" style="display: flex; flex-direction: column; gap: 0.5px;"></div>
            </div>
          </div>
        </div>
        <div class="ed-main">
          <div class="ed-header">
            <h1 id="ed-name" class="ed-name">First Last</h1>
            <div id="ed-prof" class="ed-prof">Profession</div>
          </div>
          <div style="margin-bottom: 2px;">
            <h2 class="ed-main-sec-title-profile">Profile</h2>
            <div id="ed-summary" class="ed-summary"></div>
          </div>
          <div>
            <h2 class="ed-main-sec-title">Work Experience</h2>
            <div id="ed-exp-list" class="ed-exp-list"></div>
          </div>
          <div style="margin-top: 4px;">
            <h2 class="ed-main-sec-title">References</h2>
            <div id="ed-ref-list" class="ed-ref-list"></div>
          </div>
        </div>
      </div>
    `;
  }

  function getSingleColumnHtml() {
    return `
      <div class="sc-container">
        <div class="sc-header">
          <h1 id="sc-name" class="sc-name">First Last Name</h1>
          <div id="sc-prof" class="sc-prof">Software Engineer</div>
          <div class="sc-contacts">
            <span id="sc-phone" class="sc-contact-item"></span>
            <span id="sc-email" class="sc-contact-item"></span>
            <span id="sc-location" class="sc-contact-item"></span>
            <span id="sc-linkedin" class="sc-contact-item" style="display: none;"></span>
            <span id="sc-github" class="sc-contact-item" style="display: none;"></span>
            <span id="sc-portfolio" class="sc-contact-item" style="display: none;"></span>
          </div>
        </div>
        <div class="sc-body">
          <div class="sc-section" id="sc-profile-sec">
            <h2 class="sc-sec-title">Professional Summary</h2>
            <p id="sc-summary" class="sc-summary"></p>
          </div>
          <div class="sc-section" id="sc-exp-sec">
            <h2 class="sc-sec-title">Work Experience</h2>
            <div id="sc-exp-list" class="sc-exp-list"></div>
          </div>
          <div class="sc-section" id="sc-edu-sec">
            <h2 class="sc-sec-title">Education</h2>
            <div id="sc-edu-list" class="sc-edu-list"></div>
          </div>
          <div class="sc-section" id="sc-skills-sec">
            <h2 class="sc-sec-title">Skills</h2>
            <div id="sc-skills-list" class="sc-skills-list"></div>
          </div>
          <div class="sc-section" id="sc-ref-sec">
            <h2 class="sc-sec-title">References</h2>
            <div id="sc-ref-list" class="sc-ref-list"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Inject structural HTML depending on layout type
  const layoutType = getLayoutType(templateId);
  root.className = `theme-${templateId}`;

  if (layoutType === 'modern' && !root.querySelector('.lp-container')) {
    root.innerHTML = getModernHtml();
  } else if (layoutType === 'peach' && !root.querySelector('.lp-container')) {
    root.innerHTML = getPeachHtml();
  } else if (layoutType === 'corporate' && !root.querySelector('.lp-container')) {
    root.innerHTML = getCorporateHtml();
  } else if (layoutType === 'artistic' && !root.querySelector('.lp-container')) {
    root.innerHTML = getArtisticHtml();
  } else if (layoutType === 'elite' && !root.querySelector('.lp-container')) {
    root.innerHTML = getEliteHtml();
  } else if (layoutType === 'mono' && !root.querySelector('.lp-container')) {
    root.innerHTML = getMonoHtml();
  } else if (layoutType === 'cream' && !root.querySelector('.lp-container')) {
    root.innerHTML = getCreamHtml();
  } else if (layoutType === 'minimalist' && !root.querySelector('.mini-container')) {
    root.innerHTML = getMinimalistHtml();
  } else if (layoutType === 'sidebar' && !root.querySelector('.ed-container')) {
    root.innerHTML = getExecutiveDarkHtml();
  } else if (layoutType === 'single' && !root.querySelector('.sc-container')) {
    root.innerHTML = getSingleColumnHtml();
  }

  // ── 4. Data helpers ──
  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value : null;
  }
  function stored() {
    try { return JSON.parse(localStorage.getItem('resumeData') || '{}'); }
    catch { return {}; }
  }

  // ── 5. Render ──
  function render() {
    const d = stored();
    const c = d.contact || {};

    const fn = val('firstName') ?? c.firstName ?? '';
    const ln = val('lastName') ?? c.lastName ?? '';
    const prof = val('profession') ?? c.profession ?? '';
    const email = val('email') ?? c.email ?? '';
    const phone = val('phone') ?? c.phone ?? '';
    const country = val('country') ?? c.country ?? '';
    const pin = val('pincode') ?? c.pincode ?? '';
    const summary = val('summary') ?? d.summary ?? '';

    let edu = [];
    const eduEntries = document.querySelectorAll('.education-entry');
    if (eduEntries.length > 0) {
      eduEntries.forEach(e => {
        const sn = e.querySelector('.school-name')?.value || '';
        const dg = e.querySelector('.degree')?.value || '';
        const sy = e.querySelector('.start-year')?.value || '';
        const ey = e.querySelector('.end-year')?.value || '';
        if (sn || dg) edu.push({ schoolName: sn, degree: dg, startYear: sy, endYear: ey });
      });
    } else {
      edu = d.education || [];
    }

    let skills = [];
    const rows = document.querySelectorAll('.skill-input-row');
    if (rows.length > 0) {
      rows.forEach(r => {
        const n = r.querySelector('input')?.value;
        if (n) skills.push(n);
      });
    } else {
      skills = (d.skills || []).map(s => s.name).filter(Boolean);
    }

    let experiences = [];
    const expEntries = document.querySelectorAll('.experience-entry');
    if (expEntries.length > 0) {
      expEntries.forEach(entry => {
        const jtVal = entry.querySelector('.job-title')?.value || '';
        const emVal = entry.querySelector('.employer')?.value || '';
        const cityVal = entry.querySelector('.city')?.value || '';
        const smVal = entry.querySelector('.start-month')?.value || '';
        const syVal = entry.querySelector('.start-year')?.value || '';
        const emmVal = entry.querySelector('.end-month')?.value || '';
        const eyVal = entry.querySelector('.end-year')?.value || '';
        const descVal = entry.querySelector('.description')?.value || '';
        const sdVal = [smVal, syVal].filter(Boolean).join(' ');
        const edVal = eyVal === 'Present' ? 'Present' : [emmVal, eyVal].filter(Boolean).join(' ');
        if (jtVal || emVal) {
          experiences.push({ jobTitle: jtVal, employer: emVal, city: cityVal, startDate: sdVal, endDate: edVal, description: descVal });
        }
      });
    } else {
      experiences = d.experiences || (d.experience ? [d.experience] : []);
    }

    let references = [];
    const refEntries = document.querySelectorAll('.reference-entry');
    if (refEntries.length > 0) {
      refEntries.forEach(entry => {
        const name = entry.querySelector('.ref-name')?.value || '';
        const title = entry.querySelector('.ref-title')?.value || '';
        const company = entry.querySelector('.ref-company')?.value || '';
        const email = entry.querySelector('.ref-email')?.value || '';
        const phone = entry.querySelector('.ref-phone')?.value || '';
        if (name) {
          references.push({ name, title, company, email, phone });
        }
      });
    } else {
      references = d.references || [];
    }

    // Dynamic additional fields
    const linkedin = val('linkedin') ?? c.linkedin ?? '';
    const github = val('github') ?? c.github ?? c.website ?? '';
    const portfolio = val('portfolio') ?? c.portfolio ?? c.drivingLicence ?? '';

    // -- Ensure correct structure is loaded on runtime --
    const activeLayout = getLayoutType(templateId);
    root.className = `theme-${templateId}`;

    if (activeLayout === 'modern' && !root.querySelector('.lp-container')) {
      root.innerHTML = getModernHtml();
    } else if (activeLayout === 'peach' && !root.querySelector('.lp-container')) {
      root.innerHTML = getPeachHtml();
    } else if (activeLayout === 'corporate' && !root.querySelector('.lp-container')) {
      root.innerHTML = getCorporateHtml();
    } else if (activeLayout === 'artistic' && !root.querySelector('.lp-container')) {
      root.innerHTML = getArtisticHtml();
    } else if (activeLayout === 'elite' && !root.querySelector('.lp-container')) {
      root.innerHTML = getEliteHtml();
    } else if (activeLayout === 'mono' && !root.querySelector('.lp-container')) {
      root.innerHTML = getMonoHtml();
    } else if (activeLayout === 'cream' && !root.querySelector('.lp-container')) {
      root.innerHTML = getCreamHtml();
    } else if (activeLayout === 'minimalist' && !root.querySelector('.mini-container')) {
      root.innerHTML = getMinimalistHtml();
    } else if (activeLayout === 'sidebar' && !root.querySelector('.ed-container')) {
      root.innerHTML = getExecutiveDarkHtml();
    } else if (activeLayout === 'single' && !root.querySelector('.sc-container')) {
      root.innerHTML = getSingleColumnHtml();
    }

    // -- Populate fields based on active layout --
    if (activeLayout === 'modern') {
      const nameEl = document.getElementById('modern-name');
      const profEl = document.getElementById('modern-prof');
      const sumEl = document.getElementById('modern-summary');

      // Only populate if not currently focused to avoid cursor reset
      if (document.activeElement !== nameEl) {
        nameEl.textContent = `${fn} ${ln}`.trim() || '';
      }
      if (document.activeElement !== profEl) {
        profEl.textContent = prof || '';
      }
      if (document.activeElement !== sumEl) {
        sumEl.textContent = summary || '';
      }

      // Profile Section visibility
      const profSec = document.getElementById('modern-profile-sec');
      if (summary) {
        if (profSec) profSec.style.display = 'flex';
      } else {
        if (profSec) profSec.style.display = 'none';
      }

      // Contact Item values
      const phoneT = document.getElementById('modern-phone-text');
      if (phoneT && document.activeElement !== phoneT) {
        phoneT.textContent = phone || '';
      }
      document.getElementById('modern-phone').style.display = (phone && phone !== '+91 ') ? 'flex' : 'none';

      const emailT = document.getElementById('modern-email-text');
      if (emailT && document.activeElement !== emailT) {
        emailT.textContent = email || '';
      }
      document.getElementById('modern-email').style.display = email ? 'flex' : 'none';

      const locT = document.getElementById('modern-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) {
        locT.textContent = locStr || '';
      }
      document.getElementById('modern-location').style.display = locStr ? 'flex' : 'none';

      const liT = document.getElementById('modern-linkedin-text');
      if (liT && document.activeElement !== liT) liT.textContent = linkedin || '';
      document.getElementById('modern-linkedin').style.display = linkedin ? 'flex' : 'none';

      const gitT = document.getElementById('modern-github-text');
      if (gitT && document.activeElement !== gitT) gitT.textContent = github || '';
      document.getElementById('modern-github').style.display = github ? 'flex' : 'none';

      const portT = document.getElementById('modern-portfolio-text');
      if (portT && document.activeElement !== portT) portT.textContent = portfolio || '';
      document.getElementById('modern-portfolio').style.display = portfolio ? 'flex' : 'none';

      // Avatar
      const avatarContainer = document.querySelector('.theme-modern .lp-avatar-container');
      const avatarImg = document.querySelector('.theme-modern .lp-avatar-img');
      if (avatarContainer && avatarImg) {
        avatarContainer.style.display = 'flex';
        avatarImg.src = d.photo || 'img/photo_icon.png';
        if (d.photo && d.photo.startsWith('data:')) {
          avatarImg.classList.add('custom-photo');
        } else {
          avatarImg.classList.remove('custom-photo');
        }
      }

      // Education
      const eduList = document.getElementById('modern-edu-list');
      const eduSec = document.getElementById('modern-edu-sec-title');
      if (eduList) {
        eduList.innerHTML = '';
        if (edu.length === 0) {
          if (eduSec) eduSec.style.display = 'none';
        } else {
          if (eduSec) eduSec.style.display = 'block';
          edu.forEach((e, idx) => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.gap = '0px';

            const yrsId = `modern-edu-${idx}-years`;
            const schoolId = `modern-edu-${idx}-school`;
            const degreeId = `modern-edu-${idx}-degree`;

            div.innerHTML = `
              <span id="${yrsId}" class="modern-editable" contenteditable="true" placeholder="Years" style="font-family: 'Canva Sans', sans-serif; font-size: 4.8px; font-weight: 600; color: #6b6359; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important;">${e.startYear || ''}${e.startYear && e.endYear ? ' - ' : ''}${e.endYear || ''}</span>
              <span id="${schoolId}" class="modern-editable" contenteditable="true" placeholder="University" style="font-family: 'Canva Sans', sans-serif; font-size: 5px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important; margin-top: -0.8px !important;">${e.schoolName || ''}</span>
              <span id="${degreeId}" class="modern-editable" contenteditable="true" placeholder="Degree" style="font-family: 'Canva Sans', sans-serif; font-size: 4.8px; color: #4a4a4a; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important; margin-top: -0.8px !important;">${e.degree || ''}</span>
            `;
            eduList.appendChild(div);
          });
        }
      }

      // Skills
      const sList = document.getElementById('modern-skills-list');
      const sSec = document.getElementById('modern-skills-sec-title');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) {
          if (sSec) sSec.style.display = 'none';
        } else {
          if (sSec) sSec.style.display = 'block';
          skills.forEach((n, idx) => {
            const container = document.createElement('div');
            container.style.cssText = "display: flex; gap: 3.5px; align-items: center; padding: 0px !important; margin: 0px !important; width: 100%;";

            container.innerHTML = `
              <span style="font-family: 'Canva Sans', sans-serif; font-size: 6.5px; font-weight: 500; color: #1a1a1a; user-select: none; line-height: 1.0 !important; margin-left: 2px;">•</span>
              <span id="modern-skill-${idx}" class="modern-editable" contenteditable="true" placeholder="Skill" style="font-family: 'Canva Sans', sans-serif; font-size: 6.5px; font-weight: 500; color: #1a1a1a; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important; display: inline-block !important; margin-top: -0.5px !important; flex: 1; outline: none; border: 1px dashed transparent;">${n}</span>
            `;
            sList.appendChild(container);
          });
        }
      }

      // Experience
      const expList = document.getElementById('modern-exp-list');
      const expSec = document.getElementById('modern-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        if (experiences.length === 0 || !experiences[0].jobTitle) {
          if (expSec) expSec.style.display = 'none';
        } else {
          if (expSec) expSec.style.display = 'flex';
          experiences.forEach((exp, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0px';

            let bulletHtml = '';
            if (exp.description) {
              const bullets = exp.description.split(/\n+/).map(b => b.trim().replace(/^[•\-\.\s]+/, '')).filter(Boolean);
              if (bullets.length > 0) {
                bulletHtml = `<div style="display: flex; flex-direction: column; gap: 1px; margin-top: 1px; width: 100%; padding-left: 6.5px;">` +
                  bullets.map((b, bIdx) => `
                    <div style="display: flex; width: 100%;">
                      <span id="modern-exp-${idx}-bullet-${bIdx}" class="modern-editable" contenteditable="true" placeholder="Bullet description" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #222222; line-height: 1.2; padding: 0px !important; margin: 0px !important; min-height: 0px !important; flex: 1; outline: none; border: 1px dashed transparent;">${b}</span>
                    </div>
                  `).join('') +
                  `</div>`;
              }
            } else {
              bulletHtml = `<div style="display: flex; flex-direction: column; gap: 1px; margin-top: 1px; width: 100%; padding-left: 6.5px;">
                <div style="display: flex; width: 100%;">
                  <span id="modern-exp-${idx}-bullet-0" class="modern-editable" contenteditable="true" placeholder="Add responsibility bullet..." style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #222222; line-height: 1.2; padding: 0px !important; margin: 0px !important; min-height: 0px !important; flex: 1; outline: none; border: 1px dashed transparent;"></span>
                </div>
              </div>`;
            }

            item.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: baseline; line-height: 1.0 !important; width: 100%; padding: 0px !important; margin: 0px !important;">
                <div style="display: flex; gap: 3px; align-items: center; padding: 0px !important; margin: 0px !important;">
                  <span style="font-family: 'Canva Sans', sans-serif; font-size: 6.5px; font-weight: 700; color: #1a1a1a; user-select: none; line-height: 1.0 !important;">•</span>
                  <span id="modern-exp-${idx}-role" class="modern-editable" contenteditable="true" placeholder="Role Title" style="font-family: 'Canva Sans', sans-serif; font-size: 6.5px; font-weight: 700; color: #1a1a1a; padding: 0px !important; margin: 0px !important; min-height: 0px !important; line-height: 1.0 !important; display: inline-block !important;">${exp.jobTitle || ''}</span>
                </div>
                <span id="modern-exp-${idx}-date" class="modern-editable" contenteditable="true" placeholder="Dates" style="font-family: 'Canva Sans', sans-serif; font-size: 4.8px; color: #4a4a4a; padding: 0px !important; margin: 0px !important; min-height: 0px !important; line-height: 1.0 !important; display: inline-block !important;">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' - ' : ''}${exp.endDate || ''}</span>
              </div>
              <span id="modern-exp-${idx}-company" class="modern-editable" contenteditable="true" placeholder="Employer Name" style="font-family: 'Canva Sans', sans-serif; font-size: 5.8px; font-weight: 600; color: #4a4a4a; margin-top: -0.8px !important; padding: 0px !important; min-height: 0px !important; padding-left: 6.5px !important; line-height: 1.0 !important; display: inline-block !important;">${exp.employer || ''}${exp.city ? ', ' + exp.city : ''}</span>
              ${bulletHtml}
            `;
            expList.appendChild(item);
          });
        }
      }

      // References
      const refList = document.getElementById('modern-ref-list');
      const refSec = document.getElementById('modern-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'flex';
          references.forEach((ref, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0px';

            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let contactInfo = [];
            if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) contactInfo.push(`Email: ${ref.email}`);

            item.innerHTML = `
              <div id="modern-ref-${idx}-name" class="modern-editable" contenteditable="true" placeholder="Reference Name" style="font-family: 'Canva Sans', sans-serif; font-size: 6px; font-weight: 700; color: #1a1a1a; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important; display: inline-block !important;">${ref.name}</div>
              <div id="modern-ref-${idx}-title" class="modern-editable" contenteditable="true" placeholder="Reference Title" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #4a4a4a; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important; display: inline-block !important; margin-top: -0.2px !important;">${titleComp}</div>
              ${contactInfo.map((c, cIdx) => `<div id="modern-ref-${idx}-contact-${cIdx}" class="modern-editable" contenteditable="true" placeholder="Contact Detail" style="font-family: 'Canva Sans', sans-serif; font-size: 5px; color: #222222; line-height: 1.0 !important; padding: 0px !important; margin: 0px !important; min-height: 0px !important; display: inline-block !important; margin-top: -0.2px !important;">${c}</div>`).join('')}
            `;
            refList.appendChild(item);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }

    } else if (activeLayout === 'peach') {
      const nameEl = document.getElementById('peach-name');
      const profEl = document.getElementById('peach-prof');
      const sumEl = document.getElementById('peach-summary');

      if (document.activeElement !== nameEl) {
        nameEl.textContent = `${fn} ${ln}`.trim() || '';
      }
      if (document.activeElement !== profEl) {
        profEl.textContent = prof || '';
      }
      if (document.activeElement !== sumEl) {
        sumEl.textContent = summary || '';
      }

      // Profile Section visibility
      const profSec = document.getElementById('peach-profile-sec');
      if (summary) {
        if (profSec) profSec.style.display = 'flex';
      } else {
        if (profSec) profSec.style.display = 'none';
      }

      // Contact Item values
      const phoneT = document.getElementById('peach-phone-text');
      if (phoneT && document.activeElement !== phoneT) {
        phoneT.textContent = phone || '';
      }
      document.getElementById('peach-phone').style.display = (phone && phone !== '+91 ') ? 'flex' : 'none';

      const emailT = document.getElementById('peach-email-text');
      if (emailT && document.activeElement !== emailT) {
        emailT.textContent = email || '';
      }
      document.getElementById('peach-email').style.display = email ? 'flex' : 'none';

      const locT = document.getElementById('peach-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) {
        locT.textContent = locStr || '';
      }
      document.getElementById('peach-location').style.display = locStr ? 'flex' : 'none';

      const liT = document.getElementById('peach-linkedin-text');
      if (liT && document.activeElement !== liT) liT.textContent = linkedin || '';
      document.getElementById('peach-linkedin').style.display = linkedin ? 'flex' : 'none';

      const gitT = document.getElementById('peach-github-text');
      if (gitT && document.activeElement !== gitT) gitT.textContent = github || '';
      document.getElementById('peach-github').style.display = github ? 'flex' : 'none';

      const portT = document.getElementById('peach-portfolio-text');
      if (portT && document.activeElement !== portT) portT.textContent = portfolio || '';
      document.getElementById('peach-portfolio').style.display = portfolio ? 'flex' : 'none';

      // Avatar
      const avatarContainer = document.querySelector('.theme-peach .lp-avatar-container');
      const avatarImg = document.querySelector('.theme-peach .lp-avatar-img');
      if (avatarContainer && avatarImg) {
        avatarContainer.style.display = 'flex';
        avatarImg.src = d.photo || 'img/pic_icon.png';
        if (d.photo && d.photo.startsWith('data:')) {
          avatarImg.classList.add('custom-photo');
        } else {
          avatarImg.classList.remove('custom-photo');
        }
      }

      // Education
      const eduList = document.getElementById('peach-edu-list');
      const eduSec = document.getElementById('peach-edu-sec-title');
      if (eduList) {
        eduList.innerHTML = '';
        if (edu.length === 0) {
          if (eduSec) eduSec.style.display = 'none';
        } else {
          if (eduSec) eduSec.style.display = 'block';
          edu.forEach((e, idx) => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.gap = '0.5px';

            const yrsId = `peach-edu-${idx}-years`;
            const schoolId = `peach-edu-${idx}-school`;
            const degreeId = `peach-edu-${idx}-degree`;

            div.innerHTML = `
              <span id="${yrsId}" class="peach-editable" contenteditable="true" placeholder="Years" style="font-family: 'Outfit', sans-serif; font-size: 4.8px; font-weight: 600; color: #e07a5f;">${e.startYear || ''}${e.startYear && e.endYear ? ' - ' : ''}${e.endYear || ''}</span>
              <span id="${schoolId}" class="peach-editable" contenteditable="true" placeholder="University" style="font-family: 'Outfit', sans-serif; font-size: 5px; font-weight: 700; color: #4a3e3d; text-transform: uppercase;">${e.schoolName || ''}</span>
              <span id="${degreeId}" class="peach-editable" contenteditable="true" placeholder="Degree" style="font-family: 'Outfit', sans-serif; font-size: 4.8px; color: #4a3e3d;">${e.degree || ''}</span>
            `;
            eduList.appendChild(div);
          });
        }
      }

      // Skills
      const sList = document.getElementById('peach-skills-list');
      const sSec = document.getElementById('peach-skills-sec-title');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) {
          if (sSec) sSec.style.display = 'none';
        } else {
          if (sSec) sSec.style.display = 'block';
          skills.forEach((n, idx) => {
            const div = document.createElement('div');
            div.id = `peach-skill-${idx}`;
            div.className = 'peach-editable';
            div.contentEditable = 'true';
            div.setAttribute('placeholder', 'Skill');
            div.style.fontFamily = "'Outfit', sans-serif";
            div.style.fontSize = '5px';
            div.style.color = '#4a3e3d';
            div.textContent = n;
            sList.appendChild(div);
          });
        }
      }

      // Experience
      const expList = document.getElementById('peach-exp-list');
      const expSec = document.getElementById('peach-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        if (experiences.length === 0 || !experiences[0].jobTitle) {
          if (expSec) expSec.style.display = 'none';
        } else {
          if (expSec) expSec.style.display = 'flex';
          experiences.forEach((exp, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0.5px';

            let bulletHtml = '';
            if (exp.description) {
              const bullets = exp.description.split(/\n+/).map(b => b.trim().replace(/^[•\-\.\s]+/, '')).filter(Boolean);
              if (bullets.length > 0) {
                bulletHtml = `<ul style="list-style-type: disc; padding-left: 10px; margin: 2px 0 0 0; display: flex; flex-direction: column; gap: 2px;">` +
                  bullets.map((b, bIdx) => `<li id="peach-exp-${idx}-bullet-${bIdx}" class="peach-editable" contenteditable="true" placeholder="Bullet description" style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #4a3e3d; line-height: 1.3;">${b}</li>`).join('') +
                  `</ul>`;
              }
            } else {
              bulletHtml = `<ul style="list-style-type: disc; padding-left: 10px; margin: 2px 0 0 0; display: flex; flex-direction: column; gap: 2px;">
                <li id="peach-exp-${idx}-bullet-0" class="peach-editable" contenteditable="true" placeholder="Add responsibility bullet..." style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #4a3e3d; line-height: 1.3;"></li>
              </ul>`;
            }

            item.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: baseline; line-height: 1.1; width: 100%;">
                <span id="peach-exp-${idx}-role" class="peach-editable" contenteditable="true" placeholder="Role Title" style="font-family: 'Outfit', sans-serif; font-size: 6.5px; font-weight: 700; color: #4a3e3d;">${exp.jobTitle || ''}</span>
                <span id="peach-exp-${idx}-date" class="peach-editable" contenteditable="true" placeholder="Dates" style="font-family: 'Outfit', sans-serif; font-size: 4.8px; color: #4a3e3d;">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' - ' : ''}${exp.endDate || ''}</span>
              </div>
              <span id="peach-exp-${idx}-company" class="peach-editable" contenteditable="true" placeholder="Employer Name" style="font-family: 'Outfit', sans-serif; font-size: 5.8px; font-weight: 600; color: #4a3e3d; margin-top: 0.5px;">${exp.employer || ''}${exp.city ? ', ' + exp.city : ''}</span>
              ${bulletHtml}
            `;
            expList.appendChild(item);
          });
        }
      }

      // References
      const refList = document.getElementById('peach-ref-list');
      const refSec = document.getElementById('peach-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'flex';
          references.forEach((ref, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0.5px';

            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let contactInfo = [];
            if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) contactInfo.push(`Email: ${ref.email}`);

            item.innerHTML = `
              <div id="peach-ref-${idx}-name" class="peach-editable" contenteditable="true" placeholder="Reference Name" style="font-family: 'Outfit', sans-serif; font-size: 6px; font-weight: 700; color: #4a3e3d;">${ref.name}</div>
              <div id="peach-ref-${idx}-title" class="peach-editable" contenteditable="true" placeholder="Reference Title" style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #4a3e3d;">${titleComp}</div>
              ${contactInfo.map((c, cIdx) => `<div id="peach-ref-${idx}-contact-${cIdx}" class="peach-editable" contenteditable="true" placeholder="Contact Detail" style="font-family: 'Outfit', sans-serif; font-size: 5px; color: #4a3e3d;">${c}</div>`).join('')}
            `;
            refList.appendChild(item);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }

    } else if (activeLayout === 'corporate') {
      const nameEl = document.getElementById('corporate-name');
      const profEl = document.getElementById('corporate-prof');
      const sumEl = document.getElementById('corporate-summary');

      if (document.activeElement !== nameEl) {
        nameEl.textContent = `${fn} ${ln}`.trim() || '';
      }
      if (document.activeElement !== profEl) {
        profEl.textContent = prof || '';
      }
      if (document.activeElement !== sumEl) {
        sumEl.textContent = summary || '';
      }

      // Profile Section visibility
      const profSec = document.getElementById('corporate-profile-sec');
      if (summary) {
        if (profSec) profSec.style.display = 'block';
      } else {
        if (profSec) profSec.style.display = 'none';
      }

      // Contact Item values
      const phoneT = document.getElementById('corporate-phone-text');
      if (phoneT && document.activeElement !== phoneT) {
        phoneT.textContent = phone || '';
      }
      document.getElementById('corporate-phone').style.display = (phone && phone !== '+91 ') ? 'flex' : 'none';

      const emailT = document.getElementById('corporate-email-text');
      if (emailT && document.activeElement !== emailT) {
        emailT.textContent = email || '';
      }
      document.getElementById('corporate-email').style.display = email ? 'flex' : 'none';

      const locT = document.getElementById('corporate-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) {
        locT.textContent = locStr || '';
      }
      document.getElementById('corporate-location').style.display = locStr ? 'flex' : 'none';

      // Social Links
      const socList = document.getElementById('corporate-socials');
      if (socList) {
        socList.innerHTML = '';
        const socialsMap = [
          { key: 'linkedin', val: linkedin, label: 'LinkedIn' },
          { key: 'github', val: github, label: 'GitHub' },
          { key: 'portfolio', val: portfolio, label: 'Portfolio' }
        ];
        socialsMap.forEach(s => {
          if (s.val) {
            const div = document.createElement('div');
            div.className = 'corporate-field';
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.innerHTML = `
              <span style="font-family: 'Outfit', sans-serif; font-size: 4px; font-weight: 700; text-transform: uppercase; color: #7f8c8d; letter-spacing: 0.1em;">${s.label}</span>
              <span id="corporate-${s.key}-text" class="corporate-editable" contenteditable="true" placeholder="${s.label} URL" style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #2b343e; word-break: break-all;">${s.val}</span>
            `;
            socList.appendChild(div);
          }
        });
      }

      // Education List
      const eduList = document.getElementById('corporate-edu-list');
      const eduSec = document.getElementById('corporate-edu-sec');
      if (eduList) {
        eduList.innerHTML = '';
        if (education.length === 0 || !education[0].school) {
          if (eduSec) eduSec.style.display = 'none';
        } else {
          if (eduSec) eduSec.style.display = 'block';
          education.forEach((edu, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '1px';

            const startY = edu.startYear || '';
            const endY = edu.endYear || '';
            const yearsStr = [startY, endY].filter(Boolean).join(' - ');

            item.innerHTML = `
              <div id="corporate-edu-${idx}-school" class="corporate-editable" contenteditable="true" placeholder="School Name" style="font-family: 'Outfit', sans-serif; font-size: 6px; font-weight: 700; color: #2b343e;">${edu.school}</div>
              <div id="corporate-edu-${idx}-degree" class="corporate-editable" contenteditable="true" placeholder="Degree / Course" style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #7f8c8d;">${edu.degree}</div>
              <div id="corporate-edu-${idx}-years" class="corporate-editable" contenteditable="true" placeholder="Years" style="font-family: 'Outfit', sans-serif; font-size: 5px; color: #95a5a6;">${yearsStr}</div>
            `;
            eduList.appendChild(item);
          });
        }
      }

      // Skills
      const sList = document.getElementById('corporate-skills-list');
      const sSec = document.getElementById('corporate-skills-sec-title');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) {
          if (sSec) sSec.style.display = 'none';
        } else {
          if (sSec) sSec.style.display = 'block';
          skills.forEach((n, idx) => {
            const div = document.createElement('div');
            div.id = `corporate-skill-${idx}`;
            div.className = 'corporate-editable';
            div.contentEditable = 'true';
            div.setAttribute('placeholder', 'Skill');
            div.style.fontFamily = "'Outfit', sans-serif";
            div.style.fontSize = '5.5px';
            div.style.color = '#2b343e';
            div.textContent = n;
            sList.appendChild(div);
          });
        }
      }

      // Experience
      const expList = document.getElementById('corporate-exp-list');
      const expSec = document.getElementById('corporate-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        if (experiences.length === 0 || !experiences[0].jobTitle) {
          if (expSec) expSec.style.display = 'none';
        } else {
          if (expSec) expSec.style.display = 'block';
          experiences.forEach((exp, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '2px';

            const startM = exp.startMonth || '';
            const startY = exp.startYear || '';
            const endM = exp.endMonth || '';
            const endY = exp.endYear || '';

            const startStr = [startM, startY].filter(Boolean).join(' ');
            const endStr = [endM, endY].filter(Boolean).join(' ');
            const dateStr = [startStr, endStr].filter(Boolean).join(' - ') || 'Present';

            const empCity = [exp.employer, exp.city].filter(Boolean).join(', ');

            // Bullets
            const bullets = exp.description ? exp.description.split('\n') : [];

            item.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div id="corporate-exp-${idx}-role" class="corporate-editable" contenteditable="true" placeholder="Job Title" style="font-family: 'Outfit', sans-serif; font-size: 6.5px; font-weight: 700; color: #2b343e;">${exp.jobTitle}</div>
                <div id="corporate-exp-${idx}-date" class="corporate-editable" contenteditable="true" placeholder="Dates" style="font-family: 'Outfit', sans-serif; font-size: 5px; color: #95a5a6; font-weight: 500;">${dateStr}</div>
              </div>
              <div id="corporate-exp-${idx}-company" class="corporate-editable" contenteditable="true" placeholder="Company, Location" style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #7f8c8d; font-weight: 600; margin-top: -1px;">${empCity}</div>
              <div id="corporate-exp-${idx}-bullets" style="display: flex; flex-direction: column; gap: 1.5px; margin-top: 2px; padding-left: 6px;">
                ${bullets.map((b, bIdx) => `
                  <div style="display: flex; gap: 4px; align-items: flex-start;">
                    <span style="font-size: 5px; color: #2b343e; margin-top: 1px;">•</span>
                    <div id="corporate-exp-${idx}-bullet-${bIdx}" class="corporate-editable" contenteditable="true" placeholder="Achievement detail..." style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #4a5568; flex: 1; text-align: justify; word-break: break-word;">${b}</div>
                  </div>
                `).join('')}
              </div>
            `;
            expList.appendChild(item);
          });
        }
      }

      // References
      const refList = document.getElementById('corporate-ref-list');
      const refSec = document.getElementById('corporate-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'block';
          references.forEach((ref, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0.5px';

            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let contactInfo = [];
            if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) contactInfo.push(`Email: ${ref.email}`);

            item.innerHTML = `
              <div id="corporate-ref-${idx}-name" class="corporate-editable" contenteditable="true" placeholder="Reference Name" style="font-family: 'Outfit', sans-serif; font-size: 6px; font-weight: 700; color: #2b343e;">${ref.name}</div>
              <div id="corporate-ref-${idx}-title" class="corporate-editable" contenteditable="true" placeholder="Reference Title" style="font-family: 'Outfit', sans-serif; font-size: 5.5px; color: #7f8c8d;">${titleComp}</div>
              ${contactInfo.map((c, cIdx) => `<div id="corporate-ref-${idx}-contact-${cIdx}" class="corporate-editable" contenteditable="true" placeholder="Contact Detail" style="font-family: 'Outfit', sans-serif; font-size: 5px; color: #95a5a6;">${c}</div>`).join('')}
            `;
            refList.appendChild(item);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }

    } else if (activeLayout === 'artistic') {
      const nameEl = document.getElementById('artistic-name');
      const profEl = document.getElementById('artistic-prof');
      const sumEl = document.getElementById('artistic-summary');

      if (nameEl && document.activeElement !== nameEl) nameEl.textContent = `${fn} ${ln}`.trim() || '';
      if (profEl && document.activeElement !== profEl) profEl.textContent = prof || '';
      if (sumEl && document.activeElement !== sumEl) sumEl.textContent = summary || '';

      const profSec = document.getElementById('artistic-profile-sec');
      if (profSec) profSec.style.display = summary ? 'block' : 'none';

      const phoneT = document.getElementById('artistic-phone-text');
      if (phoneT && document.activeElement !== phoneT) phoneT.textContent = phone || '';
      document.getElementById('artistic-phone').style.display = (phone && phone !== '+91 ') ? 'block' : 'none';

      const emailT = document.getElementById('artistic-email-text');
      if (emailT && document.activeElement !== emailT) emailT.textContent = email || '';
      document.getElementById('artistic-email').style.display = email ? 'block' : 'none';

      const locT = document.getElementById('artistic-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) locT.textContent = locStr || '';
      document.getElementById('artistic-location').style.display = locStr ? 'block' : 'none';

      const socList = document.getElementById('artistic-socials');
      if (socList) {
        socList.innerHTML = '';
        [{ key: 'linkedin', val: linkedin, label: 'LinkedIn' }, { key: 'github', val: github, label: 'GitHub' }, { key: 'portfolio', val: portfolio, label: 'Portfolio' }].forEach(s => {
          if (s.val) {
            const d = document.createElement('div');
            d.innerHTML = `<span id="artistic-${s.key}-text" class="artistic-editable" contenteditable="true" placeholder="${s.label}" style="font-family:'Outfit',sans-serif;font-size:5.5px;color:#3d3027;word-break:break-all;">${s.val}</span>`;
            socList.appendChild(d);
          }
        });
      }

      const eduList = document.getElementById('artistic-edu-list');
      const eduSec = document.getElementById('artistic-edu-sec');
      if (eduList) {
        eduList.innerHTML = '';
        if (education.length === 0 || !education[0].school) {
          if (eduSec) eduSec.style.display = 'none';
        } else {
          if (eduSec) eduSec.style.display = 'block';
          education.forEach((edu, idx) => {
            const yrs = [edu.startYear, edu.endYear].filter(Boolean).join(' - ');
            const it = document.createElement('div');
            it.style.cssText = 'display:flex;flex-direction:column;gap:1px;';
            it.innerHTML = `<div id="artistic-edu-${idx}-school" class="artistic-editable" contenteditable="true" placeholder="School" style="font-family:'Outfit',sans-serif;font-size:6px;font-weight:700;color:#3d3027;">${edu.school}</div><div id="artistic-edu-${idx}-degree" class="artistic-editable" contenteditable="true" placeholder="Degree" style="font-family:'Outfit',sans-serif;font-size:5.5px;color:#7a6b5a;">${edu.degree}</div><div id="artistic-edu-${idx}-years" class="artistic-editable" contenteditable="true" placeholder="Years" style="font-family:'Outfit',sans-serif;font-size:5px;color:#a0916e;">${yrs}</div>`;
            eduList.appendChild(it);
          });
        }
      }

      const sList = document.getElementById('artistic-skills-list');
      const sSec = document.getElementById('artistic-skills-sec-title');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) {
          if (sSec) sSec.style.display = 'none';
        } else {
          if (sSec) sSec.style.display = 'block';
          skills.forEach((n, idx) => {
            const d = document.createElement('div');
            d.id = `artistic-skill-${idx}`;
            d.className = 'artistic-editable';
            d.contentEditable = 'true';
            d.setAttribute('placeholder', 'Skill');
            d.style.cssText = "font-family:'Outfit',sans-serif;font-size:5.5px;color:#3d3027;background:rgba(196,149,106,0.12);padding:1px 4px;border-radius:2px;";
            d.textContent = n;
            sList.appendChild(d);
          });
        }
      }

      const expList = document.getElementById('artistic-exp-list');
      const expSec = document.getElementById('artistic-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        if (experiences.length === 0 || !experiences[0].jobTitle) {
          if (expSec) expSec.style.display = 'none';
        } else {
          if (expSec) expSec.style.display = 'block';
          experiences.forEach((exp, idx) => {
            const sStr = [exp.startMonth, exp.startYear].filter(Boolean).join(' ');
            const eStr = [exp.endMonth, exp.endYear].filter(Boolean).join(' ');
            const dateStr = [sStr, eStr].filter(Boolean).join(' - ') || 'Present';
            const empCity = [exp.employer, exp.city].filter(Boolean).join(', ');
            const bullets = exp.description ? exp.description.split('\n') : [];
            const it = document.createElement('div');
            it.style.cssText = 'display:flex;flex-direction:column;gap:2px;';
            it.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:baseline;"><div id="artistic-exp-${idx}-role" class="artistic-editable" contenteditable="true" placeholder="Job Title" style="font-family:'Outfit',sans-serif;font-size:6.5px;font-weight:700;color:#3d3027;">${exp.jobTitle}</div><div id="artistic-exp-${idx}-date" class="artistic-editable" contenteditable="true" placeholder="Dates" style="font-family:'Outfit',sans-serif;font-size:5px;color:#a0916e;">${dateStr}</div></div><div id="artistic-exp-${idx}-company" class="artistic-editable" contenteditable="true" placeholder="Company" style="font-family:'Outfit',sans-serif;font-size:5.5px;color:#7a6b5a;font-weight:600;">${empCity}</div><div style="display:flex;flex-direction:column;gap:1.5px;margin-top:2px;padding-left:6px;">${bullets.map((b, bIdx) => `<div style="display:flex;gap:4px;align-items:flex-start;"><span style="font-size:5px;color:#3d3027;margin-top:1px;">\u2022</span><div id="artistic-exp-${idx}-bullet-${bIdx}" class="artistic-editable" contenteditable="true" placeholder="Detail..." style="font-family:'Outfit',sans-serif;font-size:5.5px;color:#5a4a3a;flex:1;">${b}</div></div>`).join('')}</div>`;
            expList.appendChild(it);
          });
        }
      }

      const refList = document.getElementById('artistic-ref-list');
      const refSec = document.getElementById('artistic-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'block';
          references.forEach((ref, idx) => {
            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let cInfo = [];
            if (ref.phone) cInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) cInfo.push(`Email: ${ref.email}`);
            const it = document.createElement('div');
            it.style.cssText = 'display:flex;flex-direction:column;gap:0.5px;';
            it.innerHTML = `<div id="artistic-ref-${idx}-name" class="artistic-editable" contenteditable="true" placeholder="Name" style="font-family:'Outfit',sans-serif;font-size:6px;font-weight:700;color:#3d3027;">${ref.name}</div><div id="artistic-ref-${idx}-title" class="artistic-editable" contenteditable="true" placeholder="Title" style="font-family:'Outfit',sans-serif;font-size:5.5px;color:#7a6b5a;">${titleComp}</div>${cInfo.map((c, ci) => `<div id="artistic-ref-${idx}-contact-${ci}" class="artistic-editable" contenteditable="true" placeholder="Contact" style="font-family:'Outfit',sans-serif;font-size:5px;color:#a0916e;">${c}</div>`).join('')}`;
            refList.appendChild(it);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }

    } else if (activeLayout === 'elite') {
      const nameEl = document.getElementById('elite-name');
      const profEl = document.getElementById('elite-prof');
      const sumEl = document.getElementById('elite-summary');
      if (nameEl && document.activeElement !== nameEl) nameEl.textContent = `${fn} ${ln}`.trim() || '';
      if (profEl && document.activeElement !== profEl) profEl.textContent = prof || '';
      if (sumEl && document.activeElement !== sumEl) sumEl.textContent = summary || '';
      const profSec = document.getElementById('elite-profile-sec');
      if (profSec) profSec.style.display = summary ? 'block' : 'none';
      const phoneT = document.getElementById('elite-phone-text');
      if (phoneT && document.activeElement !== phoneT) phoneT.textContent = phone || '';
      document.getElementById('elite-phone').style.display = (phone && phone !== '+91 ') ? 'inline' : 'none';
      const emailT = document.getElementById('elite-email-text');
      if (emailT && document.activeElement !== emailT) emailT.textContent = email || '';
      document.getElementById('elite-email').style.display = email ? 'inline' : 'none';
      const locT = document.getElementById('elite-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) locT.textContent = locStr || '';
      document.getElementById('elite-location').style.display = locStr ? 'inline' : 'none';
      const socList = document.getElementById('elite-socials');
      if (socList) {
        socList.innerHTML = '';
        [{ key: 'linkedin', val: linkedin, label: 'LinkedIn' }, { key: 'github', val: github, label: 'GitHub' }, { key: 'portfolio', val: portfolio, label: 'Portfolio' }].forEach(s => { if (s.val) { const d = document.createElement('div'); d.style.cssText = 'font-family:Outfit,sans-serif;font-size:5px;color:#333;'; d.innerHTML = `<span id="elite-${s.key}-text" class="elite-editable" contenteditable="true" style="font-family:inherit;font-size:inherit;color:inherit;">${s.val}</span>`; socList.appendChild(d); } });
      }
      const eduList = document.getElementById('elite-edu-list');
      const eduSec = document.getElementById('elite-edu-sec');
      if (eduList) {
        eduList.innerHTML = '';
        if (education.length === 0 || !education[0].school) { if (eduSec) eduSec.style.display = 'none'; }
        else {
          if (eduSec) eduSec.style.display = 'block';
          education.forEach((edu, idx) => { const yrs = [edu.startYear, edu.endYear].filter(Boolean).join(' - '); const it = document.createElement('div'); it.style.cssText = 'display:flex;flex-direction:column;gap:1px;'; it.innerHTML = `<div id="elite-edu-${idx}-school" class="elite-editable" contenteditable="true" placeholder="School" style="font-family:Outfit,sans-serif;font-size:6px;font-weight:700;color:#1a4b8c;">${edu.school}</div><div id="elite-edu-${idx}-degree" class="elite-editable" contenteditable="true" placeholder="Degree" style="font-family:Outfit,sans-serif;font-size:5.5px;color:#555;">${edu.degree}</div><div id="elite-edu-${idx}-years" class="elite-editable" contenteditable="true" placeholder="Years" style="font-family:Outfit,sans-serif;font-size:5px;color:#888;">${yrs}</div>`; eduList.appendChild(it); });
        }
      }
      const sList = document.getElementById('elite-skills-list');
      const sSec = document.getElementById('elite-skills-sec-title');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) { if (sSec) sSec.style.display = 'none'; }
        else {
          if (sSec) sSec.style.display = 'block';
          skills.forEach((n, idx) => { const d = document.createElement('div'); d.id = `elite-skill-${idx}`; d.className = 'elite-editable'; d.contentEditable = 'true'; d.setAttribute('placeholder', 'Skill'); d.style.cssText = "font-family:Outfit,sans-serif;font-size:5.5px;color:#333;background:rgba(26,75,140,0.08);padding:1px 4px;border-radius:2px;"; d.textContent = n; sList.appendChild(d); });
        }
      }
      const expList = document.getElementById('elite-exp-list');
      const expSec = document.getElementById('elite-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        if (experiences.length === 0 || !experiences[0].jobTitle) { if (expSec) expSec.style.display = 'none'; }
        else {
          if (expSec) expSec.style.display = 'block';
          experiences.forEach((exp, idx) => {
            const sStr = [exp.startMonth, exp.startYear].filter(Boolean).join(' ');
            const eStr = [exp.endMonth, exp.endYear].filter(Boolean).join(' ');
            const dateStr = [sStr, eStr].filter(Boolean).join(' - ') || 'Present';
            const empCity = [exp.employer, exp.city].filter(Boolean).join(', ');
            const bullets = exp.description ? exp.description.split('\n') : [];
            const it = document.createElement('div'); it.style.cssText = 'display:flex;flex-direction:column;gap:2px;';
            it.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:baseline;"><div id="elite-exp-${idx}-role" class="elite-editable" contenteditable="true" placeholder="Job Title" style="font-family:Outfit,sans-serif;font-size:6.5px;font-weight:700;color:#1a4b8c;">${exp.jobTitle}</div><div id="elite-exp-${idx}-date" class="elite-editable" contenteditable="true" placeholder="Dates" style="font-family:Outfit,sans-serif;font-size:5px;color:#888;">${dateStr}</div></div><div id="elite-exp-${idx}-company" class="elite-editable" contenteditable="true" placeholder="Company" style="font-family:Outfit,sans-serif;font-size:5.5px;color:#555;font-weight:600;">${empCity}</div><div style="display:flex;flex-direction:column;gap:1.5px;margin-top:2px;padding-left:6px;">${bullets.map((b, bIdx) => `<div style="display:flex;gap:4px;align-items:flex-start;"><span style="font-size:5px;color:#1a4b8c;margin-top:1px;">\u2022</span><div id="elite-exp-${idx}-bullet-${bIdx}" class="elite-editable" contenteditable="true" placeholder="Detail..." style="font-family:Outfit,sans-serif;font-size:5.5px;color:#444;flex:1;">${b}</div></div>`).join('')}</div>`;
            expList.appendChild(it);
          });
        }
      }
      const refList = document.getElementById('elite-ref-list');
      const refSec = document.getElementById('elite-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'block';
          references.forEach((ref, idx) => { let tc = [ref.company, ref.title].filter(Boolean).join(' / '); let ci = []; if (ref.phone) ci.push(`Phone: ${ref.phone}`); if (ref.email) ci.push(`Email: ${ref.email}`); const it = document.createElement('div'); it.style.cssText = 'display:flex;flex-direction:column;gap:0.5px;'; it.innerHTML = `<div id="elite-ref-${idx}-name" class="elite-editable" contenteditable="true" placeholder="Name" style="font-family:Outfit,sans-serif;font-size:6px;font-weight:700;color:#1a4b8c;">${ref.name}</div><div id="elite-ref-${idx}-title" class="elite-editable" contenteditable="true" placeholder="Title" style="font-family:Outfit,sans-serif;font-size:5.5px;color:#555;">${tc}</div>${ci.map((c, i) => `<div id="elite-ref-${idx}-contact-${i}" class="elite-editable" contenteditable="true" placeholder="Contact" style="font-family:Outfit,sans-serif;font-size:5px;color:#888;">${c}</div>`).join('')}`; refList.appendChild(it); });
        } else { if (refSec) refSec.style.display = 'none'; }
      }

    } else if (activeLayout === 'mono') {
      const nameEl = document.getElementById('mono-name');
      const profEl = document.getElementById('mono-prof');
      const sumEl = document.getElementById('mono-summary');
      if (nameEl && document.activeElement !== nameEl) nameEl.textContent = `${fn} ${ln}`.trim() || '';
      if (profEl && document.activeElement !== profEl) profEl.textContent = prof || '';
      if (sumEl && document.activeElement !== sumEl) sumEl.textContent = summary || '';
      const profSec = document.getElementById('mono-profile-sec');
      if (profSec) profSec.style.display = summary ? 'block' : 'none';
      const phoneT = document.getElementById('mono-phone-text');
      if (phoneT && document.activeElement !== phoneT) phoneT.textContent = phone || '';
      document.getElementById('mono-phone').style.display = (phone && phone !== '+91 ') ? 'inline' : 'none';
      const emailT = document.getElementById('mono-email-text');
      if (emailT && document.activeElement !== emailT) emailT.textContent = email || '';
      document.getElementById('mono-email').style.display = email ? 'inline' : 'none';
      const locT = document.getElementById('mono-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) locT.textContent = locStr || '';
      document.getElementById('mono-location').style.display = locStr ? 'inline' : 'none';
      const socList = document.getElementById('mono-socials');
      if (socList) { socList.innerHTML = '';[{ key: 'linkedin', val: linkedin }, { key: 'github', val: github }, { key: 'portfolio', val: portfolio }].forEach(s => { if (s.val) { const d = document.createElement('div'); d.style.cssText = 'font-family:Outfit,sans-serif;font-size:5px;color:#444;'; d.innerHTML = `<span id="mono-${s.key}-text" class="mono-editable" contenteditable="true" style="font-family:inherit;font-size:inherit;color:inherit;">${s.val}</span>`; socList.appendChild(d); } }); }
      const eduList = document.getElementById('mono-edu-list');
      const eduSec = document.getElementById('mono-edu-sec');
      if (eduList) { eduList.innerHTML = ''; if (education.length === 0 || !education[0].school) { if (eduSec) eduSec.style.display = 'none'; } else { if (eduSec) eduSec.style.display = 'block'; education.forEach((edu, idx) => { const yrs = [edu.startYear, edu.endYear].filter(Boolean).join(' - '); const it = document.createElement('div'); it.style.cssText = 'display:flex;flex-direction:column;gap:1px;'; it.innerHTML = `<div id="mono-edu-${idx}-school" class="mono-editable" contenteditable="true" placeholder="School" style="font-family:Outfit,sans-serif;font-size:6px;font-weight:700;color:#333;">${edu.school}</div><div id="mono-edu-${idx}-degree" class="mono-editable" contenteditable="true" placeholder="Degree" style="font-family:Outfit,sans-serif;font-size:5.5px;color:#666;">${edu.degree}</div><div id="mono-edu-${idx}-years" class="mono-editable" contenteditable="true" placeholder="Years" style="font-family:Outfit,sans-serif;font-size:5px;color:#999;">${yrs}</div>`; eduList.appendChild(it); }); } }
      const sList = document.getElementById('mono-skills-list');
      const sSec = document.getElementById('mono-skills-sec-title');
      if (sList) { sList.innerHTML = ''; if (skills.length === 0) { if (sSec) sSec.style.display = 'none'; } else { if (sSec) sSec.style.display = 'block'; skills.forEach((n, idx) => { const d = document.createElement('div'); d.id = `mono-skill-${idx}`; d.className = 'mono-editable'; d.contentEditable = 'true'; d.setAttribute('placeholder', 'Skill'); d.style.cssText = "font-family:Outfit,sans-serif;font-size:5.5px;color:#333;background:rgba(0,0,0,0.05);padding:1px 4px;border-radius:2px;"; d.textContent = n; sList.appendChild(d); }); } }
      const expList = document.getElementById('mono-exp-list');
      const expSec = document.getElementById('mono-exp-sec');
      if (expList) { expList.innerHTML = ''; if (experiences.length === 0 || !experiences[0].jobTitle) { if (expSec) expSec.style.display = 'none'; } else { if (expSec) expSec.style.display = 'block'; experiences.forEach((exp, idx) => { const sStr = [exp.startMonth, exp.startYear].filter(Boolean).join(' '); const eStr = [exp.endMonth, exp.endYear].filter(Boolean).join(' '); const dateStr = [sStr, eStr].filter(Boolean).join(' - ') || 'Present'; const empCity = [exp.employer, exp.city].filter(Boolean).join(', '); const bullets = exp.description ? exp.description.split('\n') : []; const it = document.createElement('div'); it.style.cssText = 'display:flex;flex-direction:column;gap:2px;'; it.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:baseline;"><div id="mono-exp-${idx}-role" class="mono-editable" contenteditable="true" placeholder="Job Title" style="font-family:Outfit,sans-serif;font-size:6.5px;font-weight:700;color:#333;">${exp.jobTitle}</div><div id="mono-exp-${idx}-date" class="mono-editable" contenteditable="true" placeholder="Dates" style="font-family:Outfit,sans-serif;font-size:5px;color:#999;">${dateStr}</div></div><div id="mono-exp-${idx}-company" class="mono-editable" contenteditable="true" placeholder="Company" style="font-family:Outfit,sans-serif;font-size:5.5px;color:#666;font-weight:600;">${empCity}</div><div style="display:flex;flex-direction:column;gap:1.5px;margin-top:2px;padding-left:6px;">${bullets.map((b, bIdx) => `<div style="display:flex;gap:4px;align-items:flex-start;"><span style="font-size:5px;color:#333;margin-top:1px;">\u2022</span><div id="mono-exp-${idx}-bullet-${bIdx}" class="mono-editable" contenteditable="true" placeholder="Detail..." style="font-family:Outfit,sans-serif;font-size:5.5px;color:#555;flex:1;">${b}</div></div>`).join('')}</div>`; expList.appendChild(it); }); } }
      const refList = document.getElementById('mono-ref-list');
      const refSec = document.getElementById('mono-ref-sec');
      if (refList) { refList.innerHTML = ''; if (references && references.length > 0) { if (refSec) refSec.style.display = 'block'; references.forEach((ref, idx) => { let tc = [ref.company, ref.title].filter(Boolean).join(' / '); let ci = []; if (ref.phone) ci.push(`Phone: ${ref.phone}`); if (ref.email) ci.push(`Email: ${ref.email}`); const it = document.createElement('div'); it.style.cssText = 'display:flex;flex-direction:column;gap:0.5px;'; it.innerHTML = `<div id="mono-ref-${idx}-name" class="mono-editable" contenteditable="true" placeholder="Name" style="font-family:Outfit,sans-serif;font-size:6px;font-weight:700;color:#333;">${ref.name}</div><div id="mono-ref-${idx}-title" class="mono-editable" contenteditable="true" placeholder="Title" style="font-family:Outfit,sans-serif;font-size:5.5px;color:#666;">${tc}</div>${ci.map((c, i) => `<div id="mono-ref-${idx}-contact-${i}" class="mono-editable" contenteditable="true" placeholder="Contact" style="font-family:Outfit,sans-serif;font-size:5px;color:#999;">${c}</div>`).join('')}`; refList.appendChild(it); }); } else { if (refSec) refSec.style.display = 'none'; } }

    } else if (activeLayout === 'sidebar') {
      document.getElementById('ed-name').textContent = `${fn} ${ln}`.trim() || '';
      document.getElementById('ed-prof').textContent = prof || '';

      const avatarImg = document.querySelector('.ed-avatar-img');
      if (avatarImg) {
        avatarImg.src = d.photo || 'img/pic_icon.png';
        if (d.photo && d.photo.startsWith('data:')) {
          avatarImg.classList.add('custom-photo');
        } else {
          avatarImg.classList.remove('custom-photo');
        }
      }

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

      const liEl = document.getElementById('ed-linkedin');
      const liTxt = document.getElementById('ed-linkedin-text');
      if (liEl && liTxt) {
        if (linkedin) { liTxt.textContent = linkedin; liEl.style.display = 'flex'; }
        else liEl.style.display = 'none';
      }

      const gitEl = document.getElementById('ed-github');
      const gitTxt = document.getElementById('ed-github-text');
      if (gitEl && gitTxt) {
        if (github) { gitTxt.textContent = github; gitEl.style.display = 'flex'; }
        else gitEl.style.display = 'none';
      }

      const portEl = document.getElementById('ed-portfolio');
      const portTxt = document.getElementById('ed-portfolio-text');
      if (portEl && portTxt) {
        if (portfolio) { portTxt.textContent = portfolio; portEl.style.display = 'flex'; }
        else portEl.style.display = 'none';
      }

      const edSummary = document.getElementById('ed-summary');
      const edSummarySec = edSummary.parentElement;
      if (summary) {
        edSummary.textContent = summary;
        edSummarySec.style.display = 'block';
      } else {
        edSummarySec.style.display = 'none';
      }

      const eduList = document.getElementById('ed-edu-list');
      const eduSec = eduList.closest('.ed-section');
      eduList.innerHTML = '';
      if (edu.length === 0) {
        if (eduSec) eduSec.style.display = 'none';
      } else {
        if (eduSec) eduSec.style.display = 'block';
        edu.forEach(e => {
          const div = document.createElement('div');
          div.className = 'ed-edu-item';
          div.innerHTML = `
            <span class="ed-edu-degree">${e.degree || 'Degree'}</span>
            <span class="ed-edu-school">${e.schoolName || 'University'}</span>
            <span class="ed-edu-years">${e.startYear || ''} - ${e.endYear || ''}</span>
          `;
          eduList.appendChild(div);
        });
      }

      const sList = document.getElementById('ed-skills-list');
      const sSec = sList.closest('.ed-section');
      sList.innerHTML = '';
      if (skills.length === 0) {
        if (sSec) sSec.style.display = 'none';
      } else {
        if (sSec) sSec.style.display = 'block';
        skills.forEach(n => {
          const div = document.createElement('div');
          div.className = 'ed-skill-item';
          div.textContent = n;
          sList.appendChild(div);
        });
      }

      const expList = document.getElementById('ed-exp-list');
      const expSec = expList.parentElement;
      expList.innerHTML = '';
      if (experiences.length === 0 || !experiences[0].jobTitle) {
        if (expSec) expSec.style.display = 'none';
      } else {
        if (expSec) expSec.style.display = 'block';
        experiences.forEach(exp => {
          const item = document.createElement('div');
          item.className = 'ed-exp-item';
          let bulletHtml = '';
          if (exp.description) {
            const bullets = exp.description.split(/\n+/).map(b => b.trim().replace(/^[•\-\.\s]+/, '')).filter(Boolean);
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
      }

      const edRefList = document.getElementById('ed-ref-list');
      if (edRefList) {
        edRefList.innerHTML = '';
        const refSec = edRefList.parentElement;
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'block';
          references.forEach(ref => {
            const item = document.createElement('div');
            item.className = 'ed-ref-item';

            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let contactInfo = [];
            if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) contactInfo.push(`Email: ${ref.email}`);

            item.innerHTML = `
              <div class="ed-ref-name">${ref.name}</div>
              <div class="ed-ref-title">${titleComp}</div>
              ${contactInfo.map(c => `<div class="ed-ref-contact">${c}</div>`).join('')}
            `;
            edRefList.appendChild(item);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }

    } else if (activeLayout === 'cream') {
      const nameEl = document.getElementById('cream-name');
      const profEl = document.getElementById('cream-prof');
      const sumEl = document.getElementById('cream-summary');

      if (document.activeElement !== nameEl) {
        nameEl.textContent = `${fn} ${ln}`.trim() || '';
      }
      if (document.activeElement !== profEl) {
        profEl.textContent = prof || '';
      }
      if (document.activeElement !== sumEl) {
        sumEl.textContent = summary || '';
      }

      // Profile Section visibility
      const profSec = document.getElementById('cream-profile-sec');
      if (summary) {
        if (profSec) profSec.style.display = 'flex';
      } else {
        if (profSec) profSec.style.display = 'none';
      }

      // Contact
      const phoneT = document.getElementById('cream-phone-text');
      if (phoneT && document.activeElement !== phoneT) phoneT.textContent = phone || '';
      document.getElementById('cream-phone').style.display = (phone && phone !== '+91 ') ? 'flex' : 'none';

      const emailT = document.getElementById('cream-email-text');
      if (emailT && document.activeElement !== emailT) emailT.textContent = email || '';
      document.getElementById('cream-email').style.display = email ? 'flex' : 'none';

      const locT = document.getElementById('cream-location-text');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locT && document.activeElement !== locT) locT.textContent = locStr || '';
      document.getElementById('cream-location').style.display = locStr ? 'flex' : 'none';

      const liT = document.getElementById('cream-linkedin-text');
      if (liT && document.activeElement !== liT) liT.textContent = linkedin || '';
      document.getElementById('cream-linkedin').style.display = linkedin ? 'flex' : 'none';

      const gitT = document.getElementById('cream-github-text');
      if (gitT && document.activeElement !== gitT) gitT.textContent = github || '';
      document.getElementById('cream-github').style.display = github ? 'flex' : 'none';

      const portT = document.getElementById('cream-portfolio-text');
      if (portT && document.activeElement !== portT) portT.textContent = portfolio || '';
      document.getElementById('cream-portfolio').style.display = portfolio ? 'flex' : 'none';

      // Education
      const eduList = document.getElementById('cream-edu-list');
      const eduSec = document.getElementById('cream-edu-sec-title');
      if (eduList) {
        eduList.innerHTML = '';
        if (edu.length === 0) {
          if (eduSec) eduSec.style.display = 'none';
        } else {
          if (eduSec) eduSec.style.display = 'block';
          edu.forEach((e, idx) => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.gap = '0.5px';
            div.innerHTML = `
              <span id="cream-edu-${idx}-years" class="cream-editable" contenteditable="true" placeholder="Years" style="font-family: 'Merriweather', Georgia, serif; font-size: 5px; font-weight: 600; color: #1a1a1a; padding: 0px 2px !important; line-height: 1.1; margin: 0;">${e.startYear || ''}${e.startYear && e.endYear ? ' - ' : ''}${e.endYear || ''}</span>
              <span id="cream-edu-${idx}-school" class="cream-editable" contenteditable="true" placeholder="University" style="font-family: 'Playfair Display', 'Merriweather', Georgia, serif; font-size: 5.5px; font-weight: 600; color: #1a1a1a; text-transform: uppercase; padding: 0px 2px !important; line-height: 1.1; margin: 0;">${e.schoolName || ''}</span>
              <div style="display: flex; gap: 4px; align-items: flex-start; margin-top: 0.5px;">
                <span style="font-size: 5px; color: #222222; margin-top: 0.5px; flex-shrink: 0;">\u2022</span>
                <span id="cream-edu-${idx}-degree" class="cream-editable" contenteditable="true" placeholder="Degree" style="font-family: 'Merriweather', Georgia, serif; font-size: 5px; color: #222222; flex: 1; outline: none; border: 1px dashed transparent; padding: 0px 2px !important; line-height: 1.1; margin: 0;">${e.degree || ''}</span>
              </div>
            `;
            eduList.appendChild(div);
          });
        }
      }

      // Skills
      const sList = document.getElementById('cream-skills-list');
      const sSec = document.getElementById('cream-skills-sec-title');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) {
          if (sSec) sSec.style.display = 'none';
        } else {
          if (sSec) sSec.style.display = 'block';
          skills.forEach((n, idx) => {
            const div = document.createElement('div');
            div.id = `cream-skill-${idx}`;
            div.className = 'cream-editable';
            div.contentEditable = 'true';
            div.setAttribute('placeholder', 'Skill');
            div.style.fontFamily = "'Merriweather', Georgia, serif";
            div.style.fontSize = '5.5px';
            div.style.color = '#1a1a1a';
            div.textContent = `. ${n}`;
            sList.appendChild(div);
          });
        }
      }

      // Experience
      const expList = document.getElementById('cream-exp-list');
      const expSec = document.getElementById('cream-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        if (experiences.length === 0 || !experiences[0].jobTitle) {
          if (expSec) expSec.style.display = 'none';
        } else {
          if (expSec) expSec.style.display = 'flex';
          experiences.forEach((exp, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0.5px';
            let bulletHtml = '';
            if (exp.description) {
              const bullets = exp.description.split(/\n+/).map(b => b.trim().replace(/^[•\-\.\s]+/, '')).filter(Boolean);
              if (bullets.length > 0) {
                bulletHtml = `<div style="display: flex; flex-direction: column; gap: 2px; margin-top: 1px; padding-left: 4px; width: 100%;">` +
                  bullets.map((b, bIdx) => `
                    <div style="display: flex; gap: 4px; align-items: flex-start; width: 100%;">
                      <span style="font-size: 5px; color: #222222; margin-top: 0.5px; flex-shrink: 0;">\u2022</span>
                      <div id="cream-exp-${idx}-bullet-${bIdx}" class="cream-editable" contenteditable="true" placeholder="Bullet description" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #222222; line-height: 1.3; flex: 1; outline: none; border: 1px dashed transparent; word-break: break-word;">${b}</div>
                    </div>
                  `).join('') +
                  `</div>`;
              }
            } else {
              bulletHtml = `<div style="display: flex; flex-direction: column; gap: 2px; margin-top: 1px; padding-left: 4px; width: 100%;">
                <div style="display: flex; gap: 4px; align-items: flex-start; width: 100%;">
                  <span style="font-size: 5px; color: #222222; margin-top: 0.5px; flex-shrink: 0;">\u2022</span>
                  <div id="cream-exp-${idx}-bullet-0" class="cream-editable" contenteditable="true" placeholder="Add responsibility bullet..." style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #222222; line-height: 1.3; flex: 1; outline: none; border: 1px dashed transparent; word-break: break-word;"></div>
                </div>
              </div>`;
            }
            item.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: baseline; line-height: 1.1; width: 100%;">
                <span id="cream-exp-${idx}-role" class="cream-editable" contenteditable="true" placeholder="Role Title" style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 6.5px; font-weight: 600; color: #1a1a1a;">${exp.jobTitle || ''}</span>
                <span id="cream-exp-${idx}-date" class="cream-editable" contenteditable="true" placeholder="Dates" style="font-family: 'Merriweather', Georgia, serif; font-size: 5px; color: #444444;">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' - ' : ''}${exp.endDate || ''}</span>
              </div>
              <span id="cream-exp-${idx}-company" class="cream-editable" contenteditable="true" placeholder="Employer Name" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.8px; font-weight: 500; color: #222222; margin-top: 0.5px;">${exp.employer || ''}${exp.city ? ', ' + exp.city : ''}</span>
              ${bulletHtml}
            `;
            expList.appendChild(item);
          });
        }
      }

      // References
      const refList = document.getElementById('cream-ref-list');
      const refSec = document.getElementById('cream-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'flex';
          references.forEach((ref, idx) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.gap = '0.5px';
            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let contactInfo = [];
            if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) contactInfo.push(`Email: ${ref.email}`);
            item.innerHTML = `
              <div id="cream-ref-${idx}-name" class="cream-editable" contenteditable="true" placeholder="Reference Name" style="font-family: 'Playfair Display', 'DM Serif Display', serif; font-size: 6px; font-weight: 600; color: #1a1a1a;">${ref.name}</div>
              <div id="cream-ref-${idx}-title" class="cream-editable" contenteditable="true" placeholder="Reference Title" style="font-family: 'Merriweather', Georgia, serif; font-size: 5.5px; color: #444444;">${titleComp}</div>
              ${contactInfo.map((c, cIdx) => `<div id="cream-ref-${idx}-contact-${cIdx}" class="cream-editable" contenteditable="true" placeholder="Contact Detail" style="font-family: 'Merriweather', Georgia, serif; font-size: 5px; color: #222222;">${c}</div>`).join('')}
            `;
            refList.appendChild(item);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }

    } else if (activeLayout === 'minimalist') {
      const nameEl = document.getElementById('mini-name');
      const profEl = document.getElementById('mini-prof');
      const sumEl = document.getElementById('mini-summary');

      if (nameEl && document.activeElement !== nameEl) {
        nameEl.textContent = `${fn} ${ln}`.trim() || '';
      }
      if (profEl && document.activeElement !== profEl) {
        profEl.textContent = prof || '';
      }

      const photoEl = document.getElementById('mini-photo');
      if (photoEl) {
        photoEl.src = d.photo || 'img/icon.png';
      }

      const emailEl = document.getElementById('mini-email');
      if (emailEl && document.activeElement !== emailEl) {
        emailEl.textContent = email || '';
      }

      const phoneEl = document.getElementById('mini-phone');
      if (phoneEl && document.activeElement !== phoneEl) {
        phoneEl.textContent = phone && phone !== '+91 ' ? phone : '';
      }

      const locEl = document.getElementById('mini-location');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locEl && document.activeElement !== locEl) {
        locEl.textContent = locStr || '';
      }

      const liEl = document.getElementById('mini-linkedin');
      if (liEl && document.activeElement !== liEl) {
        liEl.textContent = linkedin || '';
      }

      if (sumEl && document.activeElement !== sumEl) {
        sumEl.textContent = summary || '';
      }

      // Experience
      const expList = document.getElementById('mini-exp-list');
      const expSec = document.getElementById('mini-exp-sec');
      if (expList) {
        expList.innerHTML = '';
        const hasExp = experiences.length > 0 && experiences[0].jobTitle;
        if (!hasExp) {
          if (expSec) expSec.style.display = 'none';
        } else {
          if (expSec) expSec.style.display = 'flex';
          experiences.forEach((exp, idx) => {
            const sStr = [exp.startMonth, exp.startYear].filter(Boolean).join(' ');
            const eStr = [exp.endMonth, exp.endYear].filter(Boolean).join(' ');
            const dateStr = [sStr, eStr].filter(Boolean).join(' - ') || 'Present';
            const empCity = [exp.employer, exp.city].filter(Boolean).join(', ') || 'Acme Corporation';

            const item = document.createElement('div');
            item.style.cssText = 'display: flex; flex-direction: column; gap: 2px; width: 100%;';
            item.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: baseline; line-height: 1.1; width: 100%;">
                <div style="font-size: 6.5px; color: #111111; font-family: 'Inter', sans-serif;">
                  <strong id="mini-exp-${idx}-company" class="mini-editable" contenteditable="true" placeholder="Company" style="font-weight: 700;">${empCity}</strong>, 
                  <span id="mini-exp-${idx}-role" class="mini-editable" contenteditable="true" placeholder="Job Title" style="font-weight: 500;">${exp.jobTitle || 'Job Title'}</span>
                </div>
                <div id="mini-exp-${idx}-date" class="mini-editable" contenteditable="true" placeholder="Dates" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #444444;">${dateStr}</div>
              </div>
              <div id="mini-exp-${idx}-desc" class="mini-editable" contenteditable="true" placeholder="Description..." style="font-family: 'Canva Sans', sans-serif; font-size: 6px; color: #333333; line-height: 1.35; outline: none; border: none; white-space: pre-wrap;">${exp.description || ''}</div>
            `;
            expList.appendChild(item);
          });
        }
      }

      // Education
      const eduList = document.getElementById('mini-edu-list');
      const eduSec = document.getElementById('mini-edu-sec');
      if (eduList) {
        eduList.innerHTML = '';
        if (edu.length === 0) {
          if (eduSec) eduSec.style.display = 'none';
        } else {
          if (eduSec) eduSec.style.display = 'flex';
          edu.forEach((e, idx) => {
            const item = document.createElement('div');
            item.style.cssText = 'display: flex; justify-content: space-between; align-items: baseline; width: 100%;';
            item.innerHTML = `
              <div style="font-size: 6.5px; color: #111111; font-family: 'Inter', sans-serif;">
                <strong id="mini-edu-${idx}-school" class="mini-editable" contenteditable="true" placeholder="University" style="font-weight: 700;">${e.schoolName || 'University'}</strong>, 
                <span id="mini-edu-${idx}-degree" class="mini-editable" contenteditable="true" placeholder="Degree" style="font-weight: 500;">${e.degree || 'Degree'}</span>
              </div>
              <div id="mini-edu-${idx}-date" class="mini-editable" contenteditable="true" placeholder="Dates" style="font-family: 'Canva Sans', sans-serif; font-size: 5.5px; color: #444444;">${e.startYear || ''}${e.startYear && e.endYear ? ' - ' : ''}${e.endYear || ''}</div>
            `;
            eduList.appendChild(item);
          });
        }
      }

      // Skills
      const sList = document.getElementById('mini-skills-list');
      const sSec = document.getElementById('mini-skills-sec');
      if (sList) {
        sList.innerHTML = '';
        if (skills.length === 0) {
          if (sSec) sSec.style.display = 'none';
        } else {
          if (sSec) sSec.style.display = 'flex';
          skills.forEach((n, idx) => {
            let sName = n;
            let sDesc = '';
            if (n.includes(':')) {
              const parts = n.split(':');
              sName = parts[0].trim();
              sDesc = parts.slice(1).join(':').trim();
            }

            const div = document.createElement('div');
            div.style.cssText = "display: flex; flex-direction: column; gap: 1px; width: 48%; margin-bottom: 4px; box-sizing: border-box;";
            div.innerHTML = `
              <strong id="mini-skill-${idx}-name" class="mini-editable" contenteditable="true" placeholder="Skill Name" style="font-family: 'Canva Sans', sans-serif; font-size: 6.5px; font-weight: 700; color: #111111;">${sName}</strong>
              <span id="mini-skill-${idx}-desc" class="mini-editable" contenteditable="true" placeholder="Skill Detail..." style="font-family: 'Canva Sans', sans-serif; font-size: 6px; color: #333333; line-height: 1.35;">${sDesc || 'Expert level skill proficiency.'}</span>
            `;
            sList.appendChild(div);
          });
        }
      }

    } else if (activeLayout === 'single') {
      document.getElementById('sc-name').textContent = `${fn} ${ln}`.trim() || '';
      document.getElementById('sc-prof').textContent = prof || '';

      const phoneT = document.getElementById('sc-phone');
      if (phone && phone !== '+91 ') { phoneT.textContent = phone; phoneT.style.display = 'inline-flex'; }
      else phoneT.style.display = 'none';

      const emailT = document.getElementById('sc-email');
      if (email) { emailT.textContent = email; emailT.style.display = 'inline-flex'; }
      else emailT.style.display = 'none';

      const locT = document.getElementById('sc-location');
      const locStr = [country, pin].filter(Boolean).join(', ');
      if (locStr) { locT.textContent = locStr; locT.style.display = 'inline-flex'; }
      else locT.style.display = 'none';

      const liEl = document.getElementById('sc-linkedin');
      if (liEl) {
        if (linkedin) { liEl.textContent = linkedin; liEl.style.display = 'inline-flex'; }
        else liEl.style.display = 'none';
      }

      const gitEl = document.getElementById('sc-github');
      if (gitEl) {
        if (github) { gitEl.textContent = github; gitEl.style.display = 'inline-flex'; }
        else gitEl.style.display = 'none';
      }

      const portEl = document.getElementById('sc-portfolio');
      if (portEl) {
        if (portfolio) { portEl.textContent = portfolio; portEl.style.display = 'inline-flex'; }
        else portEl.style.display = 'none';
      }

      const scSummary = document.getElementById('sc-summary');
      const scProfileSec = document.getElementById('sc-profile-sec');
      if (summary) {
        scSummary.textContent = summary;
        if (scProfileSec) scProfileSec.style.display = 'flex';
      } else {
        if (scProfileSec) scProfileSec.style.display = 'none';
      }

      const eduList = document.getElementById('sc-edu-list');
      const eduSec = document.getElementById('sc-edu-sec');
      eduList.innerHTML = '';
      if (edu.length === 0) {
        if (eduSec) eduSec.style.display = 'none';
      } else {
        if (eduSec) eduSec.style.display = 'flex';
        edu.forEach(e => {
          const div = document.createElement('div');
          div.className = 'sc-edu-item';
          div.innerHTML = `
            <div class="sc-edu-header">
              <span class="sc-edu-degree">${e.degree || ''}</span>
              <span class="sc-edu-years">${e.startYear || ''} - ${e.endYear || ''}</span>
            </div>
            <div class="sc-edu-school">${e.schoolName || ''}</div>
          `;
          eduList.appendChild(div);
        });
      }

      const sList = document.getElementById('sc-skills-list');
      const sSec = document.getElementById('sc-skills-sec');
      sList.innerHTML = '';
      if (skills.length === 0) {
        if (sSec) sSec.style.display = 'none';
      } else {
        if (sSec) sSec.style.display = 'flex';
        skills.forEach(n => {
          const div = document.createElement('div');
          div.className = 'sc-skill-pill';
          div.textContent = n;
          sList.appendChild(div);
        });
      }

      const expList = document.getElementById('sc-exp-list');
      const expSec = document.getElementById('sc-exp-sec');
      expList.innerHTML = '';
      if (experiences.length === 0 || !experiences[0].jobTitle) {
        if (expSec) expSec.style.display = 'none';
      } else {
        if (expSec) expSec.style.display = 'flex';
        experiences.forEach(exp => {
          const item = document.createElement('div');
          item.className = 'sc-exp-item';
          let bulletHtml = '';
          if (exp.description) {
            const bullets = exp.description.split(/\n+/).map(b => b.trim().replace(/^[•\-\.\s]+/, '')).filter(Boolean);
            if (bullets.length > 0) {
              bulletHtml = `<ul class="sc-exp-bullets">` + bullets.map(b => `<li class="sc-exp-bullet">${b}</li>`).join('') + `</ul>`;
            }
          }
          item.innerHTML = `
            <div class="sc-exp-header">
              <span class="sc-exp-role">${exp.jobTitle || ''}</span>
              <span class="sc-exp-date">${exp.startDate || ''} - ${exp.endDate || ''}</span>
            </div>
            <div class="sc-exp-company">${exp.employer || ''}${exp.city ? ', ' + exp.city : ''}</div>
            ${bulletHtml}
          `;
          expList.appendChild(item);
        });
      }

      const refList = document.getElementById('sc-ref-list');
      const refSec = document.getElementById('sc-ref-sec');
      if (refList) {
        refList.innerHTML = '';
        if (references && references.length > 0) {
          if (refSec) refSec.style.display = 'block';
          references.forEach(ref => {
            const item = document.createElement('div');
            item.className = 'sc-ref-item';

            let titleComp = [ref.company, ref.title].filter(Boolean).join(' / ');
            let contactInfo = [];
            if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
            if (ref.email) contactInfo.push(`Email: ${ref.email}`);

            item.innerHTML = `
              <div class="sc-ref-name">${ref.name}</div>
              <div class="sc-ref-title">${titleComp}</div>
              ${contactInfo.map(c => `<div class="sc-ref-contact">${c}</div>`).join('')}
            `;
            refList.appendChild(item);
          });
        } else {
          if (refSec) refSec.style.display = 'none';
        }
      }
    }
  }

  // ── 6. Two-way data synchronization handler ──
  function saveDataFromLeftForm() {
    const d = stored();
    const c = d.contact || {};

    const fnInput = document.getElementById('firstName');
    const lnInput = document.getElementById('lastName');
    const profInput = document.getElementById('profession');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const countryInput = document.getElementById('country');
    const pinInput = document.getElementById('pincode');
    const sumInput = document.getElementById('summary');

    if (fnInput) c.firstName = fnInput.value;
    if (lnInput) c.lastName = lnInput.value;
    if (profInput) c.profession = profInput.value;
    if (emailInput) c.email = emailInput.value;
    if (phoneInput) c.phone = phoneInput.value;
    if (countryInput) c.country = countryInput.value;
    if (pinInput) c.pincode = pinInput.value;
    if (sumInput) d.summary = sumInput.value;

    const eduEntries = document.querySelectorAll('.education-entry');
    if (eduEntries.length > 0) {
      const educationData = [];
      eduEntries.forEach(entry => {
        educationData.push({
          schoolName: entry.querySelector('.school-name')?.value || '',
          degree: entry.querySelector('.degree')?.value || '',
          startYear: entry.querySelector('.start-year')?.value || '',
          endYear: entry.querySelector('.end-year')?.value || '',
          cgpa: entry.querySelector('.cgpa')?.value || ''
        });
      });
      d.education = educationData;
    }

    const rows = document.querySelectorAll('.skill-input-row');
    if (rows.length > 0) {
      const skillsData = [];
      rows.forEach(r => {
        const n = r.querySelector('input')?.value;
        if (n) skillsData.push({ name: n });
      });
      d.skills = skillsData;
    }

    const expEntries = document.querySelectorAll('.experience-entry');
    if (expEntries.length > 0) {
      const experiences = [];
      expEntries.forEach(entry => {
        const jtVal = entry.querySelector('.job-title')?.value || '';
        const emVal = entry.querySelector('.employer')?.value || '';
        const cityVal = entry.querySelector('.city')?.value || '';
        const smVal = entry.querySelector('.start-month')?.value || '';
        const syVal = entry.querySelector('.start-year')?.value || '';
        const emmVal = entry.querySelector('.end-month')?.value || '';
        const eyVal = entry.querySelector('.end-year')?.value || '';
        const descVal = entry.querySelector('.description')?.value || '';
        const sdVal = [smVal, syVal].filter(Boolean).join(' ');
        const edVal = eyVal === 'Present' ? 'Present' : [emmVal, eyVal].filter(Boolean).join(' ');
        if (jtVal || emVal) {
          experiences.push({ jobTitle: jtVal, employer: emVal, city: cityVal, startDate: sdVal, endDate: edVal, description: descVal });
        }
      });
      d.experiences = experiences;
    }

    const refEntries = document.querySelectorAll('.reference-entry');
    if (refEntries.length > 0) {
      const references = [];
      refEntries.forEach(entry => {
        const name = entry.querySelector('.ref-name')?.value || '';
        const title = entry.querySelector('.ref-title')?.value || '';
        const company = entry.querySelector('.ref-company')?.value || '';
        const email = entry.querySelector('.ref-email')?.value || '';
        const phone = entry.querySelector('.ref-phone')?.value || '';
        if (name) {
          references.push({ name, title, company, email, phone });
        }
      });
      d.references = references;
    }

    d.contact = c;
    localStorage.setItem('resumeData', JSON.stringify(d));
  }

  document.addEventListener('input', function (e) {
    const isModern = e.target.classList.contains('modern-editable');
    const isPeach = e.target.classList.contains('peach-editable');
    const isCorporate = e.target.classList.contains('corporate-editable');
    const isArtistic = e.target.classList.contains('artistic-editable');
    const isElite = e.target.classList.contains('elite-editable');
    const isMono = e.target.classList.contains('mono-editable');
    const isCream = e.target.classList.contains('cream-editable');
    const isMinimalist = e.target.classList.contains('mini-editable');
    if (!isModern && !isPeach && !isCorporate && !isArtistic && !isElite && !isMono && !isCream && !isMinimalist) return;

    const id = e.target.id;
    const text = e.target.innerText.trim();
    const prefix = isModern ? 'modern-' : (isPeach ? 'peach-' : (isCorporate ? 'corporate-' : (isArtistic ? 'artistic-' : (isElite ? 'elite-' : (isMono ? 'mono-' : (isCream ? 'cream-' : 'mini-'))))));

    // 1. Basic Fields
    if (id === prefix + 'name') {
      const parts = text.split(/\s+/);
      const first = parts[0] || '';
      const last = parts.slice(1).join(' ') || '';
      const fnInput = document.getElementById('firstName');
      const lnInput = document.getElementById('lastName');
      if (fnInput) fnInput.value = first;
      if (lnInput) lnInput.value = last;
    }
    else if (id === prefix + 'prof') {
      const pInput = document.getElementById('profession');
      if (pInput) pInput.value = text;
    }
    else if (id === prefix + 'phone-text') {
      const pInput = document.getElementById('phone');
      if (pInput) pInput.value = text;
    }
    else if (id === prefix + 'email-text') {
      const eInput = document.getElementById('email');
      if (eInput) eInput.value = text;
    }
    else if (id === prefix + 'location-text') {
      const parts = text.split(',');
      const country = (parts[0] || '').trim();
      const pin = (parts[1] || '').trim();
      const cInput = document.getElementById('country');
      const pinInput = document.getElementById('pincode');
      if (cInput) cInput.value = country;
      if (pinInput) pinInput.value = pin;
    }
    else if (id === prefix + 'linkedin-text') {
      const liInput = document.getElementById('linkedin');
      if (liInput) liInput.value = text;
    }
    else if (id === prefix + 'github-text') {
      const gitInput = document.getElementById('github');
      if (gitInput) gitInput.value = text;
    }
    else if (id === prefix + 'portfolio-text') {
      const portInput = document.getElementById('portfolio');
      if (portInput) portInput.value = text;
    }
    else if (id === prefix + 'summary') {
      const sInput = document.getElementById('summary');
      if (sInput) sInput.value = text;
    }

    // 2. Education Fields
    else if (id.startsWith(prefix + 'edu-')) {
      const match = id.match(new RegExp(prefix + 'edu-(\\d+)-(.+)'));
      if (match) {
        const idx = parseInt(match[1]);
        const field = match[2];
        const entries = document.querySelectorAll('.education-entry');
        if (entries[idx]) {
          if (field === 'school') {
            const inp = entries[idx].querySelector('.school-name');
            if (inp) inp.value = text;
          } else if (field === 'degree') {
            const inp = entries[idx].querySelector('.degree');
            if (inp) inp.value = text;
          } else if (field === 'years') {
            const parts = text.split('-');
            const start = (parts[0] || '').trim();
            const end = (parts[1] || '').trim();
            const startSel = entries[idx].querySelector('.start-year');
            const endSel = entries[idx].querySelector('.end-year');
            if (startSel) startSel.value = start;
            if (endSel) endSel.value = end;
          }
        }
      }
    }

    // 3. Skill Fields
    else if (id.startsWith(prefix + 'skill-')) {
      const idx = parseInt(id.replace(prefix + 'skill-', ''));
      const rows = document.querySelectorAll('.skill-input-row');
      if (rows[idx]) {
        const inp = rows[idx].querySelector('input');
        if (inp) inp.value = text;
      }
    }

    // 4. Experience Fields
    else if (id.startsWith(prefix + 'exp-')) {
      const match = id.match(new RegExp(prefix + 'exp-(\\d+)-(.+)'));
      if (match) {
        const idx = parseInt(match[1]);
        const sub = match[2];
        const entries = document.querySelectorAll('.experience-entry');
        if (entries[idx]) {
          if (sub === 'role') {
            const inp = entries[idx].querySelector('.job-title');
            if (inp) inp.value = text;
          } else if (sub === 'company') {
            const parts = text.split(',');
            const emp = (parts[0] || '').trim();
            const city = (parts[1] || '').trim();
            const empInp = entries[idx].querySelector('.employer');
            const cityInp = entries[idx].querySelector('.city');
            if (empInp) empInp.value = emp;
            if (cityInp) cityInp.value = city;
          } else if (sub === 'date') {
            const parts = text.split('-');
            const start = (parts[0] || '').trim();
            const end = (parts[1] || '').trim();
            const smInp = entries[idx].querySelector('.start-month');
            const syInp = entries[idx].querySelector('.start-year');
            const emInp = entries[idx].querySelector('.end-month');
            const eyInp = entries[idx].querySelector('.end-year');

            const sp = start.split(' ');
            if (sp.length === 2) {
              if (smInp) smInp.value = sp[0];
              if (syInp) syInp.value = sp[1];
            } else {
              if (syInp) syInp.value = start;
            }

            const ep = end.split(' ');
            if (end === 'Present') {
              if (eyInp) eyInp.value = 'Present';
            } else if (ep.length === 2) {
              if (emInp) emInp.value = ep[0];
              if (eyInp) eyInp.value = ep[1];
            } else {
              if (eyInp) eyInp.value = end;
            }
          } else if (sub.startsWith('bullet-')) {
            const bullets = [];
            let bIdx = 0;
            while (true) {
              const bEl = document.getElementById(prefix + `exp-${idx}-bullet-${bIdx}`);
              if (!bEl) break;
              bullets.push(bEl.innerText.trim());
              bIdx++;
            }
            const descInp = entries[idx].querySelector('.description');
            if (descInp) descInp.value = bullets.join('\n');
          }
        }
      }
    }

    // 5. Reference Fields
    else if (id.startsWith(prefix + 'ref-')) {
      const match = id.match(new RegExp(prefix + 'ref-(\\d+)-(.+)'));
      if (match) {
        const idx = parseInt(match[1]);
        const sub = match[2];
        const entries = document.querySelectorAll('.reference-entry');
        if (entries[idx]) {
          if (sub === 'name') {
            const inp = entries[idx].querySelector('.ref-name');
            if (inp) inp.value = text;
          } else if (sub === 'title') {
            const parts = text.split('/');
            const comp = (parts[0] || '').trim();
            const title = (parts[1] || '').trim();
            const compInp = entries[idx].querySelector('.ref-company');
            const titleInp = entries[idx].querySelector('.ref-title');
            if (compInp) compInp.value = comp;
            if (titleInp) titleInp.value = title;
          } else if (sub.startsWith('contact-')) {
            const phoneInp = entries[idx].querySelector('.ref-phone');
            const emailInp = entries[idx].querySelector('.ref-email');

            let phoneVal = '';
            let emailVal = '';

            let cIdx = 0;
            while (true) {
              const cEl = document.getElementById(prefix + `ref-${idx}-contact-${cIdx}`);
              if (!cEl) break;
              const val = cEl.innerText.trim();
              if (val.toLowerCase().includes('phone:')) {
                phoneVal = val.replace(/phone:/i, '').trim();
              } else if (val.toLowerCase().includes('email:')) {
                emailVal = val.replace(/email:/i, '').trim();
              } else if (val.includes('@')) {
                emailVal = val;
              } else {
                phoneVal = val;
              }
              cIdx++;
            }
            if (phoneInp) phoneInp.value = phoneVal;
            if (emailInp) emailInp.value = emailVal;
          }
        }
      }
    }

    // Save to localStorage directly
    saveDataFromLeftForm();

    // Trigger page's own preview hook if it exists
    const pageSave = window.updatePreview;
    if (typeof pageSave === 'function' && document.activeElement !== e.target) {
      pageSave();
    }
  });

  document.body.addEventListener('input', render);
  document.body.addEventListener('change', render);
  document.body.addEventListener('click', () => setTimeout(render, 60));

  const orig = window.updatePreview;
  window.updatePreview = function () { if (orig) orig(); render(); };

  // ── 7. Initial render ──
  render();

  // ── 8. Dynamically patch links to preserve template selection ──
  function patchStepLinks() {
    const activeTemplate = localStorage.getItem('selectedTemplate');
    if (activeTemplate) {
      document.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && (href.startsWith('builder') || href.includes('template='))) {
          try {
            const url = new URL(href, window.location.origin);
            url.searchParams.set('template', activeTemplate);
            a.setAttribute('href', url.pathname + url.search);
          } catch (e) {
            if (href.includes('.html')) {
              const base = href.split('?')[0];
              a.setAttribute('href', `${base}?template=${activeTemplate}`);
            }
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchStepLinks);
  } else {
    patchStepLinks();
  }
})();
