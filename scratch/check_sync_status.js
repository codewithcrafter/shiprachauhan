const fs = require('fs');
const path = require('path');

const pairs = [
  { root: 'about.html', sub: 'about/index.html' },
  { root: 'contact.html', sub: 'contact/index.html' },
  { root: 'blogs.html', sub: 'blogs/index.html' },
  { root: 'ecommerce-seo.html', sub: 'ecommerce-seo/index.html' },
  { root: 'ecommerce-seo.html', sub: 'services/ecommerce-seo/index.html' },
  { root: 'geo-services.html', sub: 'geo-services/index.html' },
  { root: 'geo-services.html', sub: 'services/geo-services/index.html' },
  { root: 'local-seo.html', sub: 'local-seo/index.html' },
  { root: 'local-seo.html', sub: 'services/local-seo/index.html' },
  { root: 'off-page-seo.html', sub: 'off-page-seo/index.html' },
  { root: 'off-page-seo.html', sub: 'services/off-page-seo/index.html' },
  { root: 'on-page-seo.html', sub: 'on-page-seo/index.html' },
  { root: 'on-page-seo.html', sub: 'services/on-page-seo/index.html' },
  { root: 'technical-seo.html', sub: 'technical-seo/index.html' },
  { root: 'technical-seo.html', sub: 'services/technical-seo/index.html' }
];

console.log('=== CHECKING ROOT VS SUBDIRECTORY SYNC STATUS ===\n');

pairs.forEach(p => {
  if (!fs.existsSync(p.sub)) {
    console.log(`[MISSING] ${p.sub} does not exist!`);
    return;
  }
  const rootContent = fs.readFileSync(p.root, 'utf8');
  const subContent = fs.readFileSync(p.sub, 'utf8');
  
  // Compare sizes and FAQ section
  const rootFaq = rootContent.includes('id="faqs"');
  const subFaq = subContent.includes('id="faqs"');
  
  const rootBar = rootContent.includes('mobile-bottom-bar');
  const subBar = subContent.includes('mobile-bottom-bar');

  console.log(`${p.sub.padEnd(35)} | Root size: ${rootContent.length} | Sub size: ${subContent.length} | Sync diff: ${Math.abs(rootContent.length - subContent.length)} chars`);
});

