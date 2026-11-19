const fs = require('fs');

const cssToAppend = `
/* =========================================================================
   Shipra Chauhan Luxury System Enhancements:
   Unified FAQ Accordions, Service Bento Grids, Metrics Strips & Cards
   ========================================================================= */

/* --- 1. Master Unified Luxury FAQ Accordion System --- */
.faq-list,
.faq-accordion,
.accordion {
  max-width: 960px;
  margin: 2.5rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item,
.accordion-item {
  background: #FFFFFF !important;
  border: 1.5px solid rgba(183, 154, 98, 0.28) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 18px -2px rgba(18, 60, 50, 0.05) !important;
  overflow: hidden !important;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
  margin-bottom: 0 !important;
}

.faq-item:hover,
.accordion-item:hover {
  border-color: rgba(183, 154, 98, 0.65) !important;
  box-shadow: 0 10px 28px -4px rgba(18, 60, 50, 0.09) !important;
  transform: translateY(-2px);
}

.faq-item.open,
.faq-item.active,
.accordion-item.open,
.accordion-item.active {
  border-color: #B79A62 !important;
  box-shadow: 0 14px 34px -4px rgba(18, 60, 50, 0.12) !important;
  background: #FFFFFF !important;
}

.faq-trigger,
.accordion-trigger,
.faq-question-btn {
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 1.25rem !important;
  padding: 1.35rem 1.6rem !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  cursor: pointer !important;
  text-align: left !important;
  font-family: var(--font-display, 'Playfair Display', Georgia, serif) !important;
  font-size: 1.08rem !important;
  font-weight: 700 !important;
  color: #142820 !important;
  line-height: 1.4 !important;
  transition: color 0.2s ease !important;
  margin: 0 !important;
}

.faq-trigger:hover,
.accordion-trigger:hover,
.faq-question-btn:hover,
.faq-item.open .faq-trigger,
.faq-item.active .faq-trigger,
.accordion-item.open .accordion-trigger,
.accordion-item.active .accordion-trigger {
  color: #123C32 !important;
}

.faq-icon-toggle,
.accordion-icon,
.faq-chevron {
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  border-radius: 50% !important;
  background: #F4EFE6 !important;
  border: 1.5px solid rgba(183, 154, 98, 0.45) !important;
  color: #123C32 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.faq-icon-toggle svg,
.accordion-icon svg,
.faq-chevron svg {
  width: 16px !important;
  height: 16px !important;
  stroke: currentColor !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.faq-item.open .faq-icon-toggle,
.faq-item.active .faq-icon-toggle,
.accordion-item.open .accordion-icon,
.accordion-item.active .accordion-icon,
.faq-item.open .faq-chevron,
.faq-item.active .faq-chevron {
  background: #123C32 !important;
  border-color: #123C32 !important;
  color: #FAF8F3 !important;
  transform: rotate(180deg) !important;
}

.faq-content,
.accordion-content,
.faq-answer {
  display: grid !important;
  grid-template-rows: 0fr !important;
  transition: grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  overflow: hidden !important;
}

.faq-item.open .faq-content,
.faq-item.active .faq-content,
.accordion-item.open .accordion-content,
.accordion-item.active .accordion-content,
.faq-item.open .faq-answer,
.faq-item.active .faq-answer {
  grid-template-rows: 1fr !important;
}

.faq-content-inner,
.accordion-inner,
.faq-answer-inner {
  overflow: hidden !important;
  min-height: 0 !important;
  padding: 0 1.6rem 1.45rem 1.6rem !important;
  font-family: var(--font-body, system-ui, -apple-system, sans-serif) !important;
  font-size: 0.98rem !important;
  font-weight: 450 !important;
  color: #3E443C !important;
  line-height: 1.75 !important;
}

.faq-content-inner p,
.accordion-inner p,
.faq-answer-inner p {
  margin: 0 0 0.85rem 0 !important;
}

.faq-content-inner p:last-child,
.accordion-inner p:last-child,
.faq-answer-inner p:last-child {
  margin-bottom: 0 !important;
}

/* --- 2. Luxury Service Metrics Strip --- */
.service-metrics-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 2.75rem 0 2rem;
  padding: 2rem;
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.35);
  border-radius: 20px;
  box-shadow: 0 12px 32px -4px rgba(18, 60, 50, 0.07);
}

.service-metric-item {
  display: flex;
  flex-direction: column;
  position: relative;
}

.service-metric-item:not(:last-child)::after {
  content: "";
  position: absolute;
  right: -0.75rem;
  top: 15%;
  height: 70%;
  width: 1px;
  background: rgba(183, 154, 98, 0.25);
}

.metric-number {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 2.2rem;
  font-weight: 800;
  color: #123C32;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.metric-label {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #B79A62;
  margin-top: 0.4rem;
}

.metric-subtext {
  font-size: 0.85rem;
  color: #555E54;
  margin-top: 0.35rem;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .service-metrics-strip {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem 1.5rem;
  }
  .service-metric-item:not(:last-child)::after {
    display: none;
  }
}

@media (max-width: 540px) {
  .service-metrics-strip {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
}

/* --- 3. Capabilities Matrix Grid --- */
.capabilities-matrix-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.capability-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.25);
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 8px 24px -2px rgba(18, 60, 50, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.capability-card:hover {
  border-color: #B79A62;
  transform: translateY(-4px);
  box-shadow: 0 16px 36px -4px rgba(18, 60, 50, 0.1);
}

.capability-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #F4EFE6;
  border: 1px solid rgba(183, 154, 98, 0.4);
  color: #123C32;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.capability-icon-box svg {
  width: 24px;
  height: 24px;
}

.capability-title {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.22rem;
  font-weight: 700;
  color: #142820;
  margin-bottom: 0.65rem;
}

.capability-desc {
  font-size: 0.94rem;
  line-height: 1.65;
  color: #4A5248;
  flex-grow: 1;
}

.capability-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(183, 154, 98, 0.3);
}

.capability-tag {
  font-size: 0.74rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  background: #FAF8F3;
  color: #123C32;
  border: 1px solid rgba(18, 60, 50, 0.15);
  border-radius: 100px;
}

@media (max-width: 960px) {
  .capabilities-matrix-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .capabilities-matrix-grid {
    grid-template-columns: 1fr;
  }
}

/* --- 4. Service Case Study / Proof Matrix --- */
.service-case-study-card {
  background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F3 100%);
  border: 1.5px solid rgba(183, 154, 98, 0.38);
  border-radius: 22px;
  padding: 2.75rem;
  margin: 3rem 0;
  box-shadow: 0 16px 40px -8px rgba(18, 60, 50, 0.08);
}

.case-study-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  background: #E8F2EC;
  color: #123C32;
  border: 1px solid rgba(29, 91, 73, 0.3);
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.case-study-title {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.7rem;
  font-weight: 700;
  color: #123C32;
  line-height: 1.3;
  margin-bottom: 1.2rem;
}

.case-study-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2.5rem;
  margin-top: 1.5rem;
}

.case-study-metric-card {
  background: #FFFFFF;
  border: 1px solid rgba(183, 154, 98, 0.3);
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
}

.case-study-metric-value {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.85rem;
  font-weight: 800;
  color: #123C32;
  line-height: 1.1;
}

.case-study-metric-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #B79A62;
  text-transform: uppercase;
  margin-top: 0.35rem;
}

@media (max-width: 860px) {
  .case-study-grid {
    grid-template-columns: 1fr;
  }
}

/* --- 5. Comparison Grid --- */
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2.5rem 0;
}

.comparison-card {
  border-radius: 20px;
  padding: 2.5rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.comparison-agency {
  background: #FCF8F7;
  border: 1.5px solid rgba(220, 38, 38, 0.25);
  box-shadow: 0 8px 24px -2px rgba(220, 38, 38, 0.05);
}

.comparison-shipra {
  background: linear-gradient(135deg, #FFFFFF 0%, #F5F1E8 100%);
  border: 1.5px solid #B79A62;
  box-shadow: 0 16px 36px -4px rgba(18, 60, 50, 0.12);
}

.comparison-header {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.comparison-agency .comparison-header {
  color: #991B1B;
}

.comparison-shipra .comparison-header {
  color: #123C32;
}

.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.comparison-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: #374151;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

/* --- 6. Deliverables Checklist Grid --- */
.deliverables-checklist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin: 2.25rem 0;
}

.deliverable-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: #FFFFFF;
  border: 1px solid rgba(183, 154, 98, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 16px -2px rgba(18, 60, 50, 0.04);
}

.deliverable-icon {
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 50%;
  background: #E8F2EC;
  color: #123C32;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deliverable-icon svg {
  width: 16px;
  height: 16px;
}

.deliverable-text h4 {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: #142820;
  margin-bottom: 0.3rem;
}

.deliverable-text p {
  font-size: 0.9rem;
  color: #555E54;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .deliverables-checklist-grid {
    grid-template-columns: 1fr;
  }
}

/* --- 7. Modern Blog Listing & Cards --- */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3.5rem;
  align-items: flex-start;
}

.blog-grid {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.blog-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.28);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px -2px rgba(18, 60, 50, 0.06);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  border-color: #B79A62;
  transform: translateY(-4px);
  box-shadow: 0 18px 42px -6px rgba(18, 60, 50, 0.12);
}

.blog-image-box {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
  background: #FAF8F3;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-card:hover .blog-image {
  transform: scale(1.05);
}

.blog-content {
  padding: 2rem 2.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blog-meta-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: #7A8277;
  margin-bottom: 0.85rem;
}

.blog-category-tag {
  display: inline-flex;
  padding: 0.2rem 0.65rem;
  background: #F4EFE6;
  color: #123C32;
  border: 1px solid rgba(183, 154, 98, 0.35);
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.blog-card-title {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.35;
  color: #123C32;
  margin-bottom: 0.85rem;
}

.blog-card-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.blog-card-title a:hover {
  color: #B79A62;
}

.blog-card-excerpt {
  font-size: 0.96rem;
  color: #4A5248;
  line-height: 1.65;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.blog-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px dashed rgba(183, 154, 98, 0.3);
}

.blog-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.92rem;
  color: #123C32;
  text-decoration: none;
  transition: gap 0.2s ease, color 0.2s ease;
}

.blog-read-btn:hover {
  color: #B79A62;
  gap: 0.85rem;
}

/* Blog Sidebar */
.blog-sidebar-box {
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.28);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px -2px rgba(18, 60, 50, 0.05);
  margin-bottom: 2rem;
}

.blog-sidebar-title {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #123C32;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(183, 154, 98, 0.3);
}

.blog-sidebar-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.blog-sidebar-links li a {
  display: block;
  font-size: 0.94rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  line-height: 1.45;
  transition: color 0.2s ease, transform 0.2s ease;
}

.blog-sidebar-links li a:hover {
  color: #123C32;
  transform: translateX(4px);
}

.blog-advisory-card {
  background: linear-gradient(135deg, #123C32 0%, #1D5B49 100%);
  border: 1.5px solid #B79A62;
  border-radius: 20px;
  padding: 2.25rem 2rem;
  color: #FAF8F3;
  box-shadow: 0 16px 36px -4px rgba(18, 60, 50, 0.2);
}

.blog-advisory-card h4 {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
}

.blog-advisory-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(250, 248, 243, 0.85);
  margin-bottom: 1.5rem;
}

@media (max-width: 992px) {
  .blog-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* --- 8. Modern Contact Page Bento Layout --- */
.contact-bento-hero {
  display: grid;
  grid-template-columns: 1.05fr 1.25fr;
  gap: 3rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.contact-info-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.28);
  border-radius: 18px;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 6px 20px -2px rgba(18, 60, 50, 0.05);
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  transition: all 0.25s ease;
}

.contact-info-card:hover {
  border-color: #B79A62;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -4px rgba(18, 60, 50, 0.09);
}

.contact-info-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 12px;
  background: #F4EFE6;
  border: 1px solid rgba(183, 154, 98, 0.4);
  color: #123C32;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info-icon svg {
  width: 22px;
  height: 22px;
}

.contact-info-text .info-title {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: #142820;
  margin-bottom: 0.35rem;
}

.contact-info-text .info-detail {
  font-size: 0.92rem;
  color: #4A5248;
  line-height: 1.55;
}

.contact-info-text a {
  color: #123C32;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-info-text a:hover {
  color: #B79A62;
  text-decoration: underline;
}

.contact-methodology-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.methodology-step-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(183, 154, 98, 0.25);
  border-radius: 18px;
  padding: 2.25rem 2rem;
  box-shadow: 0 8px 24px -2px rgba(18, 60, 50, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.methodology-step-card:hover {
  border-color: #B79A62;
  transform: translateY(-4px);
  box-shadow: 0 16px 36px -4px rgba(18, 60, 50, 0.1);
}

.step-num-pill {
  display: inline-flex;
  padding: 0.3rem 0.8rem;
  background: #F4EFE6;
  color: #123C32;
  border: 1px solid rgba(183, 154, 98, 0.4);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  align-self: flex-start;
}

.methodology-step-card h3 {
  font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #142820;
  margin-bottom: 0.75rem;
}

.methodology-step-card p {
  font-size: 0.94rem;
  line-height: 1.65;
  color: #4A5248;
  margin: 0;
}

@media (max-width: 960px) {
  .contact-bento-hero {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .contact-methodology-grid {
    grid-template-columns: 1fr;
  }
}
`;

fs.appendFileSync('css/style.css', '\n' + cssToAppend);
console.log('Appended luxury styles to css/style.css successfully!');

