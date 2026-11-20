<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — SECURE AUTHENTICATION SYSTEM
 * Session-based authentication protecting admin dashboard and composers
 */

if (session_status() === PHP_SESSION_NONE) {
    // Secure session cookies
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    session_start();
}

require_once __DIR__ . '/db.php';

// Default Admin Credentials (Configurable via Environment or constants)
define('ADMIN_DEFAULT_USER', getenv('ADMIN_USER') ?: 'admin');
define('ADMIN_DEFAULT_PASS', getenv('ADMIN_PASS') ?: 'Shipra@2026#');

/**
 * Checks whether the current user is authenticated as Admin
 */
function isAdminLoggedIn() {
    return !empty($_SESSION['sc_admin_logged_in']) && $_SESSION['sc_admin_logged_in'] === true;
}

/**
 * Gatekeeper function: forces authentication on protected admin routes
 */
function requireAdminAuth() {
    if (!isAdminLoggedIn()) {
        $adminBase = getAdminBaseUrl();
        $redirectUrl = $adminBase . '/login.php';
        header("Location: $redirectUrl");
        exit;
    }
}

/**
 * Attempts admin login verification
 */
function adminLogin($username, $password) {
    $validUser = ADMIN_DEFAULT_USER;
    $validPass = ADMIN_DEFAULT_PASS;

    // Check primary admin user
    if ($username === $validUser && $password === $validPass) {
        $_SESSION['sc_admin_logged_in'] = true;
        $_SESSION['sc_admin_user'] = $username;
        $_SESSION['sc_admin_login_time'] = time();
        return true;
    }

    // Secondary username fallback for convenience (e.g. 'shipra')
    if (strtolower($username) === 'shipra' && $password === $validPass) {
        $_SESSION['sc_admin_logged_in'] = true;
        $_SESSION['sc_admin_user'] = 'shipra';
        $_SESSION['sc_admin_login_time'] = time();
        return true;
    }

    return false;
}

/**
 * Clears authentication session and logs out
 */
function adminLogout() {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
}

