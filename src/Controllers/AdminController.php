<?php

namespace App\Controllers;

class AdminController
{

    public function handleRequest()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        require_once __DIR__ . '/../Config/AdminAuth.php';

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

            case 'enquiries':
                require_once __DIR__ . '/../Config/Supabase.php';
                $result = supabaseSelect('enquiries');
                if (is_string($result)) {
                    $this->render('enquiries', ['enquiries' => [], 'error' => $result]);
                } else {
                    $this->render('enquiries', ['enquiries' => $result]);
                }
                break;

            case 'orders':
                require_once __DIR__ . '/../Config/Supabase.php';
                $result = supabaseSelect('orders');
                if (is_string($result)) {
                    $this->render('orders', ['orders' => [], 'error' => $result]);
                } else {
                    $this->render('orders', ['orders' => $result]);
                }
                break;

            case 'courses_prices':
                require_once __DIR__ . '/../Data/CourseData.php';
                $success = $_SESSION['flash_success'] ?? null;
                $error = $_SESSION['flash_error'] ?? null;
                unset($_SESSION['flash_success'], $_SESSION['flash_error']);
                $this->render('courses_prices', [
                    'courses' => getAllCourses(),
                    'success' => $success,
                    'error' => $error,
                ]);
                break;

            case 'csv_download':
                $this->handleCsvDownload();
                break;

            case 'csv_upload':
                $this->handleCsvUpload();
                break;

            case 'dashboard':
            default:
                require_once __DIR__ . '/../Config/Supabase.php';
                $ordersResult = supabaseSelect('orders');
                $enquiriesResult = supabaseSelect('enquiries');
                $data = [];
                if (is_string($ordersResult)) {
                    $data['orders'] = [];
                    $data['orders_error'] = $ordersResult;
                } else {
                    $data['orders'] = $ordersResult;
                }
                if (is_string($enquiriesResult)) {
                    $data['enquiries'] = [];
                    $data['enquiries_error'] = $enquiriesResult;
                } else {
                    $data['enquiries'] = $enquiriesResult;
                }
                $this->render('dashboard', $data);
                break;
        }
    }

    private function doLogin()
    {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if (adminAuthenticate($email, $password)) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_email'] = $email;
            header('Location: /admin.php?action=dashboard');
            exit;
        } else {
            $this->render('login', ['error' => 'Invalid credentials']);
        }
    }

    private function handleCsvDownload()
    {
        require_once __DIR__ . '/../Data/CourseData.php';

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="course_prices_' . date('Y-m-d') . '.csv"');

        $out = fopen('php://output', 'w');

        // UTF-8 BOM for Excel
        fwrite($out, "\xEF\xBB\xBF");

        // Header row
        fputcsv($out, ['id', 'title', 'category', 'price', 'old_price', 'monthly_price', 'old_monthly_price']);

        foreach (getAllCourses() as $course) {
            fputcsv($out, [
                $course['id'],
                $course['title'],
                $course['category'],
                $course['price'],
                $course['old_price'],
                $course['monthly_price'],
                $course['old_monthly_price'] ?? 0,
            ]);
        }

        fclose($out);
        exit;
    }

    private function handleCsvUpload()
    {
        if (empty($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) {
            $_SESSION['flash_error'] = 'No file uploaded or upload error.';
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        $file = $_FILES['csv_file'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if ($ext !== 'csv') {
            $_SESSION['flash_error'] = 'Only CSV files are accepted.';
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        require_once __DIR__ . '/../Data/CourseData.php';
        $allCourses = getAllCourses();

        // Parse CSV
        $handle = fopen($file['tmp_name'], 'r');
        if (!$handle) {
            $_SESSION['flash_error'] = 'Could not read uploaded file.';
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        // Skip BOM if present
        $bom = fread($handle, 3);
        if ($bom !== "\xEF\xBB\xBF") {
            rewind($handle);
        }

        // Read header
        $header = fgetcsv($handle);
        if (!$header) {
            fclose($handle);
            $_SESSION['flash_error'] = 'CSV file is empty.';
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        $header = array_map('trim', $header);
        $required = ['id', 'price', 'old_price', 'monthly_price', 'old_monthly_price'];
        $missing = array_diff($required, $header);
        if (!empty($missing)) {
            fclose($handle);
            $_SESSION['flash_error'] = 'Missing required columns: ' . implode(', ', $missing);
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        $colMap = array_flip($header);
        $updates = [];
        $errors = [];
        $lineNum = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $lineNum++;
            if (count($row) < count($header)) {
                continue; // skip incomplete rows
            }

            $id = trim($row[$colMap['id']]);
            if (!isset($allCourses[$id])) {
                $errors[] = "Line {$lineNum}: Unknown course ID '{$id}'";
                continue;
            }

            $priceFields = ['price', 'old_price', 'monthly_price', 'old_monthly_price'];
            $courseUpdate = [];
            foreach ($priceFields as $field) {
                $val = trim($row[$colMap[$field]]);
                if (!is_numeric($val) || (float)$val < 0) {
                    $errors[] = "Line {$lineNum}: Invalid {$field} value '{$val}' for {$id}";
                    continue 2;
                }
                $courseUpdate[$field] = (int)round((float)$val);
            }

            $updates[$id] = $courseUpdate;
        }
        fclose($handle);

        if (!empty($errors)) {
            $_SESSION['flash_error'] = implode("\n", $errors);
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        if (empty($updates)) {
            $_SESSION['flash_error'] = 'No valid price updates found in CSV.';
            header('Location: /admin.php?action=courses_prices');
            exit;
        }

        // Rewrite CourseData.php
        $result = $this->rewriteCourseDataPrices($updates);
        if ($result === true) {
            $_SESSION['flash_success'] = 'Prices updated for ' . count($updates) . ' courses.';
        } else {
            $_SESSION['flash_error'] = 'Failed to update prices: ' . $result;
        }

        header('Location: /admin.php?action=courses_prices');
        exit;
    }

    /**
     * Rewrite price values in CourseData.php using regex replacement.
     * Creates a backup, writes to .tmp, validates syntax, then renames.
     * Returns true on success, error string on failure.
     */
    private function rewriteCourseDataPrices(array $updates)
    {
        $filePath = __DIR__ . '/../Data/CourseData.php';
        $content = file_get_contents($filePath);
        if ($content === false) {
            return 'Could not read CourseData.php';
        }

        // Create backup
        $backupPath = $filePath . '.bak.' . date('YmdHis');
        if (!copy($filePath, $backupPath)) {
            return 'Could not create backup file';
        }

        foreach ($updates as $courseId => $prices) {
            // Find the course block by its ID string
            $idPattern = preg_quote($courseId, '/');

            // For each price field, find and replace within the course block
            foreach ($prices as $field => $value) {
                // Match: 'field' => NUMBER  (within context following the course ID)
                // We use a pattern that finds the field after the course ID
                $fieldPattern = preg_quote($field, '/');
                $pattern = "/('id'\s*=>\s*'" . $idPattern . "'.*?'" . $fieldPattern . "'\s*=>\s*)\d+/s";
                $replacement = '${1}' . $value;
                $newContent = preg_replace($pattern, $replacement, $content, 1);
                if ($newContent !== null) {
                    $content = $newContent;
                }
            }
        }

        // Write to temp file
        $tmpPath = $filePath . '.tmp';
        if (file_put_contents($tmpPath, $content) === false) {
            return 'Could not write temporary file';
        }

        // Validate PHP syntax
        $phpBin = PHP_BINARY ?: 'php';
        $output = [];
        $exitCode = 0;
        exec($phpBin . ' -l ' . escapeshellarg($tmpPath) . ' 2>&1', $output, $exitCode);
        if ($exitCode !== 0) {
            unlink($tmpPath);
            return 'Syntax validation failed: ' . implode(' ', $output);
        }

        // Atomic rename
        if (!rename($tmpPath, $filePath)) {
            unlink($tmpPath);
            return 'Could not replace CourseData.php';
        }

        return true;
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
