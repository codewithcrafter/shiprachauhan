const fs = require('fs');

const smDir = 'c:/Users/user/Downloads/Sanjeev Kumar Malik';
const smJs = fs.readFileSync(smDir + '/assets/js/app.js', 'utf8');

const idx = smJs.indexOf('faq');
console.log(smJs.substring(idx - 50, idx + 800));

