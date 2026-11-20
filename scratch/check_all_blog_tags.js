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
  const content = fs.readFileSync(f, 'utf8');
  const tagsMatch = content.match(/<div class="article-tags-cloud">([\s\S]*?)<\/div>/i);
  console.log(f, 'Tags:', tagsMatch ? tagsMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE');
});

