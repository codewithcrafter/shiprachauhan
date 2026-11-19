const fs = require('fs');

const servicePages = [
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

servicePages.forEach(sp => {
  const content = fs.readFileSync(sp, 'utf8');
  const heroIdx = content.indexOf('<section class="page-hero">');
  if (heroIdx !== -1) {
    console.log(`\n=== ${sp} ===`);
    console.log(content.substring(heroIdx, heroIdx + 300));
  }
});

