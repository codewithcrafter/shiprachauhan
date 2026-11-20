const fs = require('fs');

const html = fs.readFileSync('blogs/ai-overviews-local-search.html', 'utf8');
const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
if (article) {
  console.log('Article length:', article[1].length);
  const headings = [...article[1].matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Headings in article:', headings);
} else {
  console.log('No <article> tag found');
}

