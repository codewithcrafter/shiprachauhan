const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8').split('\n');
console.log(css.slice(820, 850).join('\n'));

