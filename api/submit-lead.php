<?php
/**
 * SHIPRA CHAUHAN SEO — UNIVERSAL LEAD CAPTURE API
 * Accepts JSON or POST form submissions, saves to MySQL leads table
 */
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Support both JSON payloads and standard form POST
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$name = trim($input['name'] ?? $input['full_name'] ?? $input['client_name'] ?? '');
$email = trim($input['email'] ?? $input['email_address'] ?? '');
$phone = trim($input['phone'] ?? $input['contact'] ?? $input['contact_no'] ?? $input['phone_number'] ?? $input['mobile'] ?? '');
$website = trim($input['website'] ?? $input['url'] ?? $input['site_url'] ?? '');
$challenges = trim($input['challenges_goals'] ?? $input['challenges'] ?? $input['message'] ?? $input['goals'] ?? '');

if (!empty($website)) {
    $challenges = "Target Website: " . $website . (!empty($challenges) ? "\nGoals: " . $challenges : "");
}

// Extract and normalize page source
$pageSource = trim($input['page_source'] ?? $input['page'] ?? '');
if (empty($pageSource) && !empty($_SERVER['HTTP_REFERER'])) {
    $refPath = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_PATH);
    if ($refPath) $pageSource = $refPath;
}
$pageSource = str_ireplace(['/shiprachauhan', '/shipra-chauhan'], '', $pageSource);
$pageSource = preg_replace('/(\/index\.(html|php)|\.html)$/i', '', $pageSource);
if (empty($pageSource) || $pageSource === '') {
    $pageSource = '/';
}

$formType = trim($input['form_type'] ?? 'Website Inquiry');

// Validation: Require Name and at least Email or Phone
if (empty($name)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please provide your Full Name.'
    ]);
    exit;
}

if (empty($email) && empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please provide an Email Address or Phone Number.'
    ]);
    exit;
}

if (empty($phone)) {
    $phone = 'Not Provided';
}
if (empty($email)) {
    $email = 'Not Provided';
}

try {
    $pdo = getDbConnection();
    if (!$pdo) {
        throw new Exception('Database connection unavailable.');
    }

    // Ensure leads table exists
    ensureTablesExist($pdo);

    $stmt = $pdo->prepare("
        INSERT INTO leads (`name`, `email`, `phone`, `challenges_goals`, `page_source`, `form_type`, `created_at`)
        VALUES (:name, :email, :phone, :challenges, :page_source, :form_type, NOW())
    ");

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':challenges' => $challenges,
        ':page_source' => $pageSource,
        ':form_type' => $formType
    ]);

    $leadId = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your inquiry has been received. Shipra will review your request within 24 hours.',
        'lead_id' => $leadId
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Unable to save request: ' . $e->getMessage()
    ]);
}