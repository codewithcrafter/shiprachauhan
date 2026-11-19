const fs = require('fs');

const pagesData = [
  {
    file: 'index.html',
    eyebrow: 'Direct Advisory',
    title: 'Frequently Asked Questions About SEO Services in Delhi',
    desc: 'Everything you need to know about our search advisory, algorithm alignment, and client partnerships.'
  },
  {
    file: 'about.html',
    eyebrow: 'Direct Background',
    title: 'Frequently Asked Questions About Shipra Chauhan',
    desc: 'Direct insights regarding background, qualifications, certifications, and technical approach.'
  },
  {
    file: 'contact.html',
    eyebrow: 'Advisory Clarifications',
    title: 'Frequently Asked Questions About Hiring &amp; Consultations',
    desc: 'Common questions regarding scheduling, remote consultations, and session preparation.'
  },
  {
    file: 'ecommerce-seo.html',
    eyebrow: 'Ecommerce Advisory',
    title: 'Frequently Asked Questions About Ecommerce SEO in Delhi',
    desc: 'Technical clarity on crawl budget, duplicate content, Shopify optimization, and pricing.'
  },
  {
    file: 'geo-services.html',
    eyebrow: 'Generative Search Knowledge Base',
    title: 'FAQs - GEO and AI Overview Optimisation in Delhi',
    desc: 'Understand generative engine optimization, citation engineering, and brand trust.'
  },
  {
    file: 'local-seo.html',
    eyebrow: 'Local Dominance',
    title: 'Frequently Asked Questions About Local SEO in Delhi',
    desc: 'Insights into Google Business Profile rankings, Map Pack visibility, and citation building.'
  },
  {
    file: 'off-page-seo.html',
    eyebrow: 'Authority Building',
    title: 'Frequently Asked Questions About Off Page SEO in Delhi',
    desc: 'Direct answers on link building, digital PR, backlink audits, and penalty protection.'
  },
  {
    file: 'on-page-seo.html',
    eyebrow: 'Content Architecture',
    title: 'Frequently Asked Questions About On-Page SEO in Delhi',
    desc: 'Answers on content architecture, SILO hierarchy, semantic optimization, and ranking timelines.'
  },
  {
    file: 'technical-seo.html',
    eyebrow: 'Technical Audit Knowledge',
    title: 'Technical SEO Audit FAQs',
    desc: 'Clear guidance on crawl errors, Core Web Vitals, index coverage, and manual audits.'
  }
];

function extractCleanQAPairs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find all buttons inside faq section
  const faqSectionStart = content.search(/id=["']faqs?["']/i);
  if (faqSectionStart === -1) return [];
  
  const sectionContent = content.substring(faqSectionStart, content.indexOf('</section>', faqSectionStart));
  
  // Regex to match buttons and answers
  const btnMatches = [...sectionContent.matchAll(/<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn)[^"]*"[^>]*>([\s\S]*?)<\/button>/gi)];
  
  const results = [];
  
  for (let i = 0; i < btnMatches.length; i++) {
    const btn = btnMatches[i];
    let q = btn[1]
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*[\.\/]\s*/, '').trim();
    
    // Find answer between this button and next button (or end of section)
    const btnEnd = btn.index + btn[0].length;
    const nextBtnStart = (i + 1 < btnMatches.length) ? btnMatches[i + 1].index : sectionContent.length;
    const answerSnippet = sectionContent.substring(btnEnd, nextBtnStart);
    
    // Clean answer text completely:
    // Extract text from <p> or strip all tags
    let pMatches = answerSnippet.match(/<p>([\s\S]*?)<\/p>/gi);
    let answerText = '';
    
    if (pMatches && pMatches.length > 0) {
      answerText = pMatches
        .map(p => p.replace(/<[^>]+>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim())
        .filter(t => t.length > 0 && !t.includes('faq-item'))
        .map(t => `<p>${t}</p>`)
        .join('\n            ');
    }
    
    if (!answerText) {
      let rawText = answerSnippet
        .replace(/<div[\s\S]*?<\/div>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      answerText = `<p>${rawText}</p>`;
    }

    if (!results.find(x => x.question === q)) {
      results.push({ question: q, answer: answerText });
    }
  }

  return results;
}

pagesData.forEach(pData => {
  const qas = extractCleanQAPairs(pData.file);
  console.log(`\n${pData.file}: extracted ${qas.length} clean Q&As:`);
  qas.forEach((qa, idx) => {
    console.log(`  ${idx + 1}. Q: ${qa.question}`);
    console.log(`     A: ${qa.answer.substring(0, 70)}...`);
  });
});

