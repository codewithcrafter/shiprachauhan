const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'js', 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');

const functionsToAdd = `

/**
 * 14. Strict Clean URL Trailing Slash Cleaner (No trailing slash in address bar)
 */
function initCleanUrlTrailingSlash() {
  if (window.location.protocol.startsWith('http')) {
    const path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      const clean = path.replace(/\\/+$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  }
}

/**
 * 15. 3-Second Timed Kinetic Lead Pop-Up Modal (Session-Aware Dismissal)
 */
function init3SecondAutoPopup() {
  const popupOverlay = document.getElementById('autoPopupOverlay');
  if (!popupOverlay) return;

  const openPopup = () => {
    if (sessionStorage.getItem('shipra_lead_popup_dismissed') === 'true') return;
    popupOverlay.classList.add('open');
    popupOverlay.setAttribute('aria-hidden', 'false');
    const firstInput = popupOverlay.querySelector('#popupName');
    if (firstInput) setTimeout(() => firstInput.focus(), 300);
  };

  const closePopup = () => {
    popupOverlay.classList.remove('open');
    popupOverlay.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('shipra_lead_popup_dismissed', 'true');
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

      setTimeout(() => {
        form.style.display = 'none';
        if (successBanner) successBanner.classList.add('visible');
        setTimeout(() => {
          closePopup();
        }, 3000);
      }, 700);
    });
  }

  // Trigger precisely after 3 seconds if not already dismissed
  if (!sessionStorage.getItem('shipra_lead_popup_dismissed')) {
    setTimeout(openPopup, 3000);
  }
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

      setTimeout(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      }, 600);
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

      setTimeout(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      }, 600);
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
`;

// Insert calls into DOMContentLoaded
if (!js.includes('init3SecondAutoPopup();')) {
  js = js.replace(
    'initLiveDelhiTime();',
    `initLiveDelhiTime();
  initCleanUrlTrailingSlash();
  init3SecondAutoPopup();
  initServiceHeroForms();
  initBlogSidebarForm();
  initTocScrollSpy();`
  );

  js += functionsToAdd;
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('Appended advanced functions to js/main.js successfully.');
} else {
  console.log('Functions already present in js/main.js.');
}

