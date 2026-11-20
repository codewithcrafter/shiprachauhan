const fs = require('fs');
const path = require('path');

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
    .replace(/&bull;/g, '•')
    .replace(/&nbsp;/g, ' ');
}

function cleanText(text) {
  if (!text) return '';
  return decodeEntities(text)
    .replace(/<!--[\s\S]*?-->/g, '') // strip comments
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function convertHtmlFragmentToMd(html) {
  let text = html;

  // 1. Remove non-content elements
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Convert Tables
  text = text.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, tableBody) => {
    const rows = [...tableBody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    if (rows.length === 0) return '';
    let mdTable = '\n\n';
    rows.forEach((r, idx) => {
      const cells = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)]
        .map(c => cleanText(c[1].replace(/<[^>]+>/g, '')).replace(/\n/g, ' '));
      if (cells.length > 0) {
        mdTable += '| ' + cells.join(' | ') + ' |\n';
        if (idx === 0) {
          mdTable += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
        }
      }
    });
    return mdTable + '\n\n';
  });

  // 3. Convert FAQ Accordions
  text = text.replace(/<div class="faq-item[\s\S]*?<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/div>/gi, (match, qHtml, aHtml) => {
    let q = cleanText(qHtml.replace(/<span class="faq-num"[^>]*>[\s\S]*?<\/span>/gi, '')).replace(/^\d+[\.\/]\s*/, '');
    let a = cleanText(aHtml.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n').replace(/<[^>]+>/g, ''));
    return `\n\n### Q: ${q}\n\n${a}\n\n`;
  });

  // 4. Convert Headings
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (m, h) => `\n\n# ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m, h) => `\n\n## ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (m, h) => `\n\n### ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (m, h) => `\n\n#### ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);

  // 5. Convert Blockquotes
  text = text.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, b) => {
    const lines = cleanText(b.replace(/<[^>]+>/g, '')).split('\n');
    return '\n\n' + lines.map(l => '> ' + l).join('\n') + '\n\n';
  });

  // 6. Convert Lists
  text = text.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (m, list) => {
    const items = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
    if (items.length === 0) return '';
    return '\n\n' + items.map(it => '- ' + cleanText(it[1].replace(/<[^>]+>/g, ''))).join('\n') + '\n\n';
  });

  text = text.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (m, list) => {
    const items = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
    if (items.length === 0) return '';
    return '\n\n' + items.map((it, idx) => `${idx + 1}. ` + cleanText(it[1].replace(/<[^>]+>/g, ''))).join('\n') + '\n\n';
  });

  // 7. Convert Paragraphs
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (m, p) => `\n\n${cleanText(p.replace(/<[^>]+>/g, ''))}\n\n`);

  // 8. Convert formatting (strong, em, a)
  text = text.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  text = text.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  text = text.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  text = text.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');

  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Clean whitespace
  text = decodeEntities(text)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text;
}

function processPage(htmlPath) {
  const rawHtml = fs.readFileSync(htmlPath, 'utf8');

  // Metadata
  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1]) : '';

  const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? cleanText(descMatch[1]) : '';

  const canonMatch = rawHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canonical = canonMatch ? cleanText(canonMatch[1]) : '';

  // Body extraction
  let mainContent = rawHtml;
  mainContent = mainContent.replace(/<head[\s\S]*?<\/head>/i, '');
  mainContent = mainContent.replace(/<header[\s\S]*?<\/header>/i, '');
  mainContent = mainContent.replace(/<footer[\s\S]*?<\/footer>/i, '');
  mainContent = mainContent.replace(/<div class="timed-popup-modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  mainContent = mainContent.replace(/<div class="mobile-bottom-bar[\s\S]*?<\/div>/gi, '');
  mainContent = mainContent.replace(/<div class="page-curtain[\s\S]*?<\/div>\s*<\/div>/gi, '');
  mainContent = mainContent.replace(/<div class="floating-quick-actions[\s\S]*?<\/div>/gi, '');

  const mdBody = convertHtmlFragmentToMd(mainContent);

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
canonical: "${canonical.replace(/"/g, '\\"')}"
url: "${canonical.replace(/"/g, '\\"')}"
author: "Shipra Chauhan"
role: "Senior SEO Consultant & Generative Search Expert"
phone: "+91 97181 59724"
email: "info@shiprachauhan.in"
location: "Delhi NCR, India"
---

`;

  return frontmatter + mdBody;
}

console.log('Testing processPage on index.html:');
const indexMd = processPage('index.html');
console.log('Result length:', indexMd.length);
console.log('Preview (first 1000 chars):');
console.log(indexMd.slice(0, 1000));

