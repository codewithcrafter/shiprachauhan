const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const idx = c.indexOf('class="mobile-bottom-bar"');
console.log(c.substring(idx - 20, idx + 1200));

