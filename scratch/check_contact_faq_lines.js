const fs = require('fs');

const contact = fs.readFileSync('contact.html', 'utf8');
const lines = contact.split('\n');
console.log(lines.slice(330, 385).join('\n'));

