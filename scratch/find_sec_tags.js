const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Sections 9 and 10 tags:');
console.log('Section 9 opening tag:', sections[8][0].slice(0, 150));
console.log('Section 10 opening tag:', sections[9][0].slice(0, 150));

