const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.services-mega-menu') || l.includes('mega-menu')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

