const fs = require('fs');

const files = ['geo-services.html', 'local-seo.html', 'off-page-seo.html', 'on-page-seo.html', 'technical-seo.html', 'ecommerce-seo.html', 'contact.html', 'about.html', 'index.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=================== ${f} ===================`);
  const lines = content.split('\n');
  let inFaq = false;
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('faq') || lines[i].toLowerCase().includes('accordion') || lines[i].toLowerCase().includes('frequently asked')) {
      console.log(`Line ${i+1}: ${lines[i].trim()}`);
      count++;
      if (count > 8) break;
    }
  }
});

