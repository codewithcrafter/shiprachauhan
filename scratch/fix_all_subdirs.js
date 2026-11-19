const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'scratch') {
        walkDir(fullPath);
      }
    } else if (entry.name === 'index.html' && dir !== '.') {
      let c = fs.readFileSync(fullPath, 'utf8');
      c = c.replace(/href="css\/style\.css"/g, 'href="/css/style.css"');
      c = c.replace(/src="js\/main\.js"/g, 'src="/js/main.js"');
      fs.writeFileSync(fullPath, c, 'utf8');
      console.log('Fixed subdirectory assets in:', fullPath);
    }
  }
}

walkDir('.');
console.log('All subdirectories synchronized with root-relative assets!');

