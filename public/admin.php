<?php

require_once __DIR__ . '/index.php'; // Reuse autoloader from index.php (or extract it to bootstrap.php in Phase 3)

use App\Controllers\AdminController;

// Simple routing for Admin
$controller = new AdminController();
$controller->handleRequest();
