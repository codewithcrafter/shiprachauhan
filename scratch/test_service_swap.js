const fs = require('fs');

const f = 'ecommerce-seo.html';
let html = fs.readFileSync(f, 'utf8');

// Match FAQ section
const faqMatch = html.match(/<section[^>]*id="faqs?"[^>]*>[\s\S]*?<\/section>/i) ||
                 html.match(/<section[^>]*>([\s\S]*?(?:Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO)[\s\S]*?)<\/section>/i);

const footerIdx = html.indexOf('<footer');
const ctaSection = html.slice(html.indexOf(faqMatch[0]) + faqMatch[0].length, footerIdx).trim();

console.log('FAQ match length:', faqMatch ? faqMatch[0].length : 0);
console.log('CTA length:', ctaSection.length);

if (faqMatch && ctaSection) {
  html = html.replace(faqMatch[0], '<!-- FAQ_PLACEHOLDER -->');
  html = html.replace(ctaSection, ctaSection + '\n\n' + faqMatch[0]);
  html = html.replace('<!-- FAQ_PLACEHOLDER -->\n\n', '');
  html = html.replace('<!-- FAQ_PLACEHOLDER -->', '');
  console.log('Swapped successfully! Now checking if FAQ is right before footer:');
  const newFooterIdx = html.indexOf('<footer');
  const newFaqEnd = html.indexOf(faqMatch[0]) + faqMatch[0].length;
  console.log('Chars between new FAQ end and footer:', newFooterIdx - newFaqEnd);
}

