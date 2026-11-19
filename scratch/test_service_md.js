const fs = require('fs');
const { stripHtml, parseTable, parseFaqs, parseMetricsStrip } = require('./build_all_md.js');

const html = fs.readFileSync('technical-seo.html', 'utf8');
console.log('Metrics strip:\n', parseMetricsStrip(html));
console.log('FAQs:\n', parseFaqs(html).substring(0, 500));

