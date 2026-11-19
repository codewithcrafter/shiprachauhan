const fs = require('fs');

const content = fs.readFileSync('ecommerce-seo.html', 'utf8');
const heroIdx = content.indexOf('<section class="page-hero">');
const heroEnd = content.indexOf('</section>', heroIdx);
const heroSection = content.substring(heroIdx, heroEnd);

console.log('Hero section in ecommerce-seo.html:');
// Find immediate children of container or grid
const lines = heroSection.split('\n');
lines.forEach((l, i) => {
  if (l.includes('class="') && (l.includes('hero-content') || l.includes('hero-visual') || l.includes('hero-image') || l.includes('service-hero-form-card') || l.includes('split-media'))) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});

