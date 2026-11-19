const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8').split('\n');
console.log(css.slice(4840, 4875).join('\n'));

