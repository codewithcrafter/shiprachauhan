const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const matches = [];
let idx = 0;
while ((idx = css.indexOf('.faq-', idx)) !== -1) {
  matches.push(css.substring(idx, idx + 200));
  idx += 200;
  if (matches.length > 5) break;
}
console.log('FAQ matches:', matches);

const accMatches = [];
idx = 0;
while ((idx = css.indexOf('.accordion', idx)) !== -1) {
  accMatches.push(css.substring(idx, idx + 200));
  idx += 200;
  if (accMatches.length > 5) break;
}
console.log('Accordion matches:', accMatches);

