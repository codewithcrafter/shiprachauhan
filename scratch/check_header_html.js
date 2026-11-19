const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>') + '</header>'.length;
console.log(html.substring(headerStart, headerEnd));

