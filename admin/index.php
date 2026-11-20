<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — BLOG ARTICLES DASHBOARD
 */
require_once dirname(__DIR__) . '/config/auth.php';
requireAdminAuth();

$pdo = getDbConnection();
$errorMsg = null;
$blogs = [];

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `blogs` ORDER BY `publication_date` DESC, `id` DESC");
        $blogs = $stmt->fetchAll();
    } catch (Exception $e) {
        $errorMsg = $e->getMessage();
    }
} else {
    // Fallback preview mode using JSON seed so admin UI is never blank
    $seedFile = dirname(__DIR__) . '/scratch/initial_articles_seed.json';
    if (file_exists($seedFile)) {
        $blogs = json_decode(file_get_contents($seedFile), true) ?: [];
    }
}

// Calculate Stats
$appBase = getAppBaseUrl();
$adminBase = getAdminBaseUrl();
$totalCount = count($blogs);
$publishedCount = 0;
$draftCount = 0;
$categories = [];

foreach ($blogs as $b) {
    if (($b['publish_stage'] ?? '') === 'published') {
        $publishedCount++;
    } else {
        $draftCount++;
    }
    if (!empty($b['category'])) {
        $categories[$b['category']] = true;
    }
}
$categoriesCount = count($categories);

// Fetch Leads from MySQL database
$leads = [];
if ($pdo) {
    try {
        $stmtLeads = $pdo->query("SELECT * FROM `leads` ORDER BY `created_at` DESC LIMIT 50");
        $leads = $stmtLeads->fetchAll();
    } catch (Exception $e) {}
}
$leadsCount = count($leads);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Management Studio — Shipra Chauhan Admin</title>
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
          <span class="admin-brand-tag">Admin</span>
        </a>
        <div class="admin-user-pill">
          <span>👤</span> <span><?= htmlspecialchars($_SESSION['sc_admin_user'] ?? 'admin') ?></span>
        </div>
      </div>

      <div class="admin-nav-actions">
        <button type="button" onclick="switchAdminTab('leads')" class="btn-admin btn-nav-inquiries" title="View all captured client leads">
          <span>🎯 Inquiries</span>
          <span class="badge-count"><?= $leadsCount ?></span>
        </button>
        <button type="button" onclick="switchAdminTab('articles')" class="btn-admin btn-admin-outline btn-nav-articles">
          <span>📝 Articles</span>
        </button>
        <a href="<?= $adminBase ?>/create.php" class="btn-admin btn-admin-primary">
          <span>+ Compose</span>
        </a>
        <a href="<?= $appBase ?>/" target="_blank" class="btn-admin btn-admin-outline btn-hide-xs">
          <span>Site ↗</span>
        </a>
        <a href="<?= $adminBase ?>/logout.php" class="btn-admin btn-admin-danger" onclick="return confirm('Sign out of Admin Studio?');">
          <span>🚪 Logout</span>
        </a>
      </div>
    </div>
  </header>

  <main class="admin-container">

    <?php if (!$pdo): ?>
      <?php 
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $isLive = !in_array(explode(':', $host)[0], ['localhost', '127.0.0.1', '::1']);
        $rawError = function_exists('getDbConnectionError') ? getDbConnectionError() : null;
      ?>
      <div class="admin-notice-box" style="background: #FEF3C7; border: 1.5px solid #F59E0B; color: #92400E; padding: 1.15rem 1.35rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚠️ Database Connection Notice</span>
            <span style="font-size: 0.75rem; background: #FDE68A; color: #78350F; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">Offline Preview Mode Active</span>
          </div>
          <?php if ($isLive): ?>
            <p style="margin: 0.25rem 0; font-size: 0.88rem; line-height: 1.45;">
              Currently running in offline preview mode because the live MySQL database is not yet connected. To enable live database storage on your hosting (Hostinger/cPanel):
            </p>
            <ol style="margin: 0.4rem 0 0.4rem 1.25rem; font-size: 0.84rem; line-height: 1.4;">
              <li>Open <code>config/db.php</code> on your hosting server (File Manager).</li>
              <li>Enter your Hostinger MySQL Database Name, Username, and Password in lines 8–12.</li>
              <li>Import <code>database.sql</code> into Hostinger phpMyAdmin.</li>
            </ol>
          <?php else: ?>
            <p style="margin: 0.25rem 0; font-size: 0.88rem; line-height: 1.45;">
              Could not connect to local MySQL on <code>127.0.0.1:3306</code>. Please ensure <strong>Apache &amp; MySQL</strong> are started in your XAMPP Control Panel. Showing pre-seeded articles in offline preview mode.
            </p>
          <?php endif; ?>
          <?php if (!empty($rawError)): ?>
            <div style="margin-top: 0.4rem; font-size: 0.78rem; font-family: monospace; background: rgba(0,0,0,0.06); padding: 0.25rem 0.5rem; border-radius: 4px;">
              Technical details: <?= htmlspecialchars($rawError) ?>
            </div>
          <?php endif; ?>
        </div>
        <a href="<?= $adminBase ?>/index.php" class="btn-admin btn-admin-secondary" style="white-space: nowrap; font-size: 0.8rem; margin-top: 0.2rem;">Retry Connection</a>
      </div>
    <?php endif; ?>

    <!-- Stats Bento Grid -->
    <section class="admin-stats-grid">
      <div class="stat-card" onclick="switchAdminTab('articles')" style="cursor: pointer; transition: all 0.2s ease;" title="Click to view articles">
        <div class="stat-card-label" style="display: flex; justify-content: space-between; align-items: center;">
          <span>Total Articles</span>
          <span style="font-size: 0.7rem; color: var(--admin-primary); font-weight: 700;">VIEW ➔</span>
        </div>
        <div class="stat-card-value"><?= $totalCount ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Published Articles</div>
        <div class="stat-card-value" style="color: var(--admin-success);"><?= $publishedCount ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Drafts (Private)</div>
        <div class="stat-card-value" style="color: var(--admin-warning);"><?= $draftCount ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Active Categories</div>
        <div class="stat-card-value" style="color: var(--admin-gold);"><?= $categoriesCount ?></div>
      </div>
      <div class="stat-card" onclick="switchAdminTab('leads')" style="cursor: pointer; transition: all 0.2s ease;" title="Click to view all leads">
        <div class="stat-card-label" style="display: flex; justify-content: space-between; align-items: center;">
          <span>Client Inquiries</span>
          <span style="font-size: 0.7rem; color: #2563EB; font-weight: 700;">VIEW ➔</span>
        </div>
        <div class="stat-card-value" style="color: #2563EB;"><?= $leadsCount ?></div>
      </div>
    </section>

    
    <?php if (isset($_GET['lead_deleted'])): ?>
      <div style="background: #DCFCE7; border: 1.5px solid #10B981; color: #065F46; padding: 0.85rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <span>✓ Lead record was successfully removed from the database.</span>
        <a href="<?= $adminBase ?>/index.php?tab=leads" style="color: #065F46; font-weight: 700; text-decoration: none;">✕ Dismiss</a>
      </div>
    <?php endif; ?>

    <!-- View Switcher Tabs (Articles vs Leads) -->
    <div class="admin-tabs">
      <button type="button" class="admin-tab-btn active-tab-btn" id="tabBtnArticles" onclick="switchAdminTab('articles')">
        <span>📝 Blog Articles</span>
        <span class="tab-badge"><?= $totalCount ?></span>
      </button>
      <button type="button" class="admin-tab-btn" id="tabBtnLeads" onclick="switchAdminTab('leads')">
        <span>🎯 Client Leads &amp; Inquiries Tracker</span>
        <span class="tab-badge tab-badge-blue"><?= $leadsCount ?></span>
      </button>
    </div>

    <!-- Section 1: Blog Articles -->
    <div id="sectionArticles" class="admin-section">
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Manage Published &amp; Draft Blog Articles</h2>
            <p style="font-size: 0.825rem; color: var(--admin-text-muted); margin-top: 0.2rem;">
              Full editorial control over technical search insights, meta architecture, and Schema.org rich results.
            </p>
          </div>
          <div>
            <a href="<?= $adminBase ?>/create.php" class="btn-admin btn-admin-primary">
              <span>+ Compose New Article</span>
            </a>
          </div>
        </div>

        <div class="admin-card-body" style="padding: 0;">
          <!-- Desktop Table View -->
          <div class="desktop-table-view">
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th style="width: 60px;">ID</th>
                    <th>Article Title &amp; Slug</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Publish Stage</th>
                    <th>Date</th>
                    <th>Read Time</th>
                    <th style="text-align: right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <?php if (empty($blogs)): ?>
                    <tr>
                      <td colspan="8" style="text-align: center; padding: 3rem; color: var(--admin-text-muted);">
                        No articles found. Click <strong>Compose New Article</strong> to create your first post!
                      </td>
                    </tr>
                  <?php else: ?>
                    <?php foreach ($blogs as $idx => $blog): ?>
                      <?php 
                        $id = $blog['id'] ?? ($idx + 1);
                        $slug = htmlspecialchars($blog['slug'] ?? '');
                        $title = htmlspecialchars($blog['title'] ?? '');
                        $category = htmlspecialchars($blog['category'] ?? 'SEO');
                        $author = htmlspecialchars($blog['author'] ?? 'Shipra Chauhan');
                        $stage = ($blog['publish_stage'] ?? 'published') === 'published' ? 'published' : 'draft';
                        $date = htmlspecialchars($blog['publication_date'] ?? '2026-10-09');
                        $readTime = intval($blog['read_time'] ?? 5);
                      ?>
                      <tr>
                        <td style="font-family: var(--admin-font-mono); color: var(--admin-text-muted); font-size: 0.8rem;">
                          #<?= $id ?>
                        </td>
                        <td>
                          <div style="font-weight: 700; color: var(--admin-emerald); line-height: 1.35; max-width: 440px;">
                            <a href="<?= $adminBase ?>/edit.php?id=<?= $id ?>" style="color: inherit; text-decoration: none;">
                              <?= $title ?>
                            </a>
                          </div>
                          <div style="font-size: 0.78rem; color: var(--admin-text-muted); margin-top: 0.25rem; font-family: var(--admin-font-mono);">
                            /blogs/<?= $slug ?>
                          </div>
                        </td>
                        <td>
                          <span class="badge-category"><?= $category ?></span>
                        </td>
                        <td style="font-size: 0.85rem; font-weight: 600; color: #334155;">
                          <?= $author ?>
                        </td>
                        <td>
                          <span class="badge-status badge-<?= $stage ?>">
                            <span style="font-size: 0.65rem;">●</span> <?= ucfirst($stage) ?>
                          </span>
                        </td>
                        <td style="font-size: 0.825rem; color: var(--admin-text-muted); white-space: nowrap;">
                          <?= date('M d, Y', strtotime($date)) ?>
                        </td>
                        <td style="font-size: 0.825rem; color: var(--admin-text-muted);">
                          <?= $readTime ?> min
                        </td>
                        <td style="text-align: right; white-space: nowrap;">
                          <a href="<?= $appBase ?>/blogs/<?= $slug ?>" target="_blank" class="btn-admin btn-admin-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" title="View Live Article">
                            View ↗
                          </a>
                          <a href="<?= $adminBase ?>/edit.php?id=<?= $id ?>" class="btn-admin btn-admin-primary" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;" title="Edit Article">
                            Edit
                          </a>
                          <a href="<?= $adminBase ?>/delete.php?id=<?= $id ?>" class="btn-admin btn-admin-danger" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" onclick="return confirm('Are you sure you want to delete this article?');" title="Delete Article">
                            Delete
                          </a>
                        </td>
                      </tr>
                    <?php endforeach; ?>
                  <?php endif; ?>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile Cards View (Optimized for Phone Screens) -->
          <div class="mobile-cards-view">
            <?php if (empty($blogs)): ?>
              <div style="text-align: center; padding: 2rem 1rem; color: var(--admin-text-muted);">
                No articles found. Click <strong>+ Compose Article</strong> to create your first post!
              </div>
            <?php else: ?>
              <?php foreach ($blogs as $idx => $blog): ?>
                <?php 
                  $id = $blog['id'] ?? ($idx + 1);
                  $slug = htmlspecialchars($blog['slug'] ?? '');
                  $title = htmlspecialchars($blog['title'] ?? '');
                  $category = htmlspecialchars($blog['category'] ?? 'SEO');
                  $author = htmlspecialchars($blog['author'] ?? 'Shipra Chauhan');
                  $stage = ($blog['publish_stage'] ?? 'published') === 'published' ? 'published' : 'draft';
                  $date = htmlspecialchars($blog['publication_date'] ?? '2026-10-09');
                  $readTime = intval($blog['read_time'] ?? 5);
                ?>
                <div class="admin-mobile-card">
                  <div class="admin-mobile-card-header">
                    <span class="badge-status badge-<?= $stage ?>">● <?= ucfirst($stage) ?></span>
                    <span class="admin-mobile-card-date"><?= date('M d, Y', strtotime($date)) ?></span>
                  </div>
                  <h3 class="admin-mobile-card-title">
                    <a href="<?= $adminBase ?>/edit.php?id=<?= $id ?>"><?= $title ?></a>
                  </h3>
                  <div class="admin-mobile-card-slug">/blogs/<?= $slug ?></div>
                  <div class="admin-mobile-card-meta">
                    <span class="badge-category"><?= $category ?></span>
                    <span style="font-weight: 600; color: #334155;">👤 <?= $author ?></span>
                    <span>⏱️ <?= $readTime ?> min</span>
                  </div>
                  <div class="admin-mobile-card-actions">
                    <a href="<?= $appBase ?>/blogs/<?= $slug ?>" target="_blank" class="btn-admin btn-admin-secondary">
                      View ↗
                    </a>
                    <a href="<?= $adminBase ?>/edit.php?id=<?= $id ?>" class="btn-admin btn-admin-primary">
                      Edit ✏️
                    </a>
                    <a href="<?= $adminBase ?>/delete.php?id=<?= $id ?>" class="btn-admin btn-admin-danger" onclick="return confirm('Are you sure you want to delete this article?');">
                      Delete 🗑️
                    </a>
                  </div>
                </div>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div><!-- End #sectionArticles -->

    <!-- Section 2: Client Leads & Inquiries Tracker -->
    <div id="sectionLeads" class="admin-section" style="display: none;">
      <div class="admin-card">
        <div class="admin-card-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h2 class="admin-card-title">Client Leads &amp; SEO Audit Inquiries</h2>
              <span class="badge-status badge-published" style="font-weight: 800; font-size: 0.8rem; background: #DCFCE7; color: #166534;">
                ● Live Database Active
              </span>
            </div>
            <p class="admin-card-subtitle" style="margin-top: 0.25rem;">
              Detailed breakdown of leads captured across all website pages, contact forms, and the 4-second timed popup.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <a href="<?= $adminBase ?>/index.php?tab=leads" class="btn-admin btn-admin-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem;">
              ↻ Refresh Leads
            </a>
          </div>
        </div>

        <div class="admin-card-body" style="padding: 0;">
          <!-- Desktop Table View -->
          <div class="desktop-table-view">
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th style="min-width: 140px;">Captured Date</th>
                    <th style="min-width: 160px;">Client Contact</th>
                    <th style="min-width: 160px;">Source Page (Where from)</th>
                    <th style="min-width: 160px;">Form Origin (Which Form)</th>
                    <th style="min-width: 220px;">Search Challenges &amp; Goals</th>
                    <th style="text-align: right; min-width: 100px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <?php if (empty($leads)): ?>
                    <tr>
                      <td colspan="6" style="text-align: center; padding: 3.5rem 1.5rem; color: var(--admin-text-muted);">
                        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🎯</div>
                        <div style="font-weight: 700; font-size: 1.05rem; color: #334155; margin-bottom: 0.25rem;">No Inquiries Received Yet</div>
                        <p style="font-size: 0.85rem; max-width: 450px; margin: 0 auto;">
                          When visitors fill out any consultation form, contact page, or the 4-second popup modal on the website, their details and exact source page will automatically appear here!
                        </p>
                      </td>
                    </tr>
                  <?php else: ?>
                    <?php foreach ($leads as $l): ?>
                      <?php 
                        $page = $l['page_source'] ?? '/';
                        $form = $l['form_type'] ?? 'General';
                        $phoneClean = preg_replace('/[^0-9]/', '', $l['phone']);
                        if (strlen($phoneClean) === 10) {
                            $phoneClean = '91' . $phoneClean;
                        }
                      ?>
                      <tr>
                        <td style="font-size: 0.8rem; color: var(--admin-text-muted); white-space: nowrap; vertical-align: top;">
                          <strong style="color: #1E293B; display: block; font-size: 0.85rem;">
                            <?= date('M d, Y', strtotime($l['created_at'])) ?>
                          </strong>
                          <span><?= date('h:i A', strtotime($l['created_at'])) ?></span>
                        </td>

                        <td style="vertical-align: top;">
                          <div style="font-weight: 700; color: #0F172A; font-size: 0.95rem; margin-bottom: 0.25rem;">
                            <?= htmlspecialchars($l['name']) ?>
                          </div>
                          <div style="font-size: 0.825rem; margin-bottom: 0.25rem;">
                            <a href="mailto:<?= htmlspecialchars($l['email']) ?>" style="color: var(--admin-primary); text-decoration: none; font-weight: 600;">
                              ✉️ <?= htmlspecialchars($l['email']) ?>
                            </a>
                          </div>
                          <div style="font-size: 0.825rem; display: flex; align-items: center; gap: 0.5rem;">
                            <a href="tel:<?= htmlspecialchars($l['phone']) ?>" style="color: #059669; font-weight: 700; text-decoration: none;">
                              📞 <?= htmlspecialchars($l['phone']) ?>
                            </a>
                            <?php if (!empty($phoneClean)): ?>
                              <a href="https://wa.me/<?= $phoneClean ?>?text=<?= urlencode('Hello ' . $l['name'] . ', thank you for reaching out regarding your SEO project.') ?>" target="_blank" style="background: #25D366; color: #FFFFFF; font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 4px; text-decoration: none;" title="Chat on WhatsApp">
                                WhatsApp ↗
                              </a>
                            <?php endif; ?>
                          </div>
                        </td>

                        <!-- Source Page -->
                        <td style="vertical-align: top;">
                          <div style="margin-bottom: 0.25rem;">
                            <a href="<?= $appBase . (str_starts_with($page, '/') ? $page : '/' . $page) ?>" target="_blank" style="display: inline-flex; align-items: center; gap: 0.35rem; background: #E0F2FE; color: #0369A1; padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 700; font-size: 0.8rem; text-decoration: none; border: 1px solid #BAE6FD;" title="View Page">
                              <span>📍</span>
                              <span><?= htmlspecialchars($page ?: '/') ?></span>
                              <span style="font-size: 0.65rem;">↗</span>
                            </a>
                          </div>
                        </td>

                        <!-- Form Origin -->
                        <td style="vertical-align: top;">
                          <?php if (stripos($form, 'popup') !== false): ?>
                            <span class="badge-status" style="background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; font-weight: 700; font-size: 0.775rem;">
                              ⚡ 4-Second Timed Popup
                            </span>
                          <?php elseif (stripos($form, 'contact') !== false): ?>
                            <span class="badge-status" style="background: #DCFCE7; color: #166534; border: 1px solid #BBF7D0; font-weight: 700; font-size: 0.775rem;">
                              ✉️ Contact Page Form
                            </span>
                          <?php elseif (stripos($form, 'audit') !== false): ?>
                            <span class="badge-status" style="background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; font-weight: 700; font-size: 0.775rem;">
                              🔍 Hero Audit Form
                            </span>
                          <?php elseif (stripos($form, 'service') !== false): ?>
                            <span class="badge-status" style="background: #CFFAFE; color: #0E7490; border: 1px solid #A5F3FC; font-weight: 700; font-size: 0.775rem;">
                              ⚙️ Service Page Form
                            </span>
                          <?php else: ?>
                            <span class="badge-status" style="background: #F3E8FF; color: #7E22CE; border: 1px solid #E9D5FF; font-weight: 700; font-size: 0.775rem;">
                              📑 <?= htmlspecialchars($form) ?>
                            </span>
                          <?php endif; ?>
                        </td>

                        <!-- Challenges & Goals -->
                        <td style="vertical-align: top;">
                          <?php if (!empty($l['challenges_goals'])): ?>
                            <div style="font-size: 0.85rem; color: #334155; background: #F8FAFC; border-left: 3px solid var(--admin-gold); padding: 0.5rem 0.75rem; border-radius: 4px; line-height: 1.45;">
                              "<?= htmlspecialchars($l['challenges_goals']) ?>"
                            </div>
                          <?php else: ?>
                            <span style="font-size: 0.8rem; color: #94A3B8; font-style: italic;">No specific challenges provided</span>
                          <?php endif; ?>
                        </td>

                        <!-- Actions -->
                        <td style="text-align: right; vertical-align: top; white-space: nowrap;">
                          <a href="<?= $adminBase ?>/delete-lead.php?id=<?= $l['id'] ?>" class="btn-admin btn-admin-danger" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" onclick="return confirm('Delete this lead record permanently?');" title="Delete Lead">
                            ✕ Delete
                          </a>
                        </td>
                      </tr>
                    <?php endforeach; ?>
                  <?php endif; ?>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile Cards View for Leads (Optimized for Phone Screens) -->
          <div class="mobile-cards-view">
            <?php if (empty($leads)): ?>
              <div style="text-align: center; padding: 2.5rem 1rem; color: var(--admin-text-muted);">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
                <div style="font-weight: 700; color: #334155;">No Inquiries Received Yet</div>
                <p style="font-size: 0.85rem; margin-top: 0.25rem;">Captured leads will appear here automatically.</p>
              </div>
            <?php else: ?>
              <?php foreach ($leads as $l): ?>
                <?php 
                  $page = $l['page_source'] ?? '/';
                  $form = $l['form_type'] ?? 'General';
                  $phoneClean = preg_replace('/[^0-9]/', '', $l['phone']);
                  if (strlen($phoneClean) === 10) {
                      $phoneClean = '91' . $phoneClean;
                  }
                ?>
                <div class="admin-mobile-card admin-lead-card">
                  <div class="admin-mobile-card-header">
                    <span class="admin-lead-date">📅 <?= date('M d, Y • h:i A', strtotime($l['created_at'])) ?></span>
                    <a href="<?= $adminBase ?>/delete-lead.php?id=<?= $l['id'] ?>" class="btn-admin btn-admin-danger btn-lead-del-mini" onclick="return confirm('Delete this lead record permanently?');">
                      ✕ Delete
                    </a>
                  </div>

                  <div class="admin-lead-body">
                    <div class="admin-lead-name">👤 <?= htmlspecialchars($l['name']) ?></div>
                    <div class="admin-lead-email">
                      <a href="mailto:<?= htmlspecialchars($l['email']) ?>">✉️ <?= htmlspecialchars($l['email']) ?></a>
                    </div>
                    <div class="admin-lead-phone-row">
                      <a href="tel:<?= htmlspecialchars($l['phone']) ?>" class="admin-lead-phone">📞 <?= htmlspecialchars($l['phone']) ?></a>
                      <?php if (!empty($phoneClean)): ?>
                        <a href="https://wa.me/<?= $phoneClean ?>?text=<?= urlencode('Hello ' . $l['name'] . ', thank you for reaching out regarding your SEO project.') ?>" target="_blank" class="btn-whatsapp-pill">
                          WhatsApp ↗
                        </a>
                      <?php endif; ?>
                    </div>
                  </div>

                  <div class="admin-lead-tags">
                    <div class="admin-lead-tag-item">
                      <span class="admin-tag-lbl">Source:</span>
                      <a href="<?= $appBase . (str_starts_with($page, '/') ? $page : '/' . $page) ?>" target="_blank" class="admin-tag-val-page">
                        📍 <?= htmlspecialchars($page ?: '/') ?> ↗
                      </a>
                    </div>
                    <div class="admin-lead-tag-item">
                      <span class="admin-tag-lbl">Form:</span>
                      <span class="admin-tag-val-form">⚡ <?= htmlspecialchars($form) ?></span>
                    </div>
                  </div>

                  <?php if (!empty($l['challenges_goals'])): ?>
                    <div class="admin-lead-notes">
                      <div class="admin-notes-lbl">Goals &amp; Challenges:</div>
                      <div class="admin-notes-val">"<?= nl2br(htmlspecialchars($l['challenges_goals'])) ?>"</div>
                    </div>
                  <?php endif; ?>
                </div>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div><!-- End #sectionLeads -->

    <script>
      function switchAdminTab(tabName) {
        const secArticles = document.getElementById('sectionArticles');
        const secLeads = document.getElementById('sectionLeads');
        const btnArticles = document.getElementById('tabBtnArticles');
        const btnLeads = document.getElementById('tabBtnLeads');

        if (tabName === 'leads') {
          secArticles.style.display = 'none';
          secLeads.style.display = 'block';

          btnArticles.classList.remove('active-tab-btn');
          btnArticles.style.background = '#FFFFFF';
          btnArticles.style.color = '#334155';
          btnArticles.style.border = '1.5px solid #CBD5E1';
          btnArticles.style.boxShadow = 'none';

          btnLeads.classList.add('active-tab-btn');
          btnLeads.style.background = '#0F3C2A';
          btnLeads.style.color = '#FFFFFF';
          btnLeads.style.border = 'none';
          btnLeads.style.boxShadow = '0 4px 12px rgba(15, 60, 42, 0.2)';

          // Update URL without reload
          if (history.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?tab=leads';
            window.history.pushState({path:newurl},'',newurl);
          }
        } else {
          secLeads.style.display = 'none';
          secArticles.style.display = 'block';

          btnLeads.classList.remove('active-tab-btn');
          btnLeads.style.background = '#FFFFFF';
          btnLeads.style.color = '#334155';
          btnLeads.style.border = '1.5px solid #CBD5E1';
          btnLeads.style.boxShadow = 'none';

          btnArticles.classList.add('active-tab-btn');
          btnArticles.style.background = '#0F3C2A';
          btnArticles.style.color = '#FFFFFF';
          btnArticles.style.border = 'none';
          btnArticles.style.boxShadow = '0 4px 12px rgba(15, 60, 42, 0.2)';

          if (history.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?tab=articles';
            window.history.pushState({path:newurl},'',newurl);
          }
        }
      }

      // Check URL query param to activate leads tab if requested
      document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('tab') === 'leads' || params.get('lead_deleted') === '1') {
          switchAdminTab('leads');
        }
      });
    </script>

  </main>

  <footer style="text-align: center; padding: 2rem; color: var(--admin-text-muted); font-size: 0.8rem; border-top: 1px solid var(--admin-border); margin-top: 3rem;">
    Shipra Chauhan Web Platform • Modern Editorial CMS Engine • Running on PHP <?= phpversion() ?>
  </footer>

</body>
</html>

