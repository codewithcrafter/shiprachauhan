const fs = require('fs');
const path = require('path');

const blogFolders = fs.readdirSync('blogs').filter(f => fs.statSync(path.join('blogs', f)).isDirectory());
console.log(`Found ${blogFolders.length} blog folders:`);

blogFolders.forEach(folder => {
  const file = path.join('blogs', folder, 'index.html');
  if (!fs.existsSync(file)) return;
  const c = fs.readFileSync(file, 'utf8');
  const h1 = c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'No H1';
  const h2s = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`- ${folder}:`);
  console.log(`    H1: ${h1.substring(0, 70)}`);
  console.log(`    H2 count: ${h2s.length}`);
});

