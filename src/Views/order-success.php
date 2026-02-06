<?php
// Order Success View
$order = $_SESSION['last_order'] ?? null;
if (!$order) {
    header('Location: /');
    exit;
}

// Clear after reading so refresh won't show stale data
unset($_SESSION['last_order']);
?>

<div class="container" style="padding: 4rem 1rem; max-width: 700px; margin: 0 auto; text-align: center;">

    <!-- Green Checkmark -->
    <div style="width: 80px; height: 80px; background: var(--color-success-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>

    <h1 style="margin-bottom: 0.5rem;">Payment Successful!</h1>
    <p style="color: #555; font-size: 1.1rem; margin-bottom: 2rem;">Thank you for your purchase. A receipt has been sent to your email.</p>

    <!-- Order Details Card -->
    <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-sm); text-align: left; margin-bottom: 2rem;">

        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
            <span style="color: #666; font-size: 0.9rem;">Order Number</span>
            <span style="font-weight: 700; color: var(--color-primary-navy);"><?php echo htmlspecialchars($order['order_number']); ?></span>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
            <span style="color: #666; font-size: 0.9rem;">Customer</span>
            <span style="font-weight: 600;"><?php echo htmlspecialchars($order['name']); ?></span>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
            <span style="color: #666; font-size: 0.9rem;">Email</span>
            <span style="font-weight: 500;"><?php echo htmlspecialchars($order['email']); ?></span>
        </div>

        <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
            <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">Courses Purchased</div>
            <?php foreach ($order['courses'] as $course): ?>
                <div style="font-weight: 500; padding: 0.3rem 0;">&bull; <?php echo htmlspecialchars($course); ?></div>
            <?php endforeach; ?>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 1.2rem;">
            <span style="font-weight: 700; color: var(--color-primary-navy);">Total Paid</span>
            <span style="font-weight: 700; color: var(--color-success-green);">&pound;<?php echo number_format($order['total'], 2); ?></span>
        </div>
    </div>

    <a href="/courses" class="btn btn-primary" style="display: inline-block; padding: 0.9rem 2.5rem; font-size: 1rem;">Browse More Courses</a>
</div>
