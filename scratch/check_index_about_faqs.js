const fs = require('fs');

console.log('=== ABOUT.HTML FAQs ===');
const about = fs.readFileSync('about.html', 'utf8');
const aboutFaqIdx = about.indexOf('faq-item');
console.log(about.substring(aboutFaqIdx - 100, aboutFaqIdx + 600));

console.log('=== INDEX.HTML FAQs ===');
const index = fs.readFileSync('index.html', 'utf8');
const indexFaqIdx = index.indexOf('faq-item');
console.log(index.substring(indexFaqIdx - 100, indexFaqIdx + 600));

