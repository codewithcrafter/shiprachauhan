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
  console.log(`\n============================= ${sp} (${content.length} bytes, ${content.split('\n').length} lines) =============================`);
  const lines = content.split('\n');
  const sections = [];
  lines.forEach((l, i) => {
    if (l.includes('<section') || l.includes('service-hero') || l.includes('hero-split') || l.includes('service-hero-form-card') || l.includes('service-metrics-strip') || l.includes('capabilities-matrix') || l.includes('faq')) {
      sections.push(`L${i+1}: ${l.trim().substring(0, 100)}`);
    }
  });
  console.log(sections.slice(0, 12).join('\n'));
});

