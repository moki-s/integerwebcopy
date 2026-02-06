<?php

// Custom Autoloader since Composer is not available
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/../src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

session_start(); // Enable Sessions for Cart

use App\Database;

// Basic Router Placeholder
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$uri = strtok($requestUri, '?');

// --- Simple Cart Controller Logic ---
if ($uri === '/cart-add' && $requestMethod === 'POST') {
    $courseId = $_POST['course_id'] ?? null;
    if ($courseId) {
        // Initialize cart if not exists
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
        // Add item (using ID as key, quantity as value)
        $_SESSION['cart'][$courseId] = 1;
    }
    // Redirect back to product page
    header("Location: /product?id=$courseId");
    exit;
}

if ($uri === '/cart-remove') {
    $courseId = $_GET['id'] ?? null;
    if ($courseId && isset($_SESSION['cart'][$courseId])) {
        unset($_SESSION['cart'][$courseId]);
    }
    header("Location: /cart");
    exit;
}

// Simple Routing Table (will expand later)

// Remove query string
$uri = strtok($requestUri, '?');

// Simple Routing Table (will expand later)
// For now, just serve specific views based on URI
// This is a temporary router until we implement a real Controller structure in Phase 2/3.
$view = null;

if ($uri === '/' || $uri === '/index.php') {
    $view = 'home.php';
}
elseif ($uri === '/courses') {
    $view = 'courses.php';
}
elseif ($uri === '/product') {
    $view = 'product.php'; // Placeholder for product details
}
elseif ($uri === '/cart') {
    $view = 'cart.php';
}
elseif ($uri === '/checkout') {
    $view = 'checkout.php';
}
elseif ($uri === '/login') {
    $view = 'student_login.php';
}
elseif ($uri === '/contact') {
    $view = 'contact.php';
}
elseif ($uri === '/branches') {
    $view = 'branches.php';
}
elseif (strpos($uri, '/about') === 0) {
    $section = $_GET['section'] ?? 'history';
    $view = 'about.php';
}
elseif ($uri === '/branches') {
    $view = 'branches.php';
}
else {
// 404
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integer Training - Career Development</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/assets/css/variables.css">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

    <?php
// Quick template include for testing
// In a real app index.php would dispatch to a controller which renders a view.
// For this 'Frontend Template' phase, we might just include header/footer here.

// Check if we are checking database connection
try {
    $db = Database::getInstance()->getConnection();
}
catch (Exception $e) {
    $dbError = $e->getMessage();
}
?>

    <!-- This Index.php is currently acting as the main template renderer for simplicity in Phase 1 -->
    <?php include __DIR__ . '/../src/Templates/Header.php'; ?>

    <main>
        <?php
if ($view && file_exists(__DIR__ . '/../src/Views/' . $view)) {
    include __DIR__ . '/../src/Views/' . $view;
}
else {
    echo '<div class="container" style="padding: 4rem 1rem;">';
    echo '<h1>Integer Training</h1>';
    echo '<p>Welcome to the new platform.</p>';
    if (isset($dbError)) {
        echo '<div style="color: red; padding: 1rem; background: #fee; border-radius: 4px;">Database Connection Failed: ' . htmlspecialchars($dbError) . '</div>';
    }
    else {
        echo '<div style="color: green; padding: 1rem; background: #eef; border-radius: 4px;">Database Connection Successful</div>';
    }
    echo '</div>';
}
?>
    </main>

    <?php include __DIR__ . '/../src/Templates/Footer.php'; ?>

</body>
</html>
