<?php
// Cart View
require_once __DIR__ . '/../Data/CourseData.php';

$cart = $_SESSION['cart'] ?? [];
$cart_items = [];
$subtotal = 0;

foreach ($cart as $id => $qty) {
    $course = getCourse($id);
    if ($course) {
        $cart_items[] = $course;
        $subtotal += $course['price'];
    }
}

$vat = $subtotal * 0.20; // Assuming prices include VAT, but let's say we calculate it for display
// Actually usually prices are inclusive. Let's assume inclusive for B2C.
// If inclusive: VAT = Price - (Price / 1.2)
$vat_amount = $subtotal - ($subtotal / 1.2);
$total = $subtotal; // If inclusive
?>

<div class="container" style="padding: 3rem 1rem;">
    <h1 style="margin-bottom: 2rem;">Your Shopping Cart</h1>
    
    <?php if (empty($cart_items)): ?>
        <div style="text-align: center; padding: 4rem; background: #f8f9fa; border-radius: 8px;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
            <h3>Your cart is empty</h3>
            <p style="color: #666; margin-bottom: 2rem;">Looks like you haven't added any courses yet.</p>
            <a href="/courses" class="btn btn-primary">Browse Courses</a>
        </div>
    <?php
else: ?>
    
    <div style="display: grid; grid-template-columns: 1fr 350px; gap: 2rem; align-items: start;">
        
        <!-- Cart Items -->
        <div>
            <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f9fa; border-bottom: 1px solid #eee; text-align: left;">
                            <th style="padding: 1rem;">Course</th>
                            <th style="padding: 1rem;">Price</th>
                            <th style="padding: 1rem;">Total</th>
                            <th style="padding: 1rem;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($cart_items as $item): ?>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 1.5rem 1rem;">
                                <div style="display: flex; gap: 1rem; align-items: center;">
                                    <div style="width: 60px; height: 60px; background: <?php echo $item['badge_color']; ?>20; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 1.5rem;">
                                        <?php echo $item['icon']; ?>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; color: var(--color-primary-navy);"><?php echo $item['title']; ?></div>
                                        <div style="font-size: 0.85rem; color: #666;"><?php echo $item['category']; ?> | Online</div>
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 1rem;">£<?php echo number_format($item['price'], 2); ?></td>
                            <td style="padding: 1rem; font-weight: bold;">£<?php echo number_format($item['price'], 2); ?></td>
                            <td style="padding: 1rem; text-align: right;">
                                <a href="/cart-remove?id=<?php echo $item['id']; ?>" style="color: #dc3545; font-size: 0.9rem; text-decoration: none;">&times; Remove</a>
                            </td>
                        </tr>
                        <?php
    endforeach; ?>
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 2rem;">
                <a href="/courses" class="text-teal" style="font-weight: 500;">&larr; Continue Shopping</a>
            </div>
        </div>
        
        <!-- Order Summary -->
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid #eee;">
            <h3 style="margin-top: 0; margin-bottom: 1.5rem;">Order Summary</h3>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #555;">
                <span>Subtotal</span>
                <span>£<?php echo number_format($subtotal, 2); ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #555;">
                <span>VAT (Included)</span>
                <span>£<?php echo number_format($vat_amount, 2); ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy); border-top: 1px solid #ddd; padding-top: 1rem;">
                <span>Total</span>
                <span>£<?php echo number_format($total, 2); ?></span>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <input type="text" placeholder="Promo Code" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 0.5rem;">
                <button class="btn btn-secondary" style="width: 100%; font-size: 0.9rem; padding: 0.5rem;">Apply Code</button>
            </div>
            
            <a href="/checkout" class="btn btn-primary" style="width: 100%; text-align: center; display: block;">Proceed to Checkout</a>
            
            <div style="margin-top: 1rem; text-align: center;">
                <span style="font-size: 0.85rem; color: #666;">We accept: Visa, MC, Amex, PayPal</span>
            </div>
        </div>
        
    </div>
    <?php
endif; ?>
</div>
