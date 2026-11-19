const fs = require('fs');
const contactHtml = fs.readFileSync('contact.html', 'utf8');

console.log('contact.html length:', contactHtml.length);
console.log('contact.html lines:', contactHtml.split('\n').length);

const lines = contactHtml.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('</section>') || l.includes('<main') || l.includes('</main>') || l.includes('form') || l.includes('faq')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});

