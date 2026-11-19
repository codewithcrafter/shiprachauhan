const fs = require('fs');

const files = [
  'about.html',
  'contact.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'index.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

let allOk = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const items = (content.match(/class="faq-item"/g) || []).length;
  const triggers = (content.match(/class="faq-trigger"/g) || []).length;
  const toggles = (content.match(/class="faq-icon-toggle"/g) || []).length;
  const contents = (content.match(/class="faq-content"/g) || []).length;
  const inners = (content.match(/class="faq-content-inner"/g) || []).length;

  console.log(`${f.padEnd(20)}: items=${items}, triggers=${triggers}, toggles=${toggles}, contents=${contents}, inners=${inners}`);
  if (items !== triggers || items !== contents || items !== inners || items !== toggles) {
    console.error(`  FAIL: Mismatch in ${f}`);
    allOk = false;
  }
});

console.log('\nAll files verified perfectly?', allOk);
