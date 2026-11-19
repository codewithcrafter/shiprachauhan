const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.service-metrics-strip')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

