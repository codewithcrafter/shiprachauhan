const https = require('https');

https.get('https://codewithcrafter.github.io/shiprachauhan/', res => {
  console.log('GitHub Pages status:', res.statusCode);
  console.log('GitHub Pages headers:', res.headers);
}).on('error', e => console.log('GitHub Pages error:', e.message));

