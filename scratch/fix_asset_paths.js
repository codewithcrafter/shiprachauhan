const fs = require('fs');

const files = [
  'about.html',
  'about-shipra-chauhan.html',
  'blogs.html',
  'contact.html',
  'contact-shipra-chauhan.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/href="\/css\/style\.css/g, 'href="css/style.css');
    content = content.replace(/src="\/js\/main\.js/g, 'src="js/main.js');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated ' + f);
  }
});

