const fs = require('fs');

console.log('=== VERIFYING AND POLISHING MASTER CSS ===');

let css = fs.readFileSync('css/style.css', 'utf8');

// Ensure body has proper base settings
if (!css.includes('body {')) {
  console.log('Adding body base settings');
}

// Check if all essential luxury classes are defined
const essentialClasses = [
  'site-header-full',
  'header-top-bar',
  'navbar-full',
  'services-mega-menu',
  'mega-item',
  'page-hero',
  'page-hero-grid',
  'service-hero-form-card',
  'service-metrics-strip',
  'service-hero-showcase',
  'capabilities-matrix-grid',
  'capability-card',
  'deliverables-checklist-grid',
  'comparison-grid',
  'comparison-agency',
  'comparison-shipra',
  'blog-layout',
  'blog-card',
  'blog-image-box',
  'blog-article-layout',
  'contact-bento-hero',
  'contact-grid',
  'contact-info-card',
  'methodology-step-card',
  'faq-list',
  'faq-item',
  'faq-trigger',
  'faq-icon-toggle',
  'faq-content',
  'auto-popup-overlay',
  'auto-popup-card',
  'floating-quick-actions',
  'mobile-bottom-bar',
  'site-footer'
];

let missing = [];
essentialClasses.forEach(c => {
  const reg = new RegExp('\\.' + c + '(?![a-zA-Z0-9_-])');
  if (!reg.test(css)) {
    missing.push(c);
  }
});

console.log('Missing essential classes:', missing);
console.log('Total CSS length:', css.length);

