const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('autoPopupOverlay');
console.log(idx !== -1 ? html.slice(idx - 100, idx + 1000) : 'None');

