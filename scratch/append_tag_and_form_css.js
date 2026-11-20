const fs = require('fs');

const cssToAppend = `

/* ==============================================================================
   ARTICLE TAGS HORIZONTAL STRIP (ABOVE BLOG TITLE)
   ============================================================================== */
.article-tags-horizontal-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-bottom: 1.25rem;
  padding: 0.35rem 0;
}

.tags-pill-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-emerald, #123C32);
  background: rgba(183, 154, 98, 0.16);
  border: 1px solid rgba(183, 154, 98, 0.38);
  padding: 0.32rem 0.7rem;
  border-radius: 6px;
}

.tags-pill-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.55rem;
}

.tags-pill-list .article-tag {
  display: inline-block;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--color-emerald, #123C32);
  background: #FFFFFF;
  border: 1px solid rgba(18, 60, 50, 0.15);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(18, 60, 50, 0.04);
}

.tags-pill-list .article-tag:hover {
  background: var(--color-emerald, #123C32);
  color: #FFFFFF;
  border-color: var(--color-emerald, #123C32);
  transform: translateY(-1px);
}

/* Service Hero Showcase Fallback & Presentation */
.service-hero-showcase {
  position: relative;
  min-height: 220px;
  background: linear-gradient(135deg, rgba(18, 60, 50, 0.04) 0%, rgba(183, 154, 98, 0.08) 100%);
  border: 1.5px solid rgba(183, 154, 98, 0.28);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px -4px rgba(18, 60, 50, 0.08);
}

.service-hero-showcase img {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  display: block;
  border-radius: 18px;
}

/* Unified Form Controls Across All Platform Forms */
.form-input,
.form-control,
.form-textarea {
  width: 100% !important;
  box-sizing: border-box !important;
  border: 1.5px solid rgba(18, 60, 50, 0.16) !important;
  border-radius: 10px !important;
  font-size: 0.95rem !important;
  color: var(--color-emerald, #123C32) !important;
  background: #FFFFFF !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}

.form-input:focus,
.form-control:focus,
.form-textarea:focus {
  outline: none !important;
  border-color: var(--color-gold, #B79A62) !important;
  box-shadow: 0 0 0 3px rgba(183, 154, 98, 0.2) !important;
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}
`;

fs.appendFileSync('css/style.css', cssToAppend, 'utf8');
console.log('Appended styles to css/style.css successfully.');

