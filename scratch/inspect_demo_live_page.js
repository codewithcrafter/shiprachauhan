const https = require('https');

https.get('https://demo.shiprachauhan.in/technical-seo.html', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Length:', data.length);
    console.log('Has mobile-bottom-bar:', data.includes('mobile-bottom-bar'));
    console.log('Has site-header-full:', data.includes('site-header-full'));
    console.log('CSS link:', data.match(/<link[^>]*href="([^"]*style\.css[^"]*)"/i));
    console.log('JS script:', data.match(/<script[^>]*src="([^"]*main\.js[^"]*)"/i));
    const navLinks = [...data.matchAll(/href="([^"]+)"/g)].map(m => m[1]).filter(l => l.includes('technical') || l.includes('about'));
    console.log('Links in page:', [...new Set(navLinks)]);
  });
}).on('error', err => console.log('Error:', err.message));

