const fs = require('fs');
const path = require('path');

// Ensure content directory exists
if (!fs.existsSync('content')) fs.mkdirSync('content', { recursive: true });
if (!fs.existsSync('content/services')) fs.mkdirSync('content/services', { recursive: true });
if (!fs.existsSync('content/blogs')) fs.mkdirSync('content/blogs', { recursive: true });
if (!fs.existsSync('services')) fs.mkdirSync('services', { recursive: true });

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
}

function stripHtml(html) {
  if (!html) return '';
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseTable(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  if (rows.length === 0) return '';
  
  let md = '';
  rows.forEach((r, idx) => {
    const cells = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(m => stripHtml(m[1]).replace(/\n/g, ' '));
    if (cells.length > 0) {
      md += '| ' + cells.join(' | ') + ' |\n';
      if (idx === 0) {
        md += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
      }
    }
  });
  return md;
}

function parseFaqs(html) {
  const faqSectionMatch = html.match(/<section[^>]*id=["']faqs?["'][^>]*>([\s\S]*?)<\/section>/i) ||
                          html.match(/<section[^>]*>([\s\S]*?(?:Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO)[\s\S]*?)<\/section>/i);
  if (!faqSectionMatch) return '';

  const sec = faqSectionMatch[1];
  const titleMatch = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = titleMatch ? stripHtml(titleMatch[1]) : 'Frequently Asked Questions';
  
  const descMatch = sec.match(/<p class="section-lead"[^>]*>([\s\S]*?)<\/p>/i);
  const desc = descMatch ? stripHtml(descMatch[1]) : '';

  const items = [...sec.matchAll(/<div class="faq-item[\s\S]*?<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>/gi)];
  if (items.length === 0) return '';

  let md = `## ${title}\n\n`;
  if (desc) md += `*${desc}*\n\n`;

  items.forEach((item, idx) => {
    let q = stripHtml(item[1].replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/<span class="faq-num"[^>]*>[\s\S]*?<\/span>/gi, '')).replace(/^\d+[\.\/]\s*/, '');
    let a = stripHtml(item[2]);
    md += `### Q${idx + 1}: ${q}\n\n${a}\n\n`;
  });

  return md;
}

function parseMetricsStrip(html) {
  const stripMatch = html.match(/<div class="service-metrics-strip[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/i);
  if (!stripMatch) return '';
  
  const items = [...stripMatch[1].matchAll(/<div class="service-metric-item">([\s\S]*?)<\/div>/gi)];
  if (items.length === 0) return '';

  let md = '### Key Performance Metrics & Benchmarks\n\n';
  items.forEach(it => {
    const num = stripHtml(it[1].match(/<span class="metric-number">([\s\S]*?)<\/span>/i)?.[1] || '');
    const label = stripHtml(it[1].match(/<span class="metric-label">([\s\S]*?)<\/span>/i)?.[1] || '');
    const sub = stripHtml(it[1].match(/<span class="metric-subtext">([\s\S]*?)<\/span>/i)?.[1] || '');
    md += `- **${num} — ${label}:** ${sub}\n`;
  });
  md += '\n';
  return md;
}

// Export functions for use
module.exports = {
  stripHtml,
  parseTable,
  parseFaqs,
  parseMetricsStrip,
  decodeEntities
};
console.log('✓ Helpers initialized');

