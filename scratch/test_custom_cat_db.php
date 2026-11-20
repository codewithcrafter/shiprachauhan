<?php
require_once __DIR__ . '/../config/db.php';
$pdo = getDbConnection();

$stmt = $pdo->prepare("INSERT INTO `blogs` (
    `title`, `slug`, `category`, `tags`, `featured_image`, `featured_image_alt`,
    `publish_stage`, `publication_date`, `read_time`, `author`, `verified_by`,
    `seo_title`, `short_excerpt`, `meta_description`, `meta_keywords`,
    `schema_type`, `custom_schema`, `body_markdown`, `body_content`, `faqs_json`
) VALUES (
    'Test Custom Category & Table Article',
    'test-custom-category-table-article',
    'Enterprise SEO',
    'Enterprise, TableTest',
    '/assets/images/local-hero.webp',
    'Test Alt',
    'published',
    CURDATE(),
    5,
    'Krishna Pal',
    'Shipra Chauhan',
    'Test SEO Title',
    'Test excerpt for custom category and table insertion verification.',
    'Test meta desc',
    'Test, SEO',
    'automatic',
    '',
    '',
    '<p>Testing table below:</p><div class=\"table-responsive\"><table class=\"article-table\"><thead><tr><th>Col 1</th><th>Col 2</th></tr></thead><tbody><tr><td>Val A</td><td>Val B</td></tr></tbody></table></div>',
    '[]'
)");
$stmt->execute();

$check = $pdo->query("SELECT id, title, category FROM `blogs` WHERE `slug` = 'test-custom-category-table-article'")->fetch();
echo "Inserted: " . json_encode($check) . "\n";

// Clean up test article
$pdo->exec("DELETE FROM `blogs` WHERE `slug` = 'test-custom-category-table-article'");
echo "Cleaned up test article.\n";

