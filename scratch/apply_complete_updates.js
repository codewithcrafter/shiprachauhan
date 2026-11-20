const fs = require('fs');
const path = require('path');

const qaDict = JSON.parse(fs.readFileSync('scratch/pure_qa_dictionary.json', 'utf8'));

// -----------------------------------------------------------------------------
// 1. UNIFORM POPUP FORM HTML
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
// 2. HELPER: Build FAQ Schema
// -----------------------------------------------------------------------------
function getFaqSchema(pageKey) {
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
// 3. SERVICE PAGE IMAGE MAPPING & SPECIFICS
// -----------------------------------------------------------------------------
const serviceImages = {
  'ecommerce-seo.html': {
    src: '/assets/images/ecommerce-platform.webp',
    alt: 'High-Growth Ecommerce SEO Architecture & Platform Optimization — Shipra Chauhan',
    name: 'High-Growth Ecommerce SEO Services Delhi — Shipra Chauhan',
    desc: 'High-Growth Ecommerce SEO Services in Delhi for high-SKU stores across Shopify, WooCommerce and Magento.'
  },
  'geo-services.html': {
    src: '/assets/images/geo-hero.webp',
    alt: 'Generative Engine Optimization (GEO) & AI Overview Optimization Delhi — Shipra Chauhan',
    name: 'Generative Engine Optimisation Services & GEO Services in Delhi — Shipra Chauhan',
    desc: 'Generative Engine Optimisation (GEO) services in Delhi designed to optimize for Google AI Overviews, position zero citation extraction, and LLM entity visibility.'
  },
  'local-seo.html': {
    src: '/assets/images/local-multi.webp',
    alt: 'High-Impact Local SEO Services & Google Business Profile 3-Pack Optimization Delhi — Shipra Chauhan',
    name: 'High-Impact Local SEO Services Delhi — Shipra Chauhan',
    desc: 'Local SEO services in Delhi to dominate Google Map Pack 3-pack rankings, review velocity, and localized high-intent search traffic.'
  },
  'off-page-seo.html': {
    src: '/assets/images/offpage-backlink.webp',
    alt: 'Authority Off-Page SEO Services & Editorial Link Building Delhi — Shipra Chauhan',
    name: 'Authority Off-Page SEO Services & Link Building Delhi — Shipra Chauhan',
    desc: 'Authority off-page SEO services and editorial digital PR outreach in Delhi to acquire contextual, penalty-proof backlinks.'
  },
  'on-page-seo.html': {
    src: '/assets/images/onpage-audit.webp',
    alt: 'Result-Driven On-Page SEO Services & Topic Cluster Architecture Delhi — Shipra Chauhan',
    name: 'Result-Driven On-Page SEO Services Delhi — Shipra Chauhan',
    desc: 'Result-driven on-page SEO services in Delhi covering semantic keyword mapping, topic clusters, SILO structures, and CTR engineering.'
  },
  'technical-seo.html': {
    src: '/assets/images/technical-hero.webp',
    alt: 'Advanced Technical SEO Audit & Core Web Vitals Optimization Delhi — Shipra Chauhan',
    name: 'Technical SEO Audit & Technical SEO Services Delhi — Shipra Chauhan',
    desc: 'Advanced technical SEO audit and infrastructure optimization services in Delhi covering crawl budget, indexability, Core Web Vitals, and log file analysis.'
  }
};

// -----------------------------------------------------------------------------
// 4. TRANSFORM SERVICE PAGES
// -----------------------------------------------------------------------------
function transformServicePages() {
  Object.keys(serviceImages).forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    const info = serviceImages[f];

    // A. Move FAQ section to be after final CTA (directly above footer)
    const faqMatch = html.match(/<section[^>]*id="faqs?"[^>]*>[\s\S]*?<\/section>/i) ||
                     html.match(/<section[^>]*>([\s\S]*?(?:Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO)[\s\S]*?)<\/section>/i);
    
    if (faqMatch) {
      const footerIdx = html.indexOf('<footer');
      const faqIdx = html.indexOf(faqMatch[0]);
      if (faqIdx !== -1 && footerIdx !== -1) {
        const ctaContent = html.slice(faqIdx + faqMatch[0].length, footerIdx).trim();
        if (ctaContent.length > 50) {
          html = html.replace(faqMatch[0], '<!-- FAQ_PLACEHOLDER -->');
          html = html.replace(ctaContent, ctaContent + '\n\n' + faqMatch[0]);
          html = html.replace('<!-- FAQ_PLACEHOLDER -->\n\n', '');
          html = html.replace('<!-- FAQ_PLACEHOLDER -->', '');
          console.log(`[SERVICE] Moved FAQs to very bottom above footer in ${f}`);
        }
      }
    }

    // B. Fix Service Metrics Showcase Image: domain-absolute path & dedicated image
    const showcaseHtml = `  <!-- Featured Service Architecture Showcase -->
  <div class="container">
    <div class="service-hero-showcase reveal-init">
      <img src="${info.src}" alt="${info.alt}" width="1200" height="600" fetchpriority="high" loading="eager">
    </div>
  </div>`;

    if (html.includes('service-hero-showcase')) {
      html = html.replace(/<div class="container">\s*<div class="service-hero-showcase[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/i, showcaseHtml);
      console.log(`[SERVICE] Updated showcase image with domain-absolute path in ${f}: ${info.src}`);
    }

    // C. Update Hero Consultation Form to exact 4 uniform fields
    const newServiceForm = `<form class="service-form" data-validate="true">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" class="form-input" placeholder="Your Full Name *" required>
            </div>
            <div class="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" class="form-input" placeholder="Your Email Address *" required>
            </div>
            <div class="form-group">
              <label>Contact No. *</label>
              <input type="tel" name="phone" class="form-input" placeholder="Phone / WhatsApp Number *" required>
            </div>
            <div class="form-group">
              <label>Current Search Challenges &amp; Goals (Optional)</label>
              <textarea name="challenges" class="form-textarea" placeholder="Current Search Challenges &amp; Goals (optional)" rows="3"></textarea>
            </div>
            <button type="submit" class="btn-service-submit">
              <span>Claim Free Strategy Session →</span>
            </button>
            <div class="service-form-trust">
              <span>🔒 Strict NDA Protected</span>
              <span>•</span>
              <span>Direct Founder Review</span>
            </div>
          </form>`;

    html = html.replace(/<form class="service-form"[\s\S]*?<\/form>/i, newServiceForm);

    // D. Update Popup Form
    html = html.replace(/<div class="auto-popup-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, uniformPopupHtml);

    // E. Add Schema.org JSON-LD (Service, ProfessionalService, FAQPage)
    const faqSchema = getFaqSchema(f);
    const serviceSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `https://shiprachauhan.in/${f.replace('.html', '')}#service`,
          "name": info.name,
          "serviceType": "Search Engine Optimization",
          "provider": {
            "@type": "ProfessionalService",
            "name": "Shipra Chauhan — SEO Expert Delhi",
            "telephone": "+919718159724",
            "email": "info@shiprachauhan.in",
            "url": "https://shiprachauhan.in/"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Delhi NCR, India"
          },
          "description": info.desc
        },
        faqSchema
      ].filter(Boolean)
    };

    // Remove existing schemas if any
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
    const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(serviceSchema, null, 2)}\n  </script>\n</head>`;
    html = html.replace(/<\/head>/i, schemaScript);

    fs.writeFileSync(f, html, 'utf8');
    console.log(`[SERVICE] Successfully processed and saved ${f}`);
  });
}

// -----------------------------------------------------------------------------
// 5. TRANSFORM ABOUT.HTML
// -----------------------------------------------------------------------------
function transformAbout() {
  let html = fs.readFileSync('about.html', 'utf8');

  // Move FAQs to bottom directly above footer
  const faqMatch = html.match(/<section[^>]*id="faqs?"[^>]*>[\s\S]*?<\/section>/i) ||
                   html.match(/<section[^>]*>([\s\S]*?Frequently Asked Questions About Shipra Chauhan[\s\S]*?)<\/section>/i);
  
  if (faqMatch) {
    const footerIdx = html.indexOf('<footer');
    const faqIdx = html.indexOf(faqMatch[0]);
    if (faqIdx !== -1 && footerIdx !== -1) {
      const ctaContent = html.slice(faqIdx + faqMatch[0].length, footerIdx).trim();
      if (ctaContent.length > 50) {
        html = html.replace(faqMatch[0], '<!-- FAQ_PLACEHOLDER -->');
        html = html.replace(ctaContent, ctaContent + '\n\n' + faqMatch[0]);
        html = html.replace('<!-- FAQ_PLACEHOLDER -->\n\n', '');
        html = html.replace('<!-- FAQ_PLACEHOLDER -->', '');
        console.log('[ABOUT] Moved FAQs to very bottom above footer in about.html');
      }
    }
  }

  // Update popup form
  html = html.replace(/<div class="auto-popup-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, uniformPopupHtml);

  // Add JSON-LD Schema
  const faqSchema = getFaqSchema('about.html');
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://shiprachauhan.in/about#webpage",
        "url": "https://shiprachauhan.in/about",
        "name": "About Shipra Chauhan | SEO Expert Delhi & Consultant",
        "description": "Shipra Chauhan is a trusted SEO expert Delhi businesses hire for technical, on-page, off-page and GEO strategy — 10+ years hands-on experience."
      },
      {
        "@type": "Person",
        "@id": "https://shiprachauhan.in/#person",
        "name": "Shipra Chauhan",
        "jobTitle": "Senior SEO Consultant & Generative Search Expert",
        "url": "https://shiprachauhan.in/about",
        "telephone": "+919718159724",
        "email": "info@shiprachauhan.in",
        "knowsAbout": [
          "Technical SEO",
          "Generative Engine Optimization (GEO)",
          "Core Web Vitals",
          "Ecommerce Search Strategy",
          "Local SEO & Google Business Profile",
          "E-E-A-T Architecture"
        ],
        "worksFor": {
          "@type": "ProfessionalService",
          "name": "Shipra Chauhan SEO Advisory",
          "url": "https://shiprachauhan.in/"
        }
      },
      faqSchema
    ].filter(Boolean)
  };

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(aboutSchema, null, 2)}\n  </script>\n</head>`;
  html = html.replace(/<\/head>/i, schemaScript);

  fs.writeFileSync('about.html', html, 'utf8');
  console.log('[ABOUT] Successfully processed and saved about.html');
}

// -----------------------------------------------------------------------------
// 6. TRANSFORM CONTACT.HTML
// -----------------------------------------------------------------------------
function transformContact() {
  let html = fs.readFileSync('contact.html', 'utf8');

  // Update main contact form to exact 4 uniform fields
  const newContactForm = `<form data-validate="true" action="#" method="POST" id="mainContactForm">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="full-name" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Full Name *</label>
              <input type="text" id="full-name" name="name" class="form-control" placeholder="e.g. Rahul Sharma" required style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
            </div>

            <div class="form-group-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="email" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Email Address *</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="rahul@company.com" required style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-phone" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Contact No. *</label>
                <input type="tel" id="contact-phone" name="phone" class="form-control" placeholder="+91 98765 43210" required style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label" for="project-notes" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Current Search Challenges &amp; Goals (Optional)</label>
              <textarea id="project-notes" name="challenges" class="form-control" rows="3" placeholder="Briefly describe your site's current organic challenges, target markets, or upcoming migrations..." style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 1.1rem; font-size: 1.05rem; font-weight: 700; border-radius: 12px;">
              Request Consultation Review →
            </button>
            <p class="form-note" style="margin-top: 1rem; font-size: 0.82rem; color: #7A8277; text-align: center; margin-bottom: 0;">
              All submissions are reviewed directly by Shipra within 24 business hours.
            </p>
          </form>`;

  html = html.replace(/<form data-validate="true" action="#" method="POST" id="mainContactForm">[\s\S]*?<\/form>/i, newContactForm);

  // Update popup form
  html = html.replace(/<div class="auto-popup-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, uniformPopupHtml);

  // Add JSON-LD Schema
  const faqSchema = getFaqSchema('contact.html');
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://shiprachauhan.in/contact#webpage",
        "url": "https://shiprachauhan.in/contact",
        "name": "Contact Shipra Chauhan — SEO & GEO Consultant Delhi",
        "description": "Contact Shipra Chauhan for hands-on SEO audits, technical consulting, generative search strategy, and enterprise retainers in Delhi NCR."
      },
      {
        "@type": "ProfessionalService",
        "name": "Shipra Chauhan SEO Advisory",
        "telephone": "+919718159724",
        "email": "info@shiprachauhan.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi",
          "addressRegion": "Delhi NCR",
          "addressCountry": "IN"
        }
      },
      faqSchema
    ].filter(Boolean)
  };

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(contactSchema, null, 2)}\n  </script>\n</head>`;
  html = html.replace(/<\/head>/i, schemaScript);

  fs.writeFileSync('contact.html', html, 'utf8');
  console.log('[CONTACT] Successfully processed and saved contact.html');
}

// -----------------------------------------------------------------------------
// 7. TRANSFORM BLOGS.HTML
// -----------------------------------------------------------------------------
function transformBlogsHub() {
  let html = fs.readFileSync('blogs.html', 'utf8');

  // Update popup form
  html = html.replace(/<div class="auto-popup-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, uniformPopupHtml);

  // Add JSON-LD Schema
  const blogHubSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Shipra Chauhan SEO Blog",
    "url": "https://shiprachauhan.in/blogs",
    "description": "Read the latest insights and analysis on SEO, AI Overviews, digital PR, technical site audits, and local search strategies from Shipra Chauhan.",
    "publisher": {
      "@type": "Person",
      "name": "Shipra Chauhan",
      "jobTitle": "Senior SEO Consultant"
    }
  };

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(blogHubSchema, null, 2)}\n  </script>\n</head>`;
  html = html.replace(/<\/head>/i, schemaScript);

  fs.writeFileSync('blogs.html', html, 'utf8');
  console.log('[BLOGS] Successfully processed blogs.html');
}

// -----------------------------------------------------------------------------
// 8. TRANSFORM ALL 10 BLOG ARTICLES (HORIZONTAL TAGS ABOVE TITLE, FORM, SCHEMA)
// -----------------------------------------------------------------------------
const blogArticles = [
  'blogs/ai-overviews-local-search.html',
  'blogs/digital-pr-vs-link-building.html',
  'blogs/internal-linking-strategy-seo.html',
  'blogs/link-building-ai-search-citations.html',
  'blogs/multi-location-seo-cannibalization.html',
  'blogs/review-response-local-seo.html',
  'blogs/title-tag-optimization-best-practices.html',
  'blogs/toxic-backlinks-disavow.html',
  'blogs/unlinked-brand-mentions-seo.html',
  'blogs/voice-search-local-seo.html'
];

function transformBlogArticles() {
  blogArticles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');

    // A. Extract Tags and Inject Horizontal Strip right above <h1 class="article-main-title">
    const tagsMatch = html.match(/<div class="article-tags-cloud">([\s\S]*?)<\/div>/i);
    if (tagsMatch) {
      const tagsHtml = tagsMatch[1].trim();
      const horizontalStrip = `              <!-- Article Tags Horizontally Above Title -->
              <div class="article-tags-horizontal-strip">
                <span class="tags-pill-label">🏷️ Article Tags</span>
                <div class="tags-pill-list">
                  ${tagsHtml}
                </div>
              </div>\n\n`;

      // Remove any previously injected strip to avoid duplication
      html = html.replace(/<!-- Article Tags Horizontally Above Title -->[\s\S]*?<\/div>\s*<\/div>\s*/gi, '');
      html = html.replace(/<div class="article-tags-horizontal-strip"[\s\S]*?<\/div>\s*<\/div>\s*/gi, '');

      // Inject before H1
      html = html.replace(/<h1 class="article-main-title"/i, horizontalStrip + '              <h1 class="article-main-title"');
      console.log(`[BLOG ARTICLE] Injected horizontal tags above title in ${f}`);
    }

    // B. Update Sidebar Form to uniform 4 fields
    const newSidebarForm = `<form class="blog-sidebar-form" data-validate="true">
                <div class="form-group" style="margin-bottom: 0.65rem;">
                  <input type="text" name="name" class="form-input" style="padding: 0.6rem 0.8rem; font-size: 0.825rem; width: 100%; box-sizing: border-box;" placeholder="Full Name *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.65rem;">
                  <input type="email" name="email" class="form-input" style="padding: 0.6rem 0.8rem; font-size: 0.825rem; width: 100%; box-sizing: border-box;" placeholder="Email Address *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.65rem;">
                  <input type="tel" name="phone" class="form-input" style="padding: 0.6rem 0.8rem; font-size: 0.825rem; width: 100%; box-sizing: border-box;" placeholder="Contact No. *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.65rem;">
                  <textarea name="challenges" class="form-textarea" style="padding: 0.6rem 0.8rem; font-size: 0.825rem; width: 100%; box-sizing: border-box; min-height: 55px;" placeholder="Current Search Challenges &amp; Goals (optional)" rows="2"></textarea>
                </div>
                <button type="submit" class="btn-service-submit" style="padding: 0.65rem; font-size: 0.82rem; width: 100%;">
                  <span>Claim Advisory Call →</span>
                </button>
                <div style="font-size: 0.7rem; color: #77766F; text-align: center; margin-top: 0.4rem;">
                  🔒 Strict NDA • Direct review &lt; 4h
                </div>
              </form>`;

    html = html.replace(/<form class="blog-sidebar-form"[\s\S]*?<\/form>/i, newSidebarForm);

    // C. Update Popup Form
    html = html.replace(/<div class="auto-popup-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, uniformPopupHtml);

    // D. Build Schema.org BlogPosting JSON-LD
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
    const slug = f.replace('blogs/', '').replace('.html', '');
    const canonicalUrl = `https://shiprachauhan.in/blogs/${slug}`;

    const tags = [...html.matchAll(/class="article-tag">#?([^<]+)<\/a>/gi)].map(m => m[1].trim());

    const blogArticleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#article`,
      "headline": titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '',
      "description": descMatch ? descMatch[1].trim() : '',
      "url": canonicalUrl,
      "mainEntityOfPage": canonicalUrl,
      "datePublished": "2026-10-09T08:00:00+05:30",
      "dateModified": "2026-11-20T10:00:00+05:30",
      "author": [
        {
          "@type": "Person",
          "name": "Krishna Pal",
          "jobTitle": "Technical SEO Analyst"
        },
        {
          "@type": "Person",
          "name": "Shipra Chauhan",
          "jobTitle": "Senior SEO Consultant & Strategist",
          "url": "https://shiprachauhan.in/about"
        }
      ],
      "publisher": {
        "@type": "Organization",
        "name": "Shipra Chauhan SEO Advisory",
        "url": "https://shiprachauhan.in/"
      },
      "keywords": tags
    };

    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
    const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(blogArticleSchema, null, 2)}\n  </script>\n</head>`;
    html = html.replace(/<\/head>/i, schemaScript);

    fs.writeFileSync(f, html, 'utf8');
    console.log(`[BLOG ARTICLE] Successfully processed and saved ${f}`);
  });
}

// Run all transforms
transformAbout();
transformContact();
transformBlogsHub();
transformServicePages();
transformBlogArticles();

console.log('\nAll core pages and articles transformed successfully!');

