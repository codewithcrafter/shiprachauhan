const fs = require('fs');
const path = require('path');

const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));

console.log('--- ROOT FILES ---');
rootFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const brokenImgs = [];
  const imgMatches = content.match(/<img[^>]+src="([^">]+)"/g) || [];
  imgMatches.forEach(m => {
    const src = m.match(/src="([^">]+)"/)[1];
    if (src.startsWith('/assets/')) brokenImgs.push(src);
  });

  const rootNavLinks = [];
  const linkMatches = content.match(/href="(\/(ecommerce-seo|geo-services|local-seo|off-page-seo|on-page-seo|technical-seo|about|blogs|contact)[^"]*)"/g) || [];
  linkMatches.forEach(m => {
    const href = m.match(/href="([^">]+)"/)[1];
    rootNavLinks.push(href);
  });

  if (brokenImgs.length > 0 || rootNavLinks.length > 0) {
    console.log(`${f}: ${brokenImgs.length} leading-slash images, ${rootNavLinks.length} domain-root nav links`);
  }
});
