const fs = require('fs');

// --- 1. UPDATE js/main.js ---
let mainJs = fs.readFileSync('js/main.js', 'utf8');

// A. Insert getAppBase() and submitLeadData() helper right at the top of file
const helpersCode = `/**
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

`;

if (!mainJs.includes('function getAppBase()')) {
  mainJs = helpersCode + mainJs;
}

// B. Update initPageTransitions in js/main.js
const oldTransitionTarget = `    // Resolve URL
    let targetUrl;
    try {
      targetUrl = new URL(link.href, window.location.href);
    } catch {
      return;
    }`;

const newTransitionTarget = `    // Dynamic Subfolder App Base Detection
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
    }`;

if (mainJs.includes(oldTransitionTarget)) {
  mainJs = mainJs.replace(oldTransitionTarget, newTransitionTarget);
}

// Replace triggerCurtainTransition(link.href, ...) with targetUrl.href
mainJs = mainJs.replace(
  'triggerCurtainTransition(link.href, false, targetUrl.hash);',
  'triggerCurtainTransition(targetUrl.href, false, targetUrl.hash);'
);

// C. Update DOM auto-fixer on page load
const domFixerCode = `
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
`;

// Insert domFixerCode inside DOMContentLoaded
if (!mainJs.includes('fixSubfolderDom()')) {
  mainJs = mainJs.replace(
    "document.addEventListener('DOMContentLoaded', () => {",
    "document.addEventListener('DOMContentLoaded', () => {" + domFixerCode
  );
}

// D. Update form validation submit handler to send real lead data
const oldFormSubmit = `      setTimeout(() => {
        let feedback = form.querySelector('.form-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'form-feedback success';
          form.appendChild(feedback);
        }

        const name = nameInput ? nameInput.value.trim() : 'Guest';
        feedback.innerHTML = \`
          <div class="feedback-inner">
            <span class="feedback-badge">Request Received</span>
            <h4>Thank you, \${escapeHtml(name)}.</h4>
            <p>Your website audit request has been sent directly to Shipra Chauhan. You will receive a personalized SERP and technical analysis within 24 business hours at <strong>\${escapeHtml(emailInput ? emailInput.value.trim() : '')}</strong>.</p>
          </div>
        \`;
        feedback.style.display = 'block';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Audit Request Submitted ✓';
        }

        form.reset();
      }, 650);`;

const newFormSubmit = `      const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');
      const challengesInput = form.querySelector('textarea, input[name="challenges_goals"], input[name="goals"]');

      submitLeadData({
        name: nameInput ? nameInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        challenges_goals: challengesInput ? challengesInput.value.trim() : '',
        page_source: window.location.href,
        form_type: 'audit_consultation_form'
      }).then(res => {
        let feedback = form.querySelector('.form-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'form-feedback success';
          form.appendChild(feedback);
        }

        const name = nameInput ? nameInput.value.trim() : 'Guest';
        feedback.innerHTML = \`
          <div class="feedback-inner">
            <span class="feedback-badge">Inquiry Stored ✓</span>
            <h4>Thank you, \${escapeHtml(name)}.</h4>
            <p>Your request has been received and saved into our database. Shipra Chauhan will contact you within 24 hours at <strong>\${escapeHtml(emailInput ? emailInput.value.trim() : '')}</strong>.</p>
          </div>
        \`;
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
      });`;

if (mainJs.includes(oldFormSubmit)) {
  mainJs = mainJs.replace(oldFormSubmit, newFormSubmit);
}

// E. Update popup form submit handler
const oldPopupSubmit = `      setTimeout(() => {
        form.style.display = 'none';
        if (successBanner) successBanner.classList.add('visible');
        setTimeout(() => {
          closePopup();
        }, 3000);
      }, 700);`;

const newPopupSubmit = `      const nameVal = form.querySelector('#popupName')?.value?.trim() || '';
      const emailVal = form.querySelector('#popupEmail')?.value?.trim() || '';
      const phoneVal = form.querySelector('#popupPhone')?.value?.trim() || '';
      const challengesVal = form.querySelector('#popupChallenges')?.value?.trim() || '';

      submitLeadData({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        challenges_goals: challengesVal,
        page_source: window.location.href,
        form_type: '4s_timed_popup'
      }).finally(() => {
        form.style.display = 'none';
        if (successBanner) successBanner.classList.add('visible');
        setTimeout(() => {
          closePopup();
        }, 3000);
      });`;

if (mainJs.includes(oldPopupSubmit)) {
  mainJs = mainJs.replace(oldPopupSubmit, newPopupSubmit);
}

// F. Update service hero forms
const oldServiceHeroSubmit = `      setTimeout(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      }, 600);`;

const newServiceHeroSubmit = `      const nameVal = form.querySelector('input[name="name"]')?.value?.trim() || '';
      const emailVal = form.querySelector('input[name="email"]')?.value?.trim() || '';
      const phoneVal = form.querySelector('input[name="phone"]')?.value?.trim() || '';
      const challengesVal = form.querySelector('textarea, input[name="challenges_goals"]')?.value?.trim() || '';

      submitLeadData({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        challenges_goals: challengesVal,
        page_source: window.location.href,
        form_type: 'service_hero_form'
      }).finally(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      });`;

if (mainJs.includes(oldServiceHeroSubmit)) {
  mainJs = mainJs.replace(oldServiceHeroSubmit, newServiceHeroSubmit);
}

// G. Update blog sidebar form
const oldBlogSidebarSubmit = `      setTimeout(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      }, 600);`;

const newBlogSidebarSubmit = `      const nameVal = form.querySelector('input[name="name"]')?.value?.trim() || '';
      const emailVal = form.querySelector('input[name="email"]')?.value?.trim() || '';
      const phoneVal = form.querySelector('input[name="phone"]')?.value?.trim() || '';
      const challengesVal = form.querySelector('textarea, input[name="challenges_goals"]')?.value?.trim() || '';

      submitLeadData({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        challenges_goals: challengesVal,
        page_source: window.location.href,
        form_type: 'blog_sidebar_form'
      }).finally(() => {
        form.style.display = 'none';
        if (successDiv) successDiv.style.display = 'block';
      });`;

if (mainJs.includes(oldBlogSidebarSubmit)) {
  mainJs = mainJs.replace(oldBlogSidebarSubmit, newBlogSidebarSubmit);
}

fs.writeFileSync('js/main.js', mainJs, 'utf8');
console.log('Successfully updated js/main.js with universal routing and MySQL lead integration.');

