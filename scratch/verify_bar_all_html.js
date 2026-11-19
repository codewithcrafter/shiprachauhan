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
console.log(`Checking mobile-bottom-bar content across ${allHtml.length} HTML files:`);

allHtml.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasCall = c.includes('mobile-btn-call') && c.includes('tel:');
  const hasWa = c.includes('mobile-btn-whatsapp') && c.includes('wa.me');
  if (!hasCall || !hasWa) {
    console.log(`  Issue in ${f}: hasCall=${hasCall}, hasWa=${hasWa}`);
  }
});

console.log('✓ Check complete');

