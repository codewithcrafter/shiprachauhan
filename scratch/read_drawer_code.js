const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8').split('\n');
console.log(js.slice(504, 555).join('\n'));

