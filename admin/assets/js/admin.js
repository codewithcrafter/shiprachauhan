/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — ADMIN JAVASCRIPT ENGINE
 * Handles Live SERP Previews, Markdown & Rich Text Editors, Drag & Drop Images,
 * Dynamic FAQ Repeaters, and Schema Generation.
 */

document.addEventListener('DOMContentLoaded', function () {
  initSlugGenerator();
  initCategoryOtherToggle();
  initTagsPills();
  initImageDropzone();
  initSerpPreview();
  initSchemaToggle();
  initMarkdownAndRichEditor();
  initTableTools();
  initFaqRepeater();
});

// -----------------------------------------------------------------------------
// 1. Live Slug Generator
// -----------------------------------------------------------------------------
function initSlugGenerator() {
  const titleInput = document.getElementById('articleTitle');
  const slugInput = document.getElementById('customSlug');
  const slugLockBtn = document.getElementById('slugLockBtn');

  if (!titleInput || !slugInput) return;

  let isLocked = true;

  if (slugLockBtn) {
    slugLockBtn.addEventListener('click', function () {
      isLocked = !isLocked;
      slugInput.readOnly = isLocked;
      slugLockBtn.textContent = isLocked ? '🔒 Auto' : '🔓 Manual';
      slugLockBtn.style.color = isLocked ? '#64748B' : '#B79A62';
    });
  }

  titleInput.addEventListener('input', function () {
    if (isLocked && (!slugInput.dataset.manual || slugInput.value === '')) {
      const slug = titleInput.value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      slugInput.value = slug;
      updateSerpUrl(slug);
    }
  });

  slugInput.addEventListener('input', function () {
    slugInput.dataset.manual = 'true';
    updateSerpUrl(slugInput.value);
  });
}

function updateSerpUrl(slug) {
  const serpUrlEl = document.getElementById('serpPreviewUrl');
  if (serpUrlEl) {
    serpUrlEl.textContent = `https://shiprachauhan.in/blogs/${slug || 'your-article-slug'}`;
  }
}

// -----------------------------------------------------------------------------
// 1b. Category "Other" Custom Input Toggle
// -----------------------------------------------------------------------------
function initCategoryOtherToggle() {
  const catSelect = document.getElementById('articleCategory');
  const customBox = document.getElementById('customCategoryBox');
  const customInput = document.getElementById('customCategoryInput');

  if (!catSelect || !customBox) return;

  function checkCategory() {
    if (catSelect.value === 'Other') {
      customBox.style.display = 'block';
      if (customInput) customInput.focus();
    } else {
      customBox.style.display = 'none';
    }
  }

  catSelect.addEventListener('change', checkCategory);
  checkCategory();
}

// -----------------------------------------------------------------------------
// 2. Tags Live Pills
// -----------------------------------------------------------------------------
function initTagsPills() {
  const tagsInput = document.getElementById('articleTags');
  const tagsPreview = document.getElementById('tagsPillsPreview');
  if (!tagsInput || !tagsPreview) return;

  function renderTags() {
    const raw = tagsInput.value.trim();
    if (!raw) {
      tagsPreview.innerHTML = '<span style="font-size: 0.8rem; color: #94A3B8;">No tags added yet.</span>';
      return;
    }
    const tags = raw.split(',').map(t => t.trim()).filter(Boolean);
    tagsPreview.innerHTML = tags.map(t => `<span class="badge-category">#${t.replace(/^#/, '')}</span>`).join(' ');
  }

  tagsInput.addEventListener('input', renderTags);
  renderTags();
}

// -----------------------------------------------------------------------------
// 3. Featured Image Drag & Drop Uploader
// -----------------------------------------------------------------------------
function initImageDropzone() {
  const dropzone = document.getElementById('imageDropzone');
  const fileInput = document.getElementById('featuredImageInput');
  const previewBox = document.getElementById('imagePreviewBox');
  const previewImg = document.getElementById('imagePreviewEl');
  const removeBtn = document.getElementById('removeImageBtn');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '#B79A62';
      dropzone.style.backgroundColor = 'rgba(183, 154, 98, 0.08)';
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '#CBD5E1';
      dropzone.style.backgroundColor = '#F8FAFC';
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileInput.files = e.dataTransfer.files;
      handleFile(fileInput.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      handleFile(fileInput.files[0]);
    }
  });

  function handleFile(file) {
    if (!file.type.match('image.*')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      if (previewImg) previewImg.src = e.target.result;
      if (previewBox) previewBox.style.display = 'block';
      dropzone.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.value = '';
      if (previewBox) previewBox.style.display = 'none';
      dropzone.style.display = 'block';
      const existingHidden = document.getElementById('existingFeaturedImage');
      if (existingHidden) existingHidden.value = '';
    });
  }
}

// -----------------------------------------------------------------------------
// 4. Live SERP Preview & Character Counters
// -----------------------------------------------------------------------------
function initSerpPreview() {
  const seoTitle = document.getElementById('seoTitle');
  const articleTitle = document.getElementById('articleTitle');
  const metaDesc = document.getElementById('metaDescription');
  const excerpt = document.getElementById('shortExcerpt');

  const serpTitleEl = document.getElementById('serpPreviewTitle');
  const serpDescEl = document.getElementById('serpPreviewDesc');

  const seoTitleCount = document.getElementById('seoTitleCount');
  const metaDescCount = document.getElementById('metaDescCount');
  const excerptCount = document.getElementById('excerptCount');

  function update() {
    // Title
    const titleVal = (seoTitle && seoTitle.value) ? seoTitle.value : (articleTitle ? articleTitle.value : 'Article Title');
    if (serpTitleEl) serpTitleEl.textContent = titleVal ? `${titleVal} | Shipra Chauhan` : 'Title Preview — Shipra Chauhan';
    if (seoTitleCount) seoTitleCount.textContent = `${(seoTitle ? seoTitle.value.length : 0)} / 60 characters`;

    // Description
    const descVal = (metaDesc && metaDesc.value) ? metaDesc.value : (excerpt ? excerpt.value : 'Meta description snippet will appear here in Google search results.');
    if (serpDescEl) serpDescEl.textContent = descVal;
    if (metaDescCount) metaDescCount.textContent = `${(metaDesc ? metaDesc.value.length : 0)} / 160 characters`;
    if (excerptCount && excerpt) excerptCount.textContent = `${excerpt.value.length} characters`;
  }

  [seoTitle, articleTitle, metaDesc, excerpt].forEach(el => {
    if (el) el.addEventListener('input', update);
  });
  update();
}

// -----------------------------------------------------------------------------
// 5. Schema Toggle (Automatic vs Custom JSON-LD)
// -----------------------------------------------------------------------------
function initSchemaToggle() {
  const radioAuto = document.getElementById('schemaAuto');
  const radioCustom = document.getElementById('schemaCustom');
  const customBox = document.getElementById('customSchemaBox');

  if (!radioAuto || !radioCustom || !customBox) return;

  function toggle() {
    if (radioCustom.checked) {
      customBox.style.display = 'block';
    } else {
      customBox.style.display = 'none';
    }
  }

  radioAuto.addEventListener('change', toggle);
  radioCustom.addEventListener('change', toggle);
  toggle();
}

// -----------------------------------------------------------------------------
// 6. Markdown & Rich Text Workspace with Word Counter & .md Upload
// -----------------------------------------------------------------------------
function initMarkdownAndRichEditor() {
  const mdTextarea = document.getElementById('markdownContent');
  const richEditor = document.getElementById('richEditorContent');
  const hiddenBody = document.getElementById('bodyContentInput');
  const wordCountTag = document.getElementById('editorWordCount');
  const mdFileInput = document.getElementById('mdFileInput');

  // Tabs
  const tabWrite = document.getElementById('tabWrite');
  const tabPreview = document.getElementById('tabPreview');
  const tabSplit = document.getElementById('tabSplit');
  const mdPane = document.getElementById('markdownPane');
  const previewPane = document.getElementById('previewPane');

  // Simple Markdown to HTML Parser with Table Support
  function parseMd(md) {
    if (!md) return '';

    // Parse Markdown Tables
    md = md.replace(/(?:^|\n)((?:\|.+?\|\r?\n)+)/g, function (match, tableBlock) {
      const lines = tableBlock.trim().split(/\r?\n/).filter(line => line.includes('|'));
      if (lines.length < 2) return match;

      const parseRow = (line) => line.split('|').slice(1, -1).map(c => c.trim());
      const headers = parseRow(lines[0]);
      
      const isSeparator = /^\|?[\s:-|-]+\|?$/.test(lines[1]);
      const startIndex = isSeparator ? 2 : 1;

      let tableHtml = '<div class="table-responsive"><table class="article-table"><thead><tr>';
      headers.forEach(h => {
        tableHtml += `<th>${h}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      for (let i = startIndex; i < lines.length; i++) {
        const row = parseRow(lines[i]);
        tableHtml += '<tr>';
        row.forEach(cell => {
          tableHtml += `<td>${cell}</td>`;
        });
        tableHtml += '</tr>';
      }
      tableHtml += '</tbody></table></div>\n';
      return '\n' + tableHtml + '\n';
    });

    let html = md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>');
    return '<p>' + html + '</p>';
  }

  function updateCounters(text) {
    const raw = text.replace(/<[^>]+>/g, ' ').trim();
    const words = raw ? raw.split(/\s+/).length : 0;
    const chars = raw.length;
    if (wordCountTag) {
      wordCountTag.textContent = `${words} words • ${chars} characters`;
    }
  }

  // Two-way synchronization
  if (mdTextarea && richEditor && hiddenBody) {
    mdTextarea.addEventListener('input', function () {
      const parsed = parseMd(mdTextarea.value);
      richEditor.innerHTML = parsed;
      hiddenBody.value = parsed;
      updateCounters(mdTextarea.value);
    });

    richEditor.addEventListener('input', function () {
      hiddenBody.value = richEditor.innerHTML;
      updateCounters(richEditor.innerText);
    });

    // Initial counter
    updateCounters(mdTextarea.value || richEditor.innerText || '');
  }

  // Tab Switching
  if (tabWrite && tabPreview && tabSplit && mdPane && previewPane) {
    tabWrite.addEventListener('click', () => {
      setActiveTab(tabWrite);
      mdPane.style.display = 'block';
      mdPane.style.width = '100%';
      previewPane.style.display = 'none';
    });

    tabPreview.addEventListener('click', () => {
      setActiveTab(tabPreview);
      mdPane.style.display = 'none';
      previewPane.style.display = 'block';
      previewPane.style.width = '100%';
    });

    tabSplit.addEventListener('click', () => {
      setActiveTab(tabSplit);
      mdPane.style.display = 'block';
      mdPane.style.width = '50%';
      previewPane.style.display = 'block';
      previewPane.style.width = '50%';
    });

    function setActiveTab(btn) {
      [tabWrite, tabPreview, tabSplit].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  }

  // Upload .md file
  if (mdFileInput && mdTextarea) {
    mdFileInput.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          mdTextarea.value = e.target.result;
          mdTextarea.dispatchEvent(new Event('input'));
        };
        reader.readAsText(file);
      }
    });
  }

  // WYSIWYG Formatting Buttons
  const formatButtons = document.querySelectorAll('[data-format-cmd]');
  formatButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const cmd = this.getAttribute('data-format-cmd');
      const val = this.getAttribute('data-format-val') || null;

      if (cmd === 'createLink') {
        const url = prompt('Enter URL:');
        if (url) document.execCommand(cmd, false, url);
      } else {
        document.execCommand(cmd, false, val);
      }
      if (richEditor && hiddenBody) {
        hiddenBody.value = richEditor.innerHTML;
        updateCounters(richEditor.innerText);
      }
    });
  });
}

// -----------------------------------------------------------------------------
// 6b. Interactive Table Tools (WYSIWYG & Markdown)
// -----------------------------------------------------------------------------
function initTableTools() {
  const btnInsertTable = document.getElementById('btnInsertTable');
  const btnAddRow = document.getElementById('btnAddTableRow');
  const btnAddCol = document.getElementById('btnAddTableCol');
  const btnDeleteTable = document.getElementById('btnDeleteTable');
  const btnInsertMdTable = document.getElementById('btnInsertMdTable');

  const richEditor = document.getElementById('richEditorContent');
  const hiddenBody = document.getElementById('bodyContentInput');
  const mdTextarea = document.getElementById('markdownContent');

  function syncEditor() {
    if (richEditor && hiddenBody) {
      hiddenBody.value = richEditor.innerHTML;
      richEditor.dispatchEvent(new Event('input'));
    }
  }

  function getActiveTable() {
    if (!richEditor) return null;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      let node = sel.getRangeAt(0).commonAncestorContainer;
      while (node && node !== richEditor) {
        if (node.nodeName === 'TABLE') return node;
        node = node.parentNode;
      }
    }
    // Fallback to the last table in rich editor
    const tables = richEditor.querySelectorAll('table');
    return tables.length > 0 ? tables[tables.length - 1] : null;
  }

  // 1. Insert WYSIWYG Table
  if (btnInsertTable && richEditor) {
    btnInsertTable.addEventListener('click', function (e) {
      e.preventDefault();
      const colsPrompt = prompt('Enter number of columns (1-10):', '3');
      if (colsPrompt === null) return;
      const cols = Math.max(1, Math.min(10, parseInt(colsPrompt) || 3));

      const rowsPrompt = prompt('Enter number of data rows (1-25):', '3');
      if (rowsPrompt === null) return;
      const rows = Math.max(1, Math.min(25, parseInt(rowsPrompt) || 3));

      let tableHtml = '<div class="table-responsive"><table class="article-table"><thead><tr>';
      for (let c = 1; c <= cols; c++) {
        tableHtml += `<th>Header ${c}</th>`;
      }
      tableHtml += '</tr></thead><tbody>';
      for (let r = 1; r <= rows; r++) {
        tableHtml += '<tr>';
        for (let c = 1; c <= cols; c++) {
          tableHtml += `<td>Cell ${r}.${c}</td>`;
        }
        tableHtml += '</tr>';
      }
      tableHtml += '</tbody></table></div><p><br></p>';

      richEditor.focus();
      try {
        if (!document.execCommand('insertHTML', false, tableHtml)) {
          richEditor.insertAdjacentHTML('beforeend', tableHtml);
        }
      } catch (err) {
        richEditor.insertAdjacentHTML('beforeend', tableHtml);
      }
      syncEditor();
    });
  }

  // 2. Add Row to Table
  if (btnAddRow && richEditor) {
    btnAddRow.addEventListener('click', function (e) {
      e.preventDefault();
      const table = getActiveTable();
      if (!table) {
        alert('Please click inside a table to add a row, or insert a table first.');
        return;
      }
      let tbody = table.querySelector('tbody');
      if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
      }
      const colCount = (table.querySelector('thead tr') ? table.querySelectorAll('thead tr th').length : 0) ||
                       (tbody.querySelector('tr') ? tbody.querySelector('tr').children.length : 3);

      const tr = document.createElement('tr');
      for (let i = 0; i < colCount; i++) {
        const td = document.createElement('td');
        td.textContent = 'New Data';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      syncEditor();
    });
  }

  // 3. Add Column to Table
  if (btnAddCol && richEditor) {
    btnAddCol.addEventListener('click', function (e) {
      e.preventDefault();
      const table = getActiveTable();
      if (!table) {
        alert('Please click inside a table to add a column, or insert a table first.');
        return;
      }
      const theadTr = table.querySelector('thead tr');
      if (theadTr) {
        const th = document.createElement('th');
        th.textContent = `Header ${theadTr.children.length + 1}`;
        theadTr.appendChild(th);
      }
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(tr => {
        const td = document.createElement('td');
        td.textContent = 'New Cell';
        tr.appendChild(td);
      });
      syncEditor();
    });
  }

  // 4. Delete Table
  if (btnDeleteTable && richEditor) {
    btnDeleteTable.addEventListener('click', function (e) {
      e.preventDefault();
      const table = getActiveTable();
      if (!table) {
        alert('Please click inside the table you wish to delete.');
        return;
      }
      if (confirm('Are you sure you want to delete this table?')) {
        const wrapper = table.closest('.table-responsive');
        if (wrapper) {
          wrapper.remove();
        } else {
          table.remove();
        }
        syncEditor();
      }
    });
  }

  // 5. Insert Markdown Table Template
  if (btnInsertMdTable && mdTextarea) {
    btnInsertMdTable.addEventListener('click', function (e) {
      e.preventDefault();
      const template = '\n\n| Feature / Metric | Description | Value / Impact |\n| :--- | :--- | :--- |\n| Core Architecture | Clean URL structures & schema | High Priority |\n| Search Performance | Fast loading & AI readiness | 95+ Score |\n\n';

      const start = mdTextarea.selectionStart || 0;
      const end = mdTextarea.selectionEnd || 0;
      const val = mdTextarea.value;
      mdTextarea.value = val.substring(0, start) + template + val.substring(end);
      mdTextarea.selectionStart = mdTextarea.selectionEnd = start + template.length;
      mdTextarea.focus();
      mdTextarea.dispatchEvent(new Event('input'));
    });
  }
}

// -----------------------------------------------------------------------------
// 7. Dynamic FAQ Repeater
// -----------------------------------------------------------------------------
function initFaqRepeater() {
  const container = document.getElementById('faqRepeaterContainer');
  const addBtn = document.getElementById('addFaqBtn');
  const hiddenJson = document.getElementById('faqsJsonInput');
  const emptyState = document.getElementById('faqEmptyState');

  if (!container || !addBtn || !hiddenJson) return;

  let faqs = [];
  try {
    if (hiddenJson.value) {
      faqs = JSON.parse(hiddenJson.value);
    }
  } catch (e) {
    faqs = [];
  }

  function renderFaqs() {
    container.innerHTML = '';
    if (faqs.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      hiddenJson.value = '[]';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    faqs.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'faq-repeater-item';
      card.innerHTML = `
        <div class="faq-repeater-header">
          <span class="faq-num-pill">FAQ #${index + 1}</span>
          <button type="button" class="faq-btn-remove" data-index="${index}">✕ Remove</button>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <input type="text" class="admin-input faq-question-input" placeholder="Question *" value="${escapeHtml(item.question || '')}" required>
        </div>
        <div class="form-group">
          <textarea class="admin-textarea faq-answer-input" placeholder="Answer *" rows="3" required>${escapeHtml(item.answer || '')}</textarea>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach listeners
    container.querySelectorAll('.faq-btn-remove').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-index'));
        faqs.splice(idx, 1);
        renderFaqs();
      });
    });

    container.querySelectorAll('.faq-question-input').forEach((inp, idx) => {
      inp.addEventListener('input', function () {
        faqs[idx].question = this.value;
        syncJson();
      });
    });

    container.querySelectorAll('.faq-answer-input').forEach((inp, idx) => {
      inp.addEventListener('input', function () {
        faqs[idx].answer = this.value;
        syncJson();
      });
    });

    syncJson();
  }

  function syncJson() {
    hiddenJson.value = JSON.stringify(faqs);
  }

  addBtn.addEventListener('click', function () {
    faqs.push({ question: '', answer: '' });
    renderFaqs();
  });

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  renderFaqs();
}

