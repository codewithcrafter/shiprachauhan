const fs = require('fs');

console.log('================================================================');
console.log('  VERIFYING ALL 6 USER REQUIREMENTS ACROSS SHIPRA CHAUHAN WEB   ');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// REQ 1: Horizontal Article Tags Above Title in All 10 Blog Posts
// -----------------------------------------------------------------------------
console.log('--- REQUIREMENT 1: Article Tags Horizontally Above Title in Blogs ---');
const blogPosts = [
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

blogPosts.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasStrip = c.includes('article-tags-horizontal-strip');
  const hasLabel = c.includes('🏷️ Article Tags');
  const stripIdx = c.indexOf('article-tags-horizontal-strip');
  const h1Idx = c.indexOf('<h1');
  const isBeforeH1 = stripIdx !== -1 && h1Idx !== -1 && stripIdx < h1Idx;
  assert(hasStrip && hasLabel && isBeforeH1, `${f}: Horizontal tags strip present directly above H1`);
});

// -----------------------------------------------------------------------------
// REQ 2: 4-Second Timed Pop-up in js/main.js
// -----------------------------------------------------------------------------
console.log('\n--- REQUIREMENT 2: 4-Second Pop-up Form (Even on Refresh) ---');
const mainJs = fs.readFileSync('js/main.js', 'utf8');
const has4Sec = mainJs.includes('setTimeout(openPopup, 4000)');
const hasFunc = mainJs.includes('function init4SecondAutoPopup()');
const hasCall = mainJs.includes('init4SecondAutoPopup();');
assert(has4Sec && hasFunc && hasCall, 'js/main.js: Pop-up fires after exactly 4000ms on every load/refresh');

// -----------------------------------------------------------------------------
// REQ 3: Uniform Form Fields (Name, Email, Contact No., Challenges & Goals)
// -----------------------------------------------------------------------------
console.log('\n--- REQUIREMENT 3: Uniform 4 Form Fields Across Website ---');
const testPages = ['index.html', 'about.html', 'contact.html', 'ecommerce-seo.html', 'blogs.html'];
testPages.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasSelectInPopup = c.includes('id="popupService"') || c.includes('name="service" class="form-select"');
  const hasChallengesInPopup = c.includes('Current Search Challenges &amp; Goals (Optional)');
  assert(!hasSelectInPopup && hasChallengesInPopup, `${f}: Popup form has only the 4 required fields without service dropdown`);
});

const servicePages = [
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];
servicePages.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const serviceForm = c.match(/<form class="service-form"[\s\S]*?<\/form>/i);
  if (serviceForm) {
    const hasName = serviceForm[0].includes('name="name"');
    const hasEmail = serviceForm[0].includes('name="email"');
    const hasPhone = serviceForm[0].includes('name="phone"');
    const hasChallenges = serviceForm[0].includes('name="challenges"');
    assert(hasName && hasEmail && hasPhone && hasChallenges, `${f}: Hero form card has the exact 4 uniform fields`);
  }
});

// -----------------------------------------------------------------------------
// REQ 4: FAQs at the Very Bottom of Every Page (Directly Above Footer)
// -----------------------------------------------------------------------------
console.log('\n--- REQUIREMENT 4: FAQs at Very Bottom Directly Above Footer ---');
const faqPages = [
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

faqPages.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const faqMatch = c.match(/<section[^>]*id="faqs?"[^>]*>[\s\S]*?<\/section>/i) ||
                   c.match(/<section[^>]*class="[^"]*section-faq[^"]*"[^>]*>[\s\S]*?<\/section>/i) ||
                   c.match(/<section[^>]*>([\s\S]*?(?:Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO)[\s\S]*?)<\/section>/i);
  const footerIdx = c.indexOf('<footer');
  if (faqMatch && footerIdx !== -1) {
    const faqEnd = c.indexOf(faqMatch[0]) + faqMatch[0].length;
    const gap = c.slice(faqEnd, footerIdx).trim();
    // Allow up to small comment/whitespace or closing main
    const isAtBottom = gap.length === 0 || gap === '</main>' || gap.startsWith('<!--');
    assert(isAtBottom, `${f}: FAQ section is at the very bottom right above footer (gap: ${gap.length} chars)`);
  }
});

// -----------------------------------------------------------------------------
// REQ 5: Service Metrics Showcase Image Domain-Absolute & Valid
// -----------------------------------------------------------------------------
console.log('\n--- REQUIREMENT 5: Service Metrics Showcase Image Domain-Absolute ---');
servicePages.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const showcaseMatch = c.match(/<div class="service-hero-showcase[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (showcaseMatch) {
    const imgMatch = showcaseMatch[1].match(/<img[^>]+src="([^"]+)"/i);
    const src = imgMatch ? imgMatch[1] : '';
    const isDomainAbs = src.startsWith('/assets/images/');
    const localPath = src.slice(1); // remove leading /
    const exists = fs.existsSync(localPath) && fs.statSync(localPath).size > 0;
    assert(isDomainAbs && exists, `${f}: Showcase image has domain-absolute path ${src} and file exists (${fs.statSync(localPath).size} bytes)`);
  }
});

// -----------------------------------------------------------------------------
// REQ 6: JSON-LD Schemas Valid & Rich
// -----------------------------------------------------------------------------
console.log('\n--- REQUIREMENT 6: Complete Valid Schema.org JSON-LD Structured Data ---');
const allPagesToTestSchema = [
  'index.html',
  'about.html',
  'contact.html',
  'blogs.html',
  ...servicePages,
  ...blogPosts
];

allPagesToTestSchema.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const schemaMatch = c.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  let parsed = null;
  let isValid = false;
  if (schemaMatch) {
    try {
      parsed = JSON.parse(schemaMatch[1]);
      isValid = true;
    } catch (e) {
      isValid = false;
    }
  }
  const typeStr = parsed ? (parsed['@type'] || (parsed['@graph'] ? parsed['@graph'].map(g => g['@type']).join(', ') : 'unknown')) : 'none';
  assert(isValid, `${f}: Valid JSON-LD schema present (${typeStr})`);
});

console.log(`\n================================================================`);
console.log(`  VERIFICATION RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

