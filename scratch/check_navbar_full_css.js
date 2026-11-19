const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const idx = css.indexOf('.navbar-full-container');
console.log(css.substring(idx, idx + 1000));

