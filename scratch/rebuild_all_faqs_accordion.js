const fs = require('fs');

console.log('=== REBUILDING ALL FAQS TO SANJEEV-STYLE ACCORDION ===');

// =========================================================================
// 1. UPDATE CSS IN style.css
// =========================================================================
let css = fs.readFileSync('css/style.css', 'utf8');

const masterFaqCss = `
/* ==========================================================================
   MASTER SANJEEV-STYLE LUXURY FAQ ACCORDION (SHIPRA PALETTE)
   ========================================================================== */
.faq-accordion,
.faq-list {
  max-width: 900px;
  margin: 2rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  width: 100%;
}

.faq-item {
  background: #FFFFFF !important;
  border: 1.5px solid rgba(183, 154, 98, 0.28) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 14px -2px rgba(18, 60, 50, 0.04) !important;
  overflow: hidden !important;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.faq-item:hover {
  border-color: rgba(183, 154, 98, 0.65) !important;
  box-shadow: 0 10px 24px -4px rgba(18, 60, 50, 0.08) !important;
  transform: translateY(-2px);
}

.faq-item.active,
.faq-item.open {
  border-color: #B79A62 !important;
  box-shadow: 0 14px 32px -4px rgba(18, 60, 50, 0.12) !important;
  background: #FFFFFF !important;
}

.faq-question-btn,
.faq-trigger {
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 1.35rem 1.65rem !important;
  background: transparent !important;
  border: none !important;
  font-family: var(--font-display, 'Playfair Display', Georgia, serif) !important;
  font-size: 1.08rem !important;
  font-weight: 700 !important;
  color: #142820 !important;
  text-align: left !important;
  cursor: pointer !important;
  transition: color 0.2s ease !important;
  gap: 1.25rem !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  outline: none !important;
}

.faq-question-btn:hover,
.faq-trigger:hover,
.faq-item.active .faq-question-btn,
.faq-item.active .faq-trigger,
.faq-item.open .faq-question-btn,
.faq-item.open .faq-trigger {
  color: #123C32 !important;
}

.faq-chevron,
.faq-icon-toggle {
  width: 22px !important;
  height: 22px !important;
  min-width: 22px !important;
  flex-shrink: 0 !important;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease !important;
  color: #B79A62 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  border: none !important;
}

.faq-chevron svg,
.faq-icon-toggle svg {
  width: 20px !important;
  height: 20px !important;
  stroke: currentColor !important;
}

.faq-item.active .faq-chevron,
.faq-item.open .faq-chevron,
.faq-item.active .faq-icon-toggle,
.faq-item.open .faq-icon-toggle,
.faq-item.active .faq-chevron svg,
.faq-item.open .faq-chevron svg {
  transform: rotate(180deg) !important;
  color: #123C32 !important;
}

.faq-answer,
.faq-content {
  max-height: 0 !important;
  overflow: hidden !important;
  transition: max-height 0.38s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease !important;
  padding: 0 1.65rem !important;
  color: #4A5248 !important;
  font-family: var(--font-body, system-ui, -apple-system, sans-serif) !important;
  font-size: 0.98rem !important;
  line-height: 1.75 !important;
}

.faq-item.active .faq-answer,
.faq-item.open .faq-answer,
.faq-item.active .faq-content,
.faq-item.open .faq-content {
  max-height: 800px !important;
  padding: 0 1.65rem 1.65rem 1.65rem !important;
}

.faq-answer p,
.faq-content p,
.faq-content-inner p {
  margin: 0 0 0.85rem 0 !important;
  color: #4A5248 !important;
  line-height: 1.75 !important;
}

.faq-answer p:last-child,
.faq-content p:last-child,
.faq-content-inner p:last-child {
  margin-bottom: 0 !important;
}
`;

css += '\n' + masterFaqCss;
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✓ Appended master FAQ accordion styles to css/style.css');


// =========================================================================
// 2. UPDATE js/main.js
// =========================================================================
let js = fs.readFileSync('js/main.js', 'utf8');

const oldFaqFuncStart = js.indexOf('function initFaqAccordions() {');
const oldFaqFuncEnd = js.indexOf('function initScrollToTop()');

const newFaqFunc = `function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn, .faq-trigger, .accordion-trigger');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = item.classList.contains('active') || item.classList.contains('open');

      // Auto-collapse other open items in the same container
      const container = item.closest('.faq-accordion, .faq-list, .accordion');
      if (container) {
        container.querySelectorAll('.faq-item.active, .faq-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('active', 'open');
            const otherBtn = other.querySelector('.faq-question-btn, .faq-trigger, .accordion-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isActive);
      item.classList.toggle('open', !isActive);
      btn.setAttribute('aria-expanded', String(!isActive));
    });
  });
}

`;

if (oldFaqFuncStart !== -1 && oldFaqFuncEnd !== -1) {
  js = js.substring(0, oldFaqFuncStart) + newFaqFunc + js.substring(oldFaqFuncEnd);
  fs.writeFileSync('js/main.js', js, 'utf8');
  console.log('✓ Updated initFaqAccordions in js/main.js');
}


// =========================================================================
// 3. REBUILD FAQ SECTIONS ACROSS ALL 9 PAGES
// =========================================================================

function generateAccordionHtml(faqs, sectionEyebrow, sectionTitle, sectionDesc) {
  let html = `
      <div class="section-header text-center reveal-init">
        <div class="eyebrow">${sectionEyebrow}</div>
        <h2>${sectionTitle}</h2>
        ${sectionDesc ? `<p class="section-lead">${sectionDesc}</p>` : ''}
      </div>

      <div class="faq-accordion reveal-init stagger-1" id="mainFaqAccordion">
`;

  faqs.forEach((faq, index) => {
    const num = String(index + 1).padStart(2, '0');
    const isActive = index === 0; // First item active by default
    const activeClass = isActive ? ' active' : '';
    const expandedAttr = isActive ? 'true' : 'false';

    let answerHtml = faq.answer.trim();
    if (!answerHtml.startsWith('<p') && !answerHtml.startsWith('<div')) {
      answerHtml = `<p>${answerHtml}</p>`;
    }

    html += `        <!-- FAQ ${index + 1} -->
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

  html += `      </div>`;
  return html;
}

// Map each file with its parsed FAQs and section headers
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

// Helper to extract cleanly
function parsePageFaqs(content) {
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

  const faqs = [];
  for (let i = 0; i < indices.length; i++) {
    const curr = indices[i];
    const nextStart = (i + 1 < indices.length) ? indices[i + 1].start : content.indexOf('</section>', curr.end);
    const chunk = content.substring(curr.end, nextStart);
    
    let cleaned = chunk
      .replace(/<div class="(?:faq-content|faq-content-inner|accordion-content|accordion-inner|faq-answer)"[^>]*>/g, '')
      .replace(/<\/div>\s*<\/div>\s*<\/div>/g, '')
      .replace(/<\/div>\s*<\/div>/g, '')
      .trim();

    let q = curr.btnHtml
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<span class="(?:faq-num|faq-icon-toggle|accordion-icon|faq-chevron)"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<div class="(?:accordion-icon)"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*[\.\/]\s*/, '').trim();

    faqs.push({
      question: q,
      answer: cleaned
    });
  }

  return faqs;
}

pagesData.forEach(pData => {
  let content = fs.readFileSync(pData.file, 'utf8');
  console.log(`Processing FAQ accordion in ${pData.file}...`);

  const faqs = parsePageFaqs(content);
  console.log(`  Extracted ${faqs.length} FAQs`);

  // Find the FAQ section in content
  let sectionStartIdx = -1;
  let sectionEndIdx = -1;

  if (pData.file === 'index.html') {
    sectionStartIdx = content.indexOf('<section class="section section-lavender section-dashed-top section-dashed-bottom" id="faq">');
    if (sectionStartIdx === -1) {
      sectionStartIdx = content.indexOf('id="faq"');
      sectionStartIdx = content.lastIndexOf('<section', sectionStartIdx);
    }
    sectionEndIdx = content.indexOf('</section>', sectionStartIdx) + '</section>'.length;
  } else {
    // Look for eyebrow FAQ or heading FAQ
    const faqWordIdx = content.search(/Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO/i);
    if (faqWordIdx !== -1) {
      sectionStartIdx = content.lastIndexOf('<section', faqWordIdx);
      sectionEndIdx = content.indexOf('</section>', faqWordIdx) + '</section>'.length;
    }
  }

  if (sectionStartIdx !== -1 && sectionEndIdx !== -1) {
    const newAccordion = generateAccordionHtml(faqs, pData.eyebrow, pData.title, pData.desc);
    
    // Wrap in clean luxury section
    const newSectionHtml = `  <!-- Frequently Asked Questions (Master Sanjeev-Style Accordion) -->
  <section class="section section-warm" id="faqs" style="padding: 5rem 0; background: rgba(244, 239, 230, 0.45); border-top: 1px solid rgba(183, 154, 98, 0.2); border-bottom: 1px solid rgba(183, 154, 98, 0.2);">
    <div class="container">
${newAccordion}
    </div>
  </section>`;

    content = content.substring(0, sectionStartIdx) + newSectionHtml + content.substring(sectionEndIdx);
    fs.writeFileSync(pData.file, content, 'utf8');
    console.log(`  ✓ Successfully replaced FAQ section in ${pData.file}!`);
  } else {
    console.error(`  ✗ Could not locate FAQ section boundaries in ${pData.file}`);
  }
});

console.log('\n=== ALL FAQS REBUILT SUCCESSFULLY! ===');

