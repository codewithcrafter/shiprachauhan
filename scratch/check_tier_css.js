const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const matches = [];
let idx = 0;
while ((idx = css.indexOf('tier', idx)) !== -1) {
  matches.push(css.substring(idx - 20, idx + 100));
  idx += 4;
  if (matches.length > 8) break;
}
console.log('Tier matches:', matches);

