const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8').split('\n');
console.log(css.slice(325, 340).join('\n'));

