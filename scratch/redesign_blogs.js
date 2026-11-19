const fs = require('fs');

const originalHtml = fs.readFileSync('blogs.html', 'utf8');

// Images mapping for the 10 articles
const images = [
  '/assets/images/local-hero.webp',
  '/assets/images/local-multi.webp',
  '/assets/images/hyperlocal.webp',
  '/assets/images/geo-hero.webp',
  '/assets/images/offpage-hero.webp',
  '/assets/images/offpage-backlink.webp',
  '/assets/images/ecommerce-hero.webp',
  '/assets/images/ecommerce-platform.webp',
  '/assets/images/onpage-hero.webp',
  '/assets/images/technical-hero.webp'
];

const articlesData = [
  {
    url: '/blogs/voice-search-local-seo',
    title: 'Voice Search and Local SEO: What &ldquo;Near Me&rdquo; Queries Actually Need',
    excerpt: 'Voice search local SEO is about making your business the one answer a phone or smart speaker reads out. It needs conversational sentence structures, structured local schema, and exact matching of conversational search intent.',
    author: 'By krishna',
    date: 'October 12, 2026',
    category: 'Local Search & Voice',
    readTime: '6 min read',
    image: images[0]
  },
  {
    url: '/blogs/multi-location-seo-cannibalization',
    title: 'Multi-Location SEO: How to Avoid Cannibalization Across City Pages',
    excerpt: 'Multi location SEO cannibalization happens when two or more of your city pages compete for the same search query, so Google splits ranking signals between them. Learn how unique local content and proper internal linking prevent this.',
    author: 'By krishna',
    date: 'October 11, 2026',
    category: 'Architecture & Scalability',
    readTime: '7 min read',
    image: images[1]
  },
  {
    url: '/blogs/review-response-local-seo',
    title: 'Review Response Strategy: How Responding to Reviews Affects Local Rankings',
    excerpt: 'Review response local SEO is the practice of replying to Google reviews so that customers trust you more and search algorithms recognize active local profile engagement.',
    author: 'By krishna',
    date: 'October 10, 2026',
    category: 'Reputation & Signals',
    readTime: '5 min read',
    image: images[2]
  },
  {
    url: '/blogs/ai-overviews-local-search',
    title: 'How AI Overviews Are Changing Local Search Results in 2026',
    excerpt: 'AI Overviews local search is no longer an experiment. In 2026, when someone types "best dentist near me" or emergency queries, Google synthesizes extractable answer units directly into position zero.',
    author: 'By krishna',
    date: 'October 9, 2026',
    category: 'Generative Engine Search',
    readTime: '8 min read',
    image: images[3]
  },
  {
    url: '/blogs/link-building-ai-search-citations',
    title: 'Why Link Building for AI Search Citations Is Different From Traditional SEO',
    excerpt: 'Link building for AI search citations is a different job from traditional link building, because the goal is no longer just PageRank transfer — it\'s teaching LLMs to attribute authoritative claims to your brand.',
    author: 'By krishna',
    date: 'October 8, 2026',
    category: 'Off-Page & Authority',
    readTime: '6 min read',
    image: images[4]
  },
  {
    url: '/blogs/toxic-backlinks-disavow',
    title: 'Toxic Backlinks Disavow Guide: How to Identify and Disavow Them Safely',
    excerpt: 'The toxic backlinks disavow process is how you tell Google to ignore harmful links pointing to your website, but misusing the disavow tool can cause more damage than the spam links themselves.',
    author: 'By krishna',
    date: 'October 7, 2026',
    category: 'Technical Off-Page',
    readTime: '7 min read',
    image: images[5]
  },
  {
    url: '/blogs/unlinked-brand-mentions-seo',
    title: 'Unlinked Brand Mentions SEO: How Brand Mentions Without Links Still Help',
    excerpt: 'Unlinked brand mentions SEO is the concept that when credible websites mention your brand name without hyperlinking, LLMs and modern search engines still absorb entity authority signals.',
    author: 'By krishna',
    date: 'October 6, 2026',
    category: 'Entity & Knowledge Graph',
    readTime: '5 min read',
    image: images[6]
  },
  {
    url: '/blogs/digital-pr-vs-link-building',
    title: 'Digital PR vs Traditional Link Building: What Works Better in 2026',
    excerpt: 'The digital PR vs link building debate has a fairly clear answer in 2026. Digital PR earns stronger, longer-lasting editorial links from high-trust media outlets that search algorithms value most.',
    author: 'By krishna',
    date: 'October 5, 2026',
    category: 'Digital PR & Trust',
    readTime: '6 min read',
    image: images[7]
  },
  {
    url: '/blogs/title-tag-optimization-best-practices',
    title: 'Title Tag and Meta Description Best Practices for 2026 Search Results',
    excerpt: 'The short version of title tag and meta description best practices in 2026 is this: write the title tag to match exact search intent, and the meta description to maximize organic click-through rates.',
    author: 'By krishna',
    date: 'October 4, 2026',
    category: 'On-Page Optimization',
    readTime: '5 min read',
    image: images[8]
  },
  {
    url: '/blogs/internal-linking-strategy-seo',
    title: 'Internal Linking Strategy SEO: How Many Links Is Too Many on One Page',
    excerpt: 'A solid internal linking strategy has no magic number, but the rule is simple: add contextual links within topic silos to route equity directly to commercial pillar pages.',
    author: 'By krishna',
    date: 'October 3, 2026',
    category: 'Site Architecture',
    readTime: '6 min read',
    image: images[9]
  }
];

// Extract head and top header up to </header>
const headerEndIdx = originalHtml.indexOf('</header>') + '</header>'.length;
const preHeader = originalHtml.substring(0, headerEndIdx);

// Extract footer start
const footerStartIdx = originalHtml.indexOf('<!-- Master Footer -->');
const postFooter = originalHtml.substring(footerStartIdx);

let mainContent = `
  <!-- Redesigned Luxury Hero Header -->
  <section class="page-hero" style="padding: clamp(3.5rem, 6vw, 5rem) 0 3rem; background: linear-gradient(180deg, #FAF8F3 0%, #FFFFFF 100%); border-bottom: 1px solid rgba(183, 154, 98, 0.25);">
    <div class="container">
      <div class="section-header reveal-init" style="margin-bottom: 0; max-width: 820px;">
        <div class="eyebrow" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 0.85rem;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #1D5B49;"></span>
          Search Insights &amp; Strategy
        </div>
        <h1 style="font-size: clamp(2.4rem, 4.5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;">Shipra Chauhan SEO Blog</h1>
        <p class="page-hero-desc" style="font-size: 1.12rem; line-height: 1.7; color: #4A5248;">
          Actionable perspectives on modern search engine algorithms, AI Overview optimization, technical architecture, and ethical organic growth.
        </p>
      </div>
    </div>
  </section>

  <!-- Modern Luxury Blog Listing with Sticky Sidebar -->
  <section class="section section-white" style="padding: 4rem 0 6rem;">
    <div class="container blog-layout">
      <!-- Main Articles Column -->
      <main class="blog-main-column">
        <div class="blog-grid">
`;

articlesData.forEach((art, index) => {
  mainContent += `
          <!-- Article ${index + 1} -->
          <article class="blog-card reveal-init">
            <div class="blog-image-box">
              <a href="${art.url}" tabindex="-1" aria-hidden="true">
                <img src="${art.image}" alt="${art.title.replace(/&ldquo;|&rdquo;/g, '"')}" class="blog-image" loading="lazy">
              </a>
            </div>
            <div class="blog-content">
              <div class="blog-meta-strip">
                <span class="blog-category-tag">${art.category}</span>
                <span>·</span>
                <span>${art.author}</span>
                <span>·</span>
                <span>${art.date}</span>
                <span>·</span>
                <span>${art.readTime}</span>
              </div>
              <h2 class="blog-card-title">
                <a href="${art.url}">
                  ${art.title}
                </a>
              </h2>
              <p class="blog-card-excerpt">
                ${art.excerpt}
              </p>
              <div class="blog-card-footer">
                <a href="${art.url}" class="blog-read-btn">
                  Continue Reading <span aria-hidden="true">→</span>
                </a>
                <span style="font-size: 0.8rem; color: #8C9488; font-weight: 500;">Direct Technical Analysis</span>
              </div>
            </div>
          </article>
`;
});

mainContent += `
        </div>
      </main>

      <!-- Sticky Advisory & Navigation Sidebar -->
      <aside class="blog-sidebar" style="position: sticky; top: 110px;">
        <!-- Quick Advisory Card -->
        <div class="blog-advisory-card reveal-init" style="margin-bottom: 2rem;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.15); border-radius: 100px; font-size: 0.75rem; font-weight: 700; color: #FAF8F3; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem;">
            🟢 Direct Consultant Advisory
          </div>
          <h4>Need Strategic Guidance on Search Architecture?</h4>
          <p>
            Connect directly with Shipra Chauhan for a bespoke evaluation of your crawl health, schema taxonomy, and generative search visibility.
          </p>
          <a href="/contact" class="btn btn-primary" style="width: 100%; justify-content: center; background: #B79A62; border-color: #B79A62; color: #123C32; font-weight: 700;">
            Book Strategy Session →
          </a>
        </div>

        <!-- Recent Posts Box -->
        <div class="blog-sidebar-box reveal-init stagger-1">
          <h3 class="blog-sidebar-title">Recent Publications</h3>
          <ul class="blog-sidebar-links">
`;

articlesData.slice(0, 6).forEach(art => {
  mainContent += `            <li><a href="${art.url}">${art.title}</a></li>\n`;
});

mainContent += `          </ul>
        </div>

        <!-- Topical Archives Box -->
        <div class="blog-sidebar-box reveal-init stagger-2">
          <h3 class="blog-sidebar-title">Archives</h3>
          <ul class="blog-sidebar-links">
            <li><a href="/blogs">October 2026</a></li>
            <li><a href="/blogs">September 2026</a></li>
            <li><a href="/blogs">August 2026</a></li>
          </ul>
        </div>

        <!-- Topics & Categories Box -->
        <div class="blog-sidebar-box reveal-init stagger-3">
          <h3 class="blog-sidebar-title">Categories</h3>
          <ul class="blog-sidebar-links">
            <li><a href="/blogs">Uncategorized</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
`;

const finalBlogsHtml = preHeader + '\n' + mainContent + '\n  ' + postFooter;
fs.writeFileSync('blogs.html', finalBlogsHtml, 'utf8');
console.log('blogs.html redesigned successfully! Total bytes:', finalBlogsHtml.length);

