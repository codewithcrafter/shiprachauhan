const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const idx = css.indexOf('.site-header-full');
console.log(css.substring(idx, idx + 1200));

