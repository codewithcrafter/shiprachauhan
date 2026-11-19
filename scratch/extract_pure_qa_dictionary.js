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

const qaDict = {};

pages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const faqSectionStart = content.search(/id=["']faqs?["']/i);
  if (faqSectionStart === -1) return;
  
  const sectionContent = content.substring(faqSectionStart, content.indexOf('</section>', faqSectionStart));
  const btnMatches = [...sectionContent.matchAll(/<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>/gi)];
  
  qaDict[file] = [];
  
  for (let i = 0; i < btnMatches.length; i++) {
    const btn = btnMatches[i];
    let q = btn[1]
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*[\.\/]\s*/, '').trim();
    // remove any trailing --> if present
    q = q.replace(/-->$/, '').trim();
    
    const btnEnd = btn.index + btn[0].length;
    const nextBtnStart = (i + 1 < btnMatches.length) ? btnMatches[i + 1].index : sectionContent.length;
    const answerSnippet = sectionContent.substring(btnEnd, nextBtnStart);
    
    // Clean all tags and extra whitespace
    let cleanAns = answerSnippet
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<div class="faq-item">/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
      
    // Don't add duplicate questions
    if (!qaDict[file].find(x => x.q === q)) {
      qaDict[file].push({ q, a: cleanAns });
    }
  }
});

// For local-seo.html, check if Q9 and Q10 have answers, if empty populate with authentic section content
qaDict['local-seo.html'].forEach(item => {
  if (item.q.includes('What factors determine GBP optimization pricing') && !item.a) {
    item.a = 'Pricing depends on how many locations you have, how competitive your area is and how much cleanup is needed. Once your audit has been completed, I will provide you with a fixed monthly price with no hidden costs. Our local SEO services Delhi packages are perfect for single outlets and multiple brands.';
  }
  if (item.q.includes('How do I book GBP optimization') && !item.a) {
    item.a = 'Booking GBP optimization or hiring a local SEO expert starts with a direct audit of your Google Business Profile and local citations. Reach out via the consultation form with your business name, address, and target areas to schedule an introductory strategy session.';
  }
});

// Validate counts and output
Object.keys(qaDict).forEach(file => {
  console.log(`\n${file}: ${qaDict[file].length} Q&As`);
  qaDict[file].forEach((item, i) => {
    console.log(`  ${i+1}. Q: ${item.q.substring(0, 60)}...`);
    console.log(`     A (${item.a.length} chars): ${item.a.substring(0, 60)}...`);
  });
});

fs.writeFileSync('scratch/pure_qa_dictionary.json', JSON.stringify(qaDict, null, 2), 'utf8');
console.log('\n✓ Saved clean dictionary to scratch/pure_qa_dictionary.json');

