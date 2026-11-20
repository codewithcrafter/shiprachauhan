const fs = require('fs');

['about.html', 'contact.html', 'ecommerce-seo.html', 'geo-services.html'].forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  console.log(`\n=== ${f} ===`);
  console.log('H1:', h1);
  console.log('H2s:', h2s);
});

