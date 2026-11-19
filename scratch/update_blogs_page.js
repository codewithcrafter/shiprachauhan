const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const blogsHtmlPath = path.join(rootDir, 'blogs.html');

const articleImages = {
  'voice-search-local-seo': '/assets/images/local-hero.webp',
  'multi-location-seo-cannibalization': '/assets/images/local-multi.webp',
  'review-response-local-seo': '/assets/images/hyperlocal.webp',
  'ai-overviews-local-search': '/assets/images/geo-hero.webp',
  'link-building-ai-search-citations': '/assets/images/offpage-hero.webp',
  'toxic-backlinks-disavow': '/assets/images/offpage-backlink.webp',
  'unlinked-brand-mentions-seo': '/assets/images/full-funnel.webp',
  'digital-pr-vs-link-building': '/assets/images/ecommerce-platform.webp',
  'title-tag-optimization-best-practices': '/assets/images/onpage-hero.webp',
  'internal-linking-strategy-seo': '/assets/images/onpage-audit.webp'
};

let content = fs.readFileSync(blogsHtmlPath, 'utf8');

// Replace external URLs in href="https://shiprachauhan.in/<slug>/" with internal "/blogs/<slug>"
Object.keys(articleImages).forEach(slug => {
  const extUrlRegex = new RegExp(`href="https://shiprachauhan\\.in/${slug}/"\\s*(target="_blank"\\s*rel="noopener")?`, 'g');
  content = content.replace(extUrlRegex, `href="/blogs/${slug}"`);
});

// Also replace in case target="_blank" is before href
Object.keys(articleImages).forEach(slug => {
  const extUrlRegex2 = new RegExp(`(target="_blank"\\s*rel="noopener"\\s*)?href="https://shiprachauhan\\.in/${slug}/"`, 'g');
  content = content.replace(extUrlRegex2, `href="/blogs/${slug}"`);
});

// Inject blog-image-box before .blog-meta inside each .blog-card
Object.keys(articleImages).forEach(slug => {
  const imgUrl = articleImages[slug];
  const postPattern = new RegExp(`(<article class="blog-card[^>]*>)([\\s\\S]*?href="/blogs/${slug}")`, 'g');
  
  content = content.replace(postPattern, (match, cardTag, inner) => {
    if (inner.includes('class="blog-image-box"')) return match;
    const imgHtml = `\n            <div class="blog-image-box">\n              <img src="${imgUrl}" alt="Featured Illustration" class="blog-image" loading="lazy">\n            </div>`;
    return `${cardTag}${imgHtml}${inner}`;
  });
});

fs.writeFileSync(blogsHtmlPath, content, 'utf8');
console.log('Updated blogs.html with internal links and images.');

// Also save as blogs/index.html
const blogsDir = path.join(rootDir, 'blogs');
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}
fs.writeFileSync(path.join(blogsDir, 'index.html'), content, 'utf8');
console.log('Saved blogs/index.html');

