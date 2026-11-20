const fs = require('fs');

const files = [
  'ecommerce-hero.webp',
  'ecommerce-platform.webp',
  'geo-hero.webp',
  'local-hero.webp',
  'local-multi.webp',
  'offpage-hero.webp',
  'offpage-backlink.webp',
  'onpage-hero.webp',
  'onpage-audit.webp',
  'technical-hero.webp'
];

files.forEach(f => {
  const p = 'assets/images/' + f;
  if (fs.existsSync(p)) {
    const buf = fs.readFileSync(p);
    console.log(f, 'Size:', buf.length, 'Header:', buf.slice(0, 12).toString('ascii'));
  } else {
    console.log(f, 'DOES NOT EXIST');
  }
});

