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
  const metricIdx = html.indexOf('service-metrics-strip');
  if (metricIdx !== -1) {
    const snippet = html.slice(metricIdx, metricIdx + 1500);
    console.log(`\n=== ${f} after service-metrics-strip ===`);
    // Find any img tags or showcase divs
    const imgs = snippet.match(/<img[^>]*>/gi) || [];
    console.log('Images found:', imgs);
    console.log('Snippet preview:');
    console.log(snippet.slice(0, 500));
  } else {
    console.log(`\n=== ${f} NO service-metrics-strip ===`);
  }
});

