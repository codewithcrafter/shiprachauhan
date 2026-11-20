const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const s10 = html.indexOf('<section class="final-cta"');
console.log(html.slice(s10 + 1000, s10 + 2500));

