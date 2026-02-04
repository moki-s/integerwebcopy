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

use App\Database;

// Basic Router Placeholder
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$uri = strtok($requestUri, '?');

// Simple Routing Table (will expand later)
echo "<h1>Integer Training - Under Construction</h1>";
echo "<p>URI: " . htmlspecialchars($uri) . "</p>";

try {
    $db = Database::getInstance()->getConnection();
    echo "<p>Database connection initialized.</p>";
}
catch (Exception $e) {
    echo "<p>Database connection failed: " . $e->getMessage() . "</p>";
}
