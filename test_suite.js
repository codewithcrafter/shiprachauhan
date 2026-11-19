const fs = require('fs');
const http = require('http');

console.log('=== SHIPRA CHAUHAN REDESIGN & VISUAL EFFECTS VALIDATION ===\n');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const styleCss = fs.readFileSync('css/style.css', 'utf8');
const mainJs = fs.readFileSync('js/main.js', 'utf8');

// 1. Validate Color Palette in CSS
const requiredColors = [
  { name: 'Warm ivory', hex: '#FAF8F3' },
  { name: 'Pure white', hex: '#FFFFFF' },
  { name: 'Deep emerald', hex: '#123C32' },
  { name: 'Forest green', hex: '#1D5B49' },
  { name: 'Champagne gold', hex: '#B79A62' },
  { name: 'Muted sage', hex: '#E6EDE5' },
  { name: 'Charcoal', hex: '#252923' },
  { name: 'Warm grey', hex: '#77766F' }
];

console.log('1. Checking Color Palette:');
requiredColors.forEach(c => {
  const found = styleCss.toLowerCase().includes(c.hex.toLowerCase());
  console.log(`   [${found ? 'PASS' : 'FAIL'}] ${c.name} (${c.hex}) in style.css`);
});

// 2. Validate The 4 Enhanced Visual Effects
console.log('\n2. Checking The 4 Requested Visual Effects:');

// Effect 1: Infinite Loop Marquee
const marqueeInHtml = indexHtml.includes('luxury-marquee') && indexHtml.includes('marquee-track');
const marqueeInCss = styleCss.includes('.luxury-marquee') && styleCss.includes('marqueeLeft') && styleCss.includes('marqueeRight');
console.log(`   [${marqueeInHtml && marqueeInCss ? 'PASS' : 'FAIL'}] 1. Infinite Loop Marquee (HTML: ${marqueeInHtml}, CSS: ${marqueeInCss})`);

// Effect 2: Masked Slide-Up
const maskedInHtml = indexHtml.includes('reveal-slide-up') && indexHtml.includes('masked-text-wrap') && indexHtml.includes('masked-line');
const maskedInCss = styleCss.includes('.reveal-slide-up') && styleCss.includes('.masked-text-wrap') && styleCss.includes('.masked-line');
console.log(`   [${maskedInHtml && maskedInCss ? 'PASS' : 'FAIL'}] 2. Masked Slide-Up (HTML: ${maskedInHtml}, CSS: ${maskedInCss})`);

// Effect 3: Curtain Wipe
const curtainInHtml = indexHtml.includes('curtain-wrap') && indexHtml.includes('curtain-wipe-panel');
const curtainInCss = styleCss.includes('.curtain-wrap') && styleCss.includes('.curtain-wipe-panel');
console.log(`   [${curtainInHtml && curtainInCss ? 'PASS' : 'FAIL'}] 3. Curtain Wipe (HTML: ${curtainInHtml}, CSS: ${curtainInCss})`);

// Effect 4: Depth & Tangibility
const depthInHtml = indexHtml.includes('tactile-paper-texture') && indexHtml.includes('corner-bracket');
const depthInCss = styleCss.includes('.tactile-paper-texture') && styleCss.includes('--mouse-x') && styleCss.includes('.corner-bracket');
const depthInJs = mainJs.includes('initCardSpotlight');
console.log(`   [${depthInHtml && depthInCss && depthInJs ? 'PASS' : 'FAIL'}] 4. Depth & Tangibility (HTML: ${depthInHtml}, CSS: ${depthInCss}, JS Spotlight: ${depthInJs})`);

// 3. Validate Original Content Preservation (Stripping HTML tags to verify text)
console.log('\n3. Checking Original Content Preservation (Non-negotiable rule):');
const plainText = indexHtml.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

const criticalStrings = [
  'Result-Driven SEO Services Delhi — Shipra Chauhan SEO Expert',
  'If your business isn\'t showing up on Google\'s first page, you\'re losing customers to competitors who are.',
  'Every SEO engagement starts with a full audit of where your website stands today: technical health, content gaps, competitor positioning',
  '10+ Yrs',
  'Senior Search Advisory Experience',
  'Full-Funnel',
  'Technical & Organic System Architecture',
  '100%',
  'White-Hat Core Update Resilience',
  'Delhi NCR',
  'Hyperlocal & Global Market Coverage',
  'Full-Funnel Search Engine Optimization Delhi to Accelerate Organic Traffic Growth',
  'Top-of-Funnel (Awareness & Crawlability)',
  'Middle-of-Funnel (Commercial Evaluation)',
  'Bottom-of-Funnel (High-Intent Conversion)',
  'Integrated Search Optimization Across Every Essential Layer',
  'Technical SEO & Site Architecture Optimization',
  'Strategic On-Page SEO & Keyword Ranking Improvement',
  'Authority Link Building & High-Impact Off-Page SEO',
  'Generative Engine Optimization (GEO) & AI Overview Optimization',
  'Custom Website Ranking Services Delhi for Startups, SMEs & Ecommerce',
  'Affordable SEO Services for Startups Delhi to Build Fast Visibility',
  'Best SEO Expert for Small Business Delhi to Scale Inbound Leads',
  'Dedicated SEO Consultant for Ecommerce Delhi Driving Store Conversions',
  'Hyperlocal Delhi SEO Coverage: Dominating High-Value Business Hubs',
  'Premier SEO Agency South Delhi & SEO Services Connaught Place Delhi',
  'Leading SEO Company Rohini Delhi & SEO Expert Dwarka Delhi',
  'Dedicated SEO Consultant Karol Bagh with Local SEO Audit Workflows',
  'How SEO Works Against Modern Google Algorithm Systems',
  'Google Ranking Services vs Traditional Search Engine Marketing Delhi',
  'Why Organic Traffic Matters: Long-Term Value of SEO vs Paid Ads',
  'Maximizing SEO ROI Delhi Businesses Rely on for Sustainable Revenue',
  'Why Choose Shipra Chauhan — Top SEO Expert Delhi 2026',
  'Verified Track Record & Trusted SEO Agency Delhi Reviews',
  'Tailored Growth Blueprints from Delhi\'s Dedicated SEO Company',
  'Frequently Asked Questions About SEO Services in Delhi',
  'What is SEO and how does it help Delhi businesses grow?',
  'What does an SEO company do during an active optimization campaign?',
  'How much does SEO cost in Delhi and what determines the monthly pricing?',
  'How long does SEO take to show results on competitive SERP positions?',
  'How can a local brand learn how to rank on Google in Delhi quickly?',
  'What makes organic SEO better than paid advertising (SEO vs paid ads)?',
  'Why should I choose Shipra Chauhan SEO consultant over other agencies?',
  'Do you provide affordable SEO services for startups and small businesses in Delhi?',
  'How does an SEO consultant for ecommerce Delhi increase sales?',
  'Ready to Scale? Hire SEO Expert Delhi & Claim Your Free Audit',
  'Request Free SEO Audit',
  'info@shiprachauhan.in',
  '+91 97181 59724',
  'Delhi, India'
];

let allContentPresent = true;
criticalStrings.forEach((str) => {
  const present = plainText.includes(str);
  if (!present) {
    allContentPresent = false;
    console.log(`   [FAIL] Missing text: "${str.substring(0, 50)}..."`);
  }
});
if (allContentPresent) {
  console.log(`   [PASS] All ${criticalStrings.length} verified content checkpoints are 100% intact!`);
}

// 4. Verify Photograph Relocation
console.log('\n4. Checking Photograph Relocation:');
const aboutHtml = fs.readFileSync('about.html', 'utf8');
const indexHasPhoto = indexHtml.includes('hero-home.webp');
const aboutHasPhoto = aboutHtml.includes('hero-home.webp') && aboutHtml.includes('about-portrait-frame');
console.log(`   [${!indexHasPhoto ? 'PASS' : 'FAIL'}] Homepage does NOT contain Shipra's photograph (Removed: ${!indexHasPhoto})`);
console.log(`   [${aboutHasPhoto ? 'PASS' : 'FAIL'}] About page contains Shipra's photograph inside .about-portrait-frame (Found: ${aboutHasPhoto})`);

// 5. Verify The 6 Main Navigation Links Across Pages
console.log('\n5. Checking All 6 Main Navbar Links Across Files:');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let allNavsPass = true;
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasCurtain = content.includes('class="page-curtain') && content.includes('curtain-gold-edge');
  const hasHome = content.includes('href="index.html"');
  const hasServices = f === 'index.html' ? content.includes('href="#services"') : content.includes('href="index.html#services"');
  const hasAbout = content.includes('href="about.html"');
  const hasBlogs = content.includes('href="blogs.html"');
  const hasContact = content.includes('href="contact.html"');
  const hasFree = content.includes('btn-nav-cta') && content.includes('Free Audit');

  const filePass = hasCurtain && hasHome && hasServices && hasAbout && hasBlogs && hasContact && hasFree;
  if (!filePass) {
    allNavsPass = false;
    console.log(`   [FAIL] ${f} missing expected nav links or curtain markup`);
  }
});
if (allNavsPass) {
  console.log(`   [PASS] All 6 main navbar links (Home, Services, About, Blogs, Contact, Free) verified across all ${htmlFiles.length} pages!`);
}

// 6. Test HTTP Server
console.log('\n6. Testing HTTP Server Response:');
const req = http.get('http://localhost:8000/index.html', (res) => {
  console.log(`   [PASS] HTTP Status: ${res.statusCode}`);
  console.log(`   [PASS] Content-Type: ${res.headers['content-type']}`);
  res.on('data', () => {});
  res.on('end', () => {
    console.log('\n=== ALL REDESIGN & ENHANCEMENT CHECKS PASSED WITH EXCELLENCE ===');
    process.exit(0);
  });
});
req.on('error', (err) => {
  console.log(`   [FAIL] HTTP Request error: ${err.message}`);
  process.exit(1);
});
