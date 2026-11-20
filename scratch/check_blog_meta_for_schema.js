const fs = require('fs');

const blogFiles = [
  'blogs/ai-overviews-local-search.html',
  'blogs/digital-pr-vs-link-building.html',
  'blogs/internal-linking-strategy-seo.html',
  'blogs/link-building-ai-search-citations.html',
  'blogs/multi-location-seo-cannibalization.html',
  'blogs/review-response-local-seo.html',
  'blogs/title-tag-optimization-best-practices.html',
  'blogs/toxic-backlinks-disavow.html',
  'blogs/unlinked-brand-mentions-seo.html',
  'blogs/voice-search-local-seo.html'
];

blogFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1]?.trim();
  const cat = html.match(/<span class="blog-category-tag">([\s\S]*?)<\/span>/i)?.[1]?.trim();
  const date = html.match(/<span>(October \d+, 2026)<\/span>/i)?.[1]?.trim();
  const tags = [...html.matchAll(/class="article-tag">#?([^<]+)<\/a>/gi)].map(m => m[1].trim());

  console.log(`\n=== ${f} ===`);
  console.log('Title:', title);
  console.log('Desc:', desc);
  console.log('Cat:', cat, '| Date:', date);
  console.log('Tags:', tags);
});

