const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.header-top-bar') || l.includes('.top-bar-right') || l.includes('.header-top-container')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

