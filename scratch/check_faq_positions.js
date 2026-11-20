const fs = require('fs');

const pagesWithFaqs = [
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

pagesWithFaqs.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
  console.log(`\n=== ${f} (Total sections: ${sections.length}) ===`);
  sections.forEach((sec, idx) => {
    const isFaq = sec[1].includes('faq-accordion') || sec[1].includes('faq-item') || /frequently asked questions/i.test(sec[1]);
    const h = sec[1].match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)?.[1]?.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (isFaq || idx >= sections.length - 2) {
      console.log(`Section #${idx + 1} of ${sections.length} [${isFaq ? 'FAQ SECTION' : 'other'}]: ${h || 'no-heading'}`);
    }
  });
});

