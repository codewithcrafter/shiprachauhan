const fs = require('fs');

const js = fs.readFileSync('js/main.js', 'utf8');
const idx = js.indexOf('function init3SecondAutoPopup');
console.log(js.substring(idx, idx + 800));

