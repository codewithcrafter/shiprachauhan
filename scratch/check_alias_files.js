const fs = require('fs');

console.log('about.html length:', fs.readFileSync('about.html', 'utf8').length);
console.log('about-shipra-chauhan/index.html length:', fs.readFileSync('about-shipra-chauhan/index.html', 'utf8').length);
console.log('contact.html length:', fs.readFileSync('contact.html', 'utf8').length);
console.log('contact-shipra-chauhan/index.html length:', fs.readFileSync('contact-shipra-chauhan/index.html', 'utf8').length);

