<?php
/**
 * SHIPRA CHAUHAN EDITORIAL STUDIO — DELETE ARTICLE
 */
require_once dirname(__DIR__) . '/config/db.php';

$pdo = getDbConnection();
$adminBase = getAdminBaseUrl();
$id = isset($_GET['id']) ? intval($_GET['id']) : (isset($_POST['id']) ? intval($_POST['id']) : 0);

if ($id && $pdo) {
    try {
        // Fetch article to delete any uploaded custom featured image if needed
        $stmt = $pdo->prepare("SELECT `featured_image` FROM `blogs` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        if ($row && !empty($row['featured_image'])) {
            $imgPath = dirname(__DIR__) . $row['featured_image'];
            if (strpos($row['featured_image'], '/admin/uploads/') === 0 && file_exists($imgPath)) {
                @unlink($imgPath);
            }
        }

        $delStmt = $pdo->prepare("DELETE FROM `blogs` WHERE `id` = :id");
        $delStmt->execute([':id' => $id]);
        header("Location: " . $adminBase . "/index.php?msg=deleted");
        exit;
    } catch (Exception $e) {
        header("Location: " . $adminBase . "/index.php?error=" . urlencode($e->getMessage()));
        exit;
    }
}

header("Location: " . $adminBase . "/index.php");
exit;

