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
console.log(`Auditing consistency across all ${allHtml.length} HTML files:\n`);

let missingCss = 0;
let missingJs = 0;
let missingBar = 0;
let missingHeader = 0;
let hasHtmlLink = 0;

allHtml.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (!c.includes('/css/style.css?v=20261119')) missingCss++;
  if (!c.includes('/js/main.js?v=20261119')) missingJs++;
  if (!c.includes('mobile-bottom-bar')) missingBar++;
  if (!c.includes('site-header-full')) missingHeader++;
  if (/<a[^>]+href="[^"]+\.html"/i.test(c)) hasHtmlLink++;
});

console.log('Results:');
console.log('- Files missing versioned CSS (/css/style.css?v=20261119):', missingCss);
console.log('- Files missing versioned JS (/js/main.js?v=20261119):', missingJs);
console.log('- Files missing mobile-bottom-bar:', missingBar);
console.log('- Files missing site-header-full:', missingHeader);
console.log('- Files with any .html link in <a> tags:', hasHtmlLink);

