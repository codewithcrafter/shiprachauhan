const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.header-top-bar') || l.includes('.top-bar-left') || l.includes('.top-bar-right')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

