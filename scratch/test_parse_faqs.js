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
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n================== ${p} ==================`);
  
  // Extract all questions and answers
  // Match both faq-item and accordion-item
  const regex = /<(?:div class="faq-item[^"]*"|div class="accordion-item")>([\s\S]*?)<\/div>\s*<\/div>/g;
  let match;
  let count = 0;
  
  // Alternative extraction using button text and content text
  const btnMatches = content.match(/<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn|accordion-trigger)[^"]*"[^>]*>([\s\S]*?)<\/button>/g) || [];
  console.log(`Found ${btnMatches.length} questions:`);
  btnMatches.forEach((btn, idx) => {
    // Strip svg and tags
    let q = btn.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    // remove leading number like 01 // if any
    q = q.replace(/^\d+\s*\/\/\s*/, '').trim();
    console.log(`  ${idx + 1}. ${q.substring(0, 75)}...`);
  });
});

