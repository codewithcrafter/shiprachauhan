const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const cssMatches = indexHtml.match(/<link[^>]*rel="stylesheet"[^>]*>/gi);
const jsMatches = indexHtml.match(/<script[^>]*src="[^"]*"[^>]*>/gi);

console.log('CSS links in index.html:');
cssMatches.forEach(m => console.log('  ', m));

console.log('JS links in index.html:');
jsMatches.forEach(m => console.log('  ', m));

