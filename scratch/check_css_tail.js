const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');
console.log('Total CSS lines:', css.split('\n').length);
console.log('Tail of css:');
console.log(css.slice(-400));

