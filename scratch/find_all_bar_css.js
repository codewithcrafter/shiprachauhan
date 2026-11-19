const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.mobile-bottom-bar') || l.includes('.mobile-btn-call') || l.includes('.mobile-btn-whatsapp')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

