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

// 1. Ensure alias files exist in root
if (fs.existsSync('about-shipra-chauhan/index.html') && !fs.existsSync('about-shipra-chauhan.html')) {
  fs.copyFileSync('about-shipra-chauhan/index.html', 'about-shipra-chauhan.html');
  console.log('Created root about-shipra-chauhan.html');
}
if (fs.existsSync('contact-shipra-chauhan/index.html') && !fs.existsSync('contact-shipra-chauhan.html')) {
  fs.copyFileSync('contact-shipra-chauhan/index.html', 'contact-shipra-chauhan.html');
  console.log('Created root contact-shipra-chauhan.html');
}

const allHtml = findHtml('.');
console.log(`Processing ${allHtml.length} HTML files...`);

let updatedCount = 0;

allHtml.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  content = content.replace(/<link\s+rel="stylesheet"\s+href="(?:\/)?css\/style\.css(?:\?[^"]*)?"\s*\/?>/gi, '<link rel="stylesheet" href="/css/style.css?v=20261119">');
  content = content.replace(/<script\s+src="(?:\/)?js\/main\.js(?:\?[^"]*)?"\s*><\/script>/gi, '<script src="/js/main.js?v=20261119"></script>');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Successfully updated ${updatedCount} HTML files with /css/style.css?v=20261119 and /js/main.js?v=20261119`);
