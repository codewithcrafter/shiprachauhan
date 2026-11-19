const fs = require('fs');

console.log('=== SANJEEV KUMAR MALIK INSPECTION ===');

const smDir = 'c:/Users/user/Downloads/Sanjeev Kumar Malik';
const smCss = fs.readFileSync(smDir + '/assets/css/style.css', 'utf8');

console.log('Sanjeev CSS lines:', smCss.split('\n').length);
console.log('Sanjeev CSS size:', smCss.length);

// Check root variables in Sanjeev CSS
const rootMatch = smCss.match(/:root\s*\{[\s\S]*?\}/);
if (rootMatch) {
  console.log('\n--- Sanjeev :root variables ---');
  console.log(rootMatch[0].substring(0, 1500));
}

// Check Sanjeev index.html sections
const smIndex = fs.readFileSync(smDir + '/index.html', 'utf8');
const sections = smIndex.match(/<section[^>]*>/g) || [];
console.log('\n--- Sanjeev index.html sections ---');
sections.forEach(s => console.log(s));

