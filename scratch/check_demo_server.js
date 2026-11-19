const https = require('https');

function testUrl(u) {
  return new Promise(resolve => {
    https.get(u, res => {
      console.log(u, '=> Status:', res.statusCode, 'Location:', res.headers['location'], 'Server:', res.headers['server']);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, length: data.length }));
    }).on('error', err => {
      console.log(u, '=> Error:', err.message);
      resolve({ error: err.message });
    });
  });
}

async function run() {
  await testUrl('https://demo.shiprachauhan.in/technical-seo.html');
  await testUrl('https://demo.shiprachauhan.in/technical-seo');
  await testUrl('https://demo.shiprachauhan.in/');
  await testUrl('https://demo.shiprachauhan.in/about');
  await testUrl('https://demo.shiprachauhan.in/about.html');
}

run();

