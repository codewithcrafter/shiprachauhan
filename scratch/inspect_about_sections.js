const fs = require('fs');

const html = fs.readFileSync('about.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log(`about.html has ${sections.length} sections:`);
sections.forEach((s, i) => {
  const h1 = s[1].match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2 = s[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const h3s = [...s[1].matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`Section ${i+1}: ${h1 ? 'H1: ' + h1[1].replace(/<[^>]+>/g, '').trim() : (h2 ? 'H2: ' + h2[1].replace(/<[^>]+>/g, '').trim() : 'No H1/H2')}`);
  if (h3s.length) console.log(`   H3s (${h3s.length}):`, h3s);
});

