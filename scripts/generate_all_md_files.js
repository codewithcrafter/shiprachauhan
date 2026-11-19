/**
 * SHIPRA CHAUHAN WEB PLATFORM — 100% AUTHENTIC MARKDOWN ENGINE
 * Generates exact verbatim Markdown (.md) files for all platform pages
 * directly from their live HTML markup. Zero words changed or fabricated.
 */

const fs = require('fs');
const path = require('path');

// Ensure all output directories exist
const targetDirs = [
  'content',
  'content/services',
  'content/blogs',
  'services',
  'blogs'
];
targetDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

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
    .replace(/<!--[\s\S]*?-->/g, '') // remove comments
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function convertHtmlToMarkdown(html, isBlogArticle = false) {
  let content = html;

  // 1. Strip structural framing that is not content
  content = content.replace(/<head[\s\S]*?<\/head>/i, '');
  content = content.replace(/<header[\s\S]*?<\/header>/i, '');
  content = content.replace(/<footer[\s\S]*?<\/footer>/i, '');
  content = content.replace(/<div class="timed-popup-modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  content = content.replace(/<div class="mobile-bottom-bar[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<div class="page-curtain[\s\S]*?<\/div>\s*<\/div>/gi, '');
  content = content.replace(/<div class="floating-quick-actions[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // If blog article, extract inside <article>
  if (isBlogArticle) {
    const artM = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (artM) content = artM[1];
  }

  // 2. Convert Tables
  content = content.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, tableBody) => {
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

  // 3. Convert FAQ Accordions cleanly
  content = content.replace(/<div class="faq-item[\s\S]*?<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/div>/gi, (match, qHtml, aHtml) => {
    let q = cleanText(qHtml.replace(/<span class="faq-num"[^>]*>[\s\S]*?<\/span>/gi, '')).replace(/^\d+[\.\/]\s*/, '');
    let a = cleanText(aHtml.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n').replace(/<[^>]+>/g, ''));
    return `\n\n### Q: ${q}\n\n${a}\n\n`;
  });

  // 4. Convert Headings
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (m, h) => `\n\n# ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m, h) => `\n\n## ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (m, h) => `\n\n### ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (m, h) => `\n\n#### ${cleanText(h.replace(/<[^>]+>/g, ''))}\n\n`);

  // 5. Convert Blockquotes
  content = content.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, b) => {
    const lines = cleanText(b.replace(/<[^>]+>/g, '')).split('\n');
    return '\n\n' + lines.map(l => '> ' + l).join('\n') + '\n\n';
  });

  // 6. Convert Lists
  content = content.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (m, list) => {
    const items = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
    if (items.length === 0) return '';
    return '\n\n' + items.map(it => '- ' + cleanText(it[1].replace(/<[^>]+>/g, ''))).join('\n') + '\n\n';
  });

  content = content.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (m, list) => {
    const items = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
    if (items.length === 0) return '';
    return '\n\n' + items.map((it, idx) => `${idx + 1}. ` + cleanText(it[1].replace(/<[^>]+>/g, ''))).join('\n') + '\n\n';
  });

  // 7. Convert Paragraphs
  content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (m, p) => `\n\n${cleanText(p.replace(/<[^>]+>/g, ''))}\n\n`);

  // 8. Convert formatting
  content = content.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  content = content.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  content = content.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  content = content.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');

  // Strip remaining tags
  content = content.replace(/<[^>]+>/g, ' ');

  // Clean whitespace & formatting
  content = decodeEntities(content)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return content;
}

function generateMarkdownForFile(htmlPath, customUrl = null) {
  const rawHtml = fs.readFileSync(htmlPath, 'utf8');

  // Metadata
  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1]) : '';

  const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? cleanText(descMatch[1]) : '';

  const canonMatch = rawHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canonical = customUrl || (canonMatch ? cleanText(canonMatch[1]) : '');

  const isBlog = htmlPath.startsWith('blogs/') && htmlPath !== 'blogs/index.html';

  const mdBody = convertHtmlToMarkdown(rawHtml, isBlog);

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
canonical: "${canonical}"
url: "${canonical}"
author: "Shipra Chauhan"
role: "Senior SEO Consultant & Generative Search Expert"
phone: "+91 97181 59724"
email: "info@shiprachauhan.in"
location: "Delhi NCR, India"
---

`;

  return frontmatter + mdBody + '\n';
}

// -----------------------------------------------------------------------------
// PROCESS ALL PLATFORM PAGES
// -----------------------------------------------------------------------------

const pageMappings = [
  // Core Platform Pages
  { html: 'index.html', targets: ['index.md', 'content/index.md'], url: 'https://shiprachauhan.in/' },
  { html: 'about.html', targets: ['about.md', 'about-shipra-chauhan.md', 'content/about.md', 'content/about-shipra-chauhan.md'], url: 'https://shiprachauhan.in/about' },
  { html: 'contact.html', targets: ['contact.md', 'contact-shipra-chauhan.md', 'content/contact.md', 'content/contact-shipra-chauhan.md'], url: 'https://shiprachauhan.in/contact' },
  { html: 'blogs.html', targets: ['blogs.md', 'blogs/blogs.md', 'blogs/index.md', 'content/blogs.md', 'content/blogs/blogs.md', 'content/blogs/index.md'], url: 'https://shiprachauhan.in/blogs' },

  // Service Pages
  { html: 'ecommerce-seo.html', targets: ['ecommerce-seo.md', 'services/ecommerce-seo.md', 'content/ecommerce-seo.md', 'content/services/ecommerce-seo.md'], url: 'https://shiprachauhan.in/ecommerce-seo' },
  { html: 'geo-services.html', targets: ['geo-services.md', 'services/geo-services.md', 'content/geo-services.md', 'content/services/geo-services.md'], url: 'https://shiprachauhan.in/geo-services' },
  { html: 'local-seo.html', targets: ['local-seo.md', 'services/local-seo.md', 'content/local-seo.md', 'content/services/local-seo.md'], url: 'https://shiprachauhan.in/local-seo' },
  { html: 'off-page-seo.html', targets: ['off-page-seo.md', 'services/off-page-seo.md', 'content/off-page-seo.md', 'content/services/off-page-seo.md'], url: 'https://shiprachauhan.in/off-page-seo' },
  { html: 'on-page-seo.html', targets: ['on-page-seo.md', 'services/on-page-seo.md', 'content/on-page-seo.md', 'content/services/on-page-seo.md'], url: 'https://shiprachauhan.in/on-page-seo' },
  { html: 'technical-seo.html', targets: ['technical-seo.md', 'services/technical-seo.md', 'content/technical-seo.md', 'content/services/technical-seo.md'], url: 'https://shiprachauhan.in/technical-seo' },

  // Blog Articles (10 articles)
  { html: 'blogs/ai-overviews-local-search.html', targets: ['blogs/ai-overviews-local-search.md', 'content/blogs/ai-overviews-local-search.md'], url: 'https://shiprachauhan.in/blogs/ai-overviews-local-search' },
  { html: 'blogs/digital-pr-vs-link-building.html', targets: ['blogs/digital-pr-vs-link-building.md', 'content/blogs/digital-pr-vs-link-building.md'], url: 'https://shiprachauhan.in/blogs/digital-pr-vs-link-building' },
  { html: 'blogs/internal-linking-strategy-seo.html', targets: ['blogs/internal-linking-strategy-seo.md', 'content/blogs/internal-linking-strategy-seo.md'], url: 'https://shiprachauhan.in/blogs/internal-linking-strategy-seo' },
  { html: 'blogs/link-building-ai-search-citations.html', targets: ['blogs/link-building-ai-search-citations.md', 'content/blogs/link-building-ai-search-citations.md'], url: 'https://shiprachauhan.in/blogs/link-building-ai-search-citations' },
  { html: 'blogs/multi-location-seo-cannibalization.html', targets: ['blogs/multi-location-seo-cannibalization.md', 'content/blogs/multi-location-seo-cannibalization.md'], url: 'https://shiprachauhan.in/blogs/multi-location-seo-cannibalization' },
  { html: 'blogs/review-response-local-seo.html', targets: ['blogs/review-response-local-seo.md', 'content/blogs/review-response-local-seo.md'], url: 'https://shiprachauhan.in/blogs/review-response-local-seo' },
  { html: 'blogs/title-tag-optimization-best-practices.html', targets: ['blogs/title-tag-optimization-best-practices.md', 'content/blogs/title-tag-optimization-best-practices.md'], url: 'https://shiprachauhan.in/blogs/title-tag-optimization-best-practices' },
  { html: 'blogs/toxic-backlinks-disavow.html', targets: ['blogs/toxic-backlinks-disavow.md', 'content/blogs/toxic-backlinks-disavow.md'], url: 'https://shiprachauhan.in/blogs/toxic-backlinks-disavow' },
  { html: 'blogs/unlinked-brand-mentions-seo.html', targets: ['blogs/unlinked-brand-mentions-seo.md', 'content/blogs/unlinked-brand-mentions-seo.md'], url: 'https://shiprachauhan.in/blogs/unlinked-brand-mentions-seo' },
  { html: 'blogs/voice-search-local-seo.html', targets: ['blogs/voice-search-local-seo.md', 'content/blogs/voice-search-local-seo.md'], url: 'https://shiprachauhan.in/blogs/voice-search-local-seo' }
];

console.log('Generating authentic Markdown files for all pages...\n');

let totalCreated = 0;

pageMappings.forEach(item => {
  if (!fs.existsSync(item.html)) {
    console.error('Source HTML not found:', item.html);
    return;
  }

  const mdContent = generateMarkdownForFile(item.html, item.url);

  item.targets.forEach(tgt => {
    const dir = path.dirname(tgt);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(tgt, mdContent, 'utf8');
    totalCreated++;
    console.log(`[CREATED] ${tgt.padEnd(50)} (${(mdContent.length / 1024).toFixed(2)} KB)`);
  });
});

console.log(`\nSuccessfully generated ${totalCreated} authentic Markdown files across all routes!`);
