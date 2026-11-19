const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = [
  'index.html',
  'about.html',
  'blogs.html',
  'contact.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

const serviceMap = {
  'ecommerce-seo.html': {
    title: 'Request Ecommerce SEO Audit',
    desc: 'Bespoke crawl budget, catalog structure, and conversion audit directly by Shipra Chauhan.'
  },
  'geo-services.html': {
    title: 'Request Generative Engine Audit',
    desc: 'Audit your AI Overviews, Perplexity citations, and LLM entity visibility directly with Shipra.'
  },
  'local-seo.html': {
    title: 'Request Local SEO & GBP Audit',
    desc: 'Map pack rankings, multi-location citation audit, and local authority blueprint.'
  },
  'off-page-seo.html': {
    title: 'Request Authority Link Audit',
    desc: 'Editorial backlink review, toxic link disavow inspection, and high-impact digital PR blueprint.'
  },
  'on-page-seo.html': {
    title: 'Request On-Page & Content Audit',
    desc: 'Search intent mapping, schema scaffolding, and semantic internal linking audit.'
  },
  'technical-seo.html': {
    title: 'Request Technical SEO Audit',
    desc: 'Core Web Vitals diagnostic, sub-second TTFB optimization, and crawlability architecture.'
  }
};

const dualTierHeader = `  <!-- Dual-Tier Modern Sticky Header -->
  <header class="site-header-full" id="siteHeader">
    <!-- Tier 1: Micro-Bar -->
    <div class="header-top-bar">
      <div class="header-top-container">
        <div class="top-bar-left">
          <span class="status-indicator-badge">
            <span class="status-pulse-dot"></span>
            <span>Available for Consultation</span>
          </span>
          <span class="top-bar-sep" aria-hidden="true">•</span>
          <span class="top-bar-location">Delhi NCR &amp; Global</span>
          <span class="top-bar-sep desktop-only" aria-hidden="true">•</span>
          <span class="top-bar-metric desktop-only">10+ Yrs Exp • 100% White Hat Growth</span>
        </div>
        <div class="top-bar-right">
          <a href="tel:+919718159724" class="top-contact-link">
            <svg class="top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>+91 97181 59724</span>
          </a>
          <span class="top-bar-sep" aria-hidden="true">•</span>
          <a href="mailto:info@shiprachauhan.in" class="top-contact-link desktop-only">
            <svg class="top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>info@shiprachauhan.in</span>
          </a>
          <span class="top-bar-sep desktop-only" aria-hidden="true">•</span>
          <a href="https://wa.me/919718159724?text=Hello%20Shipra,%20I%20would%20like%20to%20discuss%20an%20SEO%20project." target="_blank" rel="noopener noreferrer" class="top-whatsapp-pill">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Tier 2: Main Navigation Bar -->
    <nav class="navbar-full" id="navbar" aria-label="Main Navigation">
      <div class="navbar-full-container">
        <a href="/" class="nav-brand-modern" aria-label="Shipra Chauhan SEO Expert">
          <div class="brand-monogram-box">
            <span>SC</span>
          </div>
          <div class="brand-text-group">
            <span class="brand-name">Shipra <span>Chauhan</span></span>
            <span class="brand-role">Senior SEO Consultant · Delhi</span>
          </div>
        </a>

        <button class="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-menu">
          <li><a href="/" class="nav-link">Home</a></li>
          <li class="nav-dropdown">
            <a href="/#services" class="nav-link">
              <span>Services</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
            <div class="services-mega-menu">
              <a href="/ecommerce-seo" class="mega-item">
                <svg class="mega-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <div>
                  <span class="mega-title">Ecommerce SEO</span>
                  <span class="mega-desc">Shopify &amp; WooCommerce</span>
                </div>
              </a>
              <a href="/geo-services" class="mega-item">
                <svg class="mega-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>
                <div>
                  <span class="mega-title">Generative Engine Optimization</span>
                  <span class="mega-desc">AI Overviews &amp; LLM Citations</span>
                </div>
              </a>
              <a href="/local-seo" class="mega-item">
                <svg class="mega-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <span class="mega-title">Local SEO</span>
                  <span class="mega-desc">Google Business Profile</span>
                </div>
              </a>
              <a href="/off-page-seo" class="mega-item">
                <svg class="mega-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <div>
                  <span class="mega-title">Off-Page SEO</span>
                  <span class="mega-desc">Authority &amp; Digital PR</span>
                </div>
              </a>
              <a href="/on-page-seo" class="mega-item">
                <svg class="mega-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div>
                  <span class="mega-title">On-Page SEO</span>
                  <span class="mega-desc">Content &amp; Intent Alignment</span>
                </div>
              </a>
              <a href="/technical-seo" class="mega-item">
                <svg class="mega-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                <div>
                  <span class="mega-title">Technical SEO</span>
                  <span class="mega-desc">Core Web Vitals &amp; Speed</span>
                </div>
              </a>
            </div>
          </li>
          <li><a href="/about" class="nav-link">About</a></li>
          <li><a href="/blogs" class="nav-link">Blogs</a></li>
          <li><a href="/contact" class="nav-link">Contact</a></li>
        </ul>

        <div class="header-cta-group">
          <a href="/contact" class="btn-header-audit">Free Audit</a>
        </div>
      </div>
    </nav>
  </header>`;

const leadAndFloatingComponents = `
  <!-- 3-Second Timed Animated Lead Pop-up Modal -->
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
          <input type="text" id="popupName" class="form-input" placeholder="Your full name" required>
        </div>

        <div class="form-group">
          <label for="popupContact">Phone / WhatsApp *</label>
          <input type="tel" id="popupContact" class="form-input" placeholder="+91 98765 43210" required>
        </div>

        <div class="form-group">
          <label for="popupEmail">Business Email *</label>
          <input type="email" id="popupEmail" class="form-input" placeholder="name@company.com" required>
        </div>

        <div class="form-group">
          <label for="popupService">Service Required *</label>
          <select id="popupService" class="form-select" required>
            <option value="" disabled selected>Select an SEO Service</option>
            <option value="Ecommerce SEO">Ecommerce SEO</option>
            <option value="Generative Engine Optimization (GEO)">Generative Engine Optimization (GEO)</option>
            <option value="Local SEO">Local SEO &amp; Google Business Profile</option>
            <option value="Off-Page SEO">Off-Page SEO &amp; Authority Links</option>
            <option value="On-Page SEO">On-Page SEO &amp; Content Architecture</option>
            <option value="Technical SEO">Technical SEO &amp; Site Speed</option>
          </select>
        </div>

        <div class="form-group">
          <label for="popupMessage">Website URL / Project Scope (Optional)</label>
          <textarea id="popupMessage" class="form-textarea" placeholder="Enter your website URL or current search challenges..."></textarea>
        </div>

        <button type="submit" class="btn-popup-submit" id="popupSubmitBtn">
          <span>Request Strategic Consultation →</span>
        </button>

        <div class="popup-footer-note">
          🔒 Strict NDA Protection • Direct Senior Response Within 4 Hours
        </div>
      </form>

      <div class="popup-success-banner" id="popupSuccessBanner">
        <div style="font-size: 2rem; margin-bottom: 0.5rem; color: #123C32;">✓</div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #142820; margin-bottom: 0.35rem;">Request Received!</h3>
        <p style="font-size: 0.88rem; color: #3E443C; margin-bottom: 1rem;">
          Shipra Chauhan will personally review your website and connect within 4 hours.
        </p>
        <button type="button" class="btn-service-submit" id="popupSuccessCloseBtn" style="max-width: 180px; margin: 0 auto;">Close</button>
      </div>
    </div>
  </div>

  <!-- Floating Quick Actions (Desktop) -->
  <div class="floating-quick-actions" aria-label="Quick Communication">
    <a href="https://wa.me/919718159724?text=Hello%20Shipra,%20I%20would%20like%20to%20discuss%20an%20SEO%20project." target="_blank" rel="noopener noreferrer" class="floating-action-btn floating-whatsapp" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    </a>
    <a href="tel:+919718159724" class="floating-action-btn floating-call" aria-label="Call Directly">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    </a>
  </div>

  <!-- Mobile Bottom App Bar (<768px) -->
  <div class="mobile-bottom-bar" aria-label="Mobile Bottom Actions">
    <div class="mobile-bottom-inner">
      <a href="tel:+919718159724" class="mobile-bottom-btn mobile-btn-call">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Call Now</span>
      </a>
      <a href="https://wa.me/919718159724?text=Hello%20Shipra,%20I%20would%20like%20to%20discuss%20an%20SEO%20project." target="_blank" rel="noopener noreferrer" class="mobile-bottom-btn mobile-btn-whatsapp">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  </div>
`;

function getServiceHeroForm(serviceTitle, serviceDesc) {
  return `
        <!-- Service Hero Consultation Form Card -->
        <div class="service-hero-form-card reveal-init stagger-2">
          <div class="service-form-badge">
            <span class="status-pulse-dot"></span>
            <span>Direct Senior Consultation</span>
          </div>
          <h3 class="service-form-title">${serviceTitle}</h3>
          <p class="service-form-desc">${serviceDesc}</p>
          <form class="service-form">
            <div class="form-group">
              <input type="text" class="form-input" placeholder="Your Name *" required>
            </div>
            <div class="form-group">
              <input type="tel" class="form-input" placeholder="Phone / WhatsApp *" required>
            </div>
            <div class="form-group">
              <input type="email" class="form-input" placeholder="Work Email *" required>
            </div>
            <div class="form-group">
              <textarea class="form-textarea" placeholder="Website URL or Project Scope" rows="2"></textarea>
            </div>
            <button type="submit" class="btn-service-submit">Claim Strategic Consultation →</button>
            <div style="font-size: 0.72rem; color: #77766F; text-align: center; margin-top: 0.4rem;">
              🔒 Strict NDA • Direct review &lt; 4h
            </div>
          </form>
          <div class="service-form-success">
            <strong>✓ Consultation Requested!</strong> Shipra Chauhan will review your website and connect within 4 hours.
          </div>
        </div>`;
}

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace header
  if (content.includes('<header class="site-header">')) {
    content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, dualTierHeader);
  }

  // 2. Add lead popup and floating actions before </body>
  if (!content.includes('id="autoPopupOverlay"')) {
    content = content.replace('</body>', `${leadAndFloatingComponents}\n</body>`);
  }

  // 3. For service pages, embed hero form card into page-hero-grid if not already added
  if (serviceMap[file] && !content.includes('service-hero-form-card')) {
    const sInfo = serviceMap[file];
    const formHtml = getServiceHeroForm(sInfo.title, sInfo.desc);
    
    // Insert after hero-image-wrap closing or alongside it
    if (content.includes('class="hero-image-wrap')) {
      content = content.replace(
        /(<div class="hero-image-wrap[\s\S]*?<\/div>)/,
        `$1\n${formHtml}`
      );
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file} with modern components.`);
});

