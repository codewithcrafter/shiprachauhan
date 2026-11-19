const fs = require('fs');

const pages = [
  'index.html',
  'about.html',
  'contact.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

function extractFaqs(content) {
  const faqs = [];
  // Find all faq-item or accordion-item blocks
  // Regex to match from <div class="faq-item... or accordion-item to the closing tag of answer
  // Let's do a DOM-like parse or robust regex
  
  // Find all buttons
  const btnRegex = /<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn|accordion-trigger)[^"]*"[^>]*>([\s\S]*?)<\/button>/g;
  let btnMatch;
  const indices = [];
  while ((btnMatch = btnRegex.exec(content)) !== null) {
    indices.push({
      start: btnMatch.index,
      end: btnRegex.lastIndex,
      btnHtml: btnMatch[1]
    });
  }

  for (let i = 0; i < indices.length; i++) {
    const curr = indices[i];
    // Answer starts at curr.end and goes up to next button or end of accordion
    let answerHtml = '';
    const nextStart = (i + 1 < indices.length) ? indices[i + 1].start : content.indexOf('</section>', curr.end);
    const chunk = content.substring(curr.end, nextStart);
    
    // Extract inner text or paragraphs from chunk
    // Remove wrapping divs like faq-content, faq-content-inner, accordion-content, etc.
    let cleaned = chunk
      .replace(/<div class="(?:faq-content|faq-content-inner|accordion-content|accordion-inner|faq-answer)"[^>]*>/g, '')
      .replace(/<\/div>\s*<\/div>\s*<\/div>/g, '')
      .replace(/<\/div>\s*<\/div>/g, '')
      .trim();

    // Clean question
    let q = curr.btnHtml
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<span class="(?:faq-num|faq-icon-toggle|accordion-icon|faq-chevron)"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<div class="(?:accordion-icon)"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*\/\/\s*/, '').trim();

    faqs.push({
      question: q,
      answer: cleaned
    });
  }

  return faqs;
}

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const faqs = extractFaqs(content);
  console.log(`\n=== ${p} (${faqs.length} FAQs) ===`);
  faqs.forEach((f, idx) => {
    console.log(`[Q${idx + 1}] ${f.question}`);
    console.log(`  Ans length: ${f.answer.length} chars | starts: ${f.answer.substring(0, 60)}...`);
  });
});

