const fs = require('fs');

console.log('=== 1. index.md snippet ===');
console.log(fs.readFileSync('index.md', 'utf8').slice(0, 700));

console.log('\n=== 2. about.md snippet ===');
console.log(fs.readFileSync('about.md', 'utf8').slice(0, 700));

console.log('\n=== 3. technical-seo.md snippet ===');
console.log(fs.readFileSync('technical-seo.md', 'utf8').slice(0, 700));

console.log('\n=== 4. blogs/ai-overviews-local-search.md snippet ===');
console.log(fs.readFileSync('blogs/ai-overviews-local-search.md', 'utf8').slice(0, 700));

