const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('mobile-nav-toggle') || l.includes('nav-toggle') || l.includes('menuToggle')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

