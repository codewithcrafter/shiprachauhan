const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.startsWith('h1,') || l.startsWith('h1 {') || l.includes('.hero-copy h1') || l.includes('.page-hero h1')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

