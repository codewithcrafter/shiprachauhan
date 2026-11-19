const fs = require('fs');

const content = fs.readFileSync('on-page-seo.html', 'utf8');
const idx = content.indexOf('Frequently Asked Questions');
console.log(content.substring(idx - 100, idx + 800));

