const fs = require('fs');
const blogsHtml = fs.readFileSync('blogs.html', 'utf8');

console.log('blogs.html total length:', blogsHtml.length);
console.log('blogs.html lines:', blogsHtml.split('\n').length);

// Print main sections of blogs.html
const lines = blogsHtml.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('</section>') || l.includes('<main') || l.includes('</main>') || l.includes('<article') || l.includes('blog-card')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});

