const fs = require('fs');

const html = fs.readFileSync('ecommerce-seo.html', 'utf8');
const firstSec = html.match(/<section[^>]*>([\s\S]*?)<\/section>/i);
console.log(firstSec ? firstSec[0].slice(0, 1000) : 'None');

