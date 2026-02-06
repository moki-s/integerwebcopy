<?php
// Homepage View
$form_success = $_SESSION['form_success'] ?? null;
$form_error = $_SESSION['form_error'] ?? null;
unset($_SESSION['form_success'], $_SESSION['form_error']);

// Helper for rendering stars
function renderStars($rating)
{
    $fullStars = floor($rating);
    $decimal = $rating - $fullStars;
    $percent = $decimal * 100;

    $html = '<div style="display: flex; gap: 4px;">';

    for ($i = 1; $i <= 5; $i++) {
        if ($i <= $fullStars) {
            // Full Green Star
            $html .= '<div style="background: #00b67a; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16px" height="16px"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      </div>';
        }
        elseif ($i == $fullStars + 1 && $decimal > 0) {
            // Partial Star (Background Gradient)
            $html .= '<div style="background: linear-gradient(90deg, #00b67a ' . $percent . '%, #dbdce0 ' . $percent . '%); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16px" height="16px"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      </div>';
        }
        else {
            // Empty/Grey Star
            $html .= '<div style="background: #dbdce0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16px" height="16px"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      </div>';
        }
    }

    $html .= '</div>';
    return $html;
}
?>

<!-- Hero Section -->
<section class="hero-section" style="background: linear-gradient(135deg, var(--color-primary-navy) 0%, #152a45 100%); color: white; padding: 4rem 0 6rem 0; position: relative; overflow: hidden;">
    <!-- Diagonal Graphic Effect -->
    <div style="position: absolute; right: 0; top: 0; width: 50%; height: 100%; background: var(--color-integer-yellow); clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%); opacity: 0.1;"></div>
    
    <div class="container" style="position: relative; z-index: 2;">
        <div style="max-width: 600px;">
            <p style="text-transform: uppercase; letter-spacing: 1px; font-weight: 600; color: var(--color-integer-yellow); margin-bottom: 1rem;">Career Training Experts</p>
            <h1 style="font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; color: white;">Train toward a career you'll love!</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">Join over 50,000 students achieving their career goals with our accredited online courses.</p>
            
            <form action="/courses" method="GET" style="background: white; padding: 0.5rem; border-radius: var(--radius-md); display: flex; gap: 0.5rem; max-width: 500px;">
                <input type="text" name="search" placeholder="What do you want to study?" style="flex: 1; border: none; padding: 0.75rem; outline: none; font-family: var(--font-body);">
                <button type="submit" class="btn btn-highlight">Search</button>
            </form>
            
            <div style="margin-top: 2rem; display: flex; gap: 1rem; align-items: center;">
                <!-- Trust Badges -->
                <span style="font-size: 0.9rem; opacity: 0.8;">Excellent on Trustpilot</span>
                <?php echo renderStars(4.7); ?>
            </div>
        </div>
    </div>
</section>

<!-- Mobile Lead Capture Form (hidden on desktop, shown on mobile via CSS) -->
<section class="home-mobile-form">
    <div class="container" style="max-width: 600px;">
        <div style="background: #FFFDF7; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); text-align: left; border: 1px solid #f0e6d2;">
            <h3 style="margin-bottom: 1.5rem; color: var(--color-primary-navy); text-align: center; font-size: 1.35rem;">Get Expert Advice</h3>
            <?php if ($form_success): ?>
                <div style="background: #d4edda; color: #155724; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; font-size: 0.9rem;"><?php echo htmlspecialchars($form_success); ?></div>
            <?php elseif ($form_error): ?>
                <div style="background: #f8d7da; color: #721c24; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; font-size: 0.9rem;"><?php echo htmlspecialchars($form_error); ?></div>
            <?php endif; ?>
            <form action="/enquiry" method="POST">
                <input type="hidden" name="page" value="homepage">
                <input type="hidden" name="redirect" value="/">
                <div style="margin-bottom: 1rem;">
                    <label class="contact-form-label" for="home-name">Your Name <span style="color:var(--color-error-red);">*</span></label>
                    <input id="home-name" name="name" class="contact-input" type="text" placeholder="Your Name*" required style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label class="contact-form-label" for="home-email">Email <span style="color:var(--color-error-red);">*</span></label>
                    <input id="home-email" name="email" class="contact-input" type="email" placeholder="Email*" required style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label class="contact-form-label" for="home-phone">Phone <span style="color:var(--color-error-red);">*</span></label>
                    <input id="home-phone" name="phone" class="contact-input" type="tel" placeholder="Phone No*" required style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <div style="margin-bottom: 1.25rem;">
                    <label class="contact-form-label" for="home-course">Course Interest <span style="color:var(--color-error-red);">*</span></label>
                    <input id="home-course" name="course_interest" class="contact-input" type="text" placeholder="Course You're Interested In?*" style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <button type="submit" class="btn contact-submit-btn" style="width:100%;background-color:#FFD700;color:black;font-weight:700;padding:0.85rem;border:none;text-transform:uppercase;letter-spacing:1px;">Enquire Today</button>
            </form>
        </div>
    </div>
</section>

<!-- Stats Bar -->
<section class="stats-bar" style="transform: translateY(-40px); position: relative; z-index: 10;">
    <div class="container">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; background: white; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); overflow: hidden;">
            
            <div style="text-align: center; padding: 2.5rem 2rem; border-right: 1px solid #f0f0f0; transition: background 0.3s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                <div class="counter" data-target="25" data-suffix="+" style="font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, var(--color-primary-navy) 0%, #3FA9CB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; line-height: 1;">0</div>
                <p style="margin: 0; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Years Experience</p>
            </div>
            
            <div style="text-align: center; padding: 2.5rem 2rem; border-right: 1px solid #f0f0f0; transition: background 0.3s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                <div class="counter" data-target="50000" data-suffix="+" style="font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, var(--color-primary-navy) 0%, #3FA9CB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; line-height: 1;">0</div>
                <p style="margin: 0; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Students Trained</p>
            </div>
            
            <div style="text-align: center; padding: 2.5rem 2rem; transition: background 0.3s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                <div class="counter" data-target="93" data-suffix="%" style="font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, var(--color-primary-navy) 0%, #3FA9CB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; line-height: 1;">0</div>
                <p style="margin: 0; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Pass Rate</p>
            </div>
            
        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^\d]/g, ''); // remove non-digits if any
                
                // Lower increment to count faster
                const inc = target / speed;

                if (count < target) {
                    // Check if target is large (like 50,000) to add commas
                    let currentVal = Math.ceil(count + inc);
                    if(target > 1000) {
                         counter.innerText = currentVal.toLocaleString() + (counter.getAttribute('data-suffix') || '');
                    } else {
                         counter.innerText = currentVal + (counter.getAttribute('data-suffix') || '');
                    }
                    setTimeout(updateCount, 20);
                } else {
                    if(target > 1000) {
                        counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
                    } else {
                        counter.innerText = target + (counter.getAttribute('data-suffix') || '');
                    }
                }
            };
            updateCount();
        });
    }

    // Use Intersection Observer to trigger animation when in view
    let observer = new IntersectionObserver((entries, observer) => { 
        entries.forEach(entry => {
            if(entry.isIntersecting){
                animateCounters();
                observer.disconnect(); // Run once
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar');
    if(statsSection) observer.observe(statsSection);
});
</script>

<!-- Features Section (Trustpilot & Benefits) -->
<section style="padding: 4rem 0; text-align: center;">
    <div class="container">
        <!-- Trustpilot & Main Review Score -->
        <div style="margin-bottom: 3rem;">
            <div class="trustpilot-bar" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem; color: #333; flex-wrap: wrap;">
                Our customers say <span style="font-weight: 700;">Excellent</span>
                <?php echo renderStars(4.7); ?>
                4.7 out of 5 based on 12,494 reviews
                <span style="color: #00b67a;">★ Trustpilot</span>
            </div>
        </div>

        <!-- 3 Column Features Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem;">
            
            <!-- Feature 1 -->
            <div>
                <div style="height: 80px; width: 80px; background: linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: white; font-size: 2.5rem; box-shadow: 0 10px 15px -3px rgba(56, 178, 172, 0.3);">
                    👨‍🏫
                </div>
                <h3 style="font-size: 1.5rem; color: var(--color-primary-navy); margin-bottom: 0.5rem;">Expert tutors</h3>
                <p style="color: #666; margin: 0;">To help you achieve your career goals.</p>
            </div>

            <!-- Feature 2 -->
            <div>
                <div style="height: 80px; width: 80px; background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: white; font-size: 2.5rem; box-shadow: 0 10px 15px -3px rgba(66, 153, 225, 0.3);">
                    ⏱️
                </div>
                <h3 style="font-size: 1.5rem; color: var(--color-primary-navy); margin-bottom: 0.5rem;">Self-paced study</h3>
                <p style="color: #666; margin: 0;">Learn on your terms, as and when it suits you.</p>
            </div>

            <!-- Feature 3 -->
            <div>
                <div style="height: 80px; width: 80px; background: linear-gradient(135deg, #7f9cf5 0%, #5a67d8 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: white; font-size: 2.5rem; box-shadow: 0 10px 15px -3px rgba(90, 103, 216, 0.3);">
                    💳
                </div>
                <h3 style="font-size: 1.5rem; color: var(--color-primary-navy); margin-bottom: 0.5rem;">Interest-free* plans</h3>
                <p style="color: #666; margin: 0;">Affordable monthly payments at no extra cost.</p>
            </div>

        </div>
    </div>
</section>

<!-- Explore Courses -->
<section style="padding: 4rem 0;">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 3rem;">Explore Our Courses</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
            <!-- Category Card 1 -->
            <a href="/courses?category[]=Accounting" class="course-card" style="display: block; background: white; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <div style="height: 200px; background-color: #e0e7ff; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--color-primary-navy);">
                    📊
                </div>
                <div style="padding: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem;">Accounting</h3>
                    <p style="color: #666;">AAT Qualifications and Bookkeeping courses.</p>
                    <span class="text-teal font-bold" style="font-size: 0.9rem;">View Courses &rarr;</span>
                </div>
            </a>
            
            <!-- Category Card 2 -->
            <a href="/courses?category[]=Health+%26+Social+Care" class="course-card" style="display: block; background: white; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <div style="height: 200px; background-color: #d1fae5; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--color-accent-teal);">
                    🩺
                </div>
                <div style="padding: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem;">Health & Social Care</h3>
                    <p style="color: #666;">Diplomas for the care sector.</p>
                    <span class="text-teal font-bold" style="font-size: 0.9rem;">View Courses &rarr;</span>
                </div>
            </a>
            
             <!-- Category Card 3 -->
             <a href="/courses?category[]=Business+Studies" class="course-card" style="display: block; background: white; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <div style="height: 200px; background-color: #fef3c7; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--color-integer-yellow);">
                    💼
                </div>
                <div style="padding: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem;">Business & Management</h3>
                    <p style="color: #666;">Leadership, HR, and Project Management.</p>
                    <span class="text-teal font-bold" style="font-size: 0.9rem;">View Courses &rarr;</span>
                </div>
            </a>
        </div>
    </div>
</section> 

<!-- Trustpilot Reviews Section -->
<section style="background-color: white; padding: 4rem 0; border-top: 1px solid #eee; overflow: hidden;">
    <style>
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-280px * 5 - 1.5rem * 5)); } /* Width of card + gap * number of unique cards */
        }
        .reviews-track {
            display: flex;
            gap: 1.5rem;
            animation: scroll 30s linear infinite;
            width: max-content;
        }
        .reviews-track:hover {
            animation-play-state: paused;
        }
    </style>
    <div class="container">
        <h2 class="reviews-heading" style="text-align: center; color: var(--color-primary-navy); margin-bottom: 0.5rem; font-size: 2rem;">Our students rate us 'Excellent' on <span style="font-weight: 800;">Trustpilot</span></h2>
        <p class="reviews-subheading" style="text-align: center; color: #666; margin-bottom: 3rem;">Join thousands of ambitious professionals just like you.</p>
        
        <div class="reviews-wrapper" style="display: flex; gap: 3rem; align-items: center;">

            <!-- Overall Rating Box (Fixed on Left) -->
            <div class="reviews-rating-box" style="flex: 0 0 220px; text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #eee;">
                <div style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #333;">Excellent</div>
                <div style="display: flex; justify-content: center; margin-bottom: 0.75rem;">
                    <?php echo renderStars(4.7); ?>
                </div>
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 0.5rem;">
                    Based on <u style="font-weight: 600;">12,494 reviews</u>
                </div>
                <div style="color: #00b67a; font-weight: 600; font-size: 1rem;">★ Trustpilot</div>
            </div>

            <!-- Scrolling Window -->
            <div style="flex: 1; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);">
                <div class="reviews-track">
                    <?php
$reviews = [
    ['title' => 'Accredited international qualification', 'body' => 'I am thrilled to learn with Integer that gives me the possibility to get...', 'author' => 'Customer', 'time' => '1 day ago', 'rating' => 5],
    ['title' => 'Smooth registration process', 'body' => 'I had a smooth registration process as my course advisor, Michelle took care...', 'author' => 'D Ahmad', 'time' => '2 days ago', 'rating' => 5],
    ['title' => 'Great Guidance and Support', 'body' => 'I had a really positive experience with my Integer course advisor. She...', 'author' => 'Khim', 'time' => '2 days ago', 'rating' => 4.5],
    ['title' => 'When I first enquired it wasn\'t pushy', 'body' => 'When I first enquired it wasn\'t pushy, Eva was able to answer my queries...', 'author' => 'Ms Z Williams', 'time' => '3 days ago', 'rating' => 5],
    ['title' => 'Excellent course material', 'body' => 'The course material is very easy to understand and the support is amazing...', 'author' => 'John Doe', 'time' => '4 days ago', 'rating' => 4],
];

// Loop twice to create seamless infinite scroll effect
for ($k = 0; $k < 2; $k++):
    foreach ($reviews as $review):
?>
                        <div style="width: 280px; text-align: left; background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #eee; flex-shrink: 0;">
                            <div style="display: flex; gap: 2px; margin-bottom: 0.75rem;">
                                <?php echo renderStars($review['rating']); ?>
                            </div>
                            <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; color: #333; font-weight: 700;"><?php echo $review['title']; ?></h4>
                            <p style="font-size: 0.9rem; color: #555; line-height: 1.5; margin-bottom: 1rem; height: 4.5em; overflow: hidden;">
                                <?php echo $review['body']; ?>
                            </p>
                            <div style="font-size: 0.8rem; color: #888;">
                                <span style="font-weight: 600; color: #333;"><?php echo $review['author']; ?></span>, <?php echo $review['time']; ?>
                            </div>
                        </div>
                    <?php
    endforeach;
endfor;
?>
                </div>
            </div>
            
        </div>
    </div>
</section>
<!-- Course Advisor CTA Section -->
<section class="cta-section" style="background: linear-gradient(90deg, #3FA9CB 0%, #1E3A8A 100%); padding: 3rem 0; position: relative; overflow: hidden; min-height: 300px; display: flex; align-items: center;">
    <div class="container cta-inner" style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 2;">
        
        <!-- Text Content -->
        <div style="flex: 1; color: white; max-width: 600px;">
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: white; font-weight: 700; line-height: 1.2;">Questions about your course?</h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 1; color: rgba(255,255,255,0.9);">Our Course Advisors are happy to help.</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="mailto:info@integertraining.com" class="btn" style="background: white; color: var(--color-primary-navy); padding: 0.8rem 2.5rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 4px; border: 2px solid white; transition: all 0.2s;">
                    ✉️ Email Us
                </a>
                <a href="tel:01288356263" class="btn" style="background: transparent; color: white; padding: 0.8rem 2.5rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 4px; border: 2px solid white; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                    📞 Call Us
                </a>
            </div>
        </div>
        
        <!-- Image (Right Side) -->
        <div class="cta-advisor-image" style="flex: 0 0 300px; display: flex; align-items: flex-end; justify-content: flex-end; position: absolute; right: 2rem; bottom: -3rem; pointer-events: none;">
             <!-- Fallback emoji expanded if image missing -->
            <img src="/assets/images/student-advisor.webp" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'" alt="Course Advisor" style="height: 350px; object-fit: contain; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
            <div style="font-size: 15rem; line-height: 0.8; display: none; transform: translateY(20px);">👨‍💼</div>
        </div>
        
    </div>
    
    <!-- Light Overlay Effect -->
    <div style="position: absolute; right: 0; bottom: 0; width: 50%; height: 100%; background: radial-gradient(circle at bottom right, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none;"></div>
</section>
