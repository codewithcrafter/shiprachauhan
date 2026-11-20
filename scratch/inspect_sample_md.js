const fs = require('fs');

console.log('--- Sample 1: index.md ---');
console.log(fs.readFileSync('index.md', 'utf8').slice(0, 1000));

console.log('--- Sample 2: technical-seo.md ---');
console.log(fs.readFileSync('technical-seo.md', 'utf8').slice(0, 1000));

console.log('--- Sample 3: blogs.md ---');
console.log(fs.readFileSync('blogs.md', 'utf8').slice(0, 1000));

