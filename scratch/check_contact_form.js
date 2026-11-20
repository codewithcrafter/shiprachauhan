const fs = require('fs');

const html = fs.readFileSync('contact.html', 'utf8');
const formMatch = html.match(/<form[^>]*id="mainContactForm"[\s\S]*?<\/form>/i);
console.log(formMatch ? formMatch[0] : 'None');

