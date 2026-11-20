const fs = require('fs');

const files = ['index.html', 'about.html', 'contact.html', 'ecommerce-seo.html', 'blogs.html'];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const forms = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)];
  console.log(`\n================ ${f} (Forms: ${forms.length}) ================`);
  forms.forEach((form, idx) => {
    const id = form[0].match(/id="([^"]*)"/i)?.[1] || 'no-id';
    const cls = form[0].match(/class="([^"]*)"/i)?.[1] || 'no-class';
    console.log(`Form #${idx + 1}: id="${id}", class="${cls}"`);
    const inputs = [...form[0].matchAll(/<(?:input|textarea|select)[^>]*>/gi)].map(m => m[0]);
    console.log('Inputs:');
    inputs.forEach(inp => console.log('  ', inp));
  });
});

