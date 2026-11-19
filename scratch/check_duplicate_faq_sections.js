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
  const sections = c.match(/<section[^>]*id=["']faqs?["'][^>]*>/gi) || [];
  const faqHeaders = c.match(/<h2[^>]*>[\s\S]*?(?:Frequently Asked Questions|FAQ)[\s\S]*?<\/h2>/gi) || [];
  console.log(`${p.padEnd(20)}: faq sections=${sections.length}, faq h2s=${faqHeaders.length}`);
});

