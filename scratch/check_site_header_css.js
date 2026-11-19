const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('.site-header-full')) {
    console.log(`Line ${i+1}:`);
    console.log(lines.slice(i, i + 60).join('\n'));
    break;
  }
}

