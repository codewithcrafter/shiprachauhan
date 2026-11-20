const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const h2s = [...indexHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const h3s = [...indexHtml.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

console.log('H2s in index.html:');
h2s.forEach(h => console.log('  -', h));

console.log('\nH3s in index.html:');
h3s.forEach(h => console.log('  -', h));

