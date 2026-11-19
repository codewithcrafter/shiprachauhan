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

function extractFaqsClean(content) {
  const items = [];
  const regex = /<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn|accordion-trigger)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="(?:faq-content-inner|faq-answer|accordion-inner)"[^>]*>([\s\S]*?)<\/div>/g;
  
  let m;
  while ((m = regex.exec(content)) !== null) {
    let q = m[1]
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<span class="(?:faq-num|faq-icon-toggle|accordion-icon|faq-chevron)"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<div class="(?:accordion-icon)"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*[\.\/]\s*/, '').trim();

    let ans = m[2].trim();
    ans = ans.replace(/<!--[\s\S]*?-->/g, '').trim();

    // Check if duplicate question already added
    if (!items.find(x => x.question === q)) {
      items.push({ question: q, answer: ans });
    }
  }

  return items;
}

pages.forEach(p => {
  const c = fs.readFileSync(p, 'utf8');
  const faqs = extractFaqsClean(c);
  console.log(`${p.padEnd(20)}: ${faqs.length} FAQs`);
});

