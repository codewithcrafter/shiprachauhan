const fs = require('fs');

const pages = [
  'index.html',
  'about.html',
  'contact.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

pages.forEach(p => {
  const c = fs.readFileSync(p, 'utf8');
  const items = c.match(/<div class="faq-item[^"]*">/g) || [];
  console.log(`${p.padEnd(20)}: ${items.length} items`);
});

