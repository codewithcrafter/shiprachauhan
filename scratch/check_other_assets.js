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
const allHeadTags = new Set();

allHtml.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const links = c.match(/<link[^>]+>/gi) || [];
  const scripts = c.match(/<script[^>]+>/gi) || [];
  links.forEach(l => {
    if (!l.includes('fonts.googleapis') && !l.includes('canonical')) {
      allHeadTags.add('LINK: ' + l);
    }
  });
  scripts.forEach(s => {
    if (!s.includes('application/ld+json')) {
      allHeadTags.add('SCRIPT: ' + s);
    }
  });
});

allHeadTags.forEach(t => console.log(t));

