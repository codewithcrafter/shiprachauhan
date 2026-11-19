const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');
const contactHtml = fs.readFileSync('contact.html', 'utf8');
const blogsHtml = fs.readFileSync('blogs.html', 'utf8');

function extractClasses(html) {
  const classMatches = html.match(/class="([^"]+)"/g) || [];
  const classes = new Set();
  classMatches.forEach(m => {
    const val = m.replace(/class="|"/g, '');
    val.split(/\s+/).forEach(c => {
      if (c.trim()) classes.add(c.trim());
    });
  });
  return [...classes];
}

const contactClasses = extractClasses(contactHtml);
const blogsClasses = extractClasses(blogsHtml);

console.log('--- Missing classes in Contact ---');
contactClasses.forEach(c => {
  // Regex to check if .class is defined
  const regex = new RegExp('\\.' + c + '(?![a-zA-Z0-9_-])');
  if (!regex.test(css)) {
    console.log('Missing:', c);
  }
});

console.log('\n--- Missing classes in Blogs ---');
blogsClasses.forEach(c => {
  const regex = new RegExp('\\.' + c + '(?![a-zA-Z0-9_-])');
  if (!regex.test(css)) {
    console.log('Missing:', c);
  }
});

