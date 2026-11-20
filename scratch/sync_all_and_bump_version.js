const fs = require('fs');
const path = require('path');

function findHtml(dir) {
  let res = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.git' && e.name !== 'scratch') {
      res.push(...findHtml(p));
    } else if (e.name.endsWith('.html')) {
      res.push(p);
    }
  });
  return res;
}

// 1. Sync aliases
const directSync = [
  ['about.html', 'about-shipra-chauhan.html'],
  ['about.html', 'about/index.html'],
  ['about.html', 'about-shipra-chauhan/index.html'],
  ['contact.html', 'contact-shipra-chauhan.html'],
  ['contact.html', 'contact/index.html'],
  ['contact.html', 'contact-shipra-chauhan/index.html'],
  ['blogs.html', 'blogs/index.html'],
  ['ecommerce-seo.html', 'ecommerce-seo/index.html'],
  ['ecommerce-seo.html', 'services/ecommerce-seo/index.html'],
  ['geo-services.html', 'geo-services/index.html'],
  ['geo-services.html', 'services/geo-services/index.html'],
  ['local-seo.html', 'local-seo/index.html'],
  ['local-seo.html', 'services/local-seo/index.html'],
  ['off-page-seo.html', 'off-page-seo/index.html'],
  ['off-page-seo.html', 'services/off-page-seo/index.html'],
  ['on-page-seo.html', 'on-page-seo/index.html'],
  ['on-page-seo.html', 'services/on-page-seo/index.html'],
  ['technical-seo.html', 'technical-seo/index.html'],
  ['technical-seo.html', 'services/technical-seo/index.html']
];

// Blog subdirectories
const blogFiles = [
  'ai-overviews-local-search',
  'digital-pr-vs-link-building',
  'internal-linking-strategy-seo',
  'link-building-ai-search-citations',
  'multi-location-seo-cannibalization',
  'review-response-local-seo',
  'title-tag-optimization-best-practices',
  'toxic-backlinks-disavow',
  'unlinked-brand-mentions-seo',
  'voice-search-local-seo'
];

blogFiles.forEach(b => {
  directSync.push([`blogs/${b}.html`, `blogs/${b}/index.html`]);
});

directSync.forEach(([src, tgt]) => {
  if (fs.existsSync(src)) {
    const dir = path.dirname(tgt);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, tgt);
  }
});
console.log(`Synced ${directSync.length} subdirectory mirrors.`);

// 2. Bump version string to ?v=20261120 across all HTML files
const allHtml = findHtml('.');
let bumped = 0;
allHtml.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let orig = c;
  c = c.replace(/\/css\/style\.css(?:\?[^"]*)?/g, '/css/style.css?v=20261120');
  c = c.replace(/\/js\/main\.js(?:\?[^"]*)?/g, '/js/main.js?v=20261120');
  if (c !== orig) {
    fs.writeFileSync(f, c, 'utf8');
    bumped++;
  }
});
console.log(`Bumped asset cache versions in ${bumped} HTML files.`);

