<?php
$_GET['slug'] = 'voice-search-local-seo';
ob_start();
include __DIR__ . '/../blog.php';
$html = ob_get_clean();

if (strpos($html, 'Voice Search and Local SEO') !== false && strpos($html, 'article-tags-horizontal-strip') !== false) {
    echo "BLOG_PHP_TEST: PASSED\n";
} else {
    echo "BLOG_PHP_TEST: FAILED\n";
}

