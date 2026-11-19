const https = require('https');

https.get('https://shiprachauhan.in/', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML Length:', data.length);
    console.log('Has mobile-bottom-bar:', data.includes('mobile-bottom-bar'));
    const cssM = data.match(/<link[^>]*href="([^"]*style\.css[^"]*)"/i);
    const jsM = data.match(/<script[^>]*src="([^"]*main\.js[^"]*)"/i);
    console.log('CSS link:', cssM ? cssM[1] : 'not found');
    console.log('JS script:', jsM ? jsM[1] : 'not found');
  });
}).on('error', (err) => {
  console.log('Fetch error:', err.message);
});

