<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — COMPOSE NEW ARTICLE
 */
require_once dirname(__DIR__) . '/config/auth.php';
requireAdminAuth();

$pdo = getDbConnection();
$appBase = getAppBaseUrl();
$adminBase = getAdminBaseUrl();
$error = null;
$success = null;

// Preset categories
$categories = [
    'Generative Engine Optimization',
    'Local SEO',
    'Technical Architecture',
    'Digital PR Strategy',
    'AI Authority & Off-Page',
    'Local Architecture',
    'Reputation & Local Rankings',
    'On-Page Architecture',
    'Penalty Prevention',
    'Entity SEO & Off-Page',
    'Ecommerce SEO',
    'Core Web Vitals'
];

// Handle Form Submission
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $category = trim($_POST['category'] ?? 'SEO Strategy');
    if ($category === 'Other') {
        $customCat = trim($_POST['custom_category'] ?? '');
        $category = !empty($customCat) ? $customCat : 'General SEO';
    }
    $slug = trim($_POST['slug'] ?? '');
    if (empty($slug)) {
        $slug = slugify($title);
    } else {
        $slug = slugify($slug);
    }

    $tags = trim($_POST['tags'] ?? '');
    $publish_stage = ($_POST['publish_stage'] ?? 'published') === 'draft' ? 'draft' : 'published';
    $publication_date = !empty($_POST['publication_date']) ? $_POST['publication_date'] : date('Y-m-d');
    $read_time = intval($_POST['read_time'] ?? 5);
    $author = trim($_POST['author'] ?? 'Shipra Chauhan');
    $seo_title = trim($_POST['seo_title'] ?? '');
    $short_excerpt = trim($_POST['short_excerpt'] ?? '');
    $meta_description = trim($_POST['meta_description'] ?? '');
    $meta_keywords = trim($_POST['meta_keywords'] ?? '');
    $featured_image_alt = trim($_POST['featured_image_alt'] ?? '');
    $schema_type = ($_POST['schema_type'] ?? 'automatic') === 'custom' ? 'custom' : 'automatic';
    $custom_schema = trim($_POST['custom_schema'] ?? '');
    $body_markdown = trim($_POST['body_markdown'] ?? '');
    $body_content = trim($_POST['body_content'] ?? '');
    $faqs_json = trim($_POST['faqs_json'] ?? '[]');

    // Image Upload Handling
    $featured_image = '';
    if (isset($_FILES['featured_image']) && $_FILES['featured_image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['featured_image']['tmp_name'];
        $fileName = $_FILES['featured_image']['name'];
        $fileSize = $_FILES['featured_image']['size'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
        if (in_array($fileExtension, $allowedExtensions)) {
            if ($fileSize <= 5 * 1024 * 1024) { // Max 5MB
                $uploadDir = __DIR__ . '/uploads/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

                $newFileName = 'blog-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $fileExtension;
                $destPath = $uploadDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $destPath)) {
                    $featured_image = $appBase . '/admin/uploads/' . $newFileName;
                }
            } else {
                $error = "Image size exceeds 5MB limit.";
            }
        } else {
            $error = "Invalid image format. Supports JPG, PNG, WEBP, SVG.";
        }
    }

    if (empty($title) || empty($short_excerpt)) {
        $error = "Please fill in all required fields (Article Title and Short Excerpt).";
    }

    if (!$error && $pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `blogs` (
                `title`, `slug`, `category`, `tags`, `featured_image`, `featured_image_alt`,
                `publish_stage`, `publication_date`, `read_time`, `author`, `verified_by`,
                `seo_title`, `short_excerpt`, `meta_description`, `meta_keywords`,
                `schema_type`, `custom_schema`, `body_markdown`, `body_content`, `faqs_json`
            ) VALUES (
                :title, :slug, :category, :tags, :featured_image, :featured_image_alt,
                :publish_stage, :publication_date, :read_time, :author, 'Shipra Chauhan',
                :seo_title, :short_excerpt, :meta_description, :meta_keywords,
                :schema_type, :custom_schema, :body_markdown, :body_content, :faqs_json
            )");

            $stmt->execute([
                ':title' => $title,
                ':slug' => $slug,
                ':category' => $category,
                ':tags' => $tags,
                ':featured_image' => $featured_image,
                ':featured_image_alt' => $featured_image_alt,
                ':publish_stage' => $publish_stage,
                ':publication_date' => $publication_date,
                ':read_time' => $read_time,
                ':author' => $author,
                ':seo_title' => $seo_title ?: $title,
                ':short_excerpt' => $short_excerpt,
                ':meta_description' => $meta_description ?: $short_excerpt,
                ':meta_keywords' => $meta_keywords ?: $tags,
                ':schema_type' => $schema_type,
                ':custom_schema' => $custom_schema,
                ':body_markdown' => $body_markdown,
                ':body_content' => $body_content,
                ':faqs_json' => $faqs_json
            ]);

            header("Location: " . $adminBase . "/index.php?msg=created");
            exit;
        } catch (Exception $e) {
            $error = "Database Error: " . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compose New Article — Shipra Chauhan Editorial Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= $adminBase ?>/assets/css/admin.css?v=<?= time() ?>">
</head>
<body>

  <!-- Top Navigation Bar -->
  <header class="admin-navbar">
    <div class="admin-navbar-inner">
      <div class="admin-navbar-top">
        <a href="<?= $adminBase ?>/index.php" class="admin-brand">
          <div class="admin-brand-logo">SC</div>
          <div class="admin-brand-text">
            <div class="admin-brand-title">Shipra Chauhan</div>
            <div class="admin-brand-subtitle">Editorial Studio</div>
          </div>
          <span class="admin-brand-tag">Compose</span>
        </a>
      </div>

      <div class="admin-nav-actions">
        <a href="<?= $adminBase ?>/index.php" class="btn-admin btn-admin-outline">
          <span>← Dashboard</span>
        </a>
        <button type="submit" form="composeArticleForm" name="publish_stage" value="draft" class="btn-admin btn-admin-secondary">
          <span>💾 Draft</span>
        </button>
        <button type="submit" form="composeArticleForm" name="publish_stage" value="published" class="btn-admin btn-admin-primary">
          <span>Publish →</span>
        </button>
      </div>
    </div>
  </header>

  <main class="admin-container">

    <div style="margin-bottom: 1.75rem;">
      <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--admin-emerald); letter-spacing: -0.02em;">Compose New Article</h1>
      <p style="font-size: 0.9rem; color: var(--admin-text-muted);">
        Fill in details, tags, and compose content in our rich text editor workspace.
      </p>
    </div>

    <?php if ($error): ?>
      <div style="background: #FEE2E2; border: 1px solid #EF4444; color: #DC2626; padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <strong>Error:</strong> <?= htmlspecialchars($error) ?>
      </div>
    <?php endif; ?>

    <form id="composeArticleForm" method="POST" action="<?= $adminBase ?>/create.php" enctype="multipart/form-data">
      
      <div class="form-grid-layout">
        
        <!-- LEFT COLUMN: Primary Content & Workspace -->
        <div class="form-left-col">
          
          <!-- Essential Details Card -->
          <div class="form-group-card">
            <h3 class="form-group-title">📝 Article Essentials</h3>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="articleTitle">Article Title <span class="req">*</span></label>
              <input type="text" id="articleTitle" name="title" class="admin-input" placeholder="e.g. How AI Overviews Are Changing Local Search Results in 2026" required value="<?= htmlspecialchars($_POST['title'] ?? '') ?>">
              <div class="field-help">Write a compelling, search-aligned headline for human readers and search crawlers.</div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="customSlug">Custom Slug (optional)</label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="text" id="customSlug" name="slug" class="admin-input" placeholder="how-ai-overviews-changing-local-search" value="<?= htmlspecialchars($_POST['slug'] ?? '') ?>">
                <button type="button" id="slugLockBtn" class="btn-admin btn-admin-secondary" style="white-space: nowrap; font-size: 0.8rem;">
                  🔒 Auto
                </button>
              </div>
              <div class="field-help">Permalinks are extensionless. Leave auto-locked or unlock to specify custom URL path.</div>
            </div>

            <div class="form-row-2col" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
              <div>
                <label class="field-label" for="articleCategory">Category <span class="req">*</span></label>
                <select id="articleCategory" name="category" class="admin-select" required>
                  <option value="" disabled <?= empty($_POST['category']) ? 'selected' : '' ?>>Select Category...</option>
                  <?php foreach ($categories as $cat): ?>
                    <option value="<?= htmlspecialchars($cat) ?>" <?= (($_POST['category'] ?? '') === $cat) ? 'selected' : '' ?>>
                      <?= htmlspecialchars($cat) ?>
                    </option>
                  <?php endforeach; ?>
                  <option value="Other" <?= (($_POST['category'] ?? '') === 'Other') ? 'selected' : '' ?>>Other (Custom Category)...</option>
                </select>
                <div id="customCategoryBox" style="display: <?= (($_POST['category'] ?? '') === 'Other') ? 'block' : 'none' ?>; margin-top: 0.5rem;">
                  <label class="field-label" for="customCategoryInput" style="font-size: 0.8rem; margin-bottom: 0.25rem;">Custom Category Name <span class="req">*</span></label>
                  <input type="text" id="customCategoryInput" name="custom_category" class="admin-input" placeholder="e.g. Enterprise SEO, Voice Search..." value="<?= htmlspecialchars($_POST['custom_category'] ?? '') ?>">
                </div>
              </div>
              <div>
                <label class="field-label" for="articleAuthor">Author <span class="req">*</span></label>
                <select id="articleAuthor" name="author" class="admin-select" required>
                  <option value="Shipra Chauhan">Shipra Chauhan (Senior Consultant)</option>
                  <option value="Krishna Pal" selected>Krishna Pal (Technical SEO Analyst)</option>
                  <option value="Editorial Team">Editorial Team</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="articleTags">Tags (comma-separated)</label>
              <input type="text" id="articleTags" name="tags" class="admin-input" placeholder="AIOverviews, GEO, PositionZero, LocalSearch" value="<?= htmlspecialchars($_POST['tags'] ?? '') ?>">
              <div class="field-help">Tags will appear as horizontal luxury pill badges right above the article title.</div>
              <div id="tagsPillsPreview" style="margin-top: 0.5rem; display: flex; gap: 0.4rem; flex-wrap: wrap;"></div>
            </div>

            <div>
              <label class="field-label" for="shortExcerpt">Short Excerpt <span class="req">*</span></label>
              <textarea id="shortExcerpt" name="short_excerpt" class="admin-textarea" rows="3" placeholder="A concise 2-3 sentence overview that hooks readers and summarizes the core technical insight..." required><?= htmlspecialchars($_POST['short_excerpt'] ?? '') ?></textarea>
              <div class="char-counter" id="excerptCount">0 characters</div>
            </div>
          </div>

          <!-- Markdown Editor Workspace -->
          <div class="form-group-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h3 class="form-group-title" style="margin-bottom: 0;">✍️ Markdown Editor Workspace</h3>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <button type="button" class="btn-admin btn-admin-secondary" id="btnInsertMdTable" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" title="Insert Markdown Table Template">
                  <span>📊 Insert Table</span>
                </button>
                <label class="btn-admin btn-admin-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.65rem; cursor: pointer;">
                  <span>📂 Upload .md</span>
                  <input type="file" id="mdFileInput" accept=".md,.markdown" style="display: none;">
                </label>
                <div class="editor-counter-tag" id="editorWordCount">0 words • 0 characters</div>
              </div>
            </div>
            
            <p style="font-size: 0.825rem; color: var(--admin-text-muted); margin-bottom: 0.75rem;">
              Write and edit Markdown directly with live preview and .md upload.
            </p>

            <div class="editor-tabs-bar">
              <div class="editor-tabs">
                <button type="button" class="editor-tab-btn active" id="tabWrite">Write</button>
                <button type="button" class="editor-tab-btn" id="tabPreview">Preview</button>
                <button type="button" class="editor-tab-btn" id="tabSplit">Split</button>
              </div>
              <div style="font-size: 0.75rem; color: var(--admin-text-muted);">
                blog Markdown Editor
              </div>
            </div>

            <div style="display: flex; gap: 1rem;">
              <div id="markdownPane" style="width: 100%;">
                <textarea id="markdownContent" name="body_markdown" class="admin-textarea" style="font-family: var(--admin-font-mono); min-height: 320px; font-size: 0.9rem;" placeholder="# Start writing your article in Markdown...
## 1. Introduction
Write declarative paragraphs with high data density.

- Item 1
- Item 2"><?= htmlspecialchars($_POST['body_markdown'] ?? '') ?></textarea>
              </div>
              <div id="previewPane" style="display: none; border: 1px solid var(--admin-border); border-radius: 8px; padding: 1rem; background: #FFFFFF; min-height: 320px; overflow-y: auto;">
                <!-- Live HTML Preview Rendered Here -->
              </div>
            </div>
          </div>

          <!-- Article Content Editor (Tiptap / ProseMirror Engine) -->
          <div class="form-group-card">
            <h3 class="form-group-title">📰 Article Body Content *</h3>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <div style="font-size: 0.825rem; color: var(--admin-text-muted);">
                Article Content Editor • Tiptap ProseMirror Engine • Edit Mode • Live Preview
              </div>
            </div>

            <!-- WYSIWYG Toolbar -->
            <div class="editor-toolbar">
              <button type="button" class="toolbar-btn" data-format-cmd="formatBlock" data-format-val="p">Paragraph</button>
              <button type="button" class="toolbar-btn" data-format-cmd="formatBlock" data-format-val="h2">H2</button>
              <button type="button" class="toolbar-btn" data-format-cmd="formatBlock" data-format-val="h3">H3</button>
              <button type="button" class="toolbar-btn" data-format-cmd="formatBlock" data-format-val="h4">H4</button>
              <span style="color: #CBD5E1;">|</span>
              <button type="button" class="toolbar-btn" data-format-cmd="bold"><strong>B</strong></button>
              <button type="button" class="toolbar-btn" data-format-cmd="italic"><em>I</em></button>
              <button type="button" class="toolbar-btn" data-format-cmd="underline"><u>U</u></button>
              <button type="button" class="toolbar-btn" data-format-cmd="strikeThrough"><s>S</s></button>
              <span style="color: #CBD5E1;">|</span>
              <button type="button" class="toolbar-btn" data-format-cmd="insertUnorderedList">• Bullet</button>
              <button type="button" class="toolbar-btn" data-format-cmd="insertOrderedList">1. Number</button>
              <button type="button" class="toolbar-btn" data-format-cmd="formatBlock" data-format-val="blockquote">“ Quote</button>
              <button type="button" class="toolbar-btn" data-format-cmd="createLink">🔗 Link</button>
              <span style="color: #CBD5E1;">|</span>
              <!-- Table Tools -->
              <button type="button" class="toolbar-btn toolbar-btn-highlight" id="btnInsertTable" title="Insert Responsive Table">📊 Table</button>
              <button type="button" class="toolbar-btn" id="btnAddTableRow" title="Add Row to Table">+ Row</button>
              <button type="button" class="toolbar-btn" id="btnAddTableCol" title="Add Column to Table">+ Col</button>
              <button type="button" class="toolbar-btn toolbar-btn-danger" id="btnDeleteTable" title="Delete current table">✕ Table</button>
              <span style="color: #CBD5E1;">|</span>
              <button type="button" class="toolbar-btn" data-format-cmd="removeFormat">✕ Clear</button>
            </div>

            <!-- Content Editable Surface -->
            <div id="richEditorContent" class="editor-content-area" contenteditable="true">
              <?= $_POST['body_content'] ?? '<p>Write or paste your article body content here...</p>' ?>
            </div>
            <input type="hidden" id="bodyContentInput" name="body_content" value="<?= htmlspecialchars($_POST['body_content'] ?? '') ?>">
          </div>

          <!-- Frequently Asked Questions (FAQ) Repeater -->
          <div class="form-group-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <div>
                <h3 class="form-group-title" style="margin-bottom: 0.2rem;">❓ Frequently Asked Questions (FAQ)</h3>
                <div class="field-help">Rich snippet FAQs automatically rendered whenever article FAQs are configured.</div>
              </div>
              <button type="button" id="addFaqBtn" class="btn-admin btn-admin-primary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                + Add FAQ Item
              </button>
            </div>

            <div id="faqEmptyState" style="text-align: center; padding: 2rem; background: #F8FAFC; border: 1.5px dashed #CBD5E1; border-radius: 8px; color: var(--admin-text-muted);">
              <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">💡</div>
              <div style="font-weight: 600;">No FAQs added yet.</div>
              <div style="font-size: 0.8rem; margin-top: 0.2rem;">Click <strong>+ Add FAQ Item</strong> to configure schema-ready questions.</div>
            </div>

            <div id="faqRepeaterContainer"></div>
            <input type="hidden" id="faqsJsonInput" name="faqs_json" value="<?= htmlspecialchars($_POST['faqs_json'] ?? '[]') ?>">
          </div>

        </div>

        <!-- RIGHT COLUMN: Publishing, Media, SEO & Schema -->
        <div class="form-right-col">

          <!-- Publish Card -->
          <div class="form-group-card">
            <h3 class="form-group-title">🚀 Publication Controls</h3>
            
            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="publishStage">Publish Stage</label>
              <select id="publishStage" name="publish_stage" class="admin-select">
                <option value="published" selected>Published (Public Live)</option>
                <option value="draft">Draft (Private Preview)</option>
              </select>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="pubDate">Publication Date</label>
              <input type="date" id="pubDate" name="publication_date" class="admin-input" value="<?= htmlspecialchars($_POST['publication_date'] ?? date('Y-m-d')) ?>">
              <div class="field-help">Sets the public post date and sorting order.</div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="readTime">Read Time (minutes)</label>
              <input type="number" id="readTime" name="read_time" class="admin-input" min="1" max="60" value="<?= htmlspecialchars($_POST['read_time'] ?? '5') ?>">
            </div>

            <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
              <button type="submit" name="publish_stage" value="draft" class="btn-admin btn-admin-secondary" style="flex: 1; justify-content: center;">
                Save Draft
              </button>
              <button type="submit" name="publish_stage" value="published" class="btn-admin btn-admin-primary" style="flex: 1; justify-content: center;">
                Publish Now →
              </button>
            </div>
          </div>

          <!-- Featured Image Card -->
          <div class="form-group-card">
            <h3 class="form-group-title">🖼️ Featured Image Uploader (Optional)</h3>

            <div class="image-uploader-dropzone" id="imageDropzone">
              <div class="dropzone-icon">📷</div>
              <div class="dropzone-text">Click to browse or Drag &amp; Drop image</div>
              <div class="dropzone-subtext">Supports JPG, PNG, WEBP, SVG (Max 5MB)</div>
              <input type="file" id="featuredImageInput" name="featured_image" accept=".jpg,.jpeg,.png,.webp,.svg" style="display: none;">
            </div>

            <div class="image-preview-box" id="imagePreviewBox">
              <img id="imagePreviewEl" src="" alt="Preview">
              <div style="padding: 0.5rem; text-align: right; background: #F8FAFC;">
                <button type="button" id="removeImageBtn" class="btn-admin btn-admin-danger" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
                  Remove Image
                </button>
              </div>
            </div>

            <div style="margin-top: 1rem;">
              <label class="field-label" for="imageAlt">Featured Image Alt Text (Optional)</label>
              <input type="text" id="imageAlt" name="featured_image_alt" class="admin-input" placeholder="Accessibility &amp; SEO: Describe the image..." value="<?= htmlspecialchars($_POST['featured_image_alt'] ?? '') ?>">
              <div class="field-help">Describe the featured image for accessibility and SEO.</div>
            </div>
          </div>

          <!-- Search Engine Optimization (SEO) -->
          <div class="form-group-card">
            <h3 class="form-group-title">🔍 Search Engine Optimization</h3>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="seoTitle">SEO Title</label>
              <input type="text" id="seoTitle" name="seo_title" class="admin-input" placeholder="Meta title tag for Google SERPs..." value="<?= htmlspecialchars($_POST['seo_title'] ?? '') ?>">
              <div class="char-counter" id="seoTitleCount">0 / 60 characters</div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label class="field-label" for="metaDescription">Meta Description</label>
              <textarea id="metaDescription" name="meta_description" class="admin-textarea" rows="3" placeholder="Google snippet search description..."><?= htmlspecialchars($_POST['meta_description'] ?? '') ?></textarea>
              <div class="char-counter" id="metaDescCount">0 / 160 characters</div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label class="field-label" for="metaKeywords">Meta Keywords</label>
              <input type="text" id="metaKeywords" name="meta_keywords" class="admin-input" placeholder="SEO, Local Search, AI Overviews" value="<?= htmlspecialchars($_POST['meta_keywords'] ?? '') ?>">
            </div>

            <!-- SERP Preview Card -->
            <div class="serp-preview-card">
              <div class="serp-preview-label">Google SERP Snippet Preview</div>
              <div class="serp-url" id="serpPreviewUrl">https://shiprachauhan.in/blogs/your-article-slug</div>
              <div class="serp-title" id="serpPreviewTitle">Article Title Preview | Shipra Chauhan</div>
              <div class="serp-desc" id="serpPreviewDesc">Meta description snippet will appear here in Google search results.</div>
            </div>
          </div>

          <!-- Schema Markup / Structured Data -->
          <div class="form-group-card">
            <h3 class="form-group-title">⚡ Schema Markup / Structured Data</h3>
            <p style="font-size: 0.8rem; color: var(--admin-text-muted); margin-bottom: 1rem;">
              Configure Google rich snippets and search engine structured data for this blog post.
            </p>

            <div style="display: flex; gap: 1.5rem; margin-bottom: 1rem;">
              <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.86rem; font-weight: 600; cursor: pointer;">
                <input type="radio" id="schemaAuto" name="schema_type" value="automatic" checked>
                <span>Automatic (Recommended)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.86rem; font-weight: 600; cursor: pointer;">
                <input type="radio" id="schemaCustom" name="schema_type" value="custom">
                <span>Custom JSON-LD</span>
              </label>
            </div>

            <div class="schema-status-badge">
              <span>🟢</span>
              <span>Intelligent Dynamic Schema Generation Active</span>
              <span>•</span>
              <span>Active &amp; Validated</span>
            </div>

            <ul class="schema-features-list">
              <li>Primary entity: <strong>BlogPosting</strong> with dynamic author, publisher, and timestamp linking.</li>
              <li>Hierarchical breadcrumbs: <strong>BreadcrumbList</strong> linking homepage and section pathways.</li>
              <li>Rich snippet FAQs: <strong>FAQPage</strong> automatically rendered whenever article FAQs are configured.</li>
              <li>Canonical organization: Seamlessly connected to the verified <strong>Shipra Chauhan #organization</strong> entity.</li>
            </ul>

            <div id="customSchemaBox" style="display: none; margin-top: 1rem;">
              <label class="field-label" for="customSchemaInput">Custom JSON-LD Code</label>
              <textarea id="customSchemaInput" name="custom_schema" class="admin-textarea" rows="6" style="font-family: var(--admin-font-mono); font-size: 0.8rem;" placeholder='{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting"\n}'></textarea>
            </div>
          </div>

        </div>

      </div>

    </form>

  </main>

  <script src="<?= $adminBase ?>/assets/js/admin.js"></script>
</body>
</html>
