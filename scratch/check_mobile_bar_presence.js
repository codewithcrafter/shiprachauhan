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
console.log(`Checking ${allHtml.length} HTML files for .mobile-bottom-bar:`);

const missing = [];
allHtml.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (!c.includes('mobile-bottom-bar')) {
    missing.push(f);
  }
});

console.log(`Missing in ${missing.length} files:`, missing);

