const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf8');
const links = [];
const regex = /href="([^"]+)"/g;
let match;
while ((match = regex.exec(index)) !== null) {
  links.push(match[1]);
}
const internal = links.filter(l => !l.startsWith('http') && !l.startsWith('#') && !l.startsWith('tel:') && !l.startsWith('mailto:'));
console.log('Unique internal links in index.html:');
console.log([...new Set(internal)]);

