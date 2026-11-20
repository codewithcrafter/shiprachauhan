const fs = require('fs');

const html = fs.readFileSync('ecommerce-seo.html', 'utf8');
const heroEnd = html.indexOf('</section>');
console.log(html.slice(heroEnd, heroEnd + 1500));

