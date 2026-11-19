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
console.log(`Auditing asset links in ${allHtml.length} HTML files:\n`);

const relCss = [];
const unversioned = [];

allHtml.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const cssM = c.match(/<link[^>]*href="([^"]*style\.css[^"]*)"/i);
  const jsM = c.match(/<script[^>]*src="([^"]*main\.js[^"]*)"/i);

  const cssHref = cssM ? cssM[1] : 'NOT FOUND';
  const jsSrc = jsM ? jsM[1] : 'NOT FOUND';

  if (!cssHref.startsWith('/')) relCss.push(`${f}: ${cssHref}`);
  if (!cssHref.includes('?v=')) unversioned.push(`${f}: ${cssHref}`);
});

console.log(`Files with relative CSS (no leading /): ${relCss.length}`);
if (relCss.length > 0) console.log(relCss.slice(0, 5));

console.log(`\nFiles with unversioned CSS (no ?v=...): ${unversioned.length}`);
if (unversioned.length > 0) console.log(unversioned.slice(0, 5));

