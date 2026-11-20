const fs = require('fs');

let js = fs.readFileSync('js/main.js', 'utf8');

// Replace init call at line 50
js = js.replace(/init3SecondAutoPopup\(\);/g, 'init4SecondAutoPopup();');

// Replace definition
const oldDef = `function init3SecondAutoPopup() {
  // Never fire popup on contact page (user is already on the inquiry form)
  if (window.location.pathname.includes('contact') || document.getElementById('mainContactForm') || document.querySelector('.contact-info, .contact-bento-hero')) {
    return;
  }
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
}`;

const newDef = `function init4SecondAutoPopup() {
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

      setTimeout(() => {
        form.style.display = 'none';
        if (successBanner) successBanner.classList.add('visible');
        setTimeout(() => {
          closePopup();
        }, 3000);
      }, 700);
    });
  }

  // Trigger precisely after 4 seconds on every page load and refresh
  setTimeout(openPopup, 4000);
}`;

if (js.includes('function init3SecondAutoPopup()')) {
  js = js.replace(oldDef, newDef);
  fs.writeFileSync('js/main.js', js, 'utf8');
  console.log('Successfully updated popup in js/main.js to 4-second delay on every page and refresh.');
} else {
  console.log('Function definition not matched exactly, checking diff...');
}

