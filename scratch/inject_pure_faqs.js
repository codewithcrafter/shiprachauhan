const fs = require('fs');

const qaDict = JSON.parse(fs.readFileSync('scratch/pure_qa_dictionary.json', 'utf8'));

const metaMap = {
  'index.html': {
    eyebrow: '08 // INQUIRIES &amp; ADVISORY // FREQUENTLY ASKED QUESTIONS',
    title: 'Frequently Asked Questions About SEO Services in Delhi',
    desc: 'Everything you need to know about our search advisory, algorithm alignment, and client partnerships.'
  },
  'about.html': {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Shipra Chauhan',
    desc: 'Direct insights regarding background, qualifications, certifications, and technical approach.'
  },
  'contact.html': {
    eyebrow: 'Advisory Clarifications',
    title: 'Frequently Asked Questions About Hiring &amp; Consultations',
    desc: 'Common questions regarding scheduling, remote consultations, and session preparation.'
  },
  'ecommerce-seo.html': {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Ecommerce SEO in Delhi',
    desc: 'Technical clarity on crawl budget, duplicate content, Shopify optimization, and pricing.'
  },
  'geo-services.html': {
    eyebrow: 'Knowledge Base',
    title: 'FAQs - GEO and AI Overview Optimisation in Delhi',
    desc: 'Understand generative engine optimization, citation engineering, and brand trust.'
  },
  'local-seo.html': {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Local SEO in Delhi',
    desc: 'Insights into Google Business Profile rankings, Map Pack visibility, and citation building.'
  },
  'off-page-seo.html': {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About Off Page SEO in Delhi',
    desc: 'Direct answers on link building, digital PR, backlink audits, and penalty protection.'
  },
  'on-page-seo.html': {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions About On-Page SEO in Delhi',
    desc: 'Answers on content architecture, SILO hierarchy, semantic optimization, and ranking timelines.'
  },
  'technical-seo.html': {
    eyebrow: 'FAQ',
    title: 'Technical SEO Audit FAQs',
    desc: 'Clear guidance on crawl errors, Core Web Vitals, index coverage, and manual audits.'
  }
};

function generateCleanFaqSection(file, qas) {
  const meta = metaMap[file];
  let itemsHtml = '';
  
  qas.forEach((item, index) => {
    const num = String(index + 1).padStart(2, '0');
    const isActive = index === 0;
    const activeClass = isActive ? ' active' : '';
    const expandedAttr = isActive ? 'true' : 'false';
    
    itemsHtml += `        <!-- FAQ ${index + 1} -->
        <div class="faq-item${activeClass}">
          <button class="faq-question-btn" type="button" aria-expanded="${expandedAttr}">
            <span>${num}. ${item.q}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq-answer">
            <p>${item.a}</p>
          </div>
        </div>\n`;
  });

  return `  <!-- Frequently Asked Questions (Master Sanjeev-Style Accordion) -->
  <section class="section section-warm" id="faqs" style="padding: 5rem 0; background: rgba(244, 239, 230, 0.45); border-top: 1px solid rgba(183, 154, 98, 0.2); border-bottom: 1px solid rgba(183, 154, 98, 0.2);">
    <div class="container">
      <div class="section-header text-center reveal-init">
        <div class="eyebrow">${meta.eyebrow}</div>
        <h2>${meta.title}</h2>
        ${meta.desc ? `<p class="section-lead">${meta.desc}</p>` : ''}
      </div>

      <div class="faq-accordion reveal-init stagger-1" id="mainFaqAccordion">
${itemsHtml}      </div>
    </div>
  </section>`;
}

Object.keys(metaMap).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  console.log(`Processing ${file}...`);
  
  // Remove any duplicate comment headers like "<!-- Frequently Asked Questions..." right before section
  content = content.replace(/(?:\s*<!-- Frequently Asked Questions[^>]*-->)+/g, '\n');

  // Find existing FAQ section
  // Match <section ... id="faqs?" ...> ... </section>
  // Or match <section ...> ... (Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO) ... </section>
  let sectionRegex = /<section[^>]*id=["']faqs?["'][^>]*>[\s\S]*?<\/section>/i;
  let match = content.match(sectionRegex);
  
  if (!match) {
    // Fallback: look for section containing FAQ headings
    sectionRegex = /<section[^>]*>[\s\S]*?(?:Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO)[\s\S]*?<\/section>/i;
    match = content.match(sectionRegex);
  }

  if (match) {
    const newSection = generateCleanFaqSection(file, qaDict[file]);
    content = content.replace(match[0], newSection);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  ✓ Successfully replaced FAQ section in ${file} with ${qaDict[file].length} clean accordion items.`);
  } else {
    console.error(`  ✗ Could not find FAQ section in ${file}`);
  }
});

console.log('\nAll 9 FAQ sections updated!');

