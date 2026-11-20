const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Total sections in index.html:', sections.length);

sections.forEach((sec, idx) => {
  const h = sec[1].match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
  const heading = h ? h[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'NO HEADING';
  console.log(`Section ${idx + 1}: ${heading}`);
});

