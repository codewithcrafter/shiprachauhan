const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const idx = c.indexOf('mobile-bottom-bar');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(c.substring(idx - 50, idx + 600));
}

