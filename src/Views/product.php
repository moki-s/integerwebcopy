<?php
// Product Page View - Dynamic based on ID
require_once __DIR__ . '/../Data/CourseData.php';
require_once __DIR__ . '/../Data/ReviewData.php';

// Get Course ID from URL or default to first one
$courseId = $_GET['id'] ?? 'aat-level-2-accounting';
$course = getCourse($courseId);

// Fallback if ID invalid
if (!$course) {
    $course = getCourse('aat-level-2-accounting');
}

$form_success = $_SESSION['form_success'] ?? null;
$form_error = $_SESSION['form_error'] ?? null;
unset($_SESSION['form_success'], $_SESSION['form_error']);
?>

<div class="product-header" style="background-color: #fff; border-bottom: 1px solid #eee; padding: 1rem 0;">
    <div class="container">
        <!-- Breadcrumbs -->
        <div style="font-size: 0.875rem; color: #666; margin-bottom: 1rem;">
            <a href="/">Home</a> > <a href="/courses">Courses</a> > <span class="text-navy"><?php echo htmlspecialchars($course['category']); ?></span>
        </div>

        <!-- Header Info -->
        <span style="background-color: <?php echo $course['badge_color']; ?>; color: white; font-size: 0.75rem; font-weight: bold; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 0.5rem; text-transform: uppercase;">
            <?php echo htmlspecialchars($course['badge']); ?>
        </span>
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1.2;"><?php echo htmlspecialchars($course['title']); ?></h1>
        <div class="product-meta" style="display: flex; gap: 1rem; font-size: 0.9rem; color: #666;">
            <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                <?php echo number_format($course['students']); ?> Students Enrolled
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Online Course
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Start Immediately
            </span>
        </div>
    </div>
</div>

<!-- Enquiry Form: mobile only (above product layout) -->
<div class="product-mobile-form">
    <div class="container" style="max-width: 600px;">
        <div style="background: #FFFDF7; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); text-align: left; border: 1px solid #f0e6d2;">
            <h3 style="margin: 0 0 1.25rem 0; color: var(--color-primary-navy); text-align: center; font-size: 1.35rem;">Get Expert Advice</h3>
            <?php if ($form_success): ?>
                <div style="background: #d4edda; color: #155724; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; font-size: 0.9rem;"><?php echo htmlspecialchars($form_success); ?></div>
            <?php elseif ($form_error): ?>
                <div style="background: #f8d7da; color: #721c24; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; font-size: 0.9rem;"><?php echo htmlspecialchars($form_error); ?></div>
            <?php endif; ?>
            <form action="/enquiry" method="POST">
                <input type="hidden" name="page" value="product">
                <input type="hidden" name="redirect" value="/product?id=<?php echo htmlspecialchars($courseId); ?>">
                <div style="margin-bottom: 1rem;">
                    <label class="contact-form-label" for="pm-name">Your Name <span style="color:var(--color-error-red);">*</span></label>
                    <input id="pm-name" name="name" class="contact-input" type="text" placeholder="Your Name*" required style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label class="contact-form-label" for="pm-email">Email <span style="color:var(--color-error-red);">*</span></label>
                    <input id="pm-email" name="email" class="contact-input" type="email" placeholder="Email*" required style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label class="contact-form-label" for="pm-phone">Phone <span style="color:var(--color-error-red);">*</span></label>
                    <input id="pm-phone" name="phone" class="contact-input" type="tel" placeholder="Phone No*" required style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <div style="margin-bottom: 1.25rem;">
                    <label class="contact-form-label" for="pm-course">Course Interest</label>
                    <input id="pm-course" name="course_interest" class="contact-input" type="text" value="<?php echo htmlspecialchars($course['title']); ?>" style="width:100%;padding:0.85rem;border:1px solid #eaeaea;border-radius:4px;background:white;font-family:var(--font-body);">
                </div>
                <button type="submit" class="btn contact-submit-btn" style="width:100%;background-color:#FFD700;color:black;font-weight:700;padding:0.85rem;border:none;text-transform:uppercase;letter-spacing:1px;">Enquire Today</button>
            </form>
        </div>
    </div>
</div>

<div class="container product-layout" style="padding-top: 2rem; display: grid; grid-template-columns: 1fr 350px; gap: 3rem; position: relative;">

    <!-- Main Content (Left) -->
    <div>
        <!-- Tabs Navigation -->
        <div style="display: flex; border-bottom: 2px solid #eee; margin-bottom: 2rem; overflow-x: auto;">
            <button onclick="openTab(event, 'tab-overview')" class="tab-btn active" style="padding: 1rem 1.5rem; background: none; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; font-size: 1rem; cursor: pointer;">Overview</button>
            <button onclick="openTab(event, 'tab-curriculum')" class="tab-btn" style="padding: 1rem 1.5rem; background: none; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; font-size: 1rem; cursor: pointer;">Curriculum</button>
        </div>

        <style>
            .tab-content { display: none; }
            .tab-content.active { display: block; }
            .tab-btn.active { color: var(--color-primary-navy) !important; border-bottom-color: var(--color-primary-navy) !important; }
        </style>

        <!-- Tab: Overview -->
        <div id="tab-overview" class="tab-content active">
            <h3 style="color: var(--color-primary-navy); margin-bottom: 1rem;">Course Overview</h3>
            <p style="font-size: 1.1rem; color: #555; line-height: 1.7; margin-bottom: 2rem;">
                <?php echo htmlspecialchars($course['overview']); ?>
            </p>

            <h4 style="margin-top: 2rem; color: var(--color-primary-navy);">Why study this course?</h4>
            <ul class="product-benefits-grid" style="list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">&#10003;</span> Accredited qualification
                </li>
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">&#10003;</span> 100% Online learning
                </li>
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">&#10003;</span> Tutor support included
                </li>
                <li style="display: flex; gap: 0.5rem; color: #555;">
                    <span style="color: var(--color-success-green);">&#10003;</span> Study at your own pace
                </li>
            </ul>

            <!-- Benefits Section -->
            <h3 style="color: var(--color-primary-navy); margin-top: 2.5rem; margin-bottom: 1rem;">Benefits Of Choosing Integer Training</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8; color: #555;">
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">&bull;</span> Expert tutors with real-world experience.
                </li>
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">&bull;</span> Flexible study options to fit your schedule.
                </li>
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">&bull;</span> Comprehensive study materials, mock exams, and ongoing support.
                </li>
                <li style="margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: var(--color-primary-navy); font-weight: bold;">&bull;</span> Career advice and guidance to help you succeed.
                </li>
            </ul>

            <!-- FAQ Section -->
            <h3 style="color: var(--color-primary-navy); margin-top: 2.5rem; margin-bottom: 1rem;">FAQ's</h3>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>Do I need any prior qualifications to start this course?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    No, this course is suitable for beginners with no prior qualifications required.
                </div>
            </details>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>How much time will I need to dedicate to studying?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    Around 6-8 hours per week for a typical 4-5 month completion.
                </div>
            </details>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>Is the course recognized by employers?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    Yes, our qualifications are highly respected and recognized by employers nationwide.
                </div>
            </details>

            <details style="margin-bottom: 0.8rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: white; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #333;">
                    <span>What support is available during the course?</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    You will have access to a dedicated tutor for guidance, plus comprehensive study materials and mock exams.
                </div>
            </details>

            <!-- CTA Section -->
            <div style="text-align: center; margin: 3rem 0;">
                <a href="/contact" class="btn btn-highlight" style="font-size: 1.1rem; padding: 1rem 2rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    Your Career Awaits &ndash; Let's Get Started &rarr;
                </a>
                <p style="color: #3182CE; font-weight: 600; margin-top: 1rem; font-size: 0.9rem;">
                    Limited Spots Available! Enroll Now And Secure Your Path To A Career
                </p>
            </div>

            <!-- Reviews Section with Trustpilot + Google Badges -->
            <div style="background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 3rem 2rem; border: 1px solid #eee; margin-top: 3rem; overflow: hidden; position: relative;">

                <!-- Review Platform Badges -->
                <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: #00b67a; font-weight: 700; font-size: 1.1rem;">&#9733; Trustpilot</span>
                        <span style="font-weight: 700; color: #333;"><?php echo REVIEW_STATS['trustpilot_rating']; ?>/5</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.001-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                        <span style="font-weight: 700; color: #333;"><?php echo REVIEW_STATS['google_rating']; ?>/5</span>
                        <span style="color: #666; font-size: 0.85rem;">Google Reviews</span>
                    </div>
                </div>

                <div style="font-size: 4rem; color: #FFC107; line-height: 1; margin-bottom: 1.5rem; font-family: serif; text-align: center;">&ldquo;</div>

                <?php
// Use real reviews from ReviewData, pick 3 varied ones for product carousel
$product_reviews = array_slice(TRUSTPILOT_REVIEWS, 0, 3);

if (!function_exists('renderStarsSmall')) {
    function renderStarsSmall($rating)
    {
        $html = '<div style="display: inline-flex; gap: 6px;">';
        for ($i = 0; $i < 5; $i++) {
            $color = ($i < $rating) ? '#FFC107' : '#e2e8f0';
            $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="' . $color . '"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        }
        $html .= '</div>';
        return $html;
    }
}
?>
                <div style="overflow: hidden; text-align: center;">
                    <style>
                        @keyframes product-review-swap {
                            0%, 30% { transform: translateX(0); }
                            33.33%, 63.33% { transform: translateX(-100%); }
                            66.66%, 96.66% { transform: translateX(-200%); }
                            100% { transform: translateX(0); }
                        }
                    </style>
                    <div style="display: flex; width: 100%; align-items: flex-start; animation: product-review-swap 18s infinite;">
                        <?php foreach ($product_reviews as $review): ?>
                        <div style="flex: 0 0 100%; width: 100%;">
                            <h4 style="color: #4a5568; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;"><?php echo htmlspecialchars($review['title']); ?></h4>
                            <p style="color: #4a5568; line-height: 1.8; margin-bottom: 2rem; font-size: 1.05rem; padding: 0 1rem;">
                                <?php echo htmlspecialchars($review['body']); ?>
                            </p>
                            <div style="margin-bottom: 1rem;"><?php echo renderStarsSmall($review['rating']); ?></div>
                            <div style="font-weight: 700; color: #1E3A8A; font-size: 1.1rem;"><?php echo htmlspecialchars($review['author']); ?></div>
                            <div style="font-size: 0.8rem; color: #888; margin-top: 0.25rem;"><?php echo htmlspecialchars($review['date']); ?> &mdash; <?php echo htmlspecialchars($review['source']); ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab: Curriculum -->
        <div id="tab-curriculum" class="tab-content">
            <?php foreach ($course['curriculum'] as $index => $module): ?>
            <details style="margin-bottom: 1rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: #f8f9fa; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: var(--color-primary-navy);">
                    <span>Unit <?php echo $index + 1; ?>: <?php echo htmlspecialchars($module); ?></span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    In this unit, you will learn the fundamental concepts of <?php echo htmlspecialchars(strtolower($module)); ?>.
                    (This is placeholder text for the module content description).
                </div>
            </details>
            <?php endforeach; ?>

            <details style="margin-bottom: 1rem; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;">
                <summary style="padding: 1rem; background: #f8f9fa; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; color: var(--color-primary-navy);">
                    <span>Exam &amp; Assessment</span>
                    <span style="font-size: 1.25rem;">+</span>
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid #eee; color: #555;">
                    This course is assessed through a series of online multiple-choice exams. You can book your exams whenever you feel ready.
                </div>
            </details>
        </div>

        <script>
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
                tabcontent[i].classList.remove("active");
            }
            tablinks = document.getElementsByClassName("tab-btn");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
                tablinks[i].style.color = "#666";
                tablinks[i].style.borderBottomColor = "transparent";
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
        </script>

    </div>

    <!-- Sidebar (Right) - Sticky -->
    <div class="product-sidebar" style="position: sticky; top: 100px; height: fit-content; align-self: start;">
        <div style="background: white; border: 1px solid #eee; box-shadow: var(--shadow-lg); border-radius: var(--radius-md); overflow: hidden;">

            <!-- Course Image -->
            <div style="height: 180px; background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #eee; overflow: hidden;">
                <?php if (!empty($course['image'])): ?>
                    <img src="<?php echo $course['image']; ?>" alt="<?php echo htmlspecialchars($course['title']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                <?php else: ?>
                    <div style="text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Course Preview</div>
                    </div>
                <?php endif; ?>
            </div>

            <div style="padding: 1.5rem;">
                <h3 style="margin-top: 0; color: var(--color-primary-navy); font-size: 1.25rem;">Course Fees</h3>

                <!-- Payment Toggle -->
                <div style="display: flex; background: #f0f4f8; border-radius: 4px; padding: 4px; margin-bottom: 1.5rem;">
                    <button onclick="document.getElementById('price-full').style.display='block'; document.getElementById('price-monthly').style.display='none'; this.style.background='white'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.1)'; this.nextElementSibling.style.background='transparent'; this.nextElementSibling.style.boxShadow='none';" style="flex: 1; border: none; padding: 8px; border-radius: 4px; font-weight: 600; cursor: pointer; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.1); color: var(--color-primary-navy);">Pay in Full</button>
                    <button onclick="document.getElementById('price-full').style.display='none'; document.getElementById('price-monthly').style.display='block'; this.style.background='white'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.1)'; this.previousElementSibling.style.background='transparent'; this.previousElementSibling.style.boxShadow='none';" style="flex: 1; border: none; padding: 8px; border-radius: 4px; font-weight: 600; cursor: pointer; background: transparent; color: var(--color-primary-navy);">Monthly</button>
                </div>

                <!-- Price Display: Full -->
                <div id="price-full" style="margin-bottom: 1.5rem; text-align: center;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <span style="text-decoration: line-through; color: #999; font-size: 1.1rem;">&pound;<?php echo $course['old_price']; ?></span>
                        <span style="font-size: 2.25rem; font-weight: 700; color: var(--color-primary-navy);">&pound;<?php echo $course['price']; ?></span>
                    </div>
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 1rem;">Inc. VAT &bull; One-time payment</div>
                    <div style="background: #fff3cd; color: #856404; padding: 0.5rem; font-size: 0.85rem; border-radius: 4px;">
                        Save &pound;<?php echo $course['old_price'] - $course['price']; ?> (Limited Offer)
                    </div>
                </div>

                <!-- Price Display: Monthly (Hidden by default) -->
                <div id="price-monthly" style="margin-bottom: 1.5rem; text-align: center; display: none;">
                    <?php if (!empty($course['old_monthly_price']) && $course['old_monthly_price'] > $course['monthly_price']): ?>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="text-decoration: line-through; color: #999; font-size: 1rem;">&pound;<?php echo $course['old_monthly_price']; ?></span>
                        <span style="font-size: 2.25rem; font-weight: 700; color: var(--color-primary-navy);">&pound;<?php echo $course['monthly_price']; ?></span>
                        <span style="font-size: 1rem; color: #666; align-self: end; padding-bottom: 8px;">/ month</span>
                    </div>
                    <?php else: ?>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 2.25rem; font-weight: 700; color: var(--color-primary-navy);">&pound;<?php echo $course['monthly_price']; ?></span>
                        <span style="font-size: 1rem; color: #666; align-self: end; padding-bottom: 8px;">/ month</span>
                    </div>
                    <?php endif; ?>
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 1rem;">10 monthly interest-free payments</div>
                    <div style="background: #e6fffa; color: #2c7a7b; padding: 0.5rem; font-size: 0.85rem; border-radius: 4px;">
                        0% Finance available
                    </div>
                </div>

                <!-- Actions -->
                <?php
$in_cart = isset($_SESSION['cart'][$course['id']]);
if ($in_cart):
?>
                    <a href="/cart" class="btn btn-secondary" style="display: block; width: 100%; margin-bottom: 1rem; font-size: 1.1rem; padding: 1rem; text-align: center; border: 2px solid var(--color-primary-navy); color: var(--color-primary-navy); background: white;">
                        &#10003; In Basket (View Cart)
                    </a>
                <?php
else: ?>
                    <form action="/cart-add" method="POST">
                        <input type="hidden" name="course_id" value="<?php echo $course['id']; ?>">
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem; font-size: 1.1rem; padding: 1rem;">Add to Basket</button>
                    </form>
                <?php
endif; ?>
                <div style="text-align: center;">
                    <a href="/contact" style="font-size: 0.9rem; color: #666; text-decoration: underline;">Speak to a Course Advisor</a>
                </div>
            </div>

            <!-- Trust Elements -->
            <div style="background: #f8f9fa; padding: 1rem 1.5rem; border-top: 1px solid #eee;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; color: #555;">
                    <div style="display: flex; align-items: center; gap: 0.35rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                        Secure Checkout
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.35rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFC107"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        4.8/5 Reviews
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.35rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                        14-Day Returns
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.35rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        Cert. Included
                    </div>
                </div>
            </div>
        </div>

        <!-- Enquiry Form -->
        <div class="product-enquiry-form" style="background: white; border: 1px solid #eee; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); overflow: hidden; margin-top: 1.5rem;">
            <div style="background: var(--color-primary-navy); padding: 0.85rem 1.5rem; text-align: center;">
                <h3 style="margin: 0; color: white; font-size: 1.05rem; font-weight: 600;">Get Expert Advice</h3>
            </div>
            <div style="padding: 1.25rem 1.5rem;">
                <?php if ($form_success): ?>
                    <div style="background: #d4edda; color: #155724; padding: 0.6rem; border-radius: 4px; margin-bottom: 0.85rem; text-align: center; font-weight: 600; font-size: 0.85rem;"><?php echo htmlspecialchars($form_success); ?></div>
                <?php elseif ($form_error): ?>
                    <div style="background: #f8d7da; color: #721c24; padding: 0.6rem; border-radius: 4px; margin-bottom: 0.85rem; text-align: center; font-weight: 600; font-size: 0.85rem;"><?php echo htmlspecialchars($form_error); ?></div>
                <?php endif; ?>
                <form action="/enquiry" method="POST">
                    <input type="hidden" name="page" value="product">
                    <input type="hidden" name="redirect" value="/product?id=<?php echo htmlspecialchars($courseId); ?>">
                    <div style="margin-bottom: 0.65rem;">
                        <label class="contact-form-label" for="product-name" style="font-size: 0.8rem; margin-bottom: 0.3rem;">Your Name <span style="color:var(--color-error-red);">*</span></label>
                        <input id="product-name" name="name" class="contact-input" type="text" placeholder="Full name" required style="width:100%;padding:0.55rem 0.7rem;border:1px solid #ddd;border-radius:4px;background:#f8f9fa;font-family:var(--font-body);font-size:0.9rem;">
                    </div>
                    <div style="margin-bottom: 0.65rem;">
                        <label class="contact-form-label" for="product-email" style="font-size: 0.8rem; margin-bottom: 0.3rem;">Email <span style="color:var(--color-error-red);">*</span></label>
                        <input id="product-email" name="email" class="contact-input" type="email" placeholder="you@email.com" required style="width:100%;padding:0.55rem 0.7rem;border:1px solid #ddd;border-radius:4px;background:#f8f9fa;font-family:var(--font-body);font-size:0.9rem;">
                    </div>
                    <div style="margin-bottom: 0.65rem;">
                        <label class="contact-form-label" for="product-phone" style="font-size: 0.8rem; margin-bottom: 0.3rem;">Phone <span style="color:var(--color-error-red);">*</span></label>
                        <input id="product-phone" name="phone" class="contact-input" type="tel" placeholder="07xxx xxxxxx" required style="width:100%;padding:0.55rem 0.7rem;border:1px solid #ddd;border-radius:4px;background:#f8f9fa;font-family:var(--font-body);font-size:0.9rem;">
                    </div>
                    <div style="margin-bottom: 0.85rem;">
                        <label class="contact-form-label" for="product-course" style="font-size: 0.8rem; margin-bottom: 0.3rem;">Course Interest</label>
                        <input id="product-course" name="course_interest" class="contact-input" type="text" value="<?php echo htmlspecialchars($course['title']); ?>" style="width:100%;padding:0.55rem 0.7rem;border:1px solid #ddd;border-radius:4px;background:#f8f9fa;font-family:var(--font-body);font-size:0.9rem;">
                    </div>
                    <button type="submit" class="btn" style="width:100%;background-color:var(--color-primary-navy);color:white;font-weight:600;padding:0.7rem;border:none;font-size:0.9rem;border-radius:var(--radius-md);">Send Enquiry</button>
                </form>
                <p style="margin: 0.65rem 0 0 0; text-align: center; font-size: 0.75rem; color: #999;">We'll get back to you within 24 hours</p>
            </div>
        </div>
    </div>
</div>
