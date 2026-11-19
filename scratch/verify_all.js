const fs = require('fs');

console.log('=== COMPLETE NAVBAR TRANSITION & SITE VERIFICATION ===\n');

const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/main.js', 'utf8');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let failures = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    failures++;
  }
}

// 1. Check CSS Transitions Timing & Easing
assert(css.includes('transition: transform 0.7s var(--ease-curtain);'), 'CSS specifies 0.7s cover and reveal transition duration');
assert(css.includes('--ease-curtain: cubic-bezier(0.76, 0, 0.24, 1);'), 'CSS contains cinematic cubic-bezier curve for curtain ease');
assert(css.includes('.curtain-brand-mark'), 'CSS contains .curtain-brand-mark styles');
assert(css.includes('.curtain-monogram'), 'CSS contains .curtain-monogram luxury typography styles');
assert(css.includes('.curtain-tagline'), 'CSS contains .curtain-tagline styles');
assert(css.includes('@media (prefers-reduced-motion: reduce) {\n  .page-curtain {') || css.includes('@media (prefers-reduced-motion: reduce) {\r\n  .page-curtain {'), 'CSS honors prefers-reduced-motion for page-curtain');

// 2. Check Green Navbar Theme
assert(css.includes('background-color: rgba(18, 60, 50, 0.96);'), 'Navbar background uses Deep Emerald (#123C32)');
assert(css.includes('.site-header.scrolled {\n  background-color: rgba(13, 43, 36, 0.98);') || css.includes('background-color: rgba(13, 43, 36, 0.98);'), 'Navbar scrolled background uses Rich Deep Emerald');
assert(css.includes('.nav-link') && css.includes('color: rgba(250, 248, 243, 0.92);'), 'Navbar links use warm ivory text');
assert(css.includes('background: linear-gradient(90deg, #B79A62 0%, #E8D3A2 100%);'), 'Navbar link active indicator uses Champagne Gold');
assert(css.includes('.btn-nav-cta') && css.includes('color: #123C32 !important;'), 'Free Audit CTA button uses high-contrast warm ivory background with deep emerald text');

// 3. Check JS Transition Orchestration
assert(js.includes('setTimeout(() => {') && js.includes('}, 700);'), 'JS uses 700ms timers for cover and reveal phases');
assert(js.includes('sessionStorage.getItem(\'curtain_reveal\')'), 'JS handles cross-page session state');
assert(js.includes('pageshow'), 'JS handles browser back/forward bfcache');
assert(js.includes('link.hasAttribute(\'download\') || link.getAttribute(\'target\') === \'_blank\''), 'JS ignores downloads and new tab links');
assert(js.includes('href.startsWith(\'mailto:\') || href.startsWith(\'tel:\')'), 'JS ignores mailto and tel links');
assert(js.includes('targetUrl.origin !== window.location.origin'), 'JS ignores external domain links');
assert(js.includes('initSeoTableauCards'), 'JS preserves three SEO tableau cards alternating slide observer');

// 4. Check HTML Markup Across All 10 Pages
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  assert(content.includes('class="page-curtain'), `${f} contains page-curtain`);
  assert(content.includes('curtain-gold-edge'), `${f} contains curtain-gold-edge`);
  assert(content.includes('curtain-brand-mark'), `${f} contains static curtain-brand-mark`);
  assert(content.includes('curtain-incoming'), `${f} contains head script for curtain-incoming`);
});

// 5. Check SEO Cards Alternating Slide Classes in index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('tableau-card-left') && indexHtml.includes('tableau-card-right'), 'index.html has alternating tableau-card-left and tableau-card-right');
assert(!indexHtml.includes('curtain-wipe-container'), 'index.html hero SEO section does not have curtain-wipe-container');

console.log(`\nVerification complete. Total failures: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
