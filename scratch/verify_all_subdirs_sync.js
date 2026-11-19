const fs = require('fs');

const servicePairs = [
  ['ecommerce-seo.html', 'ecommerce-seo/index.html'],
  ['ecommerce-seo.html', 'services/ecommerce-seo/index.html'],
  ['geo-services.html', 'geo-services/index.html'],
  ['geo-services.html', 'services/geo-services/index.html'],
  ['local-seo.html', 'local-seo/index.html'],
  ['local-seo.html', 'services/local-seo/index.html'],
  ['off-page-seo.html', 'off-page-seo/index.html'],
  ['off-page-seo.html', 'services/off-page-seo/index.html'],
  ['on-page-seo.html', 'on-page-seo/index.html'],
  ['on-page-seo.html', 'services/on-page-seo/index.html'],
  ['technical-seo.html', 'technical-seo/index.html'],
  ['technical-seo.html', 'services/technical-seo/index.html'],
  ['about.html', 'about/index.html'],
  ['about.html', 'about-shipra-chauhan/index.html'],
  ['about.html', 'about-shipra-chauhan.html'],
  ['contact.html', 'contact/index.html'],
  ['contact.html', 'contact-shipra-chauhan/index.html'],
  ['contact.html', 'contact-shipra-chauhan.html'],
  ['blogs.html', 'blogs/index.html']
];

let mismatches = 0;
servicePairs.forEach(([src, target]) => {
  if (!fs.existsSync(src)) {
    console.log('Source missing:', src);
    mismatches++;
    return;
  }
  if (!fs.existsSync(target)) {
    console.log('Target missing:', target);
    mismatches++;
    return;
  }
  const sContent = fs.readFileSync(src, 'utf8');
  const tContent = fs.readFileSync(target, 'utf8');
  if (sContent !== tContent) {
    console.log(`Mismatch: ${src} (${sContent.length} B) vs ${target} (${tContent.length} B)`);
    // Copy src to target to keep them 100% in sync
    fs.writeFileSync(target, sContent, 'utf8');
    console.log(`Synced ${src} -> ${target}`);
  }
});

console.log('Sync complete.');

