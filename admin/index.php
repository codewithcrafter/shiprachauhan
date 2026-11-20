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
  <link rel="stylesheet" href="/admin/assets/css/admin.css">
</head>
<body>

  <!-- Top Navigation Bar -->
  <header class="admin-navbar">
    <a href="/admin/index.php" class="admin-brand">
      <div class="admin-brand-logo">SC</div>
      <div>
        <div class="admin-brand-title">Shipra Chauhan · Editorial Studio</div>
      </div>
      <span class="admin-brand-tag">XAMPP / MySQL Admin</span>
    </a>

    <div class="admin-nav-actions">
      <a href="/" target="_blank" class="btn-admin btn-admin-outline">
        <span>View Live Site</span>
        <span>↗</span>
      </a>
      <a href="/blogs" target="_blank" class="btn-admin btn-admin-outline">
        <span>Public Blog Hub</span>
        <span>↗</span>
      </a>
      <a href="/admin/create.php" class="btn-admin btn-admin-primary">
        <span>+ Compose New Article</span>
      </a>
    </div>
  </header>

  <main class="admin-container">

    <?php if (!$pdo): ?>
      <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; color: #92400E; padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <strong>⚠️ MySQL Connection Notice (XAMPP):</strong>
          <span>Could not connect to MySQL on localhost:3306. Please ensure <strong>Apache &amp; MySQL</strong> are started in your XAMPP Control Panel. Showing pre-seeded articles in offline preview mode.</span>
        </div>
        <a href="/admin/index.php" class="btn-admin btn-admin-secondary" style="white-space: nowrap; font-size: 0.8rem;">Retry Connection</a>
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
          <a href="/admin/create.php" class="btn-admin btn-admin-primary">
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
                        <a href="/admin/edit.php?id=<?= $id ?>" style="color: inherit; text-decoration: none;">
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
                      <a href="/blogs/<?= $slug ?>" target="_blank" class="btn-admin btn-admin-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" title="View Live Article">
                        View ↗
                      </a>
                      <a href="/admin/edit.php?id=<?= $id ?>" class="btn-admin btn-admin-primary" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;" title="Edit Article">
                        Edit
                      </a>
                      <a href="/admin/delete.php?id=<?= $id ?>" class="btn-admin btn-admin-danger" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" onclick="return confirm('Are you sure you want to delete this article?');" title="Delete Article">
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

  </main>

  <footer style="text-align: center; padding: 2rem; color: var(--admin-text-muted); font-size: 0.8rem; border-top: 1px solid var(--admin-border); margin-top: 3rem;">
    Shipra Chauhan Web Platform • Modern Editorial CMS Engine • Running on PHP <?= phpversion() ?>
  </footer>

</body>
</html>
