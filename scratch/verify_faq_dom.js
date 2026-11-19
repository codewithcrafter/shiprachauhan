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

pages.forEach(p => {
  const c = fs.readFileSync(p, 'utf8');
  const sectionIdx = c.indexOf('id="faqs"');
  if (sectionIdx === -1) {
    console.log(`${p}: No FAQ section`);
    return;
  }
  const sectionEnd = c.indexOf('</section>', sectionIdx);
  const sec = c.substring(sectionIdx, sectionEnd);
  
  // Count faq-item
  const items = sec.match(/<div class="faq-item/g) || [];
  const btns = sec.match(/<button class="faq-question-btn"/g) || [];
  const answers = sec.match(/<div class="faq-answer">/g) || [];
  
  // Check if any .faq-answer contains faq-item before its closing </div>
  const ansMatches = [...sec.matchAll(/<div class="faq-answer">([\s\S]*?)<\/div>/g)];
  let nested = 0;
  ansMatches.forEach(am => {
    if (am[1].includes('faq-item')) {
      nested++;
    }
  });

  console.log(`${p.padEnd(20)}: items=${items.length}, buttons=${btns.length}, answers=${answers.length}, nestedInAnswer=${nested}`);
});

