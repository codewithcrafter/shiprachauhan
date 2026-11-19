const fs = require('fs');

const originalHtml = fs.readFileSync('contact.html', 'utf8');

// Extract head and top header up to </header>
const headerEndIdx = originalHtml.indexOf('</header>') + '</header>'.length;
const preHeader = originalHtml.substring(0, headerEndIdx);

// Extract footer start
const footerStartIdx = originalHtml.indexOf('<!-- Master Footer -->');
const postFooter = originalHtml.substring(footerStartIdx);

const contactMain = `
  <!-- Redesigned Luxury Contact Hero & Bento Grid -->
  <section class="page-hero" style="padding: clamp(3.5rem, 6vw, 5rem) 0 4rem; background: linear-gradient(180deg, #FAF8F3 0%, #FFFFFF 100%); border-bottom: 1px solid rgba(183, 154, 98, 0.25);">
    <div class="container">
      <div class="contact-bento-hero">
        <!-- Contact Information Column -->
        <div class="contact-info-column reveal-init">
          <div class="badge-tag" style="margin-bottom: 1.25rem;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #1D5B49;"></span>
            Direct Senior Consultant Advisory
          </div>
          <h1 style="font-size: clamp(2.3rem, 4.2vw, 3.2rem); line-height: 1.18; margin-bottom: 1.25rem; color: #123C32;">
            Contact Shipra Chauhan — SEO &amp; GEO Consultant Delhi
          </h1>
          <p class="section-lead" style="font-size: 1.08rem; line-height: 1.7; color: #4A5248; margin-bottom: 2.25rem;">
            Connect directly with a dedicated SEO specialist to evaluate your organic search performance, passage citability, and AI search visibility. No junior account manager hand-offs — all strategy discussions are held directly with Shipra Chauhan.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <!-- Location Card -->
            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="contact-info-text">
                <div class="info-title">Consultation Base &amp; Service Region</div>
                <div class="info-detail">Delhi NCR, India (Available for on-site meetings across Delhi NCR &amp; virtual consulting globally)</div>
              </div>
            </div>

            <!-- Inquiries Email Card -->
            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div class="contact-info-text">
                <div class="info-title">Direct Strategy Inquiries</div>
                <div class="info-detail">
                  <a href="mailto:contact@shiprachauhan.com">contact@shiprachauhan.com</a> · <a href="mailto:info@shiprachauhan.in">info@shiprachauhan.in</a> (Inquiries reviewed and responded to within 24 business hours)
                </div>
              </div>
            </div>

            <!-- Advisory Hours & Phone Card -->
            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="contact-info-text">
                <div class="info-title">Advisory Hours &amp; Telephone</div>
                <div class="info-detail">
                  Monday to Friday: 9:30 AM – 6:30 PM IST · Phone: <a href="tel:+919718159724">+91 97181 59724</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust & Confidentiality Banner -->
          <div style="margin-top: 1.75rem; padding: 1rem 1.25rem; background: #FAF8F3; border: 1px dashed rgba(183, 154, 98, 0.4); border-radius: 12px; display: flex; align-items: center; gap: 0.75rem; font-size: 0.88rem; color: #1D5B49; font-weight: 600;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Strict Non-Disclosure &amp; Enterprise Confidentiality Guaranteed
          </div>
        </div>

        <!-- Consultation Booking Form Card -->
        <div class="service-hero-form-card reveal-init stagger-2" style="background: #FFFFFF; border: 1.5px solid rgba(183, 154, 98, 0.38); border-radius: 22px; padding: 2.5rem 2.25rem; box-shadow: 0 16px 44px -6px rgba(18, 60, 50, 0.1);">
          <div class="form-header" style="margin-bottom: 1.75rem;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; background: #E8F2EC; border-radius: 100px; font-size: 0.75rem; font-weight: 700; color: #123C32; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.75rem;">
              <span class="live-pulse" style="width: 7px; height: 7px; border-radius: 50%; background: #1D5B49;"></span>
              Direct Founder Session
            </div>
            <h2 style="font-size: 1.65rem; margin-bottom: 0.5rem; color: #123C32; font-family: var(--font-display, 'Playfair Display', Georgia, serif);">Book an SEO &amp; GEO Consultation</h2>
            <p style="font-size: 0.94rem; color: #555E54; margin: 0; line-height: 1.55;">
              Share details regarding your website and business goals to schedule an initial strategic review.
            </p>
          </div>

          <form data-validate="true" action="#" method="POST" id="mainContactForm">
            <div class="form-group-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="full-name" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Full Name *</label>
                <input type="text" id="full-name" name="name" class="form-control" placeholder="e.g. Rahul Sharma" required style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
              </div>
              <div class="form-group">
                <label class="form-label" for="email" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Business Email *</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="rahul@company.com" required style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
              </div>
            </div>

            <div class="form-group-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="website-url" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Website URL *</label>
                <input type="url" id="website-url" name="website" class="form-control" placeholder="https://yourwebsite.com" required style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
              </div>
              <div class="form-group">
                <label class="form-label" for="service-interest" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Primary Area of Interest</label>
                <select id="service-interest" name="service" class="form-control" style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;">
                  <option value="">Select Primary Focus</option>
                  <option value="geo">Generative Engine Optimization (GEO) &amp; AI Search</option>
                  <option value="technical">Technical SEO Audit &amp; Core Web Vitals</option>
                  <option value="ecommerce">Enterprise E-Commerce SEO</option>
                  <option value="local">Local SEO &amp; Multi-Location Strategy</option>
                  <option value="retainer">Comprehensive Organic Search Retainer</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label" for="project-notes" style="display: block; font-size: 0.86rem; font-weight: 700; color: #142820; margin-bottom: 0.4rem;">Current Search Challenges &amp; Goals</label>
              <textarea id="project-notes" name="notes" class="form-control" rows="3" placeholder="Briefly describe your site's current organic challenges, target markets, or upcoming migrations..." style="width: 100%; padding: 0.85rem 1rem; border: 1.5px solid rgba(183, 154, 98, 0.3); border-radius: 10px; font-size: 0.95rem; background: #FAF8F3;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 1.1rem; font-size: 1.05rem; font-weight: 700; border-radius: 12px;">
              Request Consultation Review →
            </button>
            <p class="form-note" style="margin-top: 1rem; font-size: 0.82rem; color: #7A8277; text-align: center; margin-bottom: 0;">
              All submissions are reviewed directly by Shipra within 24 business hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Modern Luxury Engagement Methodology Bento Grid -->
  <section class="section section-warm" style="padding: 5rem 0;">
    <div class="container">
      <div class="section-header reveal-init" style="text-align: center; max-width: 780px; margin: 0 auto 3.5rem;">
        <div class="badge-tag" style="margin-bottom: 1rem;">Engagement Methodology</div>
        <h2 style="font-size: clamp(2rem, 3.8vw, 2.75rem); color: #123C32; margin-bottom: 1rem;">What Happens After You Request a Consultation</h2>
        <p class="section-lead" style="font-size: 1.05rem; color: #555E54; line-height: 1.7;">
          Every campaign starts with clear communication, technical discovery, and honest data review before any retainers or timelines are proposed.
        </p>
      </div>

      <div class="contact-methodology-grid">
        <div class="methodology-step-card reveal-init stagger-1">
          <span class="step-num-pill">STEP 01</span>
          <h3>Initial Discovery &amp; Crawl Check</h3>
          <p>
            Your website structure, crawlability, robots.txt AI directives, and indexing status are reviewed to establish a technical baseline.
          </p>
        </div>

        <div class="methodology-step-card reveal-init stagger-2">
          <span class="step-num-pill">STEP 02</span>
          <h3>1-on-1 Consultation Session</h3>
          <p>
            We discuss your commercial goals, competitor landscape, passage extraction gaps, and strategic opportunities over a direct 30-minute call.
          </p>
        </div>

        <div class="methodology-step-card reveal-init stagger-3">
          <span class="step-num-pill">STEP 03</span>
          <h3>Tailored Action Plan</h3>
          <p>
            A custom roadmap detailing page-level fixes, knowledge graph schema, and generative search strategies built specifically for your site is delivered.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Advisory Clarifications FAQ (Master Unified Luxury Accordion) -->
  <section class="section section-white" style="padding: 5rem 0 6rem;">
    <div class="container">
      <div class="section-header reveal-init" style="text-align: center; max-width: 780px; margin: 0 auto 3rem;">
        <div class="eyebrow" style="margin-bottom: 0.75rem;">Advisory Clarifications</div>
        <h2 style="font-size: clamp(2rem, 3.8vw, 2.75rem); color: #123C32;">Frequently Asked Questions About Hiring &amp; Consultations</h2>
      </div>

      <div class="faq-list reveal-init stagger-1">
        <!-- FAQ 1 -->
        <div class="faq-item">
          <button class="faq-trigger" type="button" aria-expanded="false">
            <span>How soon can we expect a response after submitting the contact form?</span>
            <span class="faq-icon-toggle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              <p>
                All inquiries submitted through this form are reviewed directly by Shipra Chauhan within 24 business hours. If your project aligns with our core advisory competencies, you will receive an invitation to schedule an initial 30-minute technical discovery call alongside initial observations regarding your site's search visibility.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 2 -->
        <div class="faq-item">
          <button class="faq-trigger" type="button" aria-expanded="false">
            <span>Do you work with businesses outside of Delhi NCR?</span>
            <span class="faq-icon-toggle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              <p>
                Yes. While based in Delhi NCR for in-person advisory sessions and client workshops, Shipra works with enterprise brands, e-commerce stores, and high-growth technology companies across India, the United States, Europe, and the Middle East through structured remote consulting.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 3 -->
        <div class="faq-item">
          <button class="faq-trigger" type="button" aria-expanded="false">
            <span>What information should I have ready for the initial consultation?</span>
            <span class="faq-icon-toggle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              <p>
                To maximize the value of our first discussion, it is helpful to have access to your Google Search Console coverage reports, an overview of your primary commercial target keywords or product categories, and a summary of any recent structural redesigns or CMS migrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const finalContactHtml = preHeader + '\n' + contactMain + '\n  ' + postFooter;
fs.writeFileSync('contact.html', finalContactHtml, 'utf8');
console.log('contact.html redesigned successfully! Total bytes:', finalContactHtml.length);

