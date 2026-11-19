const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('toggle') || l.includes('open') || l.includes('drawer') || l.includes('menu')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

