<?php
/**
 * SHIPRA CHAUHAN SEO — UNIVERSAL LEAD CAPTURE API
 * Accepts JSON or POST form submissions, saves to MySQL `leads` table
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

$name = trim($input['name'] ?? $input['full_name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? $input['phone_number'] ?? $input['contact'] ?? '');
$challenges = trim($input['challenges_goals'] ?? $input['challenges'] ?? $input['message'] ?? $input['goals'] ?? '');
$pageSource = trim($input['page_source'] ?? $input['page'] ?? $_SERVER['HTTP_REFERER'] ?? '');
$formType = trim($input['form_type'] ?? 'website_lead');

// Basic Validation
if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please provide Name, Email, and Contact Number.'
    ]);
    exit;
}

try {
    $pdo = getDbConnection();
    if (!$pdo) {
        throw new Exception('Database connection unavailable.');
    }

    $stmt = $pdo->prepare("
        INSERT INTO `leads` (`name`, `email`, `phone`, `challenges_goals`, `page_source`, `form_type`, `created_at`)
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
        'error' => 'Unable to save your request right now. Please call or WhatsApp +91 97181 59724 directly.'
    ]);
}
