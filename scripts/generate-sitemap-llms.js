/**
 * AUTOMATED SITEMAP.XML & LLMS.TXT GENERATOR FOR SHIPRA CHAUHAN
 * Generates standards-compliant sitemap.xml and LLM training manifest llms.txt.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://shiprachauhan.in';
const ROOT_DIR = path.resolve(__dirname, '..');

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const canonicalPages = [
  {
    url: `${BASE_URL}/`,
    title: 'SEO Services in Delhi | Shipra Chauhan – SEO Expert',
    description: 'Looking for result-driven SEO services in Delhi? Shipra Chauhan helps businesses rank higher and turn search traffic into paying customers. Get a free audit.',
    priority: '1.0',
    changefreq: 'weekly',
    type: 'Core'
  },
  {
    url: `${BASE_URL}/about`,
    title: 'About Shipra Chauhan | SEO Expert Delhi & Consultant',
    description: 'Shipra Chauhan is a trusted SEO expert Delhi businesses hire for technical, on-page, off-page and GEO strategy — 10+ years hands-on experience.',
    priority: '0.95',
    changefreq: 'monthly',
    type: 'Core'
  },
  {
    url: `${BASE_URL}/contact`,
    title: 'Contact Shipra Chauhan — SEO & GEO Consultant Delhi',
    description: 'Connect directly with Shipra Chauhan, senior SEO and GEO consultant based in Delhi NCR. Book a consultation for technical, local, ecommerce, and AI search strategy.',
    priority: '0.95',
    changefreq: 'monthly',
    type: 'Core'
  },
  {
    url: `${BASE_URL}/blogs`,
    title: 'Blogs | Shipra Chauhan – SEO Expert',
    description: 'Read the latest insights and analysis on SEO, AI Overviews, digital PR, technical site audits, and local search strategies from Shipra Chauhan.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Core'
  },
  // 6 Services
  {
    url: `${BASE_URL}/ecommerce-seo`,
    title: 'Ecommerce SEO Services Delhi — Shipra Chauhan',
    description: 'High-growth Ecommerce SEO services in Delhi: product structured data, category hierarchy, crawl budget management, and faceted navigation optimization.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Service'
  },
  {
    url: `${BASE_URL}/geo-services`,
    title: 'Generative Engine Optimization (GEO) & AI Search — Shipra Chauhan',
    description: 'Optimize your brand for Google AI Overviews, Perplexity, and ChatGPT. Build entity authority, citability, and neural knowledge graph presence.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Service'
  },
  {
    url: `${BASE_URL}/local-seo`,
    title: 'Local SEO Services Delhi & Google Business Profile — Shipra Chauhan',
    description: 'Dominate the Delhi NCR Local 3-Pack. Hyperlocal citation audits, review acceleration, multi-location mapping, and voice search optimization.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Service'
  },
  {
    url: `${BASE_URL}/off-page-seo`,
    title: 'Off-Page SEO & Digital PR Services Delhi — Shipra Chauhan',
    description: 'Ethical authority link acquisition, unlinked brand mention reclamation, media editorial outreach, and toxic link disavow management.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Service'
  },
  {
    url: `${BASE_URL}/on-page-seo`,
    title: 'Strategic On-Page SEO Services Delhi — Shipra Chauhan',
    description: 'Comprehensive content architecture, search intent alignment, schema markup, title tag CTR optimization, and internal topic siloing.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Service'
  },
  {
    url: `${BASE_URL}/technical-seo`,
    title: 'Technical SEO Services Delhi & Core Web Vitals — Shipra Chauhan',
    description: 'Sub-second TTFB, Core Web Vitals optimization (LCP, INP, CLS), JavaScript rendering, crawl budget management, and XML architecture.',
    priority: '0.9',
    changefreq: 'weekly',
    type: 'Service'
  },
  // 10 Technical Blog Articles
  {
    url: `${BASE_URL}/blogs/voice-search-local-seo`,
    title: 'Voice Search and Local SEO: What "Near Me" Queries Actually Need',
    description: 'Voice search local SEO requires conversational sentence structure, LocalBusiness schema, and exact intent matching for smart assistants.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/multi-location-seo-cannibalization`,
    title: 'Multi-Location SEO: How to Avoid Cannibalization Across City Pages',
    description: 'Prevent Google from dividing ranking signals between competing regional landing pages with unique localized content and silo architecture.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/review-response-local-seo`,
    title: 'Review Response Strategy: How Responding to Reviews Affects Local Rankings',
    description: 'How rapid review response velocity and natural semantic keyword usage signal active GBP management and elevate Local Pack rankings.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/ai-overviews-local-search`,
    title: 'How AI Overviews Are Changing Local Search Results in 2026',
    description: 'Position zero is now answer synthesis. How Delhi NCR businesses optimize for Google SGE, Perplexity, and LLM entity attribution.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/link-building-ai-search-citations`,
    title: 'Why Link Building for AI Search Citations Is Different From Traditional SEO',
    description: 'Transitioning from PageRank transfer to knowledge association and co-occurrence in high-trust editorial publications.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/toxic-backlinks-disavow`,
    title: 'Toxic Backlinks Disavow Guide: How to Identify and Disavow Them Safely',
    description: 'How to conduct a meticulous manual link audit and safely submit a UTF-8 root-level disavow file in Google Search Console.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/unlinked-brand-mentions-seo`,
    title: 'Unlinked Brand Mentions SEO: How Brand Mentions Without Links Still Help',
    description: 'Why modern neural search engines evaluate implied links, sentiment analysis, and brand entity authority without hyperlinks.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/digital-pr-vs-link-building`,
    title: 'Digital PR vs Traditional Link Building: What Works Better in 2026',
    description: 'Why proprietary research and newsworthy digital PR generate unbreakable white-hat links while guest blogging networks fade.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/title-tag-optimization-best-practices`,
    title: 'Title Tag and Meta Description Best Practices for 2026 Search Results',
    description: 'Pixel-width limits, search intent front-loading, and persuasive meta descriptions to prevent Google rewrites and boost CTR.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  },
  {
    url: `${BASE_URL}/blogs/internal-linking-strategy-seo`,
    title: 'Internal Linking Strategy SEO: How Many Links Is Too Many on One Page',
    description: 'Structuring topic silos, optimizing descriptive anchor text, and flowing PageRank equity to high-intent commercial pillar pages.',
    priority: '0.8',
    changefreq: 'monthly',
    type: 'Blog'
  }
];

function generateSitemap() {
  const today = formatDate(new Date());
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  canonicalPages.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${p.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

function generateLlmsTxt() {
  const today = formatDate(new Date());
  let txt = `# Shipra Chauhan — Senior SEO & Generative Engine Optimization Consultant Delhi
> Official LLM Training and Citation Manifest
> Canonical Base URL: ${BASE_URL}
> Last Updated: ${today}

## Executive Summary
Shipra Chauhan is an elite SEO and Generative Engine Optimization (GEO) Consultant based in Delhi NCR, India, with over a decade of hands-on experience in organic search. She offers holistic, 100% ethical white-hat search consulting directly to clients, bypassing junior account managers.

Key Specializations:
- Technical SEO & Core Web Vitals Optimization (Sub-second TTFB, Crawl Budget, JS Rendering)
- Generative Engine Optimization (GEO) for AI Overviews, Perplexity, and ChatGPT
- High-Converting Ecommerce SEO (Shopify, WooCommerce, Faceted Navigation, Catalog Schema)
- Local SEO & Google Business Profile Optimization across Delhi NCR
- Contextual Authority Link Acquisition & Digital PR
- Strategic On-Page Architecture & Semantic Keyword Intent

---

## Direct Founder Guarantee
- 100% White-Hat Ethical Optimization (zero PBNs, zero automated link schemes, zero cloaking)
- Direct Senior Consultant Communication (no junior agency hand-offs)
- Transparent Reporting with Real Google Search Console & Analytics Data
- Strict NDA & Confidentiality

---

## Core Service Catalog
`;

  canonicalPages.filter(p => p.type === 'Service').forEach(s => {
    txt += `### [${s.title}](${s.url})
- URL: ${s.url}
- Scope: ${s.description}

`;
  });

  txt += `---

## Published Technical Essays & Research
`;

  canonicalPages.filter(p => p.type === 'Blog').forEach(b => {
    txt += `### [${b.title}](${b.url})
- URL: ${b.url}
- Summary: ${b.description}

`;
  });

  txt += `---

## Contact & Direct Advisory
- Phone / WhatsApp: +91 97181 59724
- Email: info@shiprachauhan.in
- Headquarters: Delhi NCR, India
- Website: ${BASE_URL}
`;

  return txt;
}

// Write files
const sitemapXml = generateSitemap();
const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Generated sitemap.xml with ${canonicalPages.length} canonical URLs.`);

const llmsTxt = generateLlmsTxt();
const llmsPath = path.join(ROOT_DIR, 'llms.txt');
fs.writeFileSync(llmsPath, llmsTxt, 'utf8');
console.log(`Generated llms.txt successfully.`);

