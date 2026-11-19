const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// List all classes used in index.html
const classMatches = indexHtml.match(/class="([^"]+)"/g) || [];
const classes = new Set();
classMatches.forEach(m => {
  const val = m.replace(/class="|"/g, '');
  val.split(/\s+/).forEach(c => classes.add(c.trim()));
});

console.log('Total classes in index.html:', classes.size);

// Print the key section classes
const sectionClasses = [...classes].filter(c => c.includes('card') || c.includes('grid') || c.includes('section') || c.includes('hero') || c.includes('box'));
console.log('Key layout classes in index.html:', sectionClasses);

