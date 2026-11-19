const fs = require('fs');
const { stripHtml, parseTable } = require('./build_all_md.js');

function convertSectionToMarkdown(secHtml) {
  let md = '';

  // Check if this is the metrics strip
  if (secHtml.includes('service-metrics-strip')) {
    const items = [...secHtml.matchAll(/<div class="service-metric-item">([\s\S]*?)<\/div>/gi)];
    if (items.length > 0) {
      md += '### Key Performance Metrics & Benchmarks\n\n';
      items.forEach(it => {
        const num = stripHtml(it[1].match(/<span class="metric-number">([\s\S]*?)<\/span>/i)?.[1] || '');
        const label = stripHtml(it[1].match(/<span class="metric-label">([\s\S]*?)<\/span>/i)?.[1] || '');
        const sub = stripHtml(it[1].match(/<span class="metric-subtext">([\s\S]*?)<\/span>/i)?.[1] || '');
        md += `- **${num} — ${label}:** ${sub}\n`;
      });
      md += '\n---\n\n';
    }
    return md;
  }

  // Check if FAQ section
  if (secHtml.includes('faq-accordion') || secHtml.includes('faq-item')) {
    const titleMatch = secHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : 'Frequently Asked Questions';
    const descMatch = secHtml.match(/<p class="section-lead"[^>]*>([\s\S]*?)<\/p>/i);
    const desc = descMatch ? stripHtml(descMatch[1]) : '';

    const items = [...secHtml.matchAll(/<div class="faq-item[\s\S]*?<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>/gi)];
    if (items.length > 0) {
      md += `## ${title}\n\n`;
      if (desc) md += `*${desc}*\n\n`;
      items.forEach((item, idx) => {
        let q = stripHtml(item[1].replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/<span class="faq-num"[^>]*>[\s\S]*?<\/span>/gi, '')).replace(/^\d+[\.\/]\s*/, '');
        let a = stripHtml(item[2]);
        md += `### Q${idx + 1}: ${q}\n\n${a}\n\n`;
      });
      md += '---\n\n';
      return md;
    }
  }

  // Eyebrow
  const eyebrowMatch = secHtml.match(/<div class="eyebrow[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const eyebrow = eyebrowMatch ? stripHtml(eyebrowMatch[1]) : '';

  // H1
  const h1Match = secHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const h1 = stripHtml(h1Match[1]);
    md += `# ${h1}\n\n`;
    if (eyebrow) md += `> **${eyebrow}**\n>\n`;
  }

  // H2
  const h2Match = secHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2Match) {
    const h2 = stripHtml(h2Match[1]);
    md += `## ${h2}\n\n`;
    if (eyebrow && !h1Match) md += `*${eyebrow}*\n\n`;
  }

  // Lead text or paragraphs before cards
  const leadMatch = secHtml.match(/<p class="(?:lead-text|hero-lead|section-lead)"[^>]*>([\s\S]*?)<\/p>/i);
  if (leadMatch) {
    md += `${stripHtml(leadMatch[1])}\n\n`;
  }

  // Other direct paragraphs before grids
  const directPs = [...secHtml.matchAll(/<p class="(?:section-subtext|hero-subtext)"[^>]*>([\s\S]*?)<\/p>/gi)];
  directPs.forEach(dp => {
    md += `${stripHtml(dp[1])}\n\n`;
  });

  // Feature cards or bento cards
  const cards = [...secHtml.matchAll(/<div class="(?:feature-card|card|step-card|timeline-item|pillar-card|highlight-card|contact-methodology-card|contact-info-card|review-card)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi)];
  if (cards.length > 0) {
    cards.forEach(card => {
      const cHtml = card[1];
      const ch3 = cHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const ch4 = cHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
      const cEyebrow = cHtml.match(/<div class="eyebrow[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      const cDate = cHtml.match(/<div class="timeline-date"[^>]*>([\s\S]*?)<\/div>/i);

      let cardTitle = ch3 ? stripHtml(ch3[1]) : (ch4 ? stripHtml(ch4[1]) : '');
      if (cDate) cardTitle = `${stripHtml(cDate[1])}: ${cardTitle}`;
      
      if (cardTitle) {
        md += `### ${cardTitle}\n\n`;
      }
      if (cEyebrow) {
        md += `*${stripHtml(cEyebrow[1])}*\n\n`;
      }

      const cardPs = [...cHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      cardPs.forEach(cp => {
        md += `${stripHtml(cp[1])}\n\n`;
      });

      const cardUls = [...cHtml.matchAll(/<ul[^>]*>([\s\S]*?)<\/ul>/gi)];
      cardUls.forEach(cul => {
        const lis = [...cul[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
        lis.forEach(li => {
          md += `- ${stripHtml(li[1])}\n`;
        });
        md += '\n';
      });
    });
  } else {
    // If no feature cards, extract general content (p, ul, table, quotes)
    // Extract table
    const tableMatch = secHtml.match(/<table[\s\S]*?<\/table>/i);
    if (tableMatch) {
      md += parseTable(tableMatch[0]) + '\n\n';
    }

    // Callout quotes
    const quotes = [...secHtml.matchAll(/<div class="callout-quote[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
    quotes.forEach(q => {
      md += `> ${stripHtml(q[1])}\n\n`;
    });

    // Extract H3s and their paragraphs
    const h3Sections = [...secHtml.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|<\/section|$)/gi)];
    if (h3Sections.length > 0) {
      h3Sections.forEach(h3s => {
        md += `### ${stripHtml(h3s[1])}\n\n`;
        const innerPs = [...h3s[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
        innerPs.forEach(ip => {
          md += `${stripHtml(ip[1])}\n\n`;
        });
        const innerUls = [...h3s[2].matchAll(/<ul[^>]*>([\s\S]*?)<\/ul>/gi)];
        innerUls.forEach(iul => {
          const lis = [...iul[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
          lis.forEach(li => {
            md += `- ${stripHtml(li[1])}\n`;
          });
          md += '\n';
        });
      });
    } else {
      // General paragraphs
      const genPs = [...secHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      genPs.forEach(gp => {
        // avoid duplicating lead text
        const text = stripHtml(gp[1]);
        if (!md.includes(text) && text.length > 0) {
          md += `${text}\n\n`;
        }
      });
    }
  }

  md += '---\n\n';
  return md;
}

// Test on technical-seo.html
const html = fs.readFileSync('technical-seo.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
let fullMd = '';
sections.forEach(s => {
  fullMd += convertSectionToMarkdown(s[1]);
});

console.log('Generated Markdown length:', fullMd.length);
console.log('\nPreview:\n', fullMd.substring(0, 1000));

