const https = require('https');

const urls = [
  'https://shiprachauhan.in/css/style.css',
  'https://shiprachauhan.in/about',
  'https://shiprachauhan.in/index.html',
  'https://www.shiprachauhan.in/'
];

urls.forEach(u => {
  https.get(u, res => {
    console.log(u, '=>', res.statusCode, 'location:', res.headers['location']);
  }).on('error', e => console.log(u, 'error:', e.message));
});

