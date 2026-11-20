const https = require('https');

const imgs = [
  'https://demo.shiprachauhan.in/assets/images/technical-hero.webp',
  'https://demo.shiprachauhan.in/assets/images/ecommerce-hero.webp',
  'https://demo.shiprachauhan.in/assets/images/geo-hero.webp',
  'https://demo.shiprachauhan.in/assets/images/local-hero.webp'
];

imgs.forEach(u => {
  https.get(u, res => {
    console.log(u, '=> Status:', res.statusCode);
  }).on('error', e => console.log(u, 'Error:', e.message));
});

