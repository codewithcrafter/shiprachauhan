const fs = require('fs');

const pages = [
  'index.html',
  'about.html',
  'contact.html',
  'blogs.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

console.log('=== CHECKING ALL PAGES FOR COMPLETE REDESIGN ===');

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const size = content.length;
  const lines = content.split('\n').length;
  const hasHeader = content.includes('site-header-full');
  const hasPopup = content.includes('autoPopupOverlay');
  const hasFloat = content.includes('floating-quick-actions');
  const hasMobileBar = content.includes('mobile-bottom-bar');
  const faqItems = (content.match(/class="[^"]*faq-item[^"]*"/g) || []).length;
  const hasMetrics = content.includes('service-metrics-strip');
  const hasFormCard = content.includes('service-hero-form-card') || content.includes('form-box');

  console.log(`\nPAGE: ${p}`);
  console.log(`  Size: ${size} bytes | Lines: ${lines}`);
  console.log(`  Header: ${hasHeader} | Popup: ${hasPopup} | Float: ${hasFloat} | MobileBar: ${hasMobileBar}`);
  console.log(`  FAQs: ${faqItems} | MetricsStrip: ${hasMetrics} | FormCard: ${hasFormCard}`);
});

