const https = require('https');

https.get('https://demo.shiprachauhan.in/.htaccess', res => {
  console.log('.htaccess status:', res.statusCode);
}).on('error', e => console.log('Error:', e.message));

