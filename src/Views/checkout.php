<?php
// Checkout View - Dynamic with Stripe Payment
require_once __DIR__ . '/../Data/CourseData.php';
require_once __DIR__ . '/../Config/Stripe.php';

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

// VAT inclusive calculation
$vat_amount = $subtotal - ($subtotal / 1.2);
$total = $subtotal;

$form_error = $_SESSION['checkout_error'] ?? null;
unset($_SESSION['checkout_error']);
?>

<div class="container checkout-container" style="padding: 3rem 1rem;">
    <h1 style="margin-bottom: 2rem; text-align: center;">Secure Checkout</h1>

    <?php if ($form_error): ?>
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; text-align: center; font-weight: 600; max-width: 1100px; margin: 0 auto 1.5rem auto;"><?php echo htmlspecialchars($form_error); ?></div>
    <?php endif; ?>

    <div class="checkout-layout" style="display: grid; grid-template-columns: 1fr 400px; gap: 3rem; max-width: 1100px; margin: 0 auto;">

        <!-- Checkout Form -->
        <div class="checkout-form-col">
            <form id="checkout-form" data-stripe-key="<?php echo htmlspecialchars(STRIPE_PUBLISHABLE_KEY); ?>">
                <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-sm); margin-bottom: 2rem;">
                    <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--color-primary-navy); display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: var(--color-primary-navy); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">1</span>
                        Customer Details
                    </h3>

                    <div class="checkout-name-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <div>
                            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem; font-weight: 500;">First Name <span style="color: var(--color-error-red);">*</span></label>
                            <input type="text" id="first_name" name="first_name" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem; font-weight: 500;">Last Name <span style="color: var(--color-error-red);">*</span></label>
                            <input type="text" id="last_name" name="last_name" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                        </div>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem; font-weight: 500;">Email Address <span style="color: var(--color-error-red);">*</span></label>
                        <input type="email" id="email" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                    </div>

                    <div style="margin-bottom: 0;">
                        <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem; font-weight: 500;">Phone Number <span style="color: var(--color-error-red);">*</span></label>
                        <input type="tel" id="phone" name="phone" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                    </div>
                </div>

                <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-sm);">
                    <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--color-primary-navy); display: flex; align-items: center; gap: 0.5rem;">
                        <span style="background: var(--color-primary-navy); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">2</span>
                        Payment Details
                    </h3>

                    <!-- Stripe Card Element -->
                    <div id="stripe-card-element" style="background: #fff; border: 1px solid #ddd; padding: 0.75rem; border-radius: 4px;"></div>
                    <div id="stripe-card-errors" style="color: #e53e3e; font-size: 0.85rem; margin-top: 0.5rem; min-height: 1.2em;"></div>

                    <button type="submit" id="submit-btn" class="btn btn-primary checkout-pay-btn" style="width: 100%; margin-top: 1.5rem; font-size: 1.1rem; padding: 1rem;">
                        <span id="btn-text">Pay &pound;<?php echo number_format($total, 2); ?></span>
                        <span id="btn-spinner" style="display: none;">Processing...</span>
                    </button>
                    <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #666;">
                        🔒 256-bit SSL Secure Encrypted Payment
                    </div>
                </div>
            </form>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="checkout-summary" style="background: #f0f4f8; border-radius: var(--radius-md); padding: 2rem; height: fit-content;">
            <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--color-primary-navy);">Order Summary</h3>

            <?php foreach ($cart_items as $item): ?>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: white; display: flex; align-items: center; justify-content: center; border-radius: 4px; flex-shrink: 0;"><?php echo $item['icon']; ?></div>
                <div style="min-width: 0;">
                     <div style="font-weight: 600; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><?php echo htmlspecialchars($item['title']); ?></div>
                     <div style="font-size: 0.85rem; color: #666;">Qty: 1</div>
                     <div style="font-weight: 600; font-size: 0.9rem;">&pound;<?php echo number_format($item['price'], 2); ?></div>
                </div>
            </div>
            <?php endforeach; ?>

            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: #555;">
                <span>Subtotal</span>
                <span>&pound;<?php echo number_format($subtotal, 2); ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; color: #555;">
                <span>VAT (Included)</span>
                <span>&pound;<?php echo number_format($vat_amount, 2); ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; border-top: 1px solid #ddd; padding-top: 1rem; font-weight: 700; color: var(--color-primary-navy); font-size: 1.2rem;">
                <span>Total to Pay</span>
                <span>&pound;<?php echo number_format($total, 2); ?></span>
            </div>

            <a href="/cart" style="display: block; text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--color-accent-teal); font-weight: 500;">&larr; Back to Cart</a>
        </div>

    </div>
</div>

<script src="https://js.stripe.com/v3/"></script>
<script>
(function() {
    var form = document.getElementById('checkout-form');
    var stripeKey = form.getAttribute('data-stripe-key');
    var stripe = Stripe(stripeKey);
    var elements = stripe.elements();

    var card = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#1a1a1a',
                fontFamily: '"Inter", sans-serif',
                '::placeholder': { color: '#999' }
            },
            invalid: { color: '#e53e3e' }
        }
    });
    card.mount('#stripe-card-element');

    var errorEl = document.getElementById('stripe-card-errors');
    card.on('change', function(event) {
        errorEl.textContent = event.error ? event.error.message : '';
    });

    var isProcessing = false;
    var submitBtn = document.getElementById('submit-btn');
    var btnText = document.getElementById('btn-text');
    var btnSpinner = document.getElementById('btn-spinner');

    function setLoading(loading) {
        isProcessing = loading;
        submitBtn.disabled = loading;
        btnText.style.display = loading ? 'none' : 'inline';
        btnSpinner.style.display = loading ? 'inline' : 'none';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isProcessing) return;

        var firstName = document.getElementById('first_name').value.trim();
        var lastName = document.getElementById('last_name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();

        if (!firstName || !lastName || !email || !phone) {
            errorEl.textContent = 'Please fill in all required fields.';
            return;
        }

        errorEl.textContent = '';
        setLoading(true);

        stripe.createPaymentMethod({ type: 'card', card: card, billing_details: { name: firstName + ' ' + lastName, email: email, phone: phone } })
        .then(function(result) {
            if (result.error) {
                errorEl.textContent = result.error.message;
                setLoading(false);
                return;
            }
            return fetch('/checkout-process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payment_method_id: result.paymentMethod.id,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone
                })
            });
        })
        .then(function(response) {
            if (!response) return;
            return response.json();
        })
        .then(function(data) {
            if (!data) return;
            if (data.success) {
                window.location.href = '/order-success';
                return;
            }
            if (data.requires_action) {
                stripe.handleCardAction(data.payment_intent_client_secret)
                .then(function(actionResult) {
                    if (actionResult.error) {
                        errorEl.textContent = actionResult.error.message;
                        setLoading(false);
                        return;
                    }
                    return fetch('/checkout-confirm', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ payment_intent_id: actionResult.paymentIntent.id })
                    });
                })
                .then(function(response) {
                    if (!response) return;
                    return response.json();
                })
                .then(function(confirmData) {
                    if (!confirmData) return;
                    if (confirmData.success) {
                        window.location.href = '/order-success';
                    } else {
                        errorEl.textContent = confirmData.error || 'Payment failed. Please try again.';
                        setLoading(false);
                    }
                });
                return;
            }
            errorEl.textContent = data.error || 'Payment failed. Please try again.';
            setLoading(false);
        })
        .catch(function(err) {
            errorEl.textContent = 'An error occurred. Please try again.';
            setLoading(false);
        });
    });
})();
</script>
