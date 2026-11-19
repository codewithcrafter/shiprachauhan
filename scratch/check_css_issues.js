const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');

// Check for unclosed braces or syntax issues in css
let openBraces = 0;
let lines = css.split('\n');
let errors = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let ch of line) {
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
  }
}

console.log('Total CSS length:', css.length);
console.log('Total CSS lines:', lines.length);
console.log('Unbalanced braces:', openBraces);

// Let's check classes used in contact.html and blogs.html vs style.css
const contactHtml = fs.readFileSync('contact.html', 'utf8');
const blogsHtml = fs.readFileSync('blogs.html', 'utf8');

function extractClasses(html) {
  const classMatches = html.match(/class="([^"]+)"/g) || [];
  const classes = new Set();
  classMatches.forEach(m => {
    const val = m.replace(/class="|"/g, '');
    val.split(/\s+/).forEach(c => classes.add(c));
  });
  return [...classes];
}

const contactClasses = extractClasses(contactHtml);
const blogsClasses = extractClasses(blogsHtml);

console.log('\nContact classes count:', contactClasses.length);
console.log('Blogs classes count:', blogsClasses.length);

