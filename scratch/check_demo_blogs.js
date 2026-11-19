const https = require('https');

function check(url) {
  https.get(url, res => {
    console.log(url, '=> Status:', res.statusCode, 'Location:', res.headers['location']);
  }).on('error', e => console.log(url, 'error:', e.message));
}

check('https://demo.shiprachauhan.in/blogs');
check('https://demo.shiprachauhan.in/blogs.html');
check('https://demo.shiprachauhan.in/blogs/');

