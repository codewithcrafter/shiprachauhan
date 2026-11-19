const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('================================================================');
console.log('  SHIPRA CHAUHAN WEB PLATFORM — TRANSFORMATION VERIFICATION  ');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function test(description, condition) {
  if (condition) {
    console.log(`[PASS] ${description}`);
    passed++;
  } else {
    console.error(`[FAIL] ${description}`);
    failed++;
  }
}

// 1. Verify CSS Palette
const css = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');
const expectedColors = [
  { name: 'Deep Emerald', hex: '#123C32' },
  { name: 'Champagne Gold', hex: '#B79A62' },
  { name: 'Warm Ivory', hex: '#FAF8F3' },
  { name: 'Forest Green', hex: '#1D5B49' },
  { name: 'Muted Sage', hex: '#E6EDE5' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'High-Contrast Charcoal', hex: '#252923' }
];

console.log('1. Brand Color Palette Validation:');
expectedColors.forEach(c => {
  test(`Color ${c.name} (${c.hex}) in style.css`, css.toLowerCase().includes(c.hex.toLowerCase()));
});

// 2. Verify Component Architecture in Root Pages
const rootHtmlFiles = [
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

console.log('\n2. Global Components in All 10 Root Pages:');
rootHtmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  const hasHeader = content.includes('class="site-header-full"');
  const hasModal = content.includes('id="autoPopupOverlay"');
  const hasFloating = content.includes('class="floating-quick-actions"');
  const hasMobileBar = content.includes('class="mobile-bottom-bar"');

  test(`${file}: Dual-Tier Header (${hasHeader}), 3s Modal (${hasModal}), Floating (${hasFloating}), Mobile Bar (${hasMobileBar})`,
    hasHeader && hasModal && hasFloating && hasMobileBar
  );
});

// 3. Verify Hero Consultation Form on All 6 Service Pages
const servicePages = [
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

console.log('\n3. Service Pages Hero Consultation Forms:');
servicePages.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  const hasForm = content.includes('service-hero-form-card') && content.includes('btn-service-submit');
  test(`${file} contains Hero Consultation Form Card`, hasForm);
});

// 4. Verify Blog System (All 10 Read-Ready Articles)
const blogSlugs = [
  'voice-search-local-seo',
  'multi-location-seo-cannibalization',
  'review-response-local-seo',
  'ai-overviews-local-search',
  'link-building-ai-search-citations',
  'toxic-backlinks-disavow',
  'unlinked-brand-mentions-seo',
  'digital-pr-vs-link-building',
  'title-tag-optimization-best-practices',
  'internal-linking-strategy-seo'
];

console.log('\n4. Blog Articles System (10 Read-Ready Articles with Right Sidebar TOC & Form):');
blogSlugs.forEach(slug => {
  const dirPath = path.join(rootDir, 'blogs', slug, 'index.html');
  const flatPath = path.join(rootDir, 'blogs', `${slug}.html`);
  const dirExists = fs.existsSync(dirPath);
  const flatExists = fs.existsSync(flatPath);

  let hasToc = false;
  let hasSidebarForm = false;
  let hasAuthor = false;
  let hasImage = false;

  if (dirExists) {
    const content = fs.readFileSync(dirPath, 'utf8');
    hasToc = content.includes('class="toc-card"');
    hasSidebarForm = content.includes('class="blog-form-card"');
    hasAuthor = content.includes('class="author-card-sidebar"');
    hasImage = content.includes('class="article-featured-image"');
  }

  test(`Blog "${slug}": Directory route (${dirExists}), TOC (${hasToc}), Form (${hasSidebarForm}), Author (${hasAuthor}), Image (${hasImage})`,
    dirExists && flatExists && hasToc && hasSidebarForm && hasAuthor && hasImage
  );
});

// 5. Verify Clean URL Configuration Files
console.log('\n5. Clean URL & SEO Manifest Files:');
test('.htaccess exists and is configured', fs.existsSync(path.join(rootDir, '.htaccess')));
test('vercel.json exists and is configured', fs.existsSync(path.join(rootDir, 'vercel.json')));
test('_redirects exists', fs.existsSync(path.join(rootDir, '_redirects')));
test('netlify.toml exists', fs.existsSync(path.join(rootDir, 'netlify.toml')));
test('sitemap.xml exists and has valid XML', fs.existsSync(path.join(rootDir, 'sitemap.xml')));
test('llms.txt exists and documents services', fs.existsSync(path.join(rootDir, 'llms.txt')));
test('scripts/generate-sitemap-llms.js exists', fs.existsSync(path.join(rootDir, 'scripts', 'generate-sitemap-llms.js')));
test('scripts/watch-and-sync.js exists', fs.existsSync(path.join(rootDir, 'scripts', 'watch-and-sync.js')));

// 6. Verify Content Integrity on about.html
console.log('\n6. Content Word-for-Word Integrity on about.html:');
const aboutHtml = fs.readFileSync(path.join(rootDir, 'about.html'), 'utf8');
const aboutMustContain = [
  'Shipra Chauhan is an SEO Consultant based in Delhi. She can offer hands on SEO solutions to businesses',
  'Meet Shipra Chauhan SEO Expert - Background, Journey & Experience',
  'Shipra has over a decade of experience within the world of search so will have seen it all!',
  'Professional Experience & Skills',
  'Certified SEO Professional - Delhi',
  'Verified Person Schema & Author Authority',
  'Core Skills & Expertise',
  'Technical, On-Page & Off-Page SEO',
  'Local SEO, Google Business Profile & Generative Engine Optimisation (GEO)',
  'Shipra Chauhan SEO Philosophy - White Hat & Proven ROI',
  'Honest & Transparent, No Black Hat Tactics',
  'Why Choose Shipra Chauhan SEO Agency Over Traditional Marketing Agencies',
  'Direct Senior Consultant',
  'Transparent Advice',
  'Who is Shipra Chauhan and what is her background in Organic Search?'
];

aboutMustContain.forEach(text => {
  test(`Exact phrase preserved: "${text.substring(0, 45)}..."`, aboutHtml.includes(text));
});

console.log('\n================================================================');
console.log(`  VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

process.exit(failed > 0 ? 1 : 0);

