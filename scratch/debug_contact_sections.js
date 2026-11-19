const fs = require('fs');

const contact = fs.readFileSync('contact.html', 'utf8');
const lines = contact.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('faq-item') || l.includes('</section>')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 80)}`);
  }
});

