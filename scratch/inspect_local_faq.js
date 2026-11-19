const fs = require('fs');
const content = fs.readFileSync('local-seo.html', 'utf8');
const faqIdx = content.indexOf('id="faqs"');
console.log(content.substring(faqIdx, faqIdx + 3000));

