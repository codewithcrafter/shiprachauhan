const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('Mobile Nav') || l.includes('mobile-toggle') || l.includes('mobile-nav')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

