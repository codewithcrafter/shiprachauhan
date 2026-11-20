const fs = require('fs');

const f = 'blogs/ai-overviews-local-search.html';
let html = fs.readFileSync(f, 'utf8');

const tagsMatch = html.match(/<div class="article-tags-cloud">([\s\S]*?)<\/div>/i);
if (tagsMatch) {
  const tagsHtml = tagsMatch[1].trim();
  const horizontalStrip = `              <div class="article-tags-horizontal-strip">
                <span class="tags-pill-label">🏷️ Article Tags</span>
                <div class="tags-pill-list">
                  ${tagsHtml}
                </div>
              </div>\n\n`;

  // Inject before <h1 class="article-main-title"
  if (!html.includes('article-tags-horizontal-strip')) {
    html = html.replace(/<h1 class="article-main-title"/i, horizontalStrip + '              <h1 class="article-main-title"');
    console.log('Injected horizontal tags strip before H1 in:', f);
  }
}

