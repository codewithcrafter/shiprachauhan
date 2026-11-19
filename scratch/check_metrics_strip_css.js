const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const idx = css.indexOf('.service-metrics-strip');
console.log(css.substring(idx, idx + 1000));

