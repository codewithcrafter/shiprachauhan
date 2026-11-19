const fs = require('fs');

const html = fs.readFileSync('blogs/voice-search-local-seo/index.html', 'utf8');
const proseIdx = html.indexOf('<div class="article-prose">');
const authorIdx = html.indexOf('<div class="article-author-card">', proseIdx);
const prose = html.substring(proseIdx, authorIdx !== -1 ? authorIdx : proseIdx + 2000);
console.log(prose.substring(0, 1500));

