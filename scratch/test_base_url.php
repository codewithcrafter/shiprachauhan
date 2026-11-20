<?php
function getAppBaseUrl($script) {
    if (strpos($script, '/admin') !== false) {
        $parts = explode('/admin', $script);
        return rtrim($parts[0], '/\\');
    }
    $dir = dirname($script);
    return ($dir === '/' || $dir === '\\') ? '' : rtrim($dir, '/\\');
}

echo "Subfolder admin: " . getAppBaseUrl('/shiprachauhan/admin/index.php') . "\n";
echo "Root admin: " . getAppBaseUrl('/admin/index.php') . "\n";
echo "Subfolder root: " . getAppBaseUrl('/shiprachauhan/index.php') . "\n";
echo "Root: " . getAppBaseUrl('/index.php') . "\n";

