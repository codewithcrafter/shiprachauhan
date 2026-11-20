const fs = require('fs');

const html = fs.readFileSync('about.html', 'utf8');
const faqMatch = html.match(/<section[^>]*id="faqs?"[^>]*>[\s\S]*?<\/section>/i) ||
                 html.match(/<section[^>]*>([\s\S]*?Frequently Asked Questions About Shipra Chauhan[\s\S]*?)<\/section>/i);

const footerIdx = html.indexOf('<footer');
const ctaSection = html.slice(html.indexOf(faqMatch[0]) + faqMatch[0].length, footerIdx).trim();

console.log('FAQ section found:', !!faqMatch, faqMatch[0].length);
console.log('CTA section found:', ctaSection.slice(0, 300));

