const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const endChunk = css.substring(css.length - 2500);
console.log('End of style.css:\n', endChunk);

