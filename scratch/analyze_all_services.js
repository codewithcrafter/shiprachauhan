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
  console.log(`\n======================================================`);
  console.log(`PAGE: ${sp}`);
  console.log(`======================================================`);
  
  // Extract all H1, H2, H3
  const headings = content.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi) || [];
  console.log('Headings (' + headings.length + '):');
  headings.forEach(h => {
    console.log('  ' + h.replace(/<[^>]+>/g, '').trim());
  });

  // Check FAQ count and format
  const faqItems = (content.match(/class="[^"]*(faq-item|accordion-item)[^"]*"/g) || []).length;
  console.log('FAQ / Accordion Items count:', faqItems);
});

