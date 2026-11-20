const fs = require('fs');

['on-page-seo.html', 'technical-seo.html'].forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const stripIdx = html.indexOf('service-metrics-strip');
  console.log(`\n=== ${f} around service-metrics-strip ===`);
  console.log(html.slice(stripIdx, stripIdx + 1200));
});

