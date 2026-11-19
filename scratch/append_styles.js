const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newStyles = `

/* ==========================================================================
   ADVANCED SYSTEM ENHANCEMENTS (PARITY WITH SANJEEV KUMAR MALIK ARCHITECTURE)
   Quiet Luxury Art-Directed Palette: Deep Emerald, Champagne Gold, Ivory
   ========================================================================== */

/* 1. DUAL-TIER MODERN STICKY HEADER */
.site-header-full {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(18, 60, 50, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(183, 154, 98, 0.22);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.header-top-bar {
  background: rgba(13, 43, 36, 0.98);
  border-bottom: 1px solid rgba(183, 154, 98, 0.15);
  font-size: 0.8rem;
  color: rgba(250, 248, 243, 0.85);
  padding: 0.4rem 0;
}

.header-top-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.top-bar-left, .top-bar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  color: #C9B283;
}

.status-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: statusPulse 2s infinite;
}

@keyframes statusPulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.top-bar-sep {
  color: rgba(183, 154, 98, 0.4);
  font-size: 0.75rem;
}

.top-contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(250, 248, 243, 0.9);
  text-decoration: none;
  transition: color 0.2s ease;
}

.top-contact-link:hover {
  color: #C9B283;
}

.top-icon {
  width: 13px;
  height: 13px;
}

.top-whatsapp-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(37, 211, 102, 0.16);
  border: 1px solid rgba(37, 211, 102, 0.35);
  color: #25D366;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.top-whatsapp-pill:hover {
  background: #25D366;
  color: #0D2B24;
}

.navbar-full {
  padding: 0.75rem 0;
}

.navbar-full-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand-modern {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: #FAF8F3;
}

.brand-monogram-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1D5B49 0%, #123C32 100%);
  border: 1.5px solid #B79A62;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.15rem;
  color: #FAF8F3;
  box-shadow: 0 4px 12px rgba(18, 60, 50, 0.4);
}

.brand-text-group {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: #FAF8F3;
  line-height: 1.15;
}

.brand-name span {
  color: #B79A62;
}

.brand-role {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: rgba(250, 248, 243, 0.7);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Nav Menu & Mega Menu */
.site-header-full .nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-header-full .nav-link {
  color: rgba(250, 248, 243, 0.9);
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  padding: 0.5rem 0.25rem;
  position: relative;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.site-header-full .nav-link:hover,
.site-header-full .nav-link.active {
  color: #B79A62;
}

.site-header-full .nav-dropdown {
  position: relative;
}

.services-mega-menu {
  position: absolute;
  top: 100%;
  left: -20px;
  width: 440px;
  background: rgba(18, 60, 50, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(183, 154, 98, 0.3);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 1010;
}

.site-header-full .nav-dropdown:hover .services-mega-menu,
.site-header-full .nav-dropdown:focus-within .services-mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.mega-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem;
  border-radius: 0.6rem;
  text-decoration: none;
  color: #FAF8F3;
  transition: background 0.2s ease;
}

.mega-item:hover {
  background: rgba(183, 154, 98, 0.15);
}

.mega-icon-svg {
  width: 22px;
  height: 22px;
  color: #B79A62;
  flex-shrink: 0;
}

.mega-title {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #FAF8F3;
}

.mega-desc {
  display: block;
  font-size: 0.72rem;
  color: rgba(250, 248, 243, 0.65);
}

.header-cta-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-header-audit {
  padding: 0.55rem 1.25rem;
  background: linear-gradient(135deg, #B79A62 0%, #C9B283 100%);
  color: #123C32 !important;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(183, 154, 98, 0.35);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-header-audit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(183, 154, 98, 0.5);
}


/* 2. FLOATING QUICK ACTIONS (DESKTOP) & MOBILE BOTTOM BAR */
.floating-quick-actions {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9990;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.floating-action-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FAF8F3;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(18, 60, 50, 0.35);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
  position: relative;
}

.floating-action-btn:hover {
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 12px 30px rgba(18, 60, 50, 0.5);
}

.floating-whatsapp {
  background: #25D366;
  color: #0D2B24;
}

.floating-call {
  background: #123C32;
  border: 1.5px solid #B79A62;
  color: #C9B283;
}

.mobile-bottom-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(18, 60, 50, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(183, 154, 98, 0.3);
  padding: 0.55rem 1rem;
}

.mobile-bottom-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 480px;
  margin: 0 auto;
}

.mobile-bottom-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.mobile-btn-call {
  background: #FAF8F3;
  color: #123C32;
  border: 1px solid #B79A62;
}

.mobile-btn-whatsapp {
  background: #25D366;
  color: #0D2B24;
}

@media (max-width: 768px) {
  .floating-quick-actions {
    display: none !important;
  }
  .mobile-bottom-bar {
    display: block !important;
  }
  body {
    padding-bottom: 65px;
  }
}


/* 3. EXCITING 3-SECOND TIMED LEAD POP-UP MODAL */
.auto-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(13, 43, 36, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.auto-popup-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.auto-popup-card {
  width: 100%;
  max-width: 520px;
  background: #FFFFFF;
  border-radius: 1.75rem;
  padding: 2.25rem 2rem 2rem;
  box-shadow: 0 35px 80px -15px rgba(18, 60, 50, 0.4), 0 0 0 1px rgba(183, 154, 98, 0.25) inset;
  position: relative;
  overflow: hidden;
  transform: scale(0.65) translateY(40px) rotate(-2deg);
  opacity: 0;
  filter: blur(8px);
}

.auto-popup-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #123C32, #1D5B49, #B79A62, #C9B283, #123C32);
  background-size: 300% 100%;
  animation: popupBorderGlow 4s linear infinite;
}

@keyframes popupBorderGlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 300% 0%; }
}

.auto-popup-overlay.open .auto-popup-card {
  animation: popupDramaticEntrance 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes popupDramaticEntrance {
  0% {
    transform: scale(0.6) translateY(60px) rotate(-3deg);
    opacity: 0;
    filter: blur(10px);
  }
  65% {
    transform: scale(1.03) translateY(-8px) rotate(0.8deg);
    opacity: 1;
    filter: blur(0px);
  }
  85% {
    transform: scale(0.985) translateY(2px) rotate(-0.3deg);
  }
  100% {
    transform: scale(1) translateY(0) rotate(0);
    opacity: 1;
    filter: blur(0px);
  }
}

.popup-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #F4EFE6;
  border: none;
  font-size: 1.3rem;
  color: #3E443C;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.popup-close-btn:hover {
  background: #E6EDE5;
  color: #123C32;
  transform: rotate(90deg) scale(1.08);
}

.popup-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.8rem;
  background: #F0F4EF;
  border: 1px solid rgba(29, 91, 73, 0.2);
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #123C32;
  margin-bottom: 0.75rem;
}

.popup-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: #142820;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
}

.popup-desc {
  font-size: 0.88rem;
  color: #3E443C;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.popup-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.popup-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: left;
}

.popup-form label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #252923;
}

.popup-form .form-input,
.popup-form .form-select,
.popup-form .form-textarea {
  background: #FAF8F3;
  border: 1.5px solid rgba(37, 41, 35, 0.15);
  border-radius: 10px;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  color: #142820;
  font-family: var(--font-sans);
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease;
  outline: none;
}

.popup-form .form-input:focus,
.popup-form .form-select:focus,
.popup-form .form-textarea:focus {
  border-color: #B79A62;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(183, 154, 98, 0.18);
}

.popup-form .form-textarea {
  resize: vertical;
  min-height: 60px;
}

.btn-popup-submit {
  width: 100%;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, #123C32 0%, #1D5B49 100%);
  color: #FAF8F3;
  font-weight: 800;
  font-size: 0.95rem;
  font-family: var(--font-sans);
  border: 1px solid #B79A62;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(18, 60, 50, 0.35);
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.btn-popup-submit:hover {
  background: linear-gradient(135deg, #1D5B49 0%, #123C32 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(18, 60, 50, 0.45);
}

.popup-footer-note {
  font-size: 0.72rem;
  color: #77766F;
  text-align: center;
  margin-top: 0.5rem;
}

.popup-success-banner {
  display: none;
  background: #F0F4EF;
  border: 1.5px solid #1D5B49;
  border-radius: 14px;
  padding: 1.75rem 1.25rem;
  text-align: center;
}

.popup-success-banner.visible {
  display: block;
}


/* 4. SERVICE HERO CONSULTATION FORM CARD */
.service-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(360px, 420px);
  gap: 3.5rem;
  align-items: center;
}

.service-hero-form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(183, 154, 98, 0.3);
  border-radius: 1.5rem;
  padding: 1.75rem;
  box-shadow: 0 20px 50px -10px rgba(18, 60, 50, 0.15), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset;
  width: 100%;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.service-hero-form-card:hover {
  border-color: #B79A62;
  box-shadow: 0 25px 60px -10px rgba(18, 60, 50, 0.25);
}

.service-form-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.25rem 0.7rem;
  background: #F0F4EF;
  border: 1px solid rgba(29, 91, 73, 0.2);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #123C32;
  margin-bottom: 0.5rem;
}

.service-form-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: #142820;
  margin-bottom: 0.3rem;
}

.service-form-desc {
  font-size: 0.82rem;
  color: #3E443C;
  line-height: 1.45;
  margin-bottom: 1rem;
}

.service-hero-form-card .form-group {
  margin-bottom: 0.7rem;
}

.service-hero-form-card .form-input,
.service-hero-form-card .form-textarea {
  width: 100%;
  background: #FAF8F3;
  border: 1px solid rgba(37, 41, 35, 0.15);
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  font-size: 0.85rem;
  color: #142820;
  outline: none;
  box-sizing: border-box;
}

.service-hero-form-card .form-input:focus,
.service-hero-form-card .form-textarea:focus {
  border-color: #B79A62;
  background: #FFFFFF;
}

.btn-service-submit {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #123C32 0%, #1D5B49 100%);
  color: #FAF8F3;
  font-weight: 700;
  font-size: 0.88rem;
  border: 1px solid #B79A62;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-service-submit:hover {
  background: linear-gradient(135deg, #1D5B49 0%, #123C32 100%);
  transform: translateY(-1px);
}

.service-form-success {
  display: none;
  background: #F0F4EF;
  border: 1px solid #1D5B49;
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.82rem;
  color: #123C32;
  margin-top: 0.5rem;
}

@media (max-width: 992px) {
  .service-hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}


/* 5. BLOG ARTICLE 2-COLUMN LAYOUT & STICKY SIDEBAR */
.blog-article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 3.5rem;
  align-items: start;
}

.blog-article-content {
  min-width: 0;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #77766F;
  margin-bottom: 1.5rem;
}

.breadcrumb-nav a {
  color: #123C32;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-nav a:hover {
  color: #B79A62;
}

.article-hero-header {
  margin-bottom: 2rem;
}

.article-meta-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  font-size: 0.8rem;
  color: #77766F;
  margin-bottom: 0.75rem;
}

.blog-category-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: #F0F4EF;
  border: 1px solid rgba(29, 91, 73, 0.2);
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #123C32;
  text-decoration: none;
}

.article-main-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: #142820;
  margin-bottom: 1rem;
}

.article-featured-image-box {
  width: 100%;
  height: 380px;
  border-radius: 1.25rem;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 15px 35px -5px rgba(18, 60, 50, 0.12);
  border: 1px solid rgba(183, 154, 98, 0.25);
}

.article-featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-prose {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #252923;
}

.article-prose h2 {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 800;
  color: #142820;
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(37, 41, 35, 0.1);
}

.article-prose h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: #142820;
  margin: 1.75rem 0 0.75rem;
}

.article-prose p {
  margin-bottom: 1.4rem;
}

.article-prose ul, .article-prose ol {
  margin: 1rem 0 1.5rem 1.5rem;
  padding: 0;
}

.article-prose li {
  margin-bottom: 0.5rem;
}

.article-callout-box {
  background: #F0F4EF;
  border-left: 4px solid #123C32;
  border-radius: 0 12px 12px 0;
  padding: 1.25rem 1.5rem;
  margin: 2rem 0;
}

.article-callout-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 800;
  font-size: 0.95rem;
  color: #123C32;
  margin-bottom: 0.45rem;
}

.article-callout-desc {
  font-size: 0.92rem;
  color: #3E443C;
  line-height: 1.6;
}

.article-footer-cta {
  background: linear-gradient(135deg, #FAF8F3 0%, #F0F4EF 100%);
  border: 1px solid rgba(183, 154, 98, 0.35);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  text-align: center;
  margin: 3rem 0;
}

.article-nav-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(37, 41, 35, 0.12);
}

.article-nav-card {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  background: #FFFFFF;
  border: 1px solid rgba(37, 41, 35, 0.1);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.article-nav-card:hover {
  border-color: #B79A62;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(18, 60, 50, 0.1);
}

.article-nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #B79A62;
  margin-bottom: 0.25rem;
}

.article-nav-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #142820;
  line-height: 1.35;
}

/* RIGHT STICKY SIDEBAR */
.blog-sidebar-sticky {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.toc-card, .blog-form-card, .tags-card, .author-card-sidebar {
  background: #FFFFFF;
  border: 1px solid rgba(37, 41, 35, 0.12);
  border-radius: 1.25rem;
  padding: 1.35rem;
  box-shadow: 0 10px 25px -5px rgba(18, 60, 50, 0.05);
}

.toc-header, .tags-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.92rem;
  color: #142820;
  padding-bottom: 0.65rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(37, 41, 35, 0.08);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.toc-link {
  font-size: 0.82rem;
  color: #3E443C;
  text-decoration: none;
  line-height: 1.4;
  display: block;
  padding: 0.25rem 0.4rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.toc-link:hover, .toc-link.active {
  color: #123C32;
  background: #F0F4EF;
  font-weight: 700;
  border-left: 2.5px solid #B79A62;
}

.article-tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.article-tag {
  display: inline-block;
  padding: 0.25rem 0.55rem;
  background: #FAF8F3;
  border: 1px solid rgba(37, 41, 35, 0.1);
  border-radius: 6px;
  font-size: 0.75rem;
  color: #3E443C;
  text-decoration: none;
  transition: all 0.2s ease;
}

.article-tag:hover {
  background: #123C32;
  color: #FAF8F3;
  border-color: #123C32;
}

.author-sidebar-flex {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.author-sidebar-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #B79A62;
}

.author-sidebar-name {
  font-weight: 800;
  font-size: 0.95rem;
  color: #142820;
}

.author-sidebar-title {
  font-size: 0.75rem;
  color: #77766F;
}

@media (max-width: 992px) {
  .blog-article-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .blog-article-content {
    order: 1;
  }
  .blog-sidebar-sticky {
    order: 2;
    position: static;
  }
}
`;

if (!css.includes('/* 1. DUAL-TIER MODERN STICKY HEADER */')) {
  fs.appendFileSync(cssPath, newStyles);
  console.log('Appended advanced styles to css/style.css successfully.');
} else {
  console.log('Styles already present.');
}

