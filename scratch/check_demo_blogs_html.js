const https = require('https');

https.get('https://demo.shiprachauhan.in/blogs.html', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Length:', data.length);
    console.log('Has mobile-bottom-bar:', data.includes('mobile-bottom-bar'));
    console.log('Has ?v=20261119:', data.includes('?v=20261119'));
    const cssM = data.match(/<link[^>]*href="([^"]*style\.css[^"]*)"/i);
    console.log('CSS:', cssM ? cssM[1] : 'none');
    const links = [...data.matchAll(/href="([^"]+)"/g)].map(m => m[1]).filter(l => !l.startsWith('http') && !l.startsWith('#') && !l.startsWith('tel') && !l.startsWith('mailto'));
    console.log('Internal links on blogs.html:', [...new Set(links)]);
  });
});

