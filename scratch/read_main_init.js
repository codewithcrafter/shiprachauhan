const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8').split('\n');
console.log(js.slice(20, 60).join('\n'));

