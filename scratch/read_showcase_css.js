const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('service-hero-showcase')) {
    console.log(`Line ${idx + 1}: ${l}`);
    for (let j = Math.max(0, idx - 5); j <= Math.min(lines.length - 1, idx + 20); j++) {
      console.log(`  ${j + 1}: ${lines[j]}`);
    }
  }
});

