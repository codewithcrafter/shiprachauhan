const https = require('https');

https.get('https://shorturl.blog/kolong', res => {
  console.log('shorturl.blog/kolong status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Body length:', data.length);
    console.log('Snippet:', data.slice(0, 300));
  });
}).on('error', e => console.log('Error:', e.message));

