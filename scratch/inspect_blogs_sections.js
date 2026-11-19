const fs = require('fs');

const html = fs.readFileSync('blogs.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log(`blogs.html has ${sections.length} sections:`);
sections.forEach((s, i) => {
  const h1 = s[1].match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2 = s[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  console.log(`Section ${i+1}: ${h1 ? 'H1: ' + h1[1].replace(/<[^>]+>/g, '').trim() : (h2 ? 'H2: ' + h2[1].replace(/<[^>]+>/g, '').trim() : 'No H1/H2')}`);
});

