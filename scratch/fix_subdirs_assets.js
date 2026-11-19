const fs = require('fs');

const subdirs = [
  'about/index.html',
  'contact/index.html',
  'blogs/index.html',
  'ecommerce-seo/index.html',
  'geo-services/index.html',
  'local-seo/index.html',
  'off-page-seo/index.html',
  'on-page-seo/index.html',
  'technical-seo/index.html'
];

subdirs.forEach(p => {
  let c = fs.readFileSync(p, 'utf8');
  // Make sure CSS and JS are root-relative or properly referenced
  c = c.replace(/href="css\/style\.css"/g, 'href="/css/style.css"');
  c = c.replace(/src="js\/main\.js"/g, 'src="/js/main.js"');
  fs.writeFileSync(p, c, 'utf8');
});

console.log('Synchronized root-relative assets in all subdirectories!');

