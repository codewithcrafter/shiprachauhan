const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');
const heroIdx = html.indexOf('<section class="page-hero');
console.log(html.substring(heroIdx, heroIdx + 400));

