<?php
// Contact View
$form_success = $_SESSION['form_success'] ?? null;
$form_error = $_SESSION['form_error'] ?? null;
unset($_SESSION['form_success'], $_SESSION['form_error']);
?>

<div class="contact-page" style="background-color: #f8f9fa; padding: 4rem 0;">
    <div class="container" style="max-width: 800px; text-align: center;">
        <h1 class="contact-hero-heading" style="color: var(--color-primary-navy); margin-bottom: 1rem;">Contact Us</h1>
        <p class="contact-hero-text" style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto 3rem auto;">
            Our support team is here to help you choose the right course or answer any technical questions.
        </p>

        <div class="contact-content">
            <div class="contact-info-cards" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 4rem;">
                <div class="contact-card" style="background: white; padding: 2rem; border-radius: 8px; box-shadow: var(--shadow-sm);">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem auto; background: #f0f4f8; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-navy)" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    </div>
                    <h3 style="margin-bottom: 0.5rem;">Phone</h3>
                    <p>01288 356263</p>
                    <div style="font-size: 0.85rem; color: #888;">Mon-Fri, 9am-5pm</div>
                </div>
                <div class="contact-card" style="background: white; padding: 2rem; border-radius: 8px; box-shadow: var(--shadow-sm);">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem auto; background: #f0f4f8; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-navy)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <h3 style="margin-bottom: 0.5rem;">Email</h3>
                    <p>info@integertraining.com</p>
                    <div style="font-size: 0.85rem; color: #888;">Reply within 24h</div>
                </div>
                <div class="contact-card" style="background: white; padding: 2rem; border-radius: 8px; box-shadow: var(--shadow-sm);">
                    <div style="width: 48px; height: 48px; margin: 0 auto 1rem auto; background: #f0f4f8; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-navy)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <h3 style="margin-bottom: 0.5rem;">Office</h3>
                    <p>Bude, Cornwall</p>
                    <div style="font-size: 0.85rem; color: #888;">United Kingdom</div>
                </div>
            </div>

            <div class="contact-form-wrapper" style="background: #FFFDF7; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); text-align: left; border: 1px solid #f0e6d2; max-width: 600px; margin: 0 auto;">
                <h3 style="margin-bottom: 2rem; color: var(--color-primary-navy); text-align: center; font-size: 1.5rem;">Get Expert Advice</h3>
                <?php if ($form_success): ?>
                    <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; text-align: center; font-weight: 600;"><?php echo htmlspecialchars($form_success); ?></div>
                <?php elseif ($form_error): ?>
                    <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; text-align: center; font-weight: 600;"><?php echo htmlspecialchars($form_error); ?></div>
                <?php endif; ?>
                <form action="/enquiry" method="POST">
                    <input type="hidden" name="page" value="contact">
                    <input type="hidden" name="redirect" value="/contact">
                    <div style="margin-bottom: 1.5rem;">
                        <label class="contact-form-label" for="contact-name">Your Name <span style="color: var(--color-error-red);">*</span></label>
                        <input id="contact-name" name="name" class="contact-input" type="text" placeholder="Your Name*" required style="width: 100%; padding: 1rem; border: 1px solid #eaeaea; border-radius: 4px; background: white; font-family: var(--font-body);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label class="contact-form-label" for="contact-email">Email <span style="color: var(--color-error-red);">*</span></label>
                        <input id="contact-email" name="email" class="contact-input" type="email" placeholder="Email*" required style="width: 100%; padding: 1rem; border: 1px solid #eaeaea; border-radius: 4px; background: white; font-family: var(--font-body);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label class="contact-form-label" for="contact-phone">Phone <span style="color: var(--color-error-red);">*</span></label>
                        <input id="contact-phone" name="phone" class="contact-input" type="tel" placeholder="Phone No*" required style="width: 100%; padding: 1rem; border: 1px solid #eaeaea; border-radius: 4px; background: white; font-family: var(--font-body);">
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label class="contact-form-label" for="contact-course">Course Interest <span style="color: var(--color-error-red);">*</span></label>
                        <input id="contact-course" name="course_interest" class="contact-input" type="text" placeholder="Course Name You Are Interested?*" style="width: 100%; padding: 1rem; border: 1px solid #eaeaea; border-radius: 4px; background: white; font-family: var(--font-body);">
                    </div>
                    <button type="submit" class="btn contact-submit-btn" style="width: 100%; background-color: #FFD700; color: black; font-weight: 700; padding: 1rem; border: none; text-transform: uppercase; letter-spacing: 1px;">Enquire Today</button>
                </form>
            </div>
        </div>
    </div>
</div>
