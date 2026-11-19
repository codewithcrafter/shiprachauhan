const fs = require('fs');

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseTable(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  if (rows.length === 0) return '';
  
  let md = '';
  rows.forEach((r, idx) => {
    const cells = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(m => cleanText(m[1].replace(/<[^>]+>/g, ' ')));
    if (cells.length > 0) {
      md += '| ' + cells.join(' | ') + ' |\n';
      if (idx === 0) {
        md += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
      }
    }
  });
  return md;
}

function convertFaqAccordion(sectionHtml) {
  const items = [...sectionHtml.matchAll(/<div class="faq-item[\s\S]*?<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>/gi)];
  if (items.length === 0) return '';
  
  let md = '';
  items.forEach((item, idx) => {
    let q = cleanText(item[1].replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/^\d+[\.\/]\s*/, '');
    let a = cleanText(item[2].replace(/<[^>]+>/g, ' '));
    md += `### Q${idx + 1}: ${q}\n\n${a}\n\n`;
  });
  return md;
}

// Test on about.html
const aboutHtml = fs.readFileSync('about.html', 'utf8');
console.log('About FAQ converted length:', convertFaqAccordion(aboutHtml).length);

