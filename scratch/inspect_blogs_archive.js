const fs = require('fs');

const html = fs.readFileSync('blogs.html', 'utf8');
const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

console.log('blogs.html H1:', h1);
console.log('blogs.html H2s:', h2s);
console.log('blogs.html H3s:', h3s);

