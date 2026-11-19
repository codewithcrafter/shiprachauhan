const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.startsWith('.container {') || l.includes('padding: 0 1.5rem') || l.includes('padding: 0 2rem')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

