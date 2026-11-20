const fs = require('fs');

const testFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'blogs.html',
  'technical-seo.html',
  'ecommerce-seo.html',
  'blogs/ai-overviews-local-search.html'
];

testFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  console.log(`\n=== ${f} (Schemas: ${schemas.length}) ===`);
  schemas.forEach((s, idx) => {
    try {
      const parsed = JSON.parse(s[1]);
      console.log(`Schema #${idx + 1} @type:`, parsed['@type'] || (parsed['@graph'] ? parsed['@graph'].map(g => g['@type']) : 'unknown'));
    } catch (e) {
      console.log(`Schema #${idx + 1} JSON PARSE ERROR:`, e.message);
    }
  });
});

