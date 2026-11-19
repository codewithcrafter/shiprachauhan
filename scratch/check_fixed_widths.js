const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('620px') || l.includes('800px') || l.includes('600px') || l.includes('980px')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

