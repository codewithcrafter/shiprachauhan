const fs = require('fs');
const path = require('path');

const blogFolders = fs.readdirSync('blogs').filter(f => fs.statSync(path.join('blogs', f)).isDirectory());

blogFolders.forEach(folder => {
  const file = path.join('blogs', folder, 'index.html');
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  const tables = content.match(/<table[\s\S]*?<\/table>/gi) || [];
  const pres = content.match(/<pre[\s\S]*?<\/pre>/gi) || [];
  const inlineWidths = [...content.matchAll(/style="[^"]*?(?:width|min-width):\s*([0-9]+)px[^"]*?"/gi)];
  
  if (tables.length > 0 || pres.length > 0 || inlineWidths.length > 0) {
    console.log(`${folder}: tables=${tables.length}, pres=${pres.length}, inlineWidths=${inlineWidths.length}`);
  }
});

