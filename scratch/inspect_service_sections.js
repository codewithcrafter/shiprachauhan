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
  const c = fs.readFileSync(sp, 'utf8');
  const h1 = c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'No H1';
  const h2s = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`- ${sp}:`);
  console.log(`    H1: ${h1}`);
  console.log(`    H2 count: ${h2s.length} (${h2s.slice(0, 3).join(' | ')}...)`);
});

