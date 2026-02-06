<?php

namespace App\Controllers;

use App\Models\Admin;
use App\Models\Course;

class AdminController
{

    public function handleRequest()
    {
        session_start();

        $action = $_GET['action'] ?? 'dashboard';

        // Auth Check
        if (!isset($_SESSION['admin_logged_in']) && $action !== 'login' && $action !== 'do_login') {
            header('Location: /admin.php?action=login');
            exit;
        }

        switch ($action) {
            case 'login':
                $this->render('login');
                break;

            case 'do_login':
                $this->doLogin();
                break;

            case 'logout':
                session_destroy();
                header('Location: /admin.php?action=login');
                exit;

            case 'courses':
                $courseModel = new Course();
                $courses = $courseModel->findAll();
                $this->render('courses_list', ['courses' => $courses]);
                break;

            case 'dashboard':
            default:
                $this->render('dashboard');
                break;
        }
    }

    private function doLogin()
    {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        $admin = new Admin();
        $user = $admin->authenticate($email, $password);

        if ($user) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_email'] = $user['email'];
            header('Location: /admin.php?action=dashboard');
        }
        else {
            $this->render('login', ['error' => 'Invalid credentials']);
        }
    }

    private function render($view, $data = [])
    {
        extract($data);
        // Clean layout for admin
        require __DIR__ . '/../Views/admin/layout_header.php';
        require __DIR__ . '/../Views/admin/' . $view . '.php';
        require __DIR__ . '/../Views/admin/layout_footer.php';
    }
}
