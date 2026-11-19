const fs = require('fs');
const path = require('path');

function findHtml(dir) {
  let res = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.git' && e.name !== 'scratch') {
      res.push(...findHtml(p));
    } else if (e.name.endsWith('.html')) {
      res.push(p);
    }
  });
  return res;
}

const allHtml = findHtml('.');
console.log(`Auditing ${allHtml.length} HTML files for any remaining .html links...`);

const htmlLinksFound = [];

allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match any href that contains .html
  const matches = [...content.matchAll(/href="([^"]*\.html[^"]*)"/gi)];
  if (matches.length > 0) {
    matches.forEach(m => {
      // Ignore external links if any
      if (!m[1].startsWith('http://') && !m[1].startsWith('https://')) {
        htmlLinksFound.push({ file: f, href: m[1] });
      }
    });
  }
});

console.log(`Total internal .html links found across all files: ${htmlLinksFound.length}`);
if (htmlLinksFound.length > 0) {
  console.log('Sample findings:');
  console.log(htmlLinksFound.slice(0, 20));
} else {
  console.log('PERFECT! Zero internal .html links exist anywhere in any HTML file!');
}

