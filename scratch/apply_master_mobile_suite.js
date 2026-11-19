const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Fix the faulty .header-cta-group { display: none; } at line 5642
css = css.replace(
  /\.site-header-full \.nav-dropdown\.open \.services-mega-menu\s*\{\s*display:\s*grid;\s*\}\s*\.header-cta-group\s*\{\s*display:\s*none;\s*\}/g,
  `.site-header-full .nav-dropdown.open .services-mega-menu {
    display: grid;
  }

  .header-cta-group {
    display: flex !important;
    align-items: center !important;
    gap: 0.65rem !important;
  }

  .mobile-nav-toggle {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .desktop-only,
  .nav-call-badge {
    display: none !important;
  }`
);

// 2. Append Master Mobile Responsive Perfection Suite
const masterMobileCss = `
/* ==========================================================================
   MASTER MOBILE VIEW & RESPONSIVE PERFECTION SUITE
   Zero horizontal overflow, zero clipped UI, docked Call & WhatsApp bar
   ========================================================================== */

/* 1. Global Viewport & Text Overflow Prevention */
html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
}

*, *::before, *::after {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word !important;
  word-wrap: break-word !important;
}

p, a, span, li, blockquote {
  overflow-wrap: break-word !important;
}

img, svg, video, iframe, picture {
  max-width: 100% !important;
  height: auto;
}

table {
  max-width: 100% !important;
}

pre, code {
  max-width: 100% !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
}

/* 2. Master Mobile Docked Bottom Bar (Phone & Tablet View <= 900px) */
.mobile-bottom-bar {
  display: none;
}

@media (max-width: 900px) {
  body {
    padding-bottom: calc(75px + env(safe-area-inset-bottom, 0px)) !important;
  }

  .floating-quick-actions {
    display: none !important;
  }

  .mobile-bottom-bar {
    display: block !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    z-index: 99999 !important;
    background: rgba(18, 60, 50, 0.98) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-top: 1.5px solid rgba(183, 154, 98, 0.45) !important;
    box-shadow: 0 -8px 28px rgba(10, 35, 29, 0.35) !important;
    padding: 10px 14px calc(10px + env(safe-area-inset-bottom, 0px)) 14px !important;
    box-sizing: border-box !important;
    margin: 0 !important;
  }

  .mobile-bottom-inner {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: stretch !important;
    gap: 12px !important;
    max-width: 520px !important;
    margin: 0 auto !important;
    width: 100% !important;
  }

  .mobile-bottom-btn {
    flex: 1 !important;
    height: 48px !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    border-radius: 12px !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    letter-spacing: -0.01em !important;
    text-decoration: none !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18) !important;
    transition: transform 0.15s ease, filter 0.15s ease !important;
  }

  .mobile-bottom-btn:active {
    transform: scale(0.97) !important;
  }

  .mobile-bottom-btn svg {
    width: 20px !important;
    height: 20px !important;
    flex-shrink: 0 !important;
  }

  /* Call Button — Luxury Ivory & Gold */
  .mobile-btn-call {
    background: #FAF8F3 !important;
    color: #123C32 !important;
    border: 1.5px solid #B79A62 !important;
  }

  .mobile-btn-call svg {
    stroke: #123C32 !important;
  }

  .mobile-btn-call span {
    color: #123C32 !important;
  }

  /* WhatsApp Button — High-Impact Official WhatsApp Green */
  .mobile-btn-whatsapp {
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important;
    color: #FFFFFF !important;
    border: 1.5px solid #20BA5A !important;
  }

  .mobile-btn-whatsapp svg {
    fill: #FFFFFF !important;
  }

  .mobile-btn-whatsapp span {
    color: #FFFFFF !important;
  }
}

/* 3. Mobile Header & Clean Drawer (<= 960px) */
@media (max-width: 960px) {
  .site-header-full .nav-menu {
    position: fixed !important;
    top: 5rem !important;
    left: 1rem !important;
    right: 1rem !important;
    background: rgba(18, 60, 50, 0.98) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border: 1.5px solid rgba(183, 154, 98, 0.4) !important;
    border-radius: 1.25rem !important;
    padding: 1.5rem !important;
    flex-direction: column !important;
    gap: 0.85rem !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
    transform: translateY(-120%) !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    max-height: calc(100vh - 86px) !important;
    overflow-y: auto !important;
    z-index: 9999 !important;
  }

  .site-header-full .nav-menu.open,
  .site-header-full .nav-menu.active {
    transform: translateY(0) !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }

  .mobile-nav-toggle {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .header-cta-group {
    display: flex !important;
    align-items: center !important;
    gap: 0.65rem !important;
  }
}

/* 4. Top Micro-Bar & Logo Fitting (<= 640px) */
@media (max-width: 640px) {
  .header-top-bar {
    display: none !important;
  }

  .brand-role {
    display: none !important;
  }

  .btn-header-audit {
    padding: 0.45rem 0.9rem !important;
    font-size: 0.8rem !important;
  }

  .navbar-full-container {
    padding: 0.65rem 1rem !important;
  }
}

@media (max-width: 480px) {
  .btn-header-audit {
    display: none !important;
  }
}

/* 5. Responsive Typography & Layout Perfection (<= 768px & <= 640px) */
@media (max-width: 768px) {
  .hero-copy h1,
  .page-hero-grid h1,
  .article-main-title {
    font-size: clamp(1.85rem, 6.8vw, 2.6rem) !important;
    line-height: 1.15 !important;
  }

  h2 {
    font-size: clamp(1.4rem, 5.5vw, 1.95rem) !important;
    line-height: 1.25 !important;
  }

  .section-lead,
  .lead-text,
  .page-hero-desc,
  .hero-lead {
    font-size: 1.02rem !important;
    line-height: 1.65 !important;
  }

  /* Grid Stackings */
  .split-layout,
  .hub-layout,
  .page-hero-grid,
  .contact-grid,
  .contact-bento-hero,
  .contact-methodology-grid,
  .case-study-grid,
  .comparison-grid,
  .grid-2,
  .grid-3,
  .grid-4,
  .blog-article-layout,
  .blog-layout {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }

  .form-group-grid {
    grid-template-columns: 1fr !important;
    gap: 0.75rem !important;
  }

  .comparison-bar {
    flex-direction: column !important;
    gap: 1.25rem !important;
    padding: 1.5rem !important;
  }

  /* Service Hero Form Card on Mobile */
  .service-hero-form-card {
    padding: 1.35rem 1.15rem !important;
    border-radius: 1.25rem !important;
    margin-top: 1.5rem !important;
  }

  .service-hero-showcase {
    margin-top: 1.5rem !important;
  }

  /* Service Metrics Strip on Mobile */
  .service-metrics-strip {
    grid-template-columns: 1fr !important;
    padding: 1.35rem !important;
    gap: 1.25rem !important;
    margin: 1.5rem 0 !important;
  }

  .service-metric-item:not(:last-child)::after {
    display: none !important;
  }

  /* Capabilities & Deliverables */
  .capabilities-matrix-grid,
  .deliverables-checklist-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  /* Blog Layout on Mobile */
  .blog-sidebar-sticky {
    position: static !important;
    width: 100% !important;
    margin-top: 2.5rem !important;
  }

  .article-nav-row {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .article-meta-strip {
    flex-wrap: wrap !important;
    gap: 0.4rem !important;
  }

  /* FAQ Accordion Mobile Spacing */
  .faq-question-btn {
    padding: 1.1rem 1.25rem !important;
    font-size: 0.98rem !important;
    gap: 0.75rem !important;
  }

  .faq-answer {
    padding: 0 1.25rem 1.25rem !important;
    font-size: 0.92rem !important;
    line-height: 1.65 !important;
  }

  /* Auto-Popup Card on Mobile */
  .auto-popup-overlay {
    padding: 1rem !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  .auto-popup-card {
    width: 100% !important;
    max-width: 480px !important;
    max-height: 88vh !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
    padding: 1.5rem 1.25rem !important;
    border-radius: 1.25rem !important;
  }

  /* Form Controls No iOS Zoom */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  select,
  textarea {
    font-size: 16px !important;
  }
}
`;

css += '\n' + masterMobileCss;
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✓ Successfully applied Master Mobile Responsive Suite to css/style.css');

