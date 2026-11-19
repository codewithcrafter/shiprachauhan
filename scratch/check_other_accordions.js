const fs = require('fs');

const files = ['local-seo.html', 'off-page-seo.html', 'on-page-seo.html', 'technical-seo.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n--- ${f} ---`);
  const match = content.match(/<div class="accordion[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  if (match) {
    console.log(`Found accordion block (${match[0].length} chars)`);
    const items = (match[0].match(/<div class="accordion-item">/g) || []).length;
    console.log(`Items count: ${items}`);
  } else {
    console.log('Accordion block not matched');
  }
});

