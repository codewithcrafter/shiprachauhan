const fs = require('fs');

const dirs = ['about', 'contact', 'blogs', 'ecommerce-seo', 'geo-services', 'local-seo', 'off-page-seo', 'on-page-seo', 'technical-seo'];

dirs.forEach(d => {
  const p = d + '/index.html';
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    const cssMatch = c.match(/<link[^>]*stylesheet[^>]*href="([^"]+)"/);
    const jsMatch = c.match(/<script[^>]*src="([^"]+)"/g);
    console.log(`${p}:`);
    console.log(`  CSS: ${cssMatch ? cssMatch[1] : 'none'}`);
    console.log(`  JS: ${jsMatch ? jsMatch.join(', ') : 'none'}`);
  }
});

