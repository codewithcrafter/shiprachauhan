const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find FAQ section and audit section
const faqMatch = html.match(/<!-- Frequently Asked Questions Section -->[\s\S]*?<section class="section section-white"[^>]*id="faqs"[^>]*>[\s\S]*?<\/section>/i) ||
                 html.match(/<section class="section section-white"[^>]*id="faqs"[^>]*>[\s\S]*?<\/section>/i);

const auditMatch = html.match(/<!-- Audit Section \(Dark Green\) -->[\s\S]*?<section class="audit-section"[^>]*>[\s\S]*?<\/section>/i) ||
                   html.match(/<section class="audit-section"[^>]*>[\s\S]*?<\/section>/i);

console.log('FAQ matched:', !!faqMatch, faqMatch ? faqMatch[0].length : 0);
console.log('Audit matched:', !!auditMatch, auditMatch ? auditMatch[0].length : 0);

if (faqMatch && auditMatch) {
  const faqIdx = html.indexOf(faqMatch[0]);
  const auditIdx = html.indexOf(auditMatch[0]);
  console.log('FAQ position:', faqIdx, 'Audit position:', auditIdx);
  console.log('Is FAQ before audit?', faqIdx < auditIdx);
}

