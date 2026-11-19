const https = require('https');

https.get('https://demo.shiprachauhan.in/nonexistent-file-123', res => {
  console.log('404 test status:', res.statusCode);
  console.log('404 headers:', res.headers);
});

