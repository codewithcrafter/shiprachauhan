const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');

console.log('=== CSS RESPONSIVE AUDIT ===\n');

// 1. Find all @media queries
const mediaQueries = [...css.matchAll(/@media[^{]*\{/g)].map(m => m[0]);
console.log(`Found ${mediaQueries.length} @media queries:`);
mediaQueries.forEach(mq => console.log('  ', mq));

// 2. Find fixed widths > 300px
console.log('\n2. Fixed widths > 320px outside media queries:');
const fixedWidths = [...css.matchAll(/([.#a-zA-Z0-9_-]+)\s*\{[^}]*?(width|min-width):\s*([0-9]+)px[^}]*?\}/g)];
fixedWidths.forEach(fw => {
  const px = parseInt(fw[3], 10);
  if (px > 320) {
    console.log(`  Selector: ${fw[1]} -> ${fw[2]}: ${px}px`);
  }
});

// 3. Find grid templates that might not stack on mobile
console.log('\n3. Grid templates:');
const grids = [...css.matchAll(/([.#a-zA-Z0-9_-]+)\s*\{[^}]*?grid-template-columns:\s*([^;]+);[^}]*?\}/g)];
grids.forEach(g => {
  console.log(`  Selector: ${g[1]} -> grid-template-columns: ${g[2].trim()}`);
});

