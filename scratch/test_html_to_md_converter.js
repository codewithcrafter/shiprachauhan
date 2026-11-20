const fs = require('fs');

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ');
}

function cleanText(text) {
  if (!text) return '';
  return decodeEntities(text)
    .replace(/<!--[\s\S]*?-->/g, '') // remove comments
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function htmlToMarkdown(htmlFile) {
  const rawHtml = fs.readFileSync(htmlFile, 'utf8');

  // 1. Metadata
  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1]) : '';

  const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? cleanText(descMatch[1]) : '';

  const canonMatch = rawHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canonical = canonMatch ? cleanText(canonMatch[1]) : '';

  // 2. Extract Body Content (between header and footer)
  let bodyContent = rawHtml;

  // Remove <head>
  bodyContent = bodyContent.replace(/<head[\s\S]*?<\/head>/i, '');
  // Remove <header>
  bodyContent = bodyContent.replace(/<header[\s\S]*?<\/header>/i, '');
  // Remove <footer>
  bodyContent = bodyContent.replace(/<footer[\s\S]*?<\/footer>/i, '');
  // Remove <script> tags
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove <style> tags
  bodyContent = bodyContent.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Remove SVG icons
  bodyContent = bodyContent.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  // Remove modal popup
  bodyContent = bodyContent.replace(/<div class="timed-popup-modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  // Remove mobile bottom bar
  bodyContent = bodyContent.replace(/<div class="mobile-bottom-bar[\s\S]*?<\/div>/gi, '');
  // Remove page curtain
  bodyContent = bodyContent.replace(/<div class="page-curtain[\s\S]*?<\/div>\s*<\/div>/gi, '');

  return { title, desc, canonical, bodyContent };
}

console.log('Testing extraction on index.html:');
const res = htmlToMarkdown('index.html');
console.log('Title:', res.title);
console.log('Desc:', res.desc);
console.log('Body length after strip:', res.bodyContent.length);

