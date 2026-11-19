const fs = require('fs');
const path = require('path');

function findMd(dir) {
  let res = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.git' && e.name !== 'scratch') {
      res.push(...findMd(p));
    } else if (e.name.endsWith('.md')) {
      res.push(p);
    }
  });
  return res;
}

const mdFiles = findMd('.');
console.log(`=== TOTAL MARKDOWN (.md) FILES: ${mdFiles.length} ===\n`);

mdFiles.sort().forEach((file, idx) => {
  const stat = fs.statSync(file);
  const content = fs.readFileSync(file, 'utf8');
  const hasFrontmatter = content.startsWith('---') && content.includes('\n---\n');
  const h1Match = content.match(/^#\s+(.+)$/m);
  const h1 = h1Match ? h1Match[1].trim() : 'NO H1';
  console.log(`${String(idx + 1).padStart(2, '0')}. ${file.padEnd(45)} | ${(stat.size / 1024).toFixed(2).padStart(6)} KB | FM: ${hasFrontmatter} | ${h1.substring(0, 40)}`);
});

