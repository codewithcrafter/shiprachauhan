const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8').split('\n');
console.log('--- Lines 740-755 ---');
console.log(css.slice(740, 755).join('\n'));
console.log('--- Lines 2975-2995 ---');
console.log(css.slice(2975, 2995).join('\n'));

