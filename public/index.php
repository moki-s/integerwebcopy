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

// --- Stripe Payment: Create PaymentIntent ---
if ($uri === '/checkout-process' && $requestMethod === 'POST') {
    require_once __DIR__ . '/../src/Config/Stripe.php';
    require_once __DIR__ . '/../src/Config/Supabase.php';
    require_once __DIR__ . '/../src/Data/CourseData.php';

    header('Content-Type: application/json');

    $input = json_decode(file_get_contents('php://input'), true);
    $pmId      = trim($input['payment_method_id'] ?? '');
    $firstName = trim($input['first_name'] ?? '');
    $lastName  = trim($input['last_name'] ?? '');
    $email     = trim($input['email'] ?? '');
    $phone     = trim($input['phone'] ?? '');

    // Validate
    if (!$pmId || !$firstName || !$lastName || !$email || !$phone) {
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Invalid email address.']);
        exit;
    }

    // Recalculate total server-side from session cart
    $cart = $_SESSION['cart'] ?? [];
    if (empty($cart)) {
        echo json_encode(['error' => 'Your cart is empty.']);
        exit;
    }

    $total = 0;
    $courseNames = [];
    $courseIds = [];
    foreach ($cart as $id => $qty) {
        $course = getCourse($id);
        if ($course) {
            $total += $course['price'];
            $courseNames[] = $course['title'];
            $courseIds[] = $id;
        }
    }

    if ($total <= 0) {
        echo json_encode(['error' => 'Invalid cart total.']);
        exit;
    }

    $amountPence = (int) round($total * 100);
    $customerName = $firstName . ' ' . $lastName;

    // Create PaymentIntent with manual confirmation
    $result = stripeRequest('/v1/payment_intents', [
        'amount'              => $amountPence,
        'currency'            => 'gbp',
        'payment_method'      => $pmId,
        'confirm'             => 'true',
        'confirmation_method' => 'manual',
        'receipt_email'       => $email,
        'description'         => 'Integer Training - ' . implode(', ', $courseNames),
        'metadata[customer_name]'  => $customerName,
        'metadata[customer_email]' => $email,
        'metadata[customer_phone]' => $phone,
        'metadata[course_ids]'     => implode(', ', $courseIds),
    ]);

    if (is_string($result)) {
        echo json_encode(['error' => $result]);
        exit;
    }

    $status = $result['status'] ?? '';

    if ($status === 'succeeded') {
        // Save order to Supabase
        $orderNumber = 'INT-' . strtoupper(substr(md5(uniqid()), 0, 8));
        supabaseInsert('orders', [
            'order_number'     => $orderNumber,
            'customer_name'    => $customerName,
            'customer_email'   => $email,
            'customer_phone'   => $phone,
            'courses'          => implode(', ', $courseNames),
            'course_ids'       => implode(', ', $courseIds),
            'total'            => $total,
            'stripe_payment_id'=> $result['id'],
            'status'           => 'paid',
        ]);

        // Store for success page and clear cart
        $_SESSION['last_order'] = [
            'order_number' => $orderNumber,
            'total'        => $total,
            'courses'      => $courseNames,
            'email'        => $email,
            'name'         => $customerName,
        ];
        $_SESSION['cart'] = [];

        echo json_encode(['success' => true]);
        exit;
    }

    if ($status === 'requires_action') {
        echo json_encode([
            'requires_action'             => true,
            'payment_intent_client_secret' => $result['client_secret'],
        ]);
        exit;
    }

    echo json_encode(['error' => 'Payment failed. Please try again.']);
    exit;
}

// --- Stripe Payment: Confirm after 3DS ---
if ($uri === '/checkout-confirm' && $requestMethod === 'POST') {
    require_once __DIR__ . '/../src/Config/Stripe.php';
    require_once __DIR__ . '/../src/Config/Supabase.php';
    require_once __DIR__ . '/../src/Data/CourseData.php';

    header('Content-Type: application/json');

    $input = json_decode(file_get_contents('php://input'), true);
    $piId  = trim($input['payment_intent_id'] ?? '');

    if (!$piId) {
        echo json_encode(['error' => 'Missing payment intent ID.']);
        exit;
    }

    $result = stripeRequest('/v1/payment_intents/' . $piId . '/confirm', []);

    if (is_string($result)) {
        echo json_encode(['error' => $result]);
        exit;
    }

    if (($result['status'] ?? '') === 'succeeded') {
        // Rebuild order data from cart + PI metadata
        $cart = $_SESSION['cart'] ?? [];
        $total = 0;
        $courseNames = [];
        $courseIds = [];
        foreach ($cart as $id => $qty) {
            $course = getCourse($id);
            if ($course) {
                $total += $course['price'];
                $courseNames[] = $course['title'];
                $courseIds[] = $id;
            }
        }

        $customerName  = $result['metadata']['customer_name'] ?? 'Customer';
        $customerEmail = $result['metadata']['customer_email'] ?? '';
        $customerPhone = $result['metadata']['customer_phone'] ?? '';

        $orderNumber = 'INT-' . strtoupper(substr(md5(uniqid()), 0, 8));
        supabaseInsert('orders', [
            'order_number'     => $orderNumber,
            'customer_name'    => $customerName,
            'customer_email'   => $customerEmail,
            'customer_phone'   => $customerPhone,
            'courses'          => implode(', ', $courseNames),
            'course_ids'       => implode(', ', $courseIds),
            'total'            => $total,
            'stripe_payment_id'=> $result['id'],
            'status'           => 'paid',
        ]);

        $_SESSION['last_order'] = [
            'order_number' => $orderNumber,
            'total'        => $total,
            'courses'      => $courseNames,
            'email'        => $customerEmail,
            'name'         => $customerName,
        ];
        $_SESSION['cart'] = [];

        echo json_encode(['success' => true]);
        exit;
    }

    echo json_encode(['error' => 'Payment could not be confirmed. Please try again.']);
    exit;
}

// --- Enquiry Form Handler ---
if ($uri === '/enquiry' && $requestMethod === 'POST') {
    require_once __DIR__ . '/../src/Config/Supabase.php';

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $course = trim($_POST['course_interest'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $page = trim($_POST['page'] ?? 'unknown');

    // Basic validation
    if (!$name || !$email || !$phone) {
        $_SESSION['form_error'] = 'Please fill in all required fields.';
        header('Location: ' . ($_POST['redirect'] ?? '/contact'));
        exit;
    }

    $result = supabaseInsert('enquiries', [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'course_interest' => $course ?: null,
        'message' => $message ?: null,
        'page' => $page,
        'source' => 'website',
    ]);

    if ($result === true) {
        $_SESSION['form_success'] = 'Thank you! We\'ll be in touch shortly.';
    } else {
        $_SESSION['form_error'] = 'Something went wrong. Please try again.';
    }

    header('Location: ' . ($_POST['redirect'] ?? '/contact'));
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
    // Redirect to cart if empty
    $cart = $_SESSION['cart'] ?? [];
    if (empty($cart)) {
        header('Location: /cart');
        exit;
    }
    $view = 'checkout.php';
}
elseif ($uri === '/order-success') {
    if (empty($_SESSION['last_order'])) {
        header('Location: /');
        exit;
    }
    $view = 'order-success.php';
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
