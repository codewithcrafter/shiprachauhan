const fs = require('fs');

const html = fs.readFileSync('blogs.html', 'utf8');

// Parse articles
const regex = /<article class="blog-card[^"]*">([\s\S]*?)<\/article>/g;
let match;
const articles = [];

while ((match = regex.exec(html)) !== null) {
  const content = match[1];
  const titleMatch = content.match(/<a href="([^"]+)">([\s\S]*?)<\/a>/);
  const excerptMatch = content.match(/<p class="blog-excerpt">([\s\S]*?)<\/p>/);
  const metaMatch = content.match(/<div class="blog-meta">([\s\S]*?)<\/div>/);
  
  articles.push({
    url: titleMatch ? titleMatch[1].trim() : '',
    title: titleMatch ? titleMatch[2].trim() : '',
    excerpt: excerptMatch ? excerptMatch[1].trim() : '',
    meta: metaMatch ? metaMatch[1].trim() : ''
  });
}

console.log('Total articles found:', articles.length);
articles.forEach((a, i) => {
  console.log(`\n[Article ${i+1}] ${a.title}`);
  console.log(`URL: ${a.url}`);
  console.log(`Excerpt: ${a.excerpt}`);
});

