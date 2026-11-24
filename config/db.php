<?php
/**
 * SHIPRA CHAUHAN WEB PLATFORM — DATABASE CONNECTION & AUTO-MIGRATION
 * Designed for XAMPP / WAMP / MySQL on Localhost and Production
 */

// Environment Detection (Live Hosting vs Localhost)
$httpHost = $_SERVER['HTTP_HOST'] ?? 'localhost';
$serverIp = explode(':', $httpHost)[0];
$isLocalhost = in_array($serverIp, ['localhost', '127.0.0.1', '::1']) || (php_sapi_name() === 'cli' && empty($_SERVER['HTTP_HOST']));

// Production / Hostinger Credentials (Active on demo.shiprachauhan.in / Live Hosting)
define('HOSTINGER_DB_HOST', 'localhost');
define('HOSTINGER_DB_FALLBACK_HOST', 'srv1328.hstgr.io');
define('HOSTINGER_DB_PORT', '3306');
define('HOSTINGER_DB_NAME', 'u555726154_shipra');
define('HOSTINGER_DB_USER', 'u555726154_shiprachahuhan');
define('HOSTINGER_DB_PASS', 'Shipra@2026#');

// Local XAMPP Credentials (Active on Local PC)
define('LOCAL_DB_HOST', '127.0.0.1');
define('LOCAL_DB_PORT', '3306');
define('LOCAL_DB_NAME', 'shipra_chauhan_db');
define('LOCAL_DB_USER', 'root');
define('LOCAL_DB_PASS', '');

// Set Active Database Configuration
if (!$isLocalhost) {
    define('DB_HOST', getenv('DB_HOST') ?: HOSTINGER_DB_HOST);
    define('DB_PORT', getenv('DB_PORT') ?: HOSTINGER_DB_PORT);
    define('DB_NAME', getenv('DB_NAME') ?: HOSTINGER_DB_NAME);
    define('DB_USER', getenv('DB_USER') ?: HOSTINGER_DB_USER);
    define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : HOSTINGER_DB_PASS);
} else {
    define('DB_HOST', getenv('DB_HOST') ?: LOCAL_DB_HOST);
    define('DB_PORT', getenv('DB_PORT') ?: LOCAL_DB_PORT);
    define('DB_NAME', getenv('DB_NAME') ?: LOCAL_DB_NAME);
    define('DB_USER', getenv('DB_USER') ?: LOCAL_DB_USER);
    define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : LOCAL_DB_PASS);
}

/**
 * Computes the root application base URL dynamically for both root domains and localhost subfolders
 * E.g. "" on root domain, or "/shiprachauhan" when in a XAMPP subdirectory
 */
function getAppBaseUrl() {
    $script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
    
    // Check if running from known subdirectories
    foreach (['/admin', '/blogs', '/services', '/api', '/config'] as $sub) {
        $pos = strpos($script, $sub . '/');
        if ($pos !== false) {
            return rtrim(substr($script, 0, $pos), '/');
        }
        if (substr($script, -strlen($sub)) === $sub) {
            return rtrim(substr($script, 0, -strlen($sub)), '/');
        }
    }
    
    $dir = dirname($script);
    $dir = str_replace('\\', '/', $dir);
    return ($dir === '/' || $dir === '.' || $dir === '\\') ? '' : rtrim($dir, '/');
}

/**
 * Computes the admin panel base URL dynamically
 */
function getAdminBaseUrl() {
    return getAppBaseUrl() . '/admin';
}

$g_dbConnectionError = null;

/**
 * Returns a PDO database connection instance.
 * Automatically initializes database and tables if not already present.
 */
function getDbConnection() {
    static $pdo = null;
    global $g_dbConnectionError;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        // Connect directly to the database with fallback host support
        $hostsToTry = [DB_HOST];
        if (defined('HOSTINGER_DB_FALLBACK_HOST') && !in_array(HOSTINGER_DB_FALLBACK_HOST, $hostsToTry)) {
            $hostsToTry[] = HOSTINGER_DB_FALLBACK_HOST;
        }

        $pdo = null;
        $lastException = null;

        foreach ($hostsToTry as $h) {
            try {
                $dsnWithDb = "mysql:host=" . $h . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                $pdo = new PDO($dsnWithDb, DB_USER, DB_PASS, $options);
                break;
            } catch (PDOException $e) {
                $lastException = $e;
            }
        }

        if (!$pdo) {
            // Local fallback: attempt auto-create database if on localhost root
            if (DB_USER === 'root' && in_array(DB_HOST, ['127.0.0.1', 'localhost'])) {
                $dsnWithoutDb = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
                $serverPdo = new PDO($dsnWithoutDb, DB_USER, DB_PASS, $options);
                $serverPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                $dsnWithDb = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                $pdo = new PDO($dsnWithDb, DB_USER, DB_PASS, $options);
            } else {
                throw ($lastException ?: new PDOException("Could not connect to database"));
            }
        }

        // Ensure table structure exists
        ensureTablesExist($pdo);

        return $pdo;
    } catch (PDOException $e) {
        // If MySQL server is down, log or return null gracefully
        $g_dbConnectionError = $e->getMessage();
        error_log("Database connection error: " . $e->getMessage());
        return null;
    }
}

/**
 * Returns the last database connection error message if any
 */
function getDbConnectionError() {
    global $g_dbConnectionError;
    return $g_dbConnectionError;
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

    // Ensure leads table exists
    $leadsSql = "CREATE TABLE IF NOT EXISTS `leads` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `phone` VARCHAR(50) NOT NULL,
        `challenges_goals` TEXT NULL,
        `page_source` VARCHAR(255) NULL,
        `form_type` VARCHAR(100) DEFAULT 'general',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($leadsSql);

    // Check if table is empty; if so, seed from JSON seed or database.sql
    $count = $pdo->query("SELECT COUNT(*) FROM `blogs`")->fetchColumn();
    if ($count == 0) {
        $seedFile = dirname(__DIR__) . '/config/articles_seed.json';
        if (!file_exists($seedFile)) {
            $seedFile = dirname(__DIR__) . '/scratch/initial_articles_seed.json';
        }
        if (file_exists($seedFile)) {
            $articles = json_decode(file_get_contents($seedFile), true) ?: [];
            if (!empty($articles)) {
                $insertStmt = $pdo->prepare("INSERT INTO `blogs` (
                    `title`, `slug`, `category`, `tags`, `featured_image`, `featured_image_alt`,
                    `publish_stage`, `publication_date`, `read_time`, `author`, `verified_by`,
                    `seo_title`, `short_excerpt`, `meta_description`, `meta_keywords`,
                    `schema_type`, `custom_schema`, `body_markdown`, `body_content`, `faqs_json`
                ) VALUES (
                    :title, :slug, :category, :tags, :featured_image, :featured_image_alt,
                    :publish_stage, :publication_date, :read_time, :author, :verified_by,
                    :seo_title, :short_excerpt, :meta_description, :meta_keywords,
                    :schema_type, :custom_schema, :body_markdown, :body_content, :faqs_json
                )");
                foreach ($articles as $a) {
                    try {
                        $insertStmt->execute([
                            ':title' => $a['title'] ?? '',
                            ':slug' => $a['slug'] ?? '',
                            ':category' => $a['category'] ?? 'SEO Strategy',
                            ':tags' => $a['tags'] ?? '',
                            ':featured_image' => $a['featured_image'] ?? '',
                            ':featured_image_alt' => $a['featured_image_alt'] ?? '',
                            ':publish_stage' => $a['publish_stage'] ?? 'published',
                            ':publication_date' => $a['publication_date'] ?? date('Y-m-d'),
                            ':read_time' => intval($a['read_time'] ?? 5),
                            ':author' => $a['author'] ?? 'Shipra Chauhan',
                            ':verified_by' => $a['verified_by'] ?? 'Shipra Chauhan',
                            ':seo_title' => $a['seo_title'] ?? '',
                            ':short_excerpt' => $a['short_excerpt'] ?? '',
                            ':meta_description' => $a['meta_description'] ?? '',
                            ':meta_keywords' => $a['meta_keywords'] ?? '',
                            ':schema_type' => $a['schema_type'] ?? 'automatic',
                            ':custom_schema' => $a['custom_schema'] ?? '',
                            ':body_markdown' => $a['body_markdown'] ?? '',
                            ':body_content' => $a['body_content'] ?? '',
                            ':faqs_json' => $a['faqs_json'] ?? '[]'
                        ]);
                    } catch (Exception $e) {}
                }
            }
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

