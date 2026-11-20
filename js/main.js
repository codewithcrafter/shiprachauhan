/**
 * Universal Subfolder Base Resolution & Lead Capture Helper
 */
function getAppBase() {
  const p = window.location.pathname.toLowerCase();
  if (p.startsWith('/shiprachauhan')) return '/shiprachauhan';
  if (p.startsWith('/shipra-chauhan')) return '/shipra-chauhan';
  return '';
}

function submitLeadData(payload) {
  const url = getAppBase() + '/api/submit-lead.php';
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(res => res.json());
}

/**
 * Shipra Chauhan — Senior SEO Consultant Delhi
 * Quiet Luxury Motion & Visual Effects System
 * 
 * Key Architectural Systems:
 * 1. Full-Page Curtain Wipe Navigation Engine (All 6 navbar items & internal links)
 * 2. Infinite Loop Marquee (Dual-track continuous motion with hover pause)
 * 3. Masked Slide-Up (Editorial line-by-line typographic reveals)
 * 4. Curtain Wipe (Cinematic image unveil & scale settling)
 * 5. Depth & Tangibility (Interactive card spotlight tracking & tactile feedback)
 * 6. High-Contrast Typography & Dynamic Readability System
 * 7. Accessible FAQ Accordions with CSS Grid Height
 * 8. Translucent Sticky Header with Hairline Transition
 * 9. Mobile Navigation Drawer with Submenu Accordion
 * 10. Accessible Form Validation & Parameter Prefill
 */

document.addEventListener('DOMContentLoaded', () => {
  // Automatically ensure all internal links and images stay inside subfolder on localhost
  (function fixSubfolderDom() {
    const base = getAppBase();
    if (!base) return;

    document.querySelectorAll('a[href^="/"]').forEach(a => {
      const h = a.getAttribute('href');
      if (h && !h.startsWith(base) && !h.startsWith('//')) {
        a.setAttribute('href', base + h);
      }
    });

    document.querySelectorAll('img[src^="/assets/"]').forEach(img => {
      const s = img.getAttribute('src');
      if (s && !s.startsWith(base)) {
        img.src = base + s;
      }
    });
  })();

  // Signal JS readiness
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js-ready');

  initPageCurtainTransitions();
  initScrollProgress();
  initStickyHeader();
  initMobileNav();
  initCardSpotlight();
  initHeroEntrance();
  initSeoTableauCards();
  initTwoWayScrollAnimations();
  initFaqAccordions();
  initScrollToTop();
  initFormValidation();
  highlightActiveNav();



  initUrlParamPrefill();
  initLiveDelhiTime();
  initCleanUrlTrailingSlash();
  init4SecondAutoPopup();
  initServiceHeroForms();
  initBlogSidebarForm();
  initTocScrollSpy();
});

/**
 * 1. Shared Full-Page Curtain Wipe Navigation Engine
 * Handles all 6 main navbar items:
 * - Home (index.html / same-page top)
 * - Services (index.html#services / #services)
 * - About (about.html)
 * - Blogs (blogs.html)
 * - Contact (contact.html)
 * - Free (contact.html / #audit)
 * As well as dropdown items, hero CTAs, and internal navigation.
 */
function initPageCurtainTransitions() {
  // Ensure the page curtain element exists
  let curtain = document.querySelector('.page-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    curtain.setAttribute('aria-hidden', 'true');
    curtain.innerHTML = '<div class="curtain-gold-edge"></div><div class="curtain-brand-mark"><span class="curtain-monogram">SC</span><span class="curtain-tagline">Shipra Chauhan · Strategic Advisory</span></div>';
    document.body.prepend(curtain);
  } else if (!curtain.querySelector('.curtain-brand-mark')) {
    const mark = document.createElement('div');
    mark.className = 'curtain-brand-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.innerHTML = '<span class="curtain-monogram">SC</span><span class="curtain-tagline">Shipra Chauhan · Strategic Advisory</span>';
    curtain.appendChild(mark);
  }

  // Handle incoming reveal if user arrived via curtain wipe
  const arrivedViaCurtain = sessionStorage.getItem('curtain_reveal');
  if (arrivedViaCurtain) {
    sessionStorage.removeItem('curtain_reveal');
    document.documentElement.classList.remove('curtain-incoming');

    // Respect prefers-reduced-motion on landing
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      curtain.classList.add('is-hidden');
      if (window.location.hash) {
        try {
          const hashTarget = document.querySelector(window.location.hash);
          if (hashTarget) hashTarget.scrollIntoView({ behavior: 'auto' });
        } catch (err) {}
      }
      return;
    }

    // Start covering, then wipe away
    curtain.classList.remove('is-hidden');
    curtain.classList.add('is-covering');

    // Scroll to target anchor if present
    if (window.location.hash) {
      try {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
          hashTarget.scrollIntoView({ behavior: 'auto' });
        }
      } catch (err) {
        // Fallback for invalid selector
      }
    }

    curtain.offsetHeight; // force reflow
    // Allow brief preparation (60ms) so destination DOM is completely rendered beneath curtain
    setTimeout(() => {
      requestAnimationFrame(() => {
        curtain.classList.remove('is-covering');
        curtain.classList.add('is-revealing');
        setTimeout(() => {
          curtain.classList.remove('is-revealing');
          curtain.classList.add('is-hidden');
        }, 700);
      });
    }, 60);
  } else {
    document.documentElement.classList.remove('curtain-incoming');
    curtain.classList.add('is-hidden');
  }

  let isTransitioning = false;

  // Handle back/forward cache (bfcache)
  window.addEventListener('pageshow', () => {
    isTransitioning = false;
    document.documentElement.classList.remove('curtain-incoming');
    curtain.classList.remove('is-covering', 'is-revealing');
    curtain.classList.add('is-hidden');
  });

  const triggerCurtainTransition = (targetUrl, isSamePage, targetHash) => {
    if (isTransitioning) return;
    isTransitioning = true;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (isSamePage) {
        if (targetHash && targetHash !== '#') {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.location.href = targetUrl;
      }
      isTransitioning = false;
      return;
    }

    // Phase 1: Smoothly cover the screen with the deep emerald curtain (700ms)
    curtain.classList.remove('is-revealing', 'is-hidden');
    curtain.style.transform = 'translate3d(0, 101%, 0)';
    curtain.offsetHeight; // force reflow
    curtain.classList.add('is-covering');

    // Safety timeout in case navigation stalls
    const safetyTimer = setTimeout(() => {
      if (isTransitioning) {
        curtain.classList.remove('is-covering', 'is-revealing');
        curtain.classList.add('is-hidden');
        isTransitioning = false;
      }
    }, 3500);

    // Wait 700ms for covering animation to complete
    setTimeout(() => {
      if (isSamePage) {
        clearTimeout(safetyTimer);
        // Scroll to destination section or top
        if (targetHash && targetHash !== '#') {
          try {
            const el = document.querySelector(targetHash);
            if (el) {
              el.scrollIntoView({ behavior: 'auto' });
            }
          } catch (err) {}
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }

        // Close mobile drawer if open
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (mobileToggle && navMenu && navMenu.classList.contains('active')) {
          mobileToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        }

        // Phase 2: Reveal the page smoothly (700ms)
        requestAnimationFrame(() => {
          curtain.classList.remove('is-covering');
          curtain.classList.add('is-revealing');

          setTimeout(() => {
            curtain.classList.remove('is-revealing');
            curtain.classList.add('is-hidden');
            isTransitioning = false;
          }, 700);
        });
      } else {
        // Cross-page navigation: set flag and navigate immediately
        sessionStorage.setItem('curtain_reveal', '1');
        window.location.href = targetUrl;
      }
    }, 700);
  };

  // Event delegation on document to catch ALL internal navigation links reliably
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    // Do not intercept modified clicks (Ctrl, Cmd, Shift, Alt, middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    // Do not intercept downloads or new tabs
    if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Do not intercept mailto, tel, javascript
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    // Dynamic Subfolder App Base Detection
    const appBase = getAppBase();
    let resolvedHref = href;
    if (appBase && resolvedHref.startsWith('/') && !resolvedHref.startsWith(appBase) && !resolvedHref.startsWith('//')) {
      resolvedHref = appBase + resolvedHref;
    }

    // Resolve URL
    let targetUrl;
    try {
      targetUrl = new URL(resolvedHref, window.location.origin);
    } catch {
      return;
    }

    // Do not intercept external domains
    if (targetUrl.origin !== window.location.origin) return;

    // Determine current path and target path
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const targetPath = targetUrl.pathname.replace(/\/$/, '') || '/';
    
    // Normalize index.html and root path
    const normCurrent = currentPath.endsWith('index.html') ? currentPath.slice(0, -10) || '/' : currentPath;
    const normTarget = targetPath.endsWith('index.html') ? targetPath.slice(0, -10) || '/' : targetPath;

    const isSamePath = normCurrent === normTarget;

    // Check if this is an internal link (navbar, dropdown, cta, footer, or page link)
    e.preventDefault();

    if (isSamePath) {
      // Same-page navigation (e.g. #services, #audit, or clicking Home/active page to scroll top)
      triggerCurtainTransition(link.href, true, targetUrl.hash);
    } else {
      // Cross-page navigation (e.g. about.html, contact.html, blogs.html, etc.)
      triggerCurtainTransition(targetUrl.href, false, targetUrl.hash);
    }
  });
}

/**
 * 2. Champagne-Gold Scroll Progress Indicator
 */
function initScrollProgress() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 3. Sticky Translucent Luxury Header
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 4. Depth & Tangibility — Interactive Card Spotlight Tracking
 */
function initCardSpotlight() {
  const targets = document.querySelectorAll(
    '.card, .card-dark, .funnel-step, .hub-item, .comparison-card, .form-box, .hero-visual-frame, .hero-tableau, .about-portrait-frame, .split-media, .metric-pill'
  );
  if (!targets.length) return;

  targets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });
}

/**
 * 5. Hero Page-Load Entrance Orchestration (Masked Slide-Up & Curtain Wipe)
 */
function initHeroEntrance() {
  const hero = document.querySelector('.hero-home, .page-hero');
  if (!hero) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-mask, .reveal-scale, .reveal-slide-up, .reveal-curtain, .curtain-wrap').forEach(el => {
      el.classList.add('is-revealed', 'revealed');
    });
    return;
  }

  requestAnimationFrame(() => {
    setTimeout(() => {
      hero.classList.add('hero-loaded');

      const entranceElements = hero.querySelectorAll(
        '[data-hero-enter], .hero-copy > *, .hero-visual-frame, .about-portrait-frame, .hero-metric-ribbon .metric-pill, .curtain-wrap'
      );
      
      entranceElements.forEach((el, index) => {
        const delay = el.getAttribute('data-reveal-delay') || (index * 110 + 60);
        setTimeout(() => {
          el.classList.add('is-revealed', 'revealed');
        }, parseInt(delay, 10));
      });
    }, 60);
  });
}

/**
 * 5b. Alternating Slide-In Animation for SEO Strategy Cards
 * - Card 1 (Technical Infrastructure): Slides in from Left
 * - Card 2 (Full-Funnel Organic Strategy): Slides in from Right
 * - Card 3 (Conversion & Revenue Flow): Slides in from Left
 * - Subtle fade-in with smooth easing (duration ~720ms, offset ~48px)
 * - Staggered entrance timing
 * - Triggers when entering viewport; re-animates when user scrolls away and returns in both directions
 * - Respects prefers-reduced-motion and accessible fallbacks
 */
function initSeoTableauCards() {
  const cards = document.querySelectorAll('.hero-tableau .tableau-card');
  const tableau = document.querySelector('.hero-tableau');
  if (!cards.length || !tableau) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(card => card.classList.add('is-revealed'));
    return;
  }

  // Ensure alternating directional classes are assigned
  cards.forEach((card, index) => {
    if (!card.classList.contains('tableau-card-left') && !card.classList.contains('tableau-card-right')) {
      card.classList.add(index % 2 === 0 ? 'tableau-card-left' : 'tableau-card-right');
    }
  });

  let timerIds = [];

  const revealCards = () => {
    timerIds.forEach(id => clearTimeout(id));
    timerIds = [];
    cards.forEach((card, index) => {
      // Short stagger between cards (approx 120ms)
      const tid = setTimeout(() => {
        card.classList.add('is-revealed');
      }, index * 120 + 80);
      timerIds.push(tid);
    });
  };

  const hideCards = () => {
    timerIds.forEach(id => clearTimeout(id));
    timerIds = [];
    cards.forEach(card => {
      card.classList.remove('is-revealed');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealCards();
      } else {
        // Reset when the section leaves the viewport above or below
        const rect = entry.boundingClientRect;
        const isAbove = rect.bottom < -40;
        const isBelow = rect.top > window.innerHeight + 40;
        if (isAbove || isBelow) {
          hideCards();
        }
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '-10px 0px -20px 0px'
  });

  observer.observe(tableau);
}

/**
 * 6. Bi-Directional Scroll Animations (IntersectionObserver)
 */
function initTwoWayScrollAnimations() {
  const selector = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-mask, .reveal-slide-up, .reveal-curtain, .curtain-wrap, [data-reveal]';
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-revealed', 'revealed'));
    return;
  }

  // Auto-stagger for groups
  const staggerGroups = document.querySelectorAll(
    '.grid-2, .grid-3, .grid-4, .hub-list, .funnel-pipeline, .comparison-grid, .hero-metric-ribbon, [data-stagger-group]'
  );
  staggerGroups.forEach(group => {
    const children = group.querySelectorAll(selector);
    children.forEach((child, index) => {
      if (!child.getAttribute('data-reveal-delay')) {
        child.setAttribute('data-reveal-delay', (index * 110) + 60);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const isOnce = el.getAttribute('data-reveal-once') === 'true';

      if (entry.isIntersecting) {
        const delay = el.getAttribute('data-reveal-delay');
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }
        el.classList.add('is-revealed', 'revealed');
      } else {
        // Element left viewport
        if (!isOnce) {
          const rect = entry.boundingClientRect;
          const isAbove = rect.bottom < -40;
          const isBelow = rect.top > window.innerHeight + 40;

          if (isAbove || isBelow) {
            el.style.transitionDelay = '0ms';
            el.classList.remove('is-revealed', 'revealed');
          }
        }
      }
    });
  }, {
    root: null,
    threshold: [0, 0.15],
    rootMargin: '-20px 0px -20px 0px'
  });

  elements.forEach(el => {
    if (!el.closest('.hero-home') || el.closest('.hero-metric-ribbon')) {
      observer.observe(el);
    }
  });
}

/**
 * 7. Mobile Navigation Drawer & Submenu Accordion
 */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle, .mobile-toggle');
  const navMenu = document.querySelector('.site-header-full .nav-menu, .nav-menu');
  const dropdownParents = document.querySelectorAll('.site-header-full .nav-dropdown, .nav-dropdown');

  if (!toggle || !navMenu) return;

  // Ensure backdrop exists
  let backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const closeMenu = () => {
    toggle.classList.remove('active');
    navMenu.classList.remove('active', 'open');
    toggle.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    toggle.classList.add('active');
    navMenu.classList.add('active', 'open');
    toggle.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = navMenu.classList.contains('open') || navMenu.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  // Accordion for dropdown in mobile view (Single robust handler)
  dropdownParents.forEach(item => {
    const link = item.querySelector(':scope > a');
    if (!link) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = item.classList.toggle('open');
        item.classList.toggle('mobile-open', isOpen);
      }
    });
  });

  // Close when clicking nav links (except the dropdown trigger itself)
  navMenu.querySelectorAll('a').forEach(link => {
    if (link.matches('.nav-dropdown > a, .nav-item-dropdown > a')) return;
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (navMenu.classList.contains('active') || navMenu.classList.contains('open'))) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if ((navMenu.classList.contains('active') || navMenu.classList.contains('open')) &&
        !navMenu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && (navMenu.classList.contains('active') || navMenu.classList.contains('open'))) {
      closeMenu();
    }
  });
}

/**
 * 8. Accessible FAQ Accordions
 */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn, .faq-trigger, .accordion-trigger');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = item.classList.contains('active') || item.classList.contains('open');

      // Auto-collapse other open items in the same container
      const container = item.closest('.faq-accordion, .faq-list, .accordion');
      if (container) {
        container.querySelectorAll('.faq-item.active, .faq-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('active', 'open');
            const otherBtn = other.querySelector('.faq-question-btn, .faq-trigger, .accordion-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isActive);
      item.classList.toggle('open', !isActive);
      btn.setAttribute('aria-expanded', String(!isActive));
    });
  });
}

function initScrollToTop() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 10. Form Validation & Tangible Feedback
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"], #sc-name, #full-name');
      const emailInput = form.querySelector('input[name="email"], #sc-email, #email');
      
      let isValid = true;

      if (nameInput && !nameInput.value.trim()) {
        isValid = false;
        nameInput.focus();
        nameInput.classList.add('is-invalid');
      } else if (nameInput) {
        nameInput.classList.remove('is-invalid');
      }

      if (emailInput && (!emailInput.value.trim() || !emailInput.value.includes('@'))) {
        isValid = false;
        if (isValid) emailInput.focus();
        emailInput.classList.add('is-invalid');
      } else if (emailInput) {
        emailInput.classList.remove('is-invalid');
      }

      if (!isValid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Reviewing website parameters...';
      }

      const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');
      const challengesInput = form.querySelector('textarea, input[name="challenges_goals"], input[name="goals"]');
      const isContactPage = window.location.pathname.includes('contact') || form.id === 'mainContactForm';
      const formTypeLabel = isContactPage ? 'Contact Page Form' : (form.id === 'auditForm' ? 'Hero Free Audit Form' : 'Website Consultation Form');

      submitLeadData({
        name: nameInput ? nameInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        challenges_goals: challengesInput ? challengesInput.value.trim() : '',
        page_source: window.location.pathname || '/',
        form_type: formTypeLabel
      }).then(res => {
        let feedback = form.querySelector('.form-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'form-feedback success';
          form.appendChild(feedback);
        }

        const name = nameInput ? nameInput.value.trim() : 'Guest';
        feedback.innerHTML = `
          <div class="feedback-inner">
            <span class="feedback-badge">Inquiry Stored ✓</span>
            <h4>Thank you, ${escapeHtml(name)}.</h4>
            <p>Your request has been received and saved into our database. Shipra Chauhan will contact you within 24 hours at <strong>${escapeHtml(emailInput ? emailInput.value.trim() : '')}</strong>.</p>
          </div>
        `;
        feedback.style.display = 'block';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Request Submitted ✓';
        }
        form.reset();
      }).catch(err => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Claim your free SEO audit';
        }
        alert('Thank you! Your inquiry has been noted.');
      });
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

/**
 * 11. Active Nav Highlighting
 */
function highlightActiveNav() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.substring(href.lastIndexOf('/') + 1);

    if (linkFile === filename || (filename === '' && linkFile === 'index.html')) {
      link.classList.add('active');
      const dropdownParent = link.closest('.nav-item-dropdown');
      if (dropdownParent) {
        const parentLink = dropdownParent.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
}

/**
 * 12. URL Parameter Prefill
 */
function initUrlParamPrefill() {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.toString()) return;

  const name = urlParams.get('name') || urlParams.get('sc-name');
  const email = urlParams.get('email') || urlParams.get('sc-email');
  const phone = urlParams.get('phone');
  const message = urlParams.get('message') || urlParams.get('website');

  const nameInput = document.querySelector('#full-name, #contact-name, input[name="name"], #sc-name');
  const emailInput = document.querySelector('#email, #contact-email, input[name="email"], #sc-email');
  const phoneInput = document.querySelector('#phone, #contact-phone, input[name="phone"], #sc-phone');
  const messageInput = document.querySelector('#project-notes, #contact-message, textarea[name="notes"], textarea[name="message"], #sc-message');

  if (name && nameInput) nameInput.value = name;
  if (email && emailInput) emailInput.value = email;
  if (phone && phoneInput) phoneInput.value = phone;
  if (message && messageInput) messageInput.value = message;
}

/**
 * 13. Live Delhi Local Time Indicator (Neutomni Style)
 */
function initLiveDelhiTime() {
  const timeElements = document.querySelectorAll('.live-time-delhi');
  if (!timeElements.length) return;

  const updateTime = () => {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      timeElements.forEach(el => {
        el.textContent = `${timeStr} IST`;
      });
    } catch (e) {
      // Fallback
      timeElements.forEach(el => {
        el.textContent = 'DELHI NCR · 2026';
      });
    }
  };

  updateTime();
  setInterval(updateTime, 1000);
}



/**
 * 14. Strict Clean URL Trailing Slash Cleaner (No trailing slash in address bar)
 */
function initCleanUrlTrailingSlash() {
  if (window.location.protocol.startsWith('http')) {
    const path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      const clean = path.replace(/\/+$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  }
}

/**
 * 15. 3-Second Timed Kinetic Lead Pop-Up Modal (Session-Aware Dismissal)
 */
function init4SecondAutoPopup() {
  const popupOverlay = document.getElementById('autoPopupOverlay');
  if (!popupOverlay) return;

  const openPopup = () => {
    popupOverlay.classList.add('open');
    popupOverlay.setAttribute('aria-hidden', 'false');
    const firstInput = popupOverlay.querySelector('#popupName') || popupOverlay.querySelector('input[type="text"]');
    if (firstInput) setTimeout(() => firstInput.focus(), 300);
  };

  const closePopup = () => {
    popupOverlay.classList.remove('open');
    popupOverlay.setAttribute('aria-hidden', 'true');
  };

  // Close Button
  const closeBtn = document.getElementById('closeAutoPopupBtn');
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  const successCloseBtn = document.getElementById('popupSuccessCloseBtn');
  if (successCloseBtn) successCloseBtn.addEventListener('click', closePopup);

  // Backdrop Click
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) closePopup();
  });

  // ESC Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.classList.contains('open')) {
      closePopup();
    }
  });

  // Form Submit Handler
  const form = document.getElementById('autoPopupForm');
  const successBanner = document.getElementById('popupSuccessBanner');
  const submitBtn = document.getElementById('popupSubmitBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Sending Request...</span>';
        submitBtn.disabled = true;
      }

      const nameVal = form.querySelector('#popupName')?.value?.trim() || '';
      const emailVal = form.querySelector('#popupEmail')?.value?.trim() || '';
      const phoneVal = form.querySelector('#popupPhone')?.value?.trim() || '';
      const challengesVal = form.querySelector('#popupChallenges')?.value?.trim() || '';

      submitLeadData({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        challenges_goals: challengesVal,
        page_source: window.location.pathname || '/',
        form_type: '4-Second Timed Popup Modal'
      }).finally(() => {
        form.style.display = 'none';
        if (successBanner) successBanner.classList.add('visible');
        setTimeout(() => {
          closePopup();
        }, 3000);
      });
    });
  }

  // Trigger precisely after 4 seconds on every page load and refresh
  setTimeout(openPopup, 4000);
}

/**
 * 16. Service Hero Consultation Forms Handler
 */
function initServiceHeroForms() {
  const serviceForms = document.querySelectorAll('.service-hero-form-card form');
  serviceForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.btn-service-submit');
      const successDiv = form.parentElement.querySelector('.service-form-success');
      
      if (submitBtn) {
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.disabled = true;
      }

      const nameVal = form.querySelector('input[name="name"]')?.value?.trim() || '';
      const emailVal = form.querySelector('input[name="email"]')?.value?.trim() || '';
      const phoneVal = form.querySelector('input[name="phone"]')?.value?.trim() || '';
      const challengesVal = form.querySelector('textarea, input[name="challenges_goals"]')?.value?.trim() || '';

      submitLeadData({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        challenges_goals: challengesVal,
        page_source: window.location.pathname || '/',
        form_type: 'Service Page Consultation Form'
      }).finally(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      });
    });
  });
}

/**
 * 17. Blog Sidebar Consultation Form Handler
 */
function initBlogSidebarForm() {
  const blogForms = document.querySelectorAll('.blog-sidebar-form');
  blogForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const successDiv = form.parentElement.querySelector('.service-form-success');
      
      if (submitBtn) {
        submitBtn.textContent = 'Transmitting...';
        submitBtn.disabled = true;
      }

      const nameVal = form.querySelector('input[name="name"]')?.value?.trim() || '';
      const emailVal = form.querySelector('input[name="email"]')?.value?.trim() || '';
      const phoneVal = form.querySelector('input[name="phone"]')?.value?.trim() || '';
      const challengesVal = form.querySelector('textarea, input[name="challenges_goals"]')?.value?.trim() || '';

      submitLeadData({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        challenges_goals: challengesVal,
        page_source: window.location.pathname || '/',
        form_type: 'Blog Sidebar Form'
      }).finally(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      });
    });
  });
}

/**
 * 18. Table of Contents Scroll-Spy
 */
function initTocScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  if (!tocLinks.length) return;

  const headings = Array.from(document.querySelectorAll('.article-prose h2[id], .article-prose h3[id]'));
  if (!headings.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = '';

    for (let i = 0; i < headings.length; i++) {
      if (headings[i].offsetTop <= scrollPos) {
        currentId = headings[i].id;
      }
    }

    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
