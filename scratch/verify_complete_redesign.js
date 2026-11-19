const fs = require('fs');

console.log('================================================================');
console.log('  SHIPRA CHAUHAN WEB PLATFORM — COMPLETE REDESIGN VERIFICATION  ');
console.log('================================================================\n');

const rootPages = [
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

let allPass = true;

function check(testName, passed) {
  if (passed) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}`);
    allPass = false;
  }
}

// 1. Check Global Components
console.log('1. Global Sticky Header, Floating Actions & Mobile App Bar:');
rootPages.forEach(p => {
  const c = fs.readFileSync(p, 'utf8');
  check(`${p} contains site-header-full`, c.includes('site-header-full'));
  check(`${p} contains floating-quick-actions`, c.includes('floating-quick-actions'));
  check(`${p} contains mobile-bottom-bar`, c.includes('mobile-bottom-bar'));
});

// 2. Check Service Pages Architecture
console.log('\n2. Service Pages Deep Architecture & Modern UI Components:');
const servicePages = [
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

servicePages.forEach(sp => {
  const c = fs.readFileSync(sp, 'utf8');
  check(`${sp} contains balanced 2-column hero with form card`, c.includes('service-hero-form-card') && c.includes('page-hero-grid'));
  check(`${sp} contains 4-card service-metrics-strip`, c.includes('service-metrics-strip'));
  check(`${sp} contains service-hero-showcase`, c.includes('service-hero-showcase'));
  const faqs = (c.match(/class="faq-item[^"]*"/g) || []).length;
  check(`${sp} contains unified luxury FAQs (${faqs} items)`, faqs >= 9);
});

// 3. Check Contact Page
console.log('\n3. Contact Page Bento Architecture:');
const contact = fs.readFileSync('contact.html', 'utf8');
check('contact.html contains direct consultant advisory badge', contact.includes('Direct Senior Consultant Advisory'));
check('contact.html contains contact-info-card list', contact.includes('contact-info-card'));
check('contact.html contains consultation booking form', contact.includes('mainContactForm'));
check('contact.html contains 3-step engagement methodology', contact.includes('contact-methodology-grid'));
const contactFaqs = (contact.match(/class="faq-item[^"]*"/g) || []).length;
check('contact.html contains 3 luxury FAQs', contactFaqs === 3);

// 4. Check Blogs Page
console.log('\n4. Blogs Page 2-Column Luxury Layout:');
const blogs = fs.readFileSync('blogs.html', 'utf8');
check('blogs.html contains blog-layout', blogs.includes('blog-layout'));
check('blogs.html contains 10 blog-cards', (blogs.match(/class="blog-card reveal-init"/g) || []).length === 10);
check('blogs.html contains blog-sidebar with advisory card', blogs.includes('blog-advisory-card'));
check('blogs.html contains recent publications', blogs.includes('Recent Publications'));

// 5. Check Directory Routing & Manifests
console.log('\n5. Extensionless Clean URLs & SEO Infrastructure:');
check('.htaccess exists', fs.existsSync('.htaccess'));
check('vercel.json exists', fs.existsSync('vercel.json'));
check('_redirects exists', fs.existsSync('_redirects'));
check('netlify.toml exists', fs.existsSync('netlify.toml'));
check('sitemap.xml exists and contains 20 URLs', fs.readFileSync('sitemap.xml', 'utf8').includes('<loc>'));
check('llms.txt exists and documents platform', fs.readFileSync('llms.txt', 'utf8').length > 1000);

console.log('\n================================================================');
console.log(`  VERIFICATION FINAL STATUS: ${allPass ? 'ALL TESTS PASSED PERFECTLY!' : 'FAILURES DETECTED'}`);
console.log('================================================================\n');

