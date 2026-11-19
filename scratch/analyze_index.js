const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
console.log('index.html total length:', indexHtml.length);
console.log('index.html total lines:', indexHtml.split('\n').length);

const lines = indexHtml.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('</section>')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});

