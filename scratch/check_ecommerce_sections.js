const fs = require('fs');

const content = fs.readFileSync('ecommerce-seo.html', 'utf8');
const lines = content.split('\n');

console.log('ecommerce-seo.html lines:', lines.length);

let inSection = false;
let sectionStart = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<section')) {
    console.log(`Section at line ${i+1}: ${line.trim().substring(0, 80)}`);
  }
}

