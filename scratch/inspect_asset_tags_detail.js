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
console.log('Total HTML files:', allHtml.length);

const patterns = new Set();
allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const cssMatches = content.match(/<link[^>]+style\.css[^>]*>/gi) || [];
  const jsMatches = content.match(/<script[^>]+main\.js[^>]*><\/script>/gi) || [];
  cssMatches.forEach(m => patterns.add('CSS: ' + m));
  jsMatches.forEach(m => patterns.add('JS: ' + m));
});

console.log('Found patterns:');
patterns.forEach(p => console.log('  ', p));

