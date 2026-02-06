<?php
// Header Template
?>
<header class="site-header">
    <div class="top-bar">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
            <span>Train toward a career you'll love!</span>
            <div style="display: flex; gap: 1rem;">
                <a href="#">Contact: 01288 356263</a>
                <a href="#">Blog</a>
            </div>
        </div>
    </div>
    
    <div class="header-main">
        <div class="container header-inner">
            <a href="/" class="logo">
                <img src="/assets/images/logo.webp" alt="Integer Training" style="height: 60px;">
            </a>

            <nav class="nav-menu">
                <a href="/courses" class="nav-link">Courses</a>
                <a href="/about" class="nav-link">About Us</a>
                <a href="/branches" class="nav-link">Branches</a>
                <a href="/contact" class="nav-link">Contact</a>
            </nav>

            <div class="header-actions">
                <a href="/cart" style="position: relative;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-navy"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </a>
            </div>

            <!-- Mobile: phone number + hamburger (hidden on desktop) -->
            <a href="tel:01288356263" class="mobile-header-phone">01288 356263</a>
            <button class="mobile-hamburger" onclick="document.getElementById('mobileMenu').classList.add('open')" aria-label="Open menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
</header>

<!-- Mobile Menu Overlay (hidden on desktop) -->
<div id="mobileMenu" class="mobile-menu-overlay">
    <div class="mobile-menu-panel">
        <div class="mobile-menu-top">
            <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">Main Menu</span>
            <button class="mobile-menu-close" onclick="document.getElementById('mobileMenu').classList.remove('open')" aria-label="Close menu">&times;</button>
        </div>
        <nav class="mobile-menu-nav">
            <a href="/courses">Courses <span class="mobile-menu-arrow">&#8250;</span></a>
            <a href="/about">About Us <span class="mobile-menu-arrow">&#8250;</span></a>
            <a href="/branches">Branches <span class="mobile-menu-arrow">&#8250;</span></a>
            <a href="/contact">Contact Us</a>
            <a href="#">Blog</a>
        </nav>
        <div class="mobile-menu-contact">
            <a href="tel:01288356263" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem 0; color: var(--color-primary-navy); font-weight: 600; border-top: 1px solid #eee;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                01288 356263
            </a>
            <a href="mailto:info@integertraining.com" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem 0; color: var(--color-primary-navy); font-weight: 600; border-top: 1px solid #eee;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
            </a>
            <a href="/cart" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem 0; color: var(--color-primary-navy); font-weight: 600; border-top: 1px solid #eee;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                Basket
            </a>
        </div>
        <div style="padding: 1rem 1.5rem; border-top: 1px solid #eee;">
            <button onclick="document.getElementById('mobileMenu').classList.remove('open')" style="display: flex; align-items: center; gap: 0.75rem; background: none; border: none; color: var(--color-primary-navy); font-weight: 600; font-size: 1rem; cursor: pointer; padding: 0; font-family: var(--font-body);">
                &times; Close
            </button>
        </div>
    </div>
</div>
