const fs = require('fs');

const html = fs.readFileSync('blogs/ai-overviews-local-search.html', 'utf8');
const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
console.log('Blog H1:', h1);
console.log('Blog H2s:', h2s);

