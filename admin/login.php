<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — SECURE ADMIN LOGIN
 */
require_once dirname(__DIR__) . '/config/auth.php';

$appBase = getAppBaseUrl();
$adminBase = getAdminBaseUrl();

// If already logged in, redirect straight to dashboard
if (isAdminLoggedIn()) {
    header("Location: $adminBase/index.php");
    exit;
}

$errorMessage = null;
$usernameVal = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usernameVal = trim($_POST['username'] ?? '');
    $passwordVal = trim($_POST['password'] ?? '');

    if (empty($usernameVal) || empty($passwordVal)) {
        $errorMessage = 'Please enter both Username and Password.';
    } else {
        if (adminLogin($usernameVal, $passwordVal)) {
            header("Location: $adminBase/index.php");
            exit;
        } else {
            $errorMessage = 'Invalid Username or Password. Please try again.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login — Shipra Chauhan Editorial Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= $adminBase ?>/assets/css/admin.css">
  <style>
    body.login-body {
      background: #0B1914;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #E2E8F0;
      position: relative;
      overflow-x: hidden;
    }
    .login-body::before {
      content: '';
      position: absolute;
      top: -20%;
      right: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(183, 154, 98, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .login-body::after {
      content: '';
      position: absolute;
      bottom: -20%;
      left: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(15, 60, 42, 0.3) 0%, transparent 70%);
      pointer-events: none;
    }
    .login-box {
      width: 100%;
      max-width: 440px;
      background: #11251E;
      border: 1px solid rgba(183, 154, 98, 0.25);
      border-radius: 16px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(183, 154, 98, 0.08);
      padding: 2.5rem 2.25rem;
      position: relative;
      z-index: 10;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .login-monogram {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #B79A62 0%, #D4AF37 100%);
      color: #0A1A14;
      font-weight: 800;
      font-size: 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      margin-bottom: 1rem;
      letter-spacing: -0.03em;
      box-shadow: 0 8px 20px rgba(183, 154, 98, 0.3);
    }
    .login-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      margin-bottom: 0.35rem;
    }
    .login-subtitle {
      font-size: 0.825rem;
      color: #94A3B8;
      font-weight: 500;
    }
    .login-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.6rem;
      padding: 0.2rem 0.65rem;
      background: rgba(183, 154, 98, 0.12);
      border: 1px solid rgba(183, 154, 98, 0.3);
      color: #E6C875;
      font-size: 0.725rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-radius: 999px;
    }
    .login-alert {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #FCA5A5;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .login-alert.success {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.4);
      color: #6EE7B7;
    }
    .login-field {
      margin-bottom: 1.35rem;
    }
    .login-field label {
      display: block;
      font-size: 0.825rem;
      font-weight: 600;
      color: #CBD5E1;
      margin-bottom: 0.45rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .login-input-wrap {
      position: relative;
    }
    .login-input {
      width: 100%;
      background: #0A1813;
      border: 1.5px solid rgba(183, 154, 98, 0.25);
      border-radius: 10px;
      padding: 0.85rem 1rem;
      color: #FFFFFF;
      font-size: 0.95rem;
      font-family: inherit;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .login-input:focus {
      outline: none;
      border-color: #D4AF37;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
      background: #07120E;
    }
    .password-toggle {
      position: absolute;
      right: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #94A3B8;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
    }
    .password-toggle:hover {
      color: #E2E8F0;
    }
    .login-btn {
      width: 100%;
      background: linear-gradient(135deg, #B79A62 0%, #D4AF37 100%);
      color: #0A1A14;
      font-weight: 800;
      font-size: 0.95rem;
      border: none;
      border-radius: 10px;
      padding: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 8px 20px rgba(183, 154, 98, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.75rem;
    }
    .login-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 25px rgba(183, 154, 98, 0.4);
      background: linear-gradient(135deg, #C2A56D 0%, #E0BC48 100%);
    }
    .login-footer {
      text-align: center;
      margin-top: 1.75rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.775rem;
      color: #64748B;
    }
    .login-footer a {
      color: #B79A62;
      text-decoration: none;
      font-weight: 600;
    }
    .login-footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body class="login-body">

  <div class="login-box">
    <div class="login-header">
      <div class="login-monogram">SC</div>
      <h1 class="login-title">Shipra Chauhan</h1>
      <div class="login-subtitle">Editorial Studio &amp; Lead Management</div>
      <div class="login-badge">
        <span>🔒 Secure Admin Access</span>
      </div>
    </div>

    <?php if (isset($_GET['logged_out'])): ?>
      <div class="login-alert success">
        <span>✓ You have been securely logged out.</span>
      </div>
    <?php endif; ?>

    <?php if ($errorMessage): ?>
      <div class="login-alert">
        <span>⚠️ <?= htmlspecialchars($errorMessage) ?></span>
      </div>
    <?php endif; ?>

    <form method="POST" action="<?= $adminBase ?>/login.php" autocomplete="on">
      <div class="login-field">
        <label for="username">Admin Username / ID</label>
        <div class="login-input-wrap">
          <input 
            type="text" 
            id="username" 
            name="username" 
            class="login-input" 
            placeholder="e.g. admin" 
            value="<?= htmlspecialchars($usernameVal) ?>" 
            required 
            autofocus
          >
        </div>
      </div>

      <div class="login-field">
        <label for="password">Password</label>
        <div class="login-input-wrap">
          <input 
            type="password" 
            id="password" 
            name="password" 
            class="login-input" 
            placeholder="••••••••••••" 
            required
          >
          <button type="button" class="password-toggle" id="togglePasswordBtn">Show</button>
        </div>
      </div>

      <button type="submit" class="login-btn">
        <span>Sign In to Studio</span>
        <span>→</span>
      </button>
    </form>

    <div class="login-footer">
      <span>Protected by Shipra Chauhan CMS Engine</span>
      <div style="margin-top: 0.5rem;">
        <a href="<?= $appBase ?>/" target="_blank">← Return to Public Website</a>
      </div>
    </div>
  </div>

  <script>
    const toggleBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('password');
    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleBtn.textContent = 'Hide';
        } else {
          passwordInput.type = 'password';
          toggleBtn.textContent = 'Show';
        }
      });
    }
  </script>
</body>
</html>
