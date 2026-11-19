const fs = require('fs');

let js = fs.readFileSync('js/main.js', 'utf8');

const targetFunc = `/**
 * 7. Mobile Navigation Drawer & Submenu Accordion
 */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownParents = document.querySelectorAll('.nav-item-dropdown');

  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  dropdownParents.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        item.classList.toggle('mobile-open');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}`;

const replacementFunc = `/**
 * 7. Mobile Navigation Drawer & Submenu Accordion
 */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle, .mobile-toggle');
  const navMenu = document.querySelector('.site-header-full .nav-menu, .nav-menu');
  const dropdownParents = document.querySelectorAll('.nav-dropdown, .nav-item-dropdown');

  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    navMenu.classList.toggle('active', isOpen);
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  dropdownParents.forEach(item => {
    const link = item.querySelector('.nav-link, a');
    if (!link) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        e.stopPropagation();
        item.classList.toggle('open');
        item.classList.toggle('mobile-open');
      }
    });
  });

  // Close when clicking nav links
  navMenu.querySelectorAll('a:not(.nav-dropdown > a)').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navMenu.classList.remove('active', 'open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (navMenu.classList.contains('active') || navMenu.classList.contains('open'))) {
      toggle.classList.remove('active');
      navMenu.classList.remove('active', 'open');
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if ((navMenu.classList.contains('active') || navMenu.classList.contains('open')) &&
        !navMenu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      navMenu.classList.remove('active', 'open');
    }
  });
}`;

if (js.includes(targetFunc)) {
  js = js.replace(targetFunc, replacementFunc);
  fs.writeFileSync('js/main.js', js, 'utf8');
  console.log('✓ Successfully updated initMobileNav in js/main.js');
} else {
  console.log('Target function not found directly, finding boundaries...');
  const startIdx = js.indexOf('function initMobileNav()');
  const endIdx = js.indexOf('function initFaqAccordions()', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    js = js.substring(0, startIdx) + replacementFunc.substring(replacementFunc.indexOf('function initMobileNav()')) + '\n\n' + js.substring(endIdx);
    fs.writeFileSync('js/main.js', js, 'utf8');
    console.log('✓ Successfully replaced initMobileNav by boundary in js/main.js');
  }
}

