const fs = require('fs');
const path = require('path');

const qaDict = JSON.parse(fs.readFileSync('scratch/pure_qa_dictionary.json', 'utf8'));

// -----------------------------------------------------------------------------
// 1. HELPER: Build FAQ Schema
// -----------------------------------------------------------------------------
function buildFaqSchema(pageKey) {
  const qas = qaDict[pageKey] || [];
  if (qas.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `https://shiprachauhan.in/${pageKey === 'index.html' ? '' : pageKey.replace('.html', '')}#faq`,
    "mainEntity": qas.map(qa => ({
      "@type": "Question",
      "name": qa.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.a
      }
    }))
  };
}

// -----------------------------------------------------------------------------
// 2. HELPER: Uniform Popup Form Markup
// -----------------------------------------------------------------------------
const uniformPopupHtml = `  <!-- 4-Second Timed Animated Lead Pop-up Modal (Every Page Load & Refresh) -->
  <div class="auto-popup-overlay" id="autoPopupOverlay" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
    <div class="auto-popup-card">
      <button class="popup-close-btn" id="closeAutoPopupBtn" aria-label="Close Pop-up">×</button>
      
      <div class="popup-badge">
        <span class="status-pulse-dot"></span>
        <span>Senior SEO Advisory</span>
      </div>

      <h2 class="popup-title" id="popupTitle">Accelerate Your Search Rankings</h2>
      <p class="popup-desc">
        Connect directly with Shipra Chauhan — Senior SEO Consultant Delhi. Receive a comprehensive evaluation of your technical health and AI search visibility.
      </p>

      <form class="popup-form" id="autoPopupForm">
        <div class="form-group">
          <label for="popupName">Full Name *</label>
          <input type="text" id="popupName" name="name" class="form-input" placeholder="Your Full Name *" required>
        </div>

        <div class="form-group">
          <label for="popupEmail">Email Address *</label>
          <input type="email" id="popupEmail" name="email" class="form-input" placeholder="Your Email Address *" required>
        </div>

        <div class="form-group">
          <label for="popupContact">Contact No. *</label>
          <input type="tel" id="popupContact" name="phone" class="form-input" placeholder="Phone / WhatsApp Number *" required>
        </div>

        <div class="form-group">
          <label for="popupMessage">Current Search Challenges &amp; Goals (Optional)</label>
          <textarea id="popupMessage" name="challenges" class="form-textarea" placeholder="Current Search Challenges &amp; Goals (optional)" rows="3"></textarea>
        </div>

        <button type="submit" class="btn-popup-submit" id="popupSubmitBtn">
          <span>Request Free SEO Evaluation →</span>
        </button>
      </form>

      <div class="popup-success-banner" id="popupSuccessBanner">
        <div class="success-icon">✓</div>
        <h3>Request Received!</h3>
        <p>Shipra Chauhan will personally review your search challenges within 24 hours.</p>
        <button class="btn btn-secondary" id="popupSuccessCloseBtn" style="margin-top: 1rem; width: 100%;">Close</button>
      </div>

      <div class="popup-footer-trust">
        <span>🔒 100% Confidential</span>
        <span>•</span>
        <span>Strict NDA Protection</span>
        <span>•</span>
        <span>Zero Spam Guarantee</span>
      </div>
    </div>
  </div>`;

// -----------------------------------------------------------------------------
// 3. TRANSFORM INDEX.HTML
// -----------------------------------------------------------------------------
function transformIndex() {
  let html = fs.readFileSync('index.html', 'utf8');

  // A. Move FAQ section to be after final-cta section (directly above footer)
  const faqMatch = html.match(/<!-- Frequently Asked Questions Section -->[\s\S]*?<section class="section section-warm"[^>]*id="faqs"[\s\S]*?<\/section>/i) ||
                   html.match(/<section class="section section-warm"[^>]*id="faqs"[\s\S]*?<\/section>/i);
  
  const auditMatch = html.match(/<!-- Audit Section \(Dark Green\) -->[\s\S]*?<section class="final-cta"[^>]*id="audit"[\s\S]*?<\/section>/i) ||
                     html.match(/<section class="final-cta"[^>]*id="audit"[\s\S]*?<\/section>/i);

  if (faqMatch && auditMatch) {
    const faqFull = faqMatch[0];
    const auditFull = auditMatch[0];

    // Remove both and place audit first, then FAQ
    html = html.replace(faqFull, '<!-- FAQ_PLACEHOLDER -->');
    html = html.replace(auditFull, auditFull + '\n\n' + faqFull);
    html = html.replace('<!-- FAQ_PLACEHOLDER -->', '');
    console.log('[INDEX] Swapped FAQ to be after final CTA section, directly above footer.');
  }

  // B. Update Audit Form in Section 10 to exact 4 uniform fields
  const oldAuditForm = `<form data-validate="true" action="contact.html" method="get">
            <div class="form-group-grid">
              <div class="form-group">
                <label for="sc-name" class="form-label">Name *</label>
                <input type="text" id="sc-name" name="name" class="form-control" placeholder="Your full name" required>
              </div>
              <div class="form-group">
                <label for="sc-email" class="form-label">Email *</label>
                <input type="email" id="sc-email" name="email" class="form-control" placeholder="you@example.com" required>
              </div>
            </div>

            <div class="form-group">
              <label for="sc-phone" class="form-label">Phone</label>
              <input type="tel" id="sc-phone" name="phone" class="form-control" placeholder="Your phone number">
            </div>

            <div class="form-group">
              <label for="sc-message" class="form-label">Message / Website URL</label>
              <textarea id="sc-message" name="message" class="form-control" placeholder="Tell us a bit about your website, business goals, or current ranking challenges"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Request Free SEO Audit
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </form>`;

  const newAuditForm = `<form data-validate="true" action="/contact" method="get">
            <div class="form-group">
              <label for="sc-name" class="form-label">Full Name *</label>
              <input type="text" id="sc-name" name="name" class="form-control" placeholder="Your Full Name *" required>
            </div>
            <div class="form-group-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label for="sc-email" class="form-label">Email Address *</label>
                <input type="email" id="sc-email" name="email" class="form-control" placeholder="Your Email Address *" required>
              </div>
              <div class="form-group">
                <label for="sc-phone" class="form-label">Contact No. *</label>
                <input type="tel" id="sc-phone" name="phone" class="form-control" placeholder="Phone / WhatsApp Number *" required>
              </div>
            </div>
            <div class="form-group">
              <label for="sc-message" class="form-label">Current Search Challenges &amp; Goals (Optional)</label>
              <textarea id="sc-message" name="challenges" class="form-control" placeholder="Current Search Challenges &amp; Goals (optional)" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Request Free SEO Audit
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </form>`;

  if (html.includes(oldAuditForm)) {
    html = html.replace(oldAuditForm, newAuditForm);
    console.log('[INDEX] Replaced audit form with uniform 4-field structure.');
  }

  // C. Update Popup Form
  html = html.replace(/<div class="auto-popup-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, uniformPopupHtml);

  // D. Build JSON-LD Schema
  const faqSchema = buildFaqSchema('index.html');
  const indexSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://shiprachauhan.in/#website",
        "url": "https://shiprachauhan.in/",
        "name": "Shipra Chauhan",
        "description": "Result-Driven SEO Services in Delhi — Shipra Chauhan SEO Expert",
        "publisher": { "@id": "https://shiprachauhan.in/#organization" }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://shiprachauhan.in/#organization",
        "name": "Shipra Chauhan — SEO Expert Delhi",
        "url": "https://shiprachauhan.in/",
        "telephone": "+919718159724",
        "email": "info@shiprachauhan.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi",
          "addressRegion": "Delhi NCR",
          "addressCountry": "IN"
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      },
      {
        "@type": "Person",
        "@id": "https://shiprachauhan.in/#person",
        "name": "Shipra Chauhan",
        "jobTitle": "Senior SEO Consultant & Generative Search Expert",
        "url": "https://shiprachauhan.in/",
        "sameAs": ["https://shiprachauhan.in/about"]
      },
      faqSchema
    ].filter(Boolean)
  };

  const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(indexSchema, null, 2)}\n  </script>\n</head>`;
  html = html.replace(/<\/head>/i, schemaScript);

  fs.writeFileSync('index.html', html, 'utf8');
  console.log('[INDEX] Saved index.html with schema, uniform form, and swapped FAQ.');
}

transformIndex();

