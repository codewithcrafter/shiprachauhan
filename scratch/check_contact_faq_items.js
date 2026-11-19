const fs = require('fs');

const contact = fs.readFileSync('contact.html', 'utf8');
const lines = contact.split('\n');
lines.forEach((l, i) => {
  if (l.includes('faq-item')) {
    console.log(`L${i+1}: ${l}`);
  }
});

