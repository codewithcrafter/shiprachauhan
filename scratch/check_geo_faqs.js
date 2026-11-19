const fs = require('fs');

const content = fs.readFileSync('geo-services.html', 'utf8');
const faqIdx = content.indexOf('FAQs - GEO');
console.log(content.substring(faqIdx - 100, faqIdx + 1200));

