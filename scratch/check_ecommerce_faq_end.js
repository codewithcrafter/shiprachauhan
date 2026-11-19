const fs = require('fs');

const content = fs.readFileSync('ecommerce-seo.html', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(555, 620).join('\n'));

