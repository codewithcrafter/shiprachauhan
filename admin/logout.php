<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — LOGOUT HANDLER
 */
require_once dirname(__DIR__) . '/config/auth.php';

$adminBase = getAdminBaseUrl();
adminLogout();

header("Location: $adminBase/login.php?logged_out=1");
exit;

