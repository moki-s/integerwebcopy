<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integer Admin</title>
    <link rel="stylesheet" href="/assets/css/variables.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body { background: #f0f2f5; font-family: var(--font-body); display: flex; min-height: 100vh; }
        .admin-sidebar { width: 250px; background: var(--color-primary-navy); color: white; display: flex; flex-direction: column; }
        .admin-content { flex: 1; padding: 2rem; overflow-y: auto; }
        .admin-nav a { display: block; padding: 1rem; color: #cbd5e0; text-decoration: none; }
        .admin-nav a:hover, .admin-nav a.active { background: rgba(255,255,255,0.1); color: white; border-left: 3px solid var(--color-integer-yellow); }
        .card { background: white; border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm); margin-bottom: 1.5rem; }
    </style>
</head>
<body>
<?php if (isset($_SESSION['admin_logged_in'])): ?>
    <div class="admin-sidebar">
        <div style="padding: 1.5rem; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 24px; height: 24px; background: var(--color-integer-yellow); border-radius: 50%;"></div>
            Integer Admin
        </div>
        <nav class="admin-nav">
            <a href="/admin.php?action=dashboard" class="<?php echo($_GET['action'] ?? '') == 'dashboard' ? 'active' : ''; ?>">Dashboard</a>
            <a href="/admin.php?action=courses" class="<?php echo($_GET['action'] ?? '') == 'courses' ? 'active' : ''; ?>">Courses</a>
            <a href="/admin.php?action=orders">Orders</a>
            <a href="/admin.php?action=users">Users</a>
            <a href="/admin.php?action=settings">Settings</a>
            <a href="/admin.php?action=logout" style="margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1);">Logout</a>
        </nav>
    </div>
<?php
endif; ?>
    <div class="admin-content">
