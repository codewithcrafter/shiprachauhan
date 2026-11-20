<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — DELETE LEAD HANDLER
 */
require_once dirname(__DIR__) . '/config/auth.php';
requireAdminAuth();

$adminBase = getAdminBaseUrl();
$id = intval($_GET['id'] ?? 0);

if ($id > 0) {
    $pdo = getDbConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM `leads` WHERE `id` = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
    }
}

header("Location: $adminBase/index.php?lead_deleted=1");
exit;

