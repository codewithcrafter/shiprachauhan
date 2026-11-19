const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const idx = css.indexOf('.floating-quick-actions');
if (idx !== -1) {
  console.log(css.substring(idx - 50, idx + 1000));
} else {
  console.log('not found');
}

