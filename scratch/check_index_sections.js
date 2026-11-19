const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const sections = indexHtml.match(/<section[^>]*>/g) || [];
console.log('index.html sections:');
sections.forEach(s => console.log(s));

