const fs = require('fs');

const html = fs.readFileSync('ecommerce-seo.html', 'utf8');
const heroMatch = html.match(/<section class="section service-hero[\s\S]*?<\/section>/i);
console.log('Hero section preview:');
console.log(heroMatch ? heroMatch[0].slice(0, 1500) : 'None');

