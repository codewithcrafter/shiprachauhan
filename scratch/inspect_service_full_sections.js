const fs = require('fs');
const { stripHtml } = require('./build_all_md.js');

const html = fs.readFileSync('technical-seo.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];

sections.forEach((sec, idx) => {
  const h2 = sec[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const h1 = sec[1].match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const eyebrow = sec[1].match(/<div class="eyebrow[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  console.log(`\nSection ${idx + 1}:`);
  if (eyebrow) console.log(`  Eyebrow: ${stripHtml(eyebrow[1])}`);
  if (h1) console.log(`  H1: ${stripHtml(h1[1])}`);
  if (h2) console.log(`  H2: ${stripHtml(h2[1])}`);
});

