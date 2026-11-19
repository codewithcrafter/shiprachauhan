const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8').split('\n');
console.log('--- Lines 3730-3780 ---');
console.log(css.slice(3730, 3780).join('\n'));
console.log('--- Lines 4240-4280 ---');
console.log(css.slice(4240, 4280).join('\n'));

