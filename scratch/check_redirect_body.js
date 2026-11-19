const https = require('https');

https.get('https://shiprachauhan.in/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Location:', res.headers['location']);
    console.log('Body:', data);
  });
});

