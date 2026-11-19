const fs = require('fs');
console.log('contact.html:', fs.readFileSync('contact.html', 'utf8').match(/tel:[^"']+/g));
console.log('index.html:', fs.readFileSync('index.html', 'utf8').match(/tel:[^"']+/g));

