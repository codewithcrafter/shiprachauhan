const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8');

const mqs = [...css.matchAll(/@media[^{]*\{([\s\S]*?)(?=\n@media|\n\/\* =|$)/g)];
console.log(`Found ${mqs.length} media query sections in Sanjeev CSS:`);
mqs.forEach((m, idx) => {
  const header = m[0].substring(0, m[0].indexOf('{')).trim();
  console.log(`\n--- MQ ${idx+1}: ${header} (${m[1].length} chars) ---`);
  // print first few selectors
  const selectors = [...m[1].matchAll(/([.#a-zA-Z0-9_:\s,-]+)\s*\{/g)].map(s => s[1].trim()).slice(0, 6);
  console.log('Selectors:', selectors.join(' | '));
});

