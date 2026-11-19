const fs = require('fs');

const content = fs.readFileSync('contact.html', 'utf8');
const heroIdx = content.indexOf('<section class="page-hero"');
const heroEnd = content.indexOf('</section>', heroIdx);
console.log(content.substring(heroIdx, heroEnd));

