const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('h1') && (l.includes('font-size') || l.includes('clamp') || l.includes('line-height'))) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

