const fs = require('fs');

const blogContent = fs.readFileSync('blogs/ai-overviews-local-search.html', 'utf8');
const blogForms = [...blogContent.matchAll(/<form[\s\S]*?<\/form>/gi)];
console.log('Forms in blog article:', blogForms.length);
blogForms.forEach((f, idx) => {
  console.log(`Form #${idx + 1}:`, f[0].match(/<form[^>]*>/i)[0]);
  const inputs = [...f[0].matchAll(/<(?:input|textarea|select)[^>]*>/gi)].map(m => m[0]);
  inputs.forEach(i => console.log('  ', i));
});

