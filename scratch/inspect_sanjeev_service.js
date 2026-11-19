const fs = require('fs');
const content = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/services/wordpress-web-development.html', 'utf8');

console.log('Size:', content.length, 'Lines:', content.split('\n').length);
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('metrics-strip') || l.includes('capabilities-matrix') || l.includes('case-study') || l.includes('comparison') || l.includes('deliverables') || l.includes('faq-')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});

