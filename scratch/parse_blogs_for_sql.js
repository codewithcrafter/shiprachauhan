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

const articlesData = [];

blogFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const slug = f.replace('blogs/', '').replace('.html', '');
  
  const title = html.match(/<h1 class="article-main-title"[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1]?.trim() || '';
  const category = html.match(/<span class="blog-category-tag">([\s\S]*?)<\/span>/i)?.[1]?.trim() || 'SEO Strategy';
  
  // Tags
  const tags = [...html.matchAll(/class="article-tag">#?([^<]+)<\/a>/gi)].map(m => m[1].trim());
  const uniqueTags = [...new Set(tags)];

  // Read time & date
  const metaStrip = html.match(/<div class="article-meta-strip">([\s\S]*?)<\/div>/i)?.[1] || '';
  const readTimeMatch = metaStrip.match(/(\d+)\s*min read/i);
  const readTime = readTimeMatch ? parseInt(readTimeMatch[1]) : 5;
  const dateMatch = metaStrip.match(/(October \d+, 2026)/i);
  const dateStr = dateMatch ? '2026-10-10' : '2026-10-09';

  // Excerpt
  const excerptMatch = html.match(/<header class="article-hero-header">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  const excerpt = excerptMatch ? excerptMatch[1].replace(/<[^>]+>/g, '').trim() : desc;

  // Article body
  const bodyMatch = html.match(/<div class="article-prose">([\s\S]*?)<\/div>\s*<footer class="article-footer-meta">/i);
  const bodyHtml = bodyMatch ? bodyMatch[1].trim() : '';

  // Corresponding Markdown file
  const mdFile = `blogs/${slug}.md`;
  let mdContent = '';
  if (fs.existsSync(mdFile)) {
    mdContent = fs.readFileSync(mdFile, 'utf8');
  }

  articlesData.push({
    title,
    slug,
    category,
    tags: uniqueTags.join(', '),
    publish_stage: 'published',
    publication_date: dateStr,
    read_time: readTime,
    author: 'Krishna Pal',
    seo_title: `${title} | Shipra Chauhan`,
    short_excerpt: excerpt,
    meta_description: desc,
    meta_keywords: uniqueTags.join(', '),
    featured_image: '',
    featured_image_alt: title,
    body_content: bodyHtml,
    body_markdown: mdContent,
    faqs_json: '[]'
  });
});

console.log(`Parsed ${articlesData.length} articles for initial seed:`);
articlesData.forEach(a => console.log(`- [${a.slug}] ${a.title} (${a.category})`));

fs.writeFileSync('scratch/initial_articles_seed.json', JSON.stringify(articlesData, null, 2), 'utf8');

