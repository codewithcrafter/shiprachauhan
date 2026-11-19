const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const faqIdx = html.indexOf('id="faqs"');
console.log('=== INDEX.HTML FAQ SECTION ===');
console.log(html.substring(faqIdx - 50, faqIdx + 1100));

