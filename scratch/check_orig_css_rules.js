const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');

const targets = ['.blog-layout', '.blog-card', '.blog-image', '.blog-meta', '.blog-readmore', '.sidebar-box', '.sidebar-title', '.sidebar-list', '.form-box', '.contact-grid', '.info-card'];

targets.forEach(t => {
  let idx = 0;
  console.log(`\n=== TARGET: ${t} ===`);
  while ((idx = css.indexOf(t, idx)) !== -1) {
    if (idx < 4500 * 20) { // before appended section
      console.log(`At pos ${idx}:`);
      console.log(css.substring(idx - 40, idx + 200));
    }
    idx += t.length;
  }
});

