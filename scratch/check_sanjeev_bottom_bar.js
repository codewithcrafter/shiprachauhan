const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8');
const idx = css.indexOf('.mobile-bottom-bar');
if (idx !== -1) {
  console.log('Sanjeev .mobile-bottom-bar CSS:');
  console.log(css.substring(idx - 100, idx + 1500));
} else {
  console.log('Not found in Sanjeev CSS');
}

