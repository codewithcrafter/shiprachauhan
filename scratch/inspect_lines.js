const fs = require('fs');
const lines = fs.readFileSync('local-seo.html', 'utf8').split('\n');
console.log(lines.slice(320, 420).map((l, i) => `${i + 321}: ${l}`).join('\n'));

