const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('whatsapp') || l.includes('bottom-bar') || l.includes('mobile-app-bar') || l.includes('mobile-bar') || l.includes('bottom-cta')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});

