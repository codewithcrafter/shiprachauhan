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

pages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n======================================================`);
  console.log(`FILE: ${file}`);
  console.log(`======================================================`);
  
  // Find all buttons inside faq section
  const faqSectionStart = content.search(/id=["']faqs?["']/i);
  if (faqSectionStart === -1) {
    console.log('No FAQ section found!');
    return;
  }
  
  const sectionContent = content.substring(faqSectionStart, content.indexOf('</section>', faqSectionStart));
  const btnMatches = [...sectionContent.matchAll(/<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>/gi)];
  
  console.log(`Found ${btnMatches.length} questions:`);
  
  for (let i = 0; i < btnMatches.length; i++) {
    const btn = btnMatches[i];
    let q = btn[1]
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*[\.\/]\s*/, '').trim();
    
    const btnEnd = btn.index + btn[0].length;
    const nextBtnStart = (i + 1 < btnMatches.length) ? btnMatches[i + 1].index : sectionContent.length;
    const answerSnippet = sectionContent.substring(btnEnd, nextBtnStart);
    
    // Strip tags and comments
    let cleanAns = answerSnippet
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<div class="faq-item">/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
      
    console.log(`  ${i + 1}. Q: ${q}`);
    console.log(`     A (${cleanAns.length} chars): ${cleanAns.substring(0, 80)}...`);
  }
});

