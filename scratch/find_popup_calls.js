const fs = require('fs');

const js = fs.readFileSync('js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('AutoPopup') || l.includes('3Second') || l.includes('initTimed')) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});

