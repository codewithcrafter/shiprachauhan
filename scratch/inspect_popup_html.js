const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<div class="timed-popup-modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
console.log(match ? match[0] : 'None');

