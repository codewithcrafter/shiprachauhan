const fs = require('fs');
const c = fs.readFileSync('blogs/voice-search-local-seo/index.html', 'utf8');
const m = [...c.matchAll(/style="[^"]*?(?:width|min-width):\s*([0-9]+)px[^"]*?"/gi)];
console.log(m.map(x => x[0]));

