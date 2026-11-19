const fs = require('fs');

const pagesData = [
  {
    file: 'index.html',
    eyebrow: '08 // INQUIRIES &amp; ADVISORY // FREQUENTLY ASKED QUESTIONS',
    title: 'Frequently Asked Questions About SEO Services in Delhi',
    desc: 'Everything you need to know about our search advisory, algorithm alignment, and client partnerships.'
  },
  {
    file: 'about.html',
    eyebrow: 'FAQ',
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
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Ecommerce SEO in Delhi',
    desc: 'Technical clarity on crawl budget, duplicate content, Shopify optimization, and pricing.'
  },
  {
    file: 'geo-services.html',
    eyebrow: 'Knowledge Base',
    title: 'FAQs - GEO and AI Overview Optimisation in Delhi',
    desc: 'Understand generative engine optimization, citation engineering, and brand trust.'
  },
  {
    file: 'local-seo.html',
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Local SEO in Delhi',
    desc: 'Insights into Google Business Profile rankings, Map Pack visibility, and citation building.'
  },
  {
    file: 'off-page-seo.html',
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Off Page SEO in Delhi',
    desc: 'Direct answers on link building, digital PR, backlink audits, and penalty protection.'
  },
  {
    file: 'on-page-seo.html',
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About On-Page SEO in Delhi',
    desc: 'Answers on content architecture, SILO hierarchy, semantic optimization, and ranking timelines.'
  },
  {
    file: 'technical-seo.html',
    eyebrow: 'FAQ',
    title: 'Technical SEO Audit FAQs',
    desc: 'Clear guidance on crawl errors, Core Web Vitals, index coverage, and manual audits.'
  }
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

    if (!items.find(x => x.question === q)) {
      items.push({ question: q, answer: ans });
    }
  }

  return items;
}

pagesData.forEach(pData => {
  let content = fs.readFileSync(pData.file, 'utf8');
  console.log(`Processing clean FAQ accordion in ${pData.file}...`);

  const faqs = extractFaqsClean(content);
  console.log(`  Extracted ${faqs.length} FAQs`);

  let accordionHtml = `
      <div class="section-header text-center reveal-init">
        <div class="eyebrow">${pData.eyebrow}</div>
        <h2>${pData.title}</h2>
        ${pData.desc ? `<p class="section-lead">${pData.desc}</p>` : ''}
      </div>

      <div class="faq-accordion reveal-init stagger-1" id="mainFaqAccordion">
`;

  faqs.forEach((faq, index) => {
    const num = String(index + 1).padStart(2, '0');
    const isActive = index === 0;
    const activeClass = isActive ? ' active' : '';
    const expandedAttr = isActive ? 'true' : 'false';

    let answerHtml = faq.answer.trim();
    if (!answerHtml.startsWith('<p') && !answerHtml.startsWith('<div')) {
      answerHtml = `<p>${answerHtml}</p>`;
    }

    accordionHtml += `        <!-- FAQ ${index + 1} -->
        <div class="faq-item${activeClass}">
          <button class="faq-question-btn" type="button" aria-expanded="${expandedAttr}">
            <span>${num}. ${faq.question}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq-answer">
            ${answerHtml}
          </div>
        </div>\n`;
  });

  accordionHtml += `      </div>`;

  // Find exact section with id="faqs" or id="faq"
  let sectionStartIdx = -1;
  let sectionEndIdx = -1;

  const faqIdIdx = content.search(/id=["']faqs?["']/i);
  if (faqIdIdx !== -1) {
    sectionStartIdx = content.lastIndexOf('<section', faqIdIdx);
    sectionEndIdx = content.indexOf('</section>', faqIdIdx) + '</section>'.length;
  }

  if (sectionStartIdx !== -1 && sectionEndIdx !== -1) {
    const newSection = `  <!-- Frequently Asked Questions (Master Sanjeev-Style Accordion) -->
  <section class="section section-warm" id="faqs" style="padding: 5rem 0; background: rgba(244, 239, 230, 0.45); border-top: 1px solid rgba(183, 154, 98, 0.2); border-bottom: 1px solid rgba(183, 154, 98, 0.2);">
    <div class="container">
${accordionHtml}
    </div>
  </section>`;

    content = content.substring(0, sectionStartIdx) + newSection + content.substring(sectionEndIdx);
    fs.writeFileSync(pData.file, content, 'utf8');
    console.log(`  ✓ Successfully replaced FAQ section in ${pData.file}!`);
  } else {
    console.error(`  ✗ Could not find section for id="faqs" in ${pData.file}`);
  }
});

console.log('\nAll pages updated with clean Sanjeev-style luxury accordions!');

