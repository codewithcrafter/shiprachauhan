const fs = require('fs');

const html = fs.readFileSync('ecommerce-seo.html', 'utf8');
const stripIdx = html.indexOf('service-metrics-strip');
console.log(html.slice(stripIdx + 800, stripIdx + 1800));

