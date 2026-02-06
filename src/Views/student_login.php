<?php
// Student Login View
?>

<div class="container" style="padding: 4rem 1rem;">
    <div style="max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
        
        <!-- Login Column -->
        <div>
            <h2 style="color: var(--color-primary-navy);">Student Login</h2>
            <p style="color: #666; margin-bottom: 2rem;">Welcome back! Please access your course material below.</p>
            
            <form>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address</label>
                    <input type="email" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <label style="font-weight: 500;">Password</label>
                        <a href="#" style="font-size: 0.85rem; color: #666;">Forgot?</a>
                    </div>
                    <input type="password" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <button class="btn btn-primary" style="width: 100%;">Log In</button>
            </form>
        </div>
        
        <!-- Register Column (Divider) -->
        <div style="border-left: 1px solid #eee; padding-left: 4rem;">
            <h2 style="color: var(--color-primary-navy);">New to Integer?</h2>
            <p style="color: #666; margin-bottom: 2rem;">Create an account to track your orders and access your courses.</p>
            
            <ul style="margin-bottom: 2rem; color: #555;">
                <li style="margin-bottom: 0.5rem;">✓ Instant access to course materials</li>
                <li style="margin-bottom: 0.5rem;">✓ Track your progress</li>
                <li style="margin-bottom: 0.5rem;">✓ Download certificates</li>
            </ul>
            
            <a href="#" class="btn btn-secondary" style="width: 100%; text-align: center;">Create Account</a>
        </div>
        
    </div>
</div>
