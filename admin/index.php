<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — BLOG ARTICLES DASHBOARD
 */
require_once dirname(__DIR__) . '/config/db.php';

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
  <link rel="stylesheet" href="<?= $adminBase ?>/assets/css/admin.css">
</head>
<body>

  <!-- Top Navigation Bar -->
  <header class="admin-navbar">
    <a href="<?= $adminBase ?>/index.php" class="admin-brand">
      <div class="admin-brand-logo">SC</div>
      <div>
        <div class="admin-brand-title">Shipra Chauhan · Editorial Studio</div>
      </div>
      <span class="admin-brand-tag">XAMPP / MySQL Admin</span>
    </a>

    <div class="admin-nav-actions">
      <a href="<?= $appBase ?>/" target="_blank" class="btn-admin btn-admin-outline">
        <span>View Live Site</span>
        <span>↗</span>
      </a>
      <a href="<?= $appBase ?>/blogs" target="_blank" class="btn-admin btn-admin-outline">
        <span>Public Blog Hub</span>
        <span>↗</span>
      </a>
      <a href="<?= $adminBase ?>/create.php" class="btn-admin btn-admin-primary">
        <span>+ Compose New Article</span>
      </a>
    </div>
  </header>

  <main class="admin-container">

    <?php if (!$pdo): ?>
      <?php 
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $isLive = !in_array(explode(':', $host)[0], ['localhost', '127.0.0.1', '::1']);
        $rawError = function_exists('getDbConnectionError') ? getDbConnectionError() : null;
      ?>
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; color: #92400E; padding: 1.15rem 1.35rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;">
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
      <div class="stat-card">
        <div class="stat-card-label">Total Articles</div>
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
      <div class="stat-card">
        <div class="stat-card-label">Client Inquiries</div>
        <div class="stat-card-value" style="color: #2563EB;"><?= $leadsCount ?></div>
      </div>
    </section>

    <!-- Main Content Card -->
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
    </div>

    <!-- Inquiries & Leads Card (Stored in MySQL) -->
    <div class="admin-card" style="margin-top: 2rem;">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">Client Leads &amp; SEO Audit Inquiries</h2>
          <p class="admin-card-subtitle">Real-time submissions from contact forms and 4-second timed popup modal (Stored in MySQL)</p>
        </div>
        <span class="badge-status badge-published" style="font-weight: 700;"><?= $leadsCount ?> Total Leads</span>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Search Challenges &amp; Goals</th>
                <th>Source Page</th>
              </tr>
            </thead>
            <tbody>
              <?php if (empty($leads)): ?>
                <tr>
                  <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--admin-text-muted);">
                    No inquiries recorded in MySQL yet. Test any form on the site to see submissions populate live!
                  </td>
                </tr>
              <?php else: ?>
                <?php foreach ($leads as $l): ?>
                  <tr>
                    <td style="font-size: 0.8rem; color: var(--admin-text-muted); white-space: nowrap;">
                      <?= date('M d, Y · H:i', strtotime($l['created_at'])) ?>
                    </td>
                    <td style="font-weight: 600; color: #1E293B;">
                      <?= htmlspecialchars($l['name']) ?>
                    </td>
                    <td>
                      <a href="mailto:<?= htmlspecialchars($l['email']) ?>" style="color: var(--admin-primary); text-decoration: none; font-weight: 500;">
                        <?= htmlspecialchars($l['email']) ?>
                      </a>
                    </td>
                    <td>
                      <a href="tel:<?= htmlspecialchars($l['phone']) ?>" style="color: #059669; font-weight: 600; text-decoration: none;">
                        <?= htmlspecialchars($l['phone']) ?>
                      </a>
                    </td>
                    <td style="font-size: 0.85rem; color: #475569; max-width: 250px;">
                      <?= htmlspecialchars($l['challenges_goals'] ?: 'None provided') ?>
                    </td>
                    <td style="font-size: 0.75rem; color: var(--admin-text-muted);">
                      <span class="badge-category"><?= htmlspecialchars($l['form_type'] ?? 'website') ?></span>
                    </td>
                  </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </main>

  <footer style="text-align: center; padding: 2rem; color: var(--admin-text-muted); font-size: 0.8rem; border-top: 1px solid var(--admin-border); margin-top: 3rem;">
    Shipra Chauhan Web Platform • Modern Editorial CMS Engine • Running on PHP <?= phpversion() ?>
  </footer>

</body>
</html>

