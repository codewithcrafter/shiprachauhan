const fs = require('fs');
const path = require('path');

const rootPages = [
  'index.html',
  'about.html',
  'contact.html',
  'blogs.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

console.log('=== CHECKING POTENTIAL MOBILE OVERFLOWS IN HTML ===\n');

rootPages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`Checking ${file}:`);

  // 1. Check for tables
  const tables = content.match(/<table[\s\S]*?<\/table>/gi) || [];
  if (tables.length > 0) {
    console.log(`  - Has ${tables.length} tables. Checking if wrapped in table-responsive...`);
    tables.forEach((t, i) => {
      const idx = content.indexOf(t);
      const before = content.substring(Math.max(0, idx - 100), idx);
      const isWrapped = before.includes('table-responsive') || before.includes('overflow');
      console.log(`    Table ${i+1} wrapped: ${isWrapped}`);
    });
  }

  // 2. Check for inline widths > 300px
  const inlineWidths = [...content.matchAll(/style="[^"]*?(?:width|min-width):\s*([0-9]+)px[^"]*?"/gi)];
  inlineWidths.forEach(iw => {
    const px = parseInt(iw[1], 10);
    if (px > 300) {
      console.log(`  - Warning: Inline width ${px}px in: ${iw[0]}`);
    }
  });

  // 3. Check for pre/code
  const pres = content.match(/<pre[\s\S]*?<\/pre>/gi) || [];
  if (pres.length > 0) {
    console.log(`  - Has ${pres.length} <pre> blocks`);
  }
});

