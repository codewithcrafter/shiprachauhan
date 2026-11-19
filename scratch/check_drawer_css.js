const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const idx = css.indexOf('.site-header-full .nav-menu');
console.log(css.substring(idx, idx + 1000));

