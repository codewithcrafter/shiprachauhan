const fs = require('fs');

const smDir = 'c:/Users/user/Downloads/Sanjeev Kumar Malik';
const smIndex = fs.readFileSync(smDir + '/index.html', 'utf8');

const faqIdx = smIndex.indexOf('id="faqs"');
console.log('--- Sanjeev index.html FAQ section ---');
console.log(smIndex.substring(faqIdx, faqIdx + 1500));

const smCss = fs.readFileSync(smDir + '/assets/css/style.css', 'utf8');
const cssFaqIdx = smCss.indexOf('.faq-');
console.log('\n--- Sanjeev CSS FAQ styles ---');
console.log(smCss.substring(cssFaqIdx, cssFaqIdx + 1500));

