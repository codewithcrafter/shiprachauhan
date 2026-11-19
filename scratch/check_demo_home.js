const https = require('https');

https.get('https://demo.shiprachauhan.in/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Homepage length:', data.length);
    console.log('Has site-header-full:', data.includes('site-header-full'));
    console.log('Has mobile-bottom-bar:', data.includes('mobile-bottom-bar'));
    console.log('CSS link:', data.match(/<link[^>]*href="([^"]*style\.css[^"]*)"/i));
    const navLinks = [...data.matchAll(/href="([^"]+)"/g)].map(m => m[1]).filter(l => !l.startsWith('http') && !l.startsWith('#'));
    console.log('Internal links on demo home:', [...new Set(navLinks)].slice(0, 15));
  });
});

