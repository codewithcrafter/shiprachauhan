<?php
/**
 * SHIPRA CHAUHAN SEO BLOGS HUB (DYNAMIC PHP)
 * Connects to MySQL / XAMPP with graceful offline fallback
 */
require_once __DIR__ . '/config/db.php';

$pdo = getDbConnection();
$appBase = getAppBaseUrl();
$adminBase = getAdminBaseUrl();
$blogs = [];

if ($pdo) {
    try {
        $blogs = getPublishedBlogs(100);
    } catch (Exception $e) {
        $blogs = [];
    }
}

// Fallback to initial seed if database has no articles or MySQL is offline
if (empty($blogs)) {
    $seedFile = __DIR__ . '/scratch/initial_articles_seed.json';
    if (file_exists($seedFile)) {
        $seeds = json_decode(file_get_contents($seedFile), true) ?: [];
        foreach ($seeds as $s) {
            if (($s['publish_stage'] ?? 'published') === 'published') {
                $blogs[] = $s;
            }
        }
    }
}

// Extract unique categories for sidebar
$categories = [];
foreach ($blogs as $b) {
    if (!empty($b['category'])) {
        $categories[$b['category']] = ($categories[$b['category']] ?? 0) + 1;
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blogs | Shipra Chauhan – SEO Expert</title>
  <meta name="description" content="Read the latest insights and analysis on SEO, AI Overviews, digital PR, technical site audits, and local search strategies from Shipra Chauhan.">
  <link rel="canonical" href="https://shiprachauhan.in/blogs">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="<?= $appBase ?>/css/style.css?v=20261120">
  <script>
    if (sessionStorage.getItem('curtain_reveal')) {
      document.documentElement.classList.add('curtain-incoming');
    }
  </script>

  <script type="application/ld+json">
  {
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
  }
  </script>
</head>
<body>
  <!-- Full-Page Curtain Wipe Overlay -->
  <div class="page-curtain is-hidden" aria-hidden="true">
    <div class="curtain-gold-edge"></div>
    <div class="curtain-brand-mark">
      <span class="curtain-monogram">SC</span>
      <span class="curtain-tagline">Shipra Chauhan · Strategic Advisory</span>
    </div>
  </div>

  <!-- Dual-Tier Modern Sticky Header -->
  <header class="site-header-full" id="siteHeader">
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
          <li><a href="/blogs" class="nav-link active">Blogs</a></li>
          <li><a href="/contact" class="nav-link">Contact</a></li>
        </ul>

        <div class="header-cta-group">
          <a href="/contact" class="btn-header-audit">Free Audit</a>
        </div>
      </div>
    </nav>
  </header>

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

          <?php if (empty($blogs)): ?>
            <div style="padding: 3rem; text-align: center; background: #FAF8F3; border-radius: 12px;">
              <h3 style="color: #123C32; margin-bottom: 0.5rem;">No Articles Published Yet</h3>
              <p style="color: #64748B;">Please visit the <a href="<?= $adminBase ?>/index.php" style="color: #B79A62; font-weight: 700;">Admin Studio</a> to compose your first post.</p>
            </div>
          <?php else: ?>
            <?php foreach ($blogs as $blog): ?>
              <?php
                $slug = htmlspecialchars($blog['slug'] ?? '');
                $title = htmlspecialchars($blog['title'] ?? '');
                $category = htmlspecialchars($blog['category'] ?? 'SEO Strategy');
                $author = htmlspecialchars($blog['author'] ?? 'Shipra Chauhan');
                $pubDate = !empty($blog['publication_date']) ? date('F j, Y', strtotime($blog['publication_date'])) : 'October 2026';
                $readTime = intval($blog['read_time'] ?? 5);
                $excerpt = htmlspecialchars($blog['short_excerpt'] ?? '');
                $rawImg = !empty($blog['featured_image']) ? $blog['featured_image'] : '/assets/images/local-hero.webp';
                $image = (strpos($rawImg, 'http') === 0 || strpos($rawImg, $appBase) === 0) ? htmlspecialchars($rawImg) : htmlspecialchars($appBase . $rawImg);
                $imageAlt = !empty($blog['featured_image_alt']) ? htmlspecialchars($blog['featured_image_alt']) : $title;
              ?>
              <article class="blog-card reveal-init">
                <div class="blog-image-box">
                  <a href="<?= $appBase ?>/blogs/<?= $slug ?>" tabindex="-1" aria-hidden="true">
                    <img src="<?= $image ?>" alt="<?= $imageAlt ?>" class="blog-image" loading="lazy">
                  </a>
                </div>
                <div class="blog-content">
                  <div class="blog-meta-strip">
                    <span class="blog-category-tag"><?= $category ?></span>
                    <span>·</span>
                    <span>By <?= $author ?></span>
                    <span>·</span>
                    <span><?= $pubDate ?></span>
                    <span>·</span>
                    <span><?= $readTime ?> min read</span>
                  </div>
                  <h2 class="blog-card-title">
                    <a href="<?= $appBase ?>/blogs/<?= $slug ?>">
                      <?= $title ?>
                    </a>
                  </h2>
                  <p class="blog-card-excerpt">
                    <?= $excerpt ?>
                  </p>
                  <div class="blog-card-footer">
                    <a href="<?= $appBase ?>/blogs/<?= $slug ?>" class="blog-read-btn">
                      Continue Reading <span aria-hidden="true">→</span>
                    </a>
                    <span style="font-size: 0.8rem; color: #8C9488; font-weight: 500;">Direct Technical Analysis</span>
                  </div>
                </div>
              </article>
            <?php endforeach; ?>
          <?php endif; ?>

        </div>
      </main>

      <!-- Sticky Advisory & Navigation Sidebar -->
      <aside class="blog-sidebar">
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
            <?php 
              $recentArticles = array_slice($blogs, 0, 6);
              foreach ($recentArticles as $recent):
            ?>
              <li>
                <a href="<?= $appBase ?>/blogs/<?= htmlspecialchars($recent['slug'] ?? '') ?>">
                  <?= htmlspecialchars($recent['title'] ?? '') ?>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <!-- Topics & Categories Box -->
        <div class="blog-sidebar-box reveal-init stagger-2">
          <h3 class="blog-sidebar-title">Categories</h3>
          <ul class="blog-sidebar-links">
            <?php if (empty($categories)): ?>
              <li><a href="<?= $appBase ?>/blogs">SEO Strategy</a></li>
            <?php else: ?>
              <?php foreach ($categories as $catName => $count): ?>
                <li>
                  <a href="<?= $appBase ?>/blogs?cat=<?= urlencode($catName) ?>">
                    <?= htmlspecialchars($catName) ?> (<?= $count ?>)
                  </a>
                </li>
              <?php endforeach; ?>
            <?php endif; ?>
          </ul>
        </div>

        <!-- Admin Studio Link Box -->
        <div class="blog-sidebar-box reveal-init stagger-3" style="background: #F8FAFC; border-color: #CBD5E1;">
          <h3 class="blog-sidebar-title" style="color: #123C32;">Editorial Studio</h3>
          <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.75rem;">
            Authorized administrators can compose, edit, or delete articles via the backend studio.
          </p>
          <a href="<?= $adminBase ?>/index.php" style="display: inline-flex; align-items: center; gap: 0.35rem; color: #B79A62; font-weight: 700; font-size: 0.85rem;">
            <span>Open Admin Studio</span>
            <span>→</span>
          </a>
        </div>
      </aside>
    </div>
  </section>

  <!-- Master Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="/" class="footer-logo">Shipra <span>Chauhan</span></a>
          <p class="footer-desc">
            SEO consultant in Delhi helping businesses build sustainable organic growth through technical, on-page, and off-page strategy — not shortcuts.
          </p>
        </div>

        <div>
          <p class="footer-heading">Services</p>
          <ul class="footer-links">
            <li><a href="/on-page-seo">On-Page SEO</a></li>
            <li><a href="/technical-seo">Technical SEO</a></li>
            <li><a href="/off-page-seo">Off-Page SEO</a></li>
            <li><a href="/local-seo">Local SEO</a></li>
            <li><a href="/ecommerce-seo">Ecommerce SEO</a></li>
            <li><a href="/geo-services">Generative Engine Optimization</a></li>
          </ul>
        </div>

        <div>
          <p class="footer-heading">Company</p>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <p class="footer-heading">Get In Touch</p>
          <div class="footer-contact-list">
            <a href="mailto:info@shiprachauhan.in" class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>
              <span>info@shiprachauhan.in</span>
            </a>
            <a href="tel:+919718159724" class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+91 97181 59724</span>
            </a>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Shipra Chauhan. All rights reserved.</span>
        <span>SEO Consultant &amp; Strategist Delhi</span>
      </div>
    </div>
  </footer>

  <!-- Scroll to Top Button -->
  <button class="scroll-top-btn" aria-label="Scroll to top of page">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  </button>

  <script src="<?= $appBase ?>/js/main.js?v=20261120"></script>

  <!-- 4-Second Timed Animated Lead Pop-up Modal (Every Page Load & Refresh) -->
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
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    </a>
  </div>

  <!-- Mobile Bottom App Bar (<768px) -->
  <div class="mobile-bottom-bar" aria-label="Mobile Bottom Actions">
    <div class="mobile-bottom-inner">
      <a href="tel:+919718159724" class="mobile-bottom-btn mobile-btn-call">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
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

</body>
</html>

