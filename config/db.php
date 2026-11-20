<?php
/**
 * SHIPRA CHAUHAN WEB PLATFORM — DATABASE CONNECTION & AUTO-MIGRATION
 * Designed for XAMPP / WAMP / MySQL on Localhost and Production
 */

// Database Credentials (Default for XAMPP Localhost)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'shipra_chauhan_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');

/**
 * Returns a PDO database connection instance.
 * Automatically initializes database and tables if not already present.
 */
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        // Step 1: Connect to MySQL server (without selecting db) to verify/create database
        $dsnWithoutDb = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $serverPdo = new PDO($dsnWithoutDb, DB_USER, DB_PASS, $options);
        $serverPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

        // Step 2: Connect directly to the database
        $dsnWithDb = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsnWithDb, DB_USER, DB_PASS, $options);

        // Step 3: Ensure table structure exists
        ensureTablesExist($pdo);

        return $pdo;
    } catch (PDOException $e) {
        // If MySQL server is down, log or return null gracefully
        error_log("Database connection error: " . $e->getMessage());
        return null;
    }
}

/**
 * Automatically creates the blogs table and seeds the initial 10 articles if empty.
 */
function ensureTablesExist($pdo) {
    $tableSql = "CREATE TABLE IF NOT EXISTS `blogs` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `slug` VARCHAR(255) NOT NULL UNIQUE,
        `category` VARCHAR(100) NOT NULL DEFAULT 'SEO Strategy',
        `tags` VARCHAR(500) NULL DEFAULT '',
        `featured_image` VARCHAR(255) NULL DEFAULT '',
        `featured_image_alt` VARCHAR(255) NULL DEFAULT '',
        `publish_stage` ENUM('published', 'draft') NOT NULL DEFAULT 'published',
        `publication_date` DATE NOT NULL,
        `read_time` INT NOT NULL DEFAULT 5,
        `author` VARCHAR(100) NOT NULL DEFAULT 'Krishna Pal',
        `verified_by` VARCHAR(100) NOT NULL DEFAULT 'Shipra Chauhan',
        `seo_title` VARCHAR(255) NULL DEFAULT '',
        `short_excerpt` TEXT NOT NULL,
        `meta_description` TEXT NULL,
        `meta_keywords` VARCHAR(500) NULL DEFAULT '',
        `schema_type` VARCHAR(50) NOT NULL DEFAULT 'automatic',
        `custom_schema` LONGTEXT NULL,
        `body_markdown` LONGTEXT NULL,
        `body_content` LONGTEXT NOT NULL,
        `faqs_json` LONGTEXT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_slug` (`slug`),
        INDEX `idx_publish_date` (`publish_stage`, `publication_date`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    $pdo->exec($tableSql);

    // Check if table is empty; if so, seed from database.sql or scratch seed
    $count = $pdo->query("SELECT COUNT(*) FROM `blogs`")->fetchColumn();
    if ($count == 0) {
        $sqlFile = dirname(__DIR__) . '/database.sql';
        if (file_exists($sqlFile)) {
            $queries = file_get_contents($sqlFile);
            $pdo->exec($queries);
        }
    }
}

/**
 * Generates an SEO clean URL slug from string
 */
function slugify($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'article-' . time() : $text;
}

/**
 * Retrieve all published blogs for the public site
 */
function getPublishedBlogs($limit = 50, $category = null) {
    $pdo = getDbConnection();
    if (!$pdo) return [];

    $sql = "SELECT * FROM `blogs` WHERE `publish_stage` = 'published'";
    $params = [];

    if ($category && $category !== 'all') {
        $sql .= " AND `category` = :category";
        $params[':category'] = $category;
    }

    $sql .= " ORDER BY `publication_date` DESC, `id` DESC LIMIT " . intval($limit);
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

/**
 * Retrieve single blog post by slug
 */
function getBlogBySlug($slug) {
    $pdo = getDbConnection();
    if (!$pdo) return null;

    $stmt = $pdo->prepare("SELECT * FROM `blogs` WHERE `slug` = :slug LIMIT 1");
    $stmt->execute([':slug' => $slug]);
    return $stmt->fetch() ?: null;
}

/**
 * Retrieve single blog post by ID
 */
function getBlogById($id) {
    $pdo = getDbConnection();
    if (!$pdo) return null;

    $stmt = $pdo->prepare("SELECT * FROM `blogs` WHERE `id` = :id LIMIT 1");
    $stmt->execute([':id' => intval($id)]);
    return $stmt->fetch() ?: null;
}
