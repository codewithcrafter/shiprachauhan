const fs = require('fs');

const serviceFiles = [
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

serviceFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const showcaseMatch = html.match(/<div class="service-hero-showcase[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  console.log(`\n=== ${f} ===`);
  if (showcaseMatch) {
    console.log('Showcase content:', showcaseMatch[1].trim());
  } else {
    console.log('NO service-hero-showcase found!');
  }
});

