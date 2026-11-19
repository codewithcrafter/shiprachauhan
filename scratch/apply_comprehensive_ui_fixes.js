const fs = require('fs');

console.log('=== APPLYING COMPREHENSIVE UI FIXES ===');

// =========================================================================
// 1. UPDATE CSS IN style.css
// =========================================================================
let css = fs.readFileSync('css/style.css', 'utf8');

// Replace position: fixed on .site-header-full with position: sticky
css = css.replace(
  /\.site-header-full\s*\{[\s\S]*?position:\s*fixed;[\s\S]*?z-index:\s*1000;/,
  `.site-header-full {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;`
);

// Append comprehensive fixes for Mobile Drawer, Desktop-Only, Compare Bar, and Responsive Layouts
const cssFixes = `
/* ==========================================================================
   Comprehensive Layout, Mobile Drawer & Responsive Alignment Fixes
   ========================================================================== */

/* Desktop-only helper */
.desktop-only {
  display: inline-flex;
}

@media (max-width: 960px) {
  .desktop-only {
    display: none !important;
  }
}

/* Compare Visual Bar */
.compare-visual-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  margin: 2.5rem 0;
  padding: 1.25rem 2.5rem;
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.3);
  border-radius: 100px;
  box-shadow: 0 4px 18px -2px rgba(18, 60, 50, 0.05);
}

.compare-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.compare-pill .pill-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #B79A62;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.compare-pill strong {
  font-family: var(--font-display, 'Playfair Display', serif);
  font-size: 1.15rem;
  color: #123C32;
}

.compare-arrow {
  font-family: var(--font-mono, monospace);
  font-size: 0.82rem;
  color: #77766F;
  font-weight: 600;
}

@media (max-width: 640px) {
  .compare-visual-bar {
    flex-direction: column;
    border-radius: 16px;
    padding: 1.25rem;
    gap: 0.85rem;
  }
}

/* Service Hero Showcase Illustration Card */
.service-hero-showcase {
  margin: 2.5rem 0 1rem;
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.28);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px -4px rgba(18, 60, 50, 0.08);
}

.service-hero-showcase img {
  width: 100%;
  height: auto;
  max-height: 440px;
  object-fit: cover;
  display: block;
}

/* Mobile Navigation Drawer for Dual-Tier Header */
@media (max-width: 960px) {
  .site-header-full .nav-menu {
    position: fixed;
    top: 86px;
    left: 0;
    right: 0;
    background: rgba(18, 60, 50, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(183, 154, 98, 0.3);
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 2rem 2.5rem;
    gap: 1rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    transform: translateY(-120%);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: calc(100vh - 86px);
    overflow-y: auto;
    z-index: 999;
  }

  .site-header-full .nav-menu.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .site-header-full .nav-link {
    font-size: 1.15rem;
    width: 100%;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(183, 154, 98, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .site-header-full .nav-dropdown {
    width: 100%;
  }

  .services-mega-menu {
    position: static;
    width: 100%;
    display: none;
    grid-template-columns: 1fr;
    opacity: 1;
    visibility: visible;
    transform: none;
    pointer-events: auto;
    box-shadow: none;
    background: rgba(13, 43, 36, 0.95);
    padding: 0.75rem;
    margin-top: 0.5rem;
    border-radius: 12px;
  }

  .site-header-full .nav-dropdown.open .services-mega-menu {
    display: grid;
  }

  .header-cta-group {
    display: none;
  }
}

/* Blog Image Box Responsive Aspect Ratio */
.blog-image-box {
  width: 100% !important;
  aspect-ratio: 16 / 9 !important;
  height: auto !important;
  max-height: 380px !important;
  overflow: hidden !important;
  background: #FAF8F3 !important;
}

.blog-image-box img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* Form Group Grid Responsiveness */
.form-group-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .form-group-grid {
    grid-template-columns: 1fr !important;
    gap: 0.85rem !important;
  }
}
`;

css += '\n' + cssFixes;
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✓ Updated css/style.css successfully!');


// =========================================================================
// 2. UPDATE js/main.js (Disable popup on contact page + fix dropdown toggle)
// =========================================================================
let js = fs.readFileSync('js/main.js', 'utf8');

// Update init3SecondAutoPopup to not fire on contact page
const oldPopupCheck = "function init3SecondAutoPopup() {";
const newPopupCheck = `function init3SecondAutoPopup() {
  // Never fire popup on contact page (user is already on the inquiry form)
  if (window.location.pathname.includes('contact') || document.getElementById('mainContactForm') || document.querySelector('.contact-info, .contact-bento-hero')) {
    return;
  }`;

if (!js.includes("Never fire popup on contact page")) {
  js = js.replace(oldPopupCheck, newPopupCheck);
}

// Add mobile dropdown toggle support for .nav-dropdown
const mobileDropdownCode = `
  // Mobile dropdown toggle for services
  document.querySelectorAll('.site-header-full .nav-dropdown > a').forEach(toggleLink => {
    toggleLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        const parent = toggleLink.parentElement;
        parent.classList.toggle('open');
      }
    });
  });
`;

if (!js.includes("Mobile dropdown toggle for services")) {
  js = js.replace("highlightActiveNav();", "highlightActiveNav();\n" + mobileDropdownCode);
}

fs.writeFileSync('js/main.js', js, 'utf8');
console.log('✓ Updated js/main.js successfully!');


// =========================================================================
// 3. FIX contact.html (Remove popup modal, fix form-group-grid inline styles)
// =========================================================================
let contactHtml = fs.readFileSync('contact.html', 'utf8');

// Clean inline styles on form-group-grid
contactHtml = contactHtml.replace(/<div class="form-group-grid"[^>]*>/g, '<div class="form-group-grid">');

// Remove autoPopupOverlay from contact.html so it never intrudes
contactHtml = contactHtml.replace(/<!-- 3-Second Lead Capture Popup Modal -->[\s\S]*?<!-- Floating Quick Actions/, '<!-- Floating Quick Actions');

fs.writeFileSync('contact.html', contactHtml, 'utf8');
console.log('✓ Cleaned contact.html successfully!');


// =========================================================================
// 4. FIX blogs.html (Fix unescaped quote in alt tag, remove inline sticky on sidebar)
// =========================================================================
let blogsHtml = fs.readFileSync('blogs.html', 'utf8');

// Fix unescaped quotes in alt tag
blogsHtml = blogsHtml.replace(
  /alt="Voice Search and Local SEO: What "Near Me" Queries Actually Need"/g,
  'alt="Voice Search and Local SEO: What &quot;Near Me&quot; Queries Actually Need"'
);

// Remove inline position: sticky from sidebar so it flows naturally
blogsHtml = blogsHtml.replace(
  /<aside class="blog-sidebar" style="position: sticky; top: 110px;">/g,
  '<aside class="blog-sidebar">'
);

fs.writeFileSync('blogs.html', blogsHtml, 'utf8');
console.log('✓ Cleaned blogs.html successfully!');


// =========================================================================
// 5. FIX SERVICE PAGES (Restore clean 2-column hero: Content + Form Card)
//    And move the hero illustration into a clean showcase below the metrics strip!
// =========================================================================
const servicePages = [
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

servicePages.forEach(sp => {
  let content = fs.readFileSync(sp, 'utf8');
  console.log(`Processing service hero for ${sp}...`);

  // Check if page-hero-grid has hero-image-wrap AND service-hero-form-card inside it
  const heroGridIdx = content.indexOf('<div class="container page-hero-grid">');
  const heroEndIdx = content.indexOf('</section>', heroGridIdx);

  if (heroGridIdx !== -1 && heroEndIdx !== -1) {
    const heroGridSnippet = content.substring(heroGridIdx, heroEndIdx);
    
    // Extract hero-image-wrap if present inside heroGridSnippet
    const imgMatch = heroGridSnippet.match(/<div class="hero-image-wrap[^"]*">([\s\S]*?)<\/div>/);
    if (imgMatch) {
      const fullImgWrap = imgMatch[0];
      const innerImgTag = imgMatch[1].trim();

      // Remove hero-image-wrap from inside page-hero-grid
      let updatedHeroGrid = heroGridSnippet.replace(fullImgWrap, '');

      // Create a luxury showcase banner for this image below the metrics strip
      const showcaseHtml = `
  <!-- Featured Service Architecture Showcase -->
  <div class="container">
    <div class="service-hero-showcase reveal-init">
      ${innerImgTag}
    </div>
  </div>
`;

      content = content.substring(0, heroGridIdx) + updatedHeroGrid + content.substring(heroEndIdx);

      // Place showcase right after </section> of service-metrics-strip
      const metricsEndIdx = content.indexOf('</section>', content.indexOf('service-metrics-strip'));
      if (metricsEndIdx !== -1) {
        const insertPos = metricsEndIdx + '</section>'.length;
        content = content.substring(0, insertPos) + '\n' + showcaseHtml + content.substring(insertPos);
      }
      
      console.log(`  ✓ Restored 2-column hero and placed showcase image on ${sp}`);
    }
  }

  // Also fix any unclosed container/faq tags in ecommerce-seo.html
  if (sp === 'ecommerce-seo.html') {
    // Check if commented out tags exist
    content = content.replace(/<!--\s*<\/div>\s*<\/div>\s*<\/section>\s*-->/g, '');
  }

  fs.writeFileSync(sp, content, 'utf8');
});

console.log('\n=== ALL UI FIXES APPLIED SUCCESSFULLY! ===');

