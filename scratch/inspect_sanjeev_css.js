const fs = require('fs');
const css = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/assets/css/style.css', 'utf8');

const components = [
  'service-metrics-strip',
  'capabilities-matrix-grid',
  'service-case-study-card',
  'comparison-grid',
  'deliverables-checklist-grid'
];

components.forEach(comp => {
  const idx = css.indexOf('.' + comp);
  if (idx !== -1) {
    console.log(`\n================= .${comp} =================`);
    console.log(css.substring(idx, idx + 450));
  } else {
    console.log(`Component .${comp} not found`);
  }
});

