const fs = require('fs');
const path = require('path');

function stripTags(html) {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseHtmlToMarkdown(htmlContent) {
  // Remove scripts, styles, header, footer, modals, floating widgets
  let mainContent = htmlContent
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<div class="modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '')
    .replace(/<div class="floating-quick-actions[\s\S]*?<\/div>/gi, '')
    .replace(/<div class="mobile-bottom-bar[\s\S]*?<\/nav>/gi, '');

  // Extract <main> if present, or all <section> elements
  let sections = [...mainContent.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
  console.log(`Found ${sections.length} sections.`);
  
  sections.forEach((sec, i) => {
    const secHtml = sec[1];
    const h1 = secHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2 = secHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    console.log(`Section ${i+1}: ${h1 ? 'H1: ' + stripTags(h1[1]).substring(0, 50) : (h2 ? 'H2: ' + stripTags(h2[1]).substring(0, 50) : 'No H1/H2')}`);
  });
}

parseHtmlToMarkdown(fs.readFileSync('index.html', 'utf8'));

