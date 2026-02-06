<?php
// Checkout View
?>

<div class="container" style="padding: 3rem 1rem;">
    <h1 style="margin-bottom: 2rem; text-align: center;">Secure Checkout</h1>
    
    <div style="display: grid; grid-template-columns: 1fr 400px; gap: 3rem; max-width: 1100px; margin: 0 auto;">
        
        <!-- Checkout Form -->
        <div>
            <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-sm); margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--color-primary-navy); display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: var(--color-primary-navy); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">1</span>
                    Customer Details
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem;">First Name</label>
                        <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem;">Last Name</label>
                        <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 0.4rem;">Email Address</label>
                    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
            </div>
            
            <div style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-sm);">
                <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--color-primary-navy); display: flex; align-items: center; gap: 0.5rem;">
                    <span style="background: var(--color-primary-navy); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">2</span>
                    Payment Details
                </h3>
                
                <!-- Stripe/Payment Placeholder -->
                <div style="background: #f8f9fa; border: 1px dashed #ccc; padding: 2rem; text-align: center; border-radius: 4px; color: #666;">
                    [Stripe Elements Payment Form Will Load Here]
                </div>
                
                <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; font-size: 1.1rem; padding: 1rem;">Pay £414.00</button>
                <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #666;">
                    🔒 256-bit SSL Secure Encrypted Payment
                </div>
            </div>
        </div>
        
        <!-- Order Sidebar -->
        <div style="background: #f0f4f8; border-radius: var(--radius-md); padding: 2rem; height: fit-content;">
            <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--color-primary-navy);">Order Summary</h3>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">📊</div>
                <div>
                     <div style="font-weight: 600; font-size: 0.9rem;">AAT Level 3 Diploma</div>
                     <div style="font-size: 0.85rem; color: #666;">Qty: 1</div>
                     <div style="font-weight: 600; font-size: 0.9rem;">£345.00</div>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: #555;">
                <span>Subtotal</span>
                <span>£345.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; color: #555;">
                <span>VAT (20%)</span>
                <span>£69.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; border-top: 1px solid #ddd; padding-top: 1rem; font-weight: 700; color: var(--color-primary-navy); font-size: 1.2rem;">
                <span>Total to Pay</span>
                <span>£414.00</span>
            </div>
        </div>
        
    </div>
</div>
