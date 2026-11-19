const fs = require('fs');
const lines = fs.readFileSync('local-seo.html', 'utf8').split('\n');
console.log(lines.slice(420, 520).map((l, i) => `${i + 421}: ${l}`).join('\n'));

