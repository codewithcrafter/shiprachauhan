const fs = require('fs');

const metricsMap = {
  'ecommerce-seo.html': `
  <!-- Service Performance Benchmark Strip -->
  <section class="section" style="padding: 2rem 0 0; background: #FAF8F3;">
    <div class="container">
      <div class="service-metrics-strip reveal-init" style="margin-top: 0;">
        <div class="service-metric-item">
          <span class="metric-number">+142%</span>
          <span class="metric-label">Organic Revenue Growth</span>
          <span class="metric-subtext">Average 6-month scale across Shopify &amp; Magento stores</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">&lt; 0.8s</span>
          <span class="metric-label">Product LCP Speed</span>
          <span class="metric-subtext">Sub-second Largest Contentful Paint for core listing pages</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">Faceted Index Control</span>
          <span class="metric-subtext">Eliminating duplicate SKU parameters and crawl traps</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">0</span>
          <span class="metric-label">Agency Subcontractors</span>
          <span class="metric-subtext">Direct advisory with Senior Consultant Shipra Chauhan</span>
        </div>
      </div>
    </div>
  </section>
`,
  'geo-services.html': `
  <!-- Service Performance Benchmark Strip -->
  <section class="section" style="padding: 2rem 0 0; background: #FAF8F3;">
    <div class="container">
      <div class="service-metrics-strip reveal-init" style="margin-top: 0;">
        <div class="service-metric-item">
          <span class="metric-number">3.8x</span>
          <span class="metric-label">AI Overview Citations</span>
          <span class="metric-subtext">Average increase in direct position-zero source links</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">98%</span>
          <span class="metric-label">Passage Extraction Rate</span>
          <span class="metric-subtext">Conversational intent clarity for Gemini &amp; Perplexity</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">Structured JSON-LD</span>
          <span class="metric-subtext">Complete intra-domain entity and Organization schema</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">0</span>
          <span class="metric-label">Junior Account Handoffs</span>
          <span class="metric-subtext">Direct bespoke strategic advisory with Shipra Chauhan</span>
        </div>
      </div>
    </div>
  </section>
`,
  'local-seo.html': `
  <!-- Service Performance Benchmark Strip -->
  <section class="section" style="padding: 2rem 0 0; background: #FAF8F3;">
    <div class="container">
      <div class="service-metrics-strip reveal-init" style="margin-top: 0;">
        <div class="service-metric-item">
          <span class="metric-number">Top 3</span>
          <span class="metric-label">Google Map Pack Rate</span>
          <span class="metric-subtext">Consistent 3-pack visibility for geo-intent searches</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">+185%</span>
          <span class="metric-label">GBP Direct Actions</span>
          <span class="metric-subtext">Direct calls, direction requests, and website visits</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">NAP Consistency</span>
          <span class="metric-subtext">Zero listing conflicts across all top Indian aggregators</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">0</span>
          <span class="metric-label">Spammy Short-Lived Citations</span>
          <span class="metric-subtext">Verified high-trust local citations and reviews</span>
        </div>
      </div>
    </div>
  </section>
`,
  'off-page-seo.html': `
  <!-- Service Performance Benchmark Strip -->
  <section class="section" style="padding: 2rem 0 0; background: #FAF8F3;">
    <div class="container">
      <div class="service-metrics-strip reveal-init" style="margin-top: 0;">
        <div class="service-metric-item">
          <span class="metric-number">DA 50+</span>
          <span class="metric-label">Editorial Quality</span>
          <span class="metric-subtext">Contextual backlinks from real, indexed editorial publications</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">0%</span>
          <span class="metric-label">PBN or Link Farm Risk</span>
          <span class="metric-subtext">100% white-hat manual outreach and digital PR coverage</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">Toxic Link Disavowal</span>
          <span class="metric-subtext">Proactive toxicity audit and algorithmic penalty protection</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">1-on-1</span>
          <span class="metric-label">Consultant Strategy</span>
          <span class="metric-subtext">Direct partnership with Senior SEO Expert Shipra Chauhan</span>
        </div>
      </div>
    </div>
  </section>
`,
  'on-page-seo.html': `
  <!-- Service Performance Benchmark Strip -->
  <section class="section" style="padding: 2rem 0 0; background: #FAF8F3;">
    <div class="container">
      <div class="service-metrics-strip reveal-init" style="margin-top: 0;">
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">SILO Topic Clustering</span>
          <span class="metric-subtext">Logical hierarchy connecting pillar pages and supporting clusters</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">+84%</span>
          <span class="metric-label">Organic CTR Uplift</span>
          <span class="metric-subtext">Intent-engineered title tags and click-optimized meta descriptions</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">NLP &amp; Semantic Coverage</span>
          <span class="metric-subtext">Extensive entity relevance mapped to modern search models</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">Direct</span>
          <span class="metric-label">Senior Specialist</span>
          <span class="metric-subtext">Every page audited and optimized personally by Shipra</span>
        </div>
      </div>
    </div>
  </section>
`,
  'technical-seo.html': `
  <!-- Service Performance Benchmark Strip -->
  <section class="section" style="padding: 2rem 0 0; background: #FAF8F3;">
    <div class="container">
      <div class="service-metrics-strip reveal-init" style="margin-top: 0;">
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">Crawl Budget Efficiency</span>
          <span class="metric-subtext">Zero indexation traps, orphan pages, or redirect chains</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">90+</span>
          <span class="metric-label">Core Web Vitals Score</span>
          <span class="metric-subtext">Passing scores on LCP, INP, and CLS across mobile and desktop</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">100%</span>
          <span class="metric-label">Valid Schema Markup</span>
          <span class="metric-subtext">Pristine JSON-LD rich snippet integration with zero syntax errors</span>
        </div>
        <div class="service-metric-item">
          <span class="metric-number">0</span>
          <span class="metric-label">Junior Intermediaries</span>
          <span class="metric-subtext">Deep code &amp; log file analysis delivered directly by Shipra</span>
        </div>
      </div>
    </div>
  </section>
`
};

const serviceFiles = Object.keys(metricsMap);

serviceFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  console.log(`\nProcessing ${file}...`);

  // 1. Inject metrics strip if not present
  if (!content.includes('service-metrics-strip')) {
    // Find end of page-hero section
    const heroEndIdx = content.indexOf('</section>');
    if (heroEndIdx !== -1) {
      const insertPos = heroEndIdx + '</section>'.length;
      content = content.substring(0, insertPos) + '\n' + metricsMap[file] + content.substring(insertPos);
      console.log(`  ✓ Injected service-metrics-strip into ${file}`);
    } else {
      console.log(`  ✗ Could not find </section> for hero in ${file}`);
    }
  } else {
    console.log(`  ℹ service-metrics-strip already present in ${file}`);
  }

  // 2. Convert accordion to unified faq-list / faq-item
  if (content.includes('<div class="accordion reveal-init">') || content.includes('<div class="accordion">')) {
    // Replace accordion container
    content = content.replace(/<div class="accordion reveal-init">/g, '<div class="faq-list reveal-init stagger-1">');
    content = content.replace(/<div class="accordion">/g, '<div class="faq-list reveal-init stagger-1">');
    
    // Replace items
    content = content.replace(/<div class="accordion-item">/g, '<div class="faq-item">');
    
    // Replace triggers
    content = content.replace(/<button class="accordion-trigger" aria-expanded="false">/g, '<button class="faq-trigger" type="button" aria-expanded="false">');
    
    // Replace icons
    content = content.replace(/<div class="accordion-icon">/g, '<span class="faq-icon-toggle">');
    // Also replace closing tag for accordion-icon if needed (it closes with </div> before </button>)
    content = content.replace(/<\/div>\s*<\/button>/g, '</span></button>');
    
    // Replace content containers
    content = content.replace(/<div class="accordion-content">/g, '<div class="faq-content">');
    content = content.replace(/<div class="accordion-inner">/g, '<div class="faq-content-inner">');
    
    console.log(`  ✓ Converted accordion markup to Master Unified Luxury FAQ markup in ${file}`);
  } else {
    console.log(`  ℹ FAQ markup already matches or not using legacy accordion in ${file}`);
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log('\nAll 6 service pages updated successfully!');
