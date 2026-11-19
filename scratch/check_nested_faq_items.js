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
  // Check if .faq-answer contains faq-item
  const m = c.match(/<div class="faq-answer">[\s\S]*?<div class="faq-item">/g);
  console.log(`${p}: ${m ? m.length + ' NESTED faq-item FOUND!' : 'CLEAN'}`);
});

